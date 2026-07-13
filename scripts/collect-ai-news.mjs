// Сбор AI-новостей: фиды → кандидаты → LLM отбирает топ и пишет саммари → карточки в content/ai-news/.
// Запуск: node scripts/collect-ai-news.mjs [--dry-run]
//   --dry-run — только напечатать кандидатов (без LLM и записи файлов).
// Env: ANTHROPIC_API_KEY (обязателен без --dry-run), WINDOW_HOURS=48, MAX_PICKS=5, MAX_CARDS=50.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import Parser from "rss-parser";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT_DIR = path.join(ROOT, "content", "ai-news");
const SOURCES_FILE = path.join(ROOT, "scripts", "ai-news-sources.json");

const DRY_RUN = process.argv.includes("--dry-run");
const WINDOW_HOURS = Number(process.env.WINDOW_HOURS ?? 48);
const MAX_PICKS = Number(process.env.MAX_PICKS ?? 5);
const MAX_CARDS = Number(process.env.MAX_CARDS ?? 50);
const MAX_PER_SOURCE = 15;

const parser = new Parser();

function slugify(title, url) {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/, "");
  const hash = crypto.createHash("sha256").update(url).digest("hex").slice(0, 8);
  return `${base || "item"}-${hash}`;
}

function readExistingCards() {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md") && f !== "_index.md")
    .map((f) => {
      const text = fs.readFileSync(path.join(CONTENT_DIR, f), "utf8");
      const url = text.match(/^link:\s*"(.*)"\s*$/m)?.[1] ?? "";
      const date = text.match(/^date:\s*(\S+)\s*$/m)?.[1] ?? "";
      return { file: path.join(CONTENT_DIR, f), url, date };
    });
}

async function fetchCandidates(knownUrls) {
  const { sources } = JSON.parse(fs.readFileSync(SOURCES_FILE, "utf8"));
  const cutoff = Date.now() - WINDOW_HOURS * 3600 * 1000;
  const candidates = [];
  const seen = new Set(knownUrls);

  for (const source of sources) {
    let feed;
    try {
      const res = await fetch(source.url, {
        signal: AbortSignal.timeout(20000),
        headers: { "user-agent": "latent-arch-ai-news/1.0 (+https://latent-arch.com)" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      feed = await parser.parseString(await res.text());
    } catch (err) {
      // Одна упавшая лента не должна ронять весь тик
      console.warn(`WARN: фид ${source.id} недоступен: ${err.message}`);
      continue;
    }
    let taken = 0;
    for (const item of feed.items ?? []) {
      if (taken >= MAX_PER_SOURCE) break;
      const link = (item.link ?? "").trim();
      const pubDate = item.isoDate ?? item.pubDate;
      if (!link || !item.title || !pubDate) continue;
      const ts = Date.parse(pubDate);
      if (Number.isNaN(ts) || ts < cutoff) continue;
      if (seen.has(link)) continue;
      seen.add(link);
      candidates.push({
        title: item.title.trim(),
        url: link,
        date: new Date(ts).toISOString(),
        source: source.name,
        snippet: (item.contentSnippet ?? "").replace(/\s+/g, " ").slice(0, 500),
      });
      taken++;
    }
  }
  return candidates;
}

async function curate(candidates) {
  const { default: Anthropic } = await import("@anthropic-ai/sdk");
  const client = new Anthropic();

  const list = candidates
    .map((c, i) => `[${i}] (${c.source}, ${c.date.slice(0, 10)}) ${c.title}\n${c.snippet}`)
    .join("\n\n");

  const schema = {
    type: "object",
    properties: {
      picks: {
        type: "array",
        items: {
          type: "object",
          properties: {
            index: { type: "integer" },
            summary: { type: "string" },
          },
          required: ["index", "summary"],
          additionalProperties: false,
        },
      },
    },
    required: ["picks"],
    additionalProperties: false,
  };

  const response = await client.messages.create({
    model: "claude-opus-4-8",
    max_tokens: 8000,
    output_config: { format: { type: "json_schema", schema } },
    system:
      "You curate an AI news section on a personal engineering blog (latent-arch.com). " +
      "The audience is software engineers following AI progress. Respond with JSON only.",
    messages: [
      {
        role: "user",
        content:
          `Below are ${candidates.length} candidate news items collected from RSS feeds. ` +
          `Select up to ${MAX_PICKS} of the most significant ones: model releases, major product/tool launches, ` +
          `notable research, and important industry news. Skip minor updates, marketing fluff, and listicles. ` +
          `If several items cover the same story, pick one (prefer the primary source). ` +
          `If fewer than ${MAX_PICKS} items are genuinely significant, pick fewer — an empty list is acceptable. ` +
          `For each pick write a neutral 1-2 sentence English summary of what happened and why it matters.\n\n${list}`,
      },
    ],
  });

  if (response.stop_reason === "refusal") throw new Error("LLM refused the request");
  const text = response.content.find((b) => b.type === "text")?.text ?? "";
  const { picks } = JSON.parse(text);
  return picks.filter((p) => Number.isInteger(p.index) && candidates[p.index] && p.summary?.trim());
}

function writeCard(candidate, summary) {
  const slug = slugify(candidate.title, candidate.url);
  const file = path.join(CONTENT_DIR, `${slug}.md`);
  const fm = [
    "---",
    `title: ${JSON.stringify(candidate.title)}`,
    `date: ${candidate.date}`,
    `source: ${JSON.stringify(candidate.source)}`,
    // «link», не «url»: url в Hugo front matter зарезервирован (переопределяет адрес страницы)
    `link: ${JSON.stringify(candidate.url)}`,
    "---",
    "",
    summary.trim(),
    "",
  ].join("\n");
  fs.writeFileSync(file, fm);
  return file;
}

function applyRetention() {
  const cards = readExistingCards()
    .filter((c) => c.date)
    .sort((a, b) => a.date.localeCompare(b.date)); // старые первыми
  const excess = cards.length - MAX_CARDS;
  for (let i = 0; i < excess; i++) {
    fs.unlinkSync(cards[i].file);
    console.log(`retention: удалена старая карточка ${path.basename(cards[i].file)}`);
  }
}

const existing = readExistingCards();
const candidates = await fetchCandidates(existing.map((c) => c.url));
console.log(`Кандидатов после дедупа и окна ${WINDOW_HOURS}ч: ${candidates.length}`);

if (DRY_RUN) {
  console.log(JSON.stringify(candidates, null, 2));
  process.exit(0);
}

if (candidates.length > 0) {
  const picks = await curate(candidates);
  console.log(`LLM отобрал: ${picks.length}`);
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
  for (const pick of picks) {
    const file = writeCard(candidates[pick.index], pick.summary);
    console.log(`+ ${path.basename(file)}`);
  }
}

applyRetention();
console.log("Готово");
