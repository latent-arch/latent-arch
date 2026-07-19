#!/usr/bin/env node
// Генерация результатов бенчмарк-задачи «маскот» (SVG) по конфигу моделей.
// Архитектура — как у collect-ai-news.mjs: конфиг → OpenRouter → файлы контента → коммит в CI.
//
// Конфиг: scripts/benchmark-models.json — [{ id, slug, name, released }], правится руками;
//         released — дата появления модели на OpenRouter (поле created каталога /api/v1/models).
// Выход:  content/benchmarks/mascot-svg/results/<id>.svg
//         content/benchmarks/mascot-svg/results.json — [{ id, slug, name, released, generatedAt, verdict }]
//
// Поле verdict («пару слов о результате») — авторское, пишется руками в results.json;
// скрипт его СОХРАНЯЕТ при перегенерации. У новых результатов verdict пустой.
//
// Использование:
//   OPENROUTER_API_KEY=... node scripts/generate-benchmark-mascot.mjs [--model <id> | --all]
//   По умолчанию генерируются только модели БЕЗ существующего SVG (результаты статьи
//   заморожены — «no retries», перепрогон не должен молча перерисовывать опубликованное).
//   --model <id> — принудительно перегенерировать одну модель; --all — все.
//
// Ошибка вызова одной модели не роняет прогон: старый результат (если был) остаётся.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONFIG_PATH = path.join(ROOT, "scripts", "benchmark-models.json");
const BUNDLE_DIR = path.join(ROOT, "content", "benchmarks", "mascot-svg");
const RESULTS_JSON = path.join(BUNDLE_DIR, "results.json");
const SVG_DIR = path.join(BUNDLE_DIR, "results");
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

// Промпт задачи. v1 замораживается при публикации статьи — не менять без бампа версии.
const PROMPT =
  "Generate an SVG of a walrus playing a cello. The walrus must have its two long tusks and visible whiskers. The cello must have a correctly shaped curved body with two f-holes, four strings, and a bridge, standing upright on its endpin. The walrus must be clearly drawing a bow across the strings with its flipper.";

function parseArgs(argv) {
  const args = { model: null, all: false };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--model") args.model = argv[++i];
    else if (argv[i] === "--all") args.all = true;
    else {
      console.error(`Неизвестный аргумент: ${argv[i]}`);
      process.exit(1);
    }
  }
  return args;
}

async function generate(key, slug) {
  const res = await fetch(API_URL, {
    method: "POST",
    // Таймаут на вызов: зависший провайдер (Kimi K3 висел >30 мин) не должен стопорить весь прогон
    signal: AbortSignal.timeout(240_000),
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    // max_tokens явно и с большим запасом: у reasoning-моделей лимит делится с размышлениями,
    // и многословные модели (DeepSeek) обрезали SVG на 16k
    body: JSON.stringify({ model: slug, max_tokens: 32000, messages: [{ role: "user", content: PROMPT }] }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const json = await res.json();
  const choice = json.choices?.[0];
  const text = choice?.message?.content;
  if (!text) throw new Error(`пустой ответ: ${JSON.stringify(json).slice(0, 300)}`);
  const svg = text.match(/<svg[\s\S]*?<\/svg>/i)?.[0];
  if (!svg) {
    const reason = choice?.finish_reason ?? "?";
    if (/<svg/i.test(text))
      throw new Error(`SVG обрезан — нет закрывающего тега (finish_reason=${reason}, длина ответа ${text.length})`);
    throw new Error(`в ответе нет <svg> (finish_reason=${reason}, начало ответа: ${text.slice(0, 200)})`);
  }
  return svg;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) {
    console.error("OPENROUTER_API_KEY не задан");
    process.exit(1);
  }

  const config = JSON.parse(readFileSync(CONFIG_PATH, "utf8"));
  let targets;
  if (args.model) {
    targets = config.filter((m) => m.id === args.model);
    if (!targets.length) {
      console.error(`Модель "${args.model}" не найдена в ${CONFIG_PATH}`);
      process.exit(1);
    }
  } else if (args.all) {
    targets = config;
  } else {
    // Дефолт: только модели без результата — опубликованные рисунки не перерисовываем
    targets = config.filter((m) => !existsSync(path.join(SVG_DIR, `${m.id}.svg`)));
    const skipped = config.filter((m) => !targets.includes(m));
    if (skipped.length) console.log(`Пропуск (результат уже есть): ${skipped.map((m) => m.id).join(", ")}`);
    if (!targets.length) console.log("У всех моделей из конфига уже есть результат — генерировать нечего");
  }

  // Существующие результаты — источник рукописных вердиктов и фолбэк при ошибках
  const previous = existsSync(RESULTS_JSON)
    ? JSON.parse(readFileSync(RESULTS_JSON, "utf8"))
    : [];
  const prevById = new Map(previous.map((r) => [r.id, r]));

  mkdirSync(SVG_DIR, { recursive: true });
  let generated = 0;

  // Порядок и состав results.json — по конфигу; модель без SVG не попадает в выдачу.
  // Статичные поля (slug/name/released) всегда берутся из конфига — он источник правды,
  // из прошлого results.json переживают generatedAt и рукописные verdict/invalid
  // (invalid — флаг «SVG синтаксически битый», шаблон рисует плейсхолдер вместо картинки).
  const writeResults = () => {
    const results = config
      .filter((m) => prevById.has(m.id) && existsSync(path.join(SVG_DIR, `${m.id}.svg`)))
      .map((m) => {
        const prev = prevById.get(m.id);
        return {
          id: m.id,
          slug: m.slug,
          name: m.name,
          released: m.released ?? "",
          generatedAt: prev.generatedAt ?? "",
          verdict: prev.verdict ?? "",
          ...(prev.invalid ? { invalid: true } : {}),
        };
      });
    writeFileSync(RESULTS_JSON, JSON.stringify(results, null, 2) + "\n");
    return results.length;
  };

  for (const model of targets) {
    process.stdout.write(`${model.name} (${model.slug})... `);
    try {
      const svg = await generate(key, model.slug);
      writeFileSync(path.join(SVG_DIR, `${model.id}.svg`), svg);
      prevById.set(model.id, {
        ...prevById.get(model.id),
        id: model.id,
        generatedAt: new Date().toISOString().slice(0, 10),
        verdict: prevById.get(model.id)?.verdict ?? "",
      });
      generated++;
      // results.json обновляется после каждой успешной модели, а не в конце прогона:
      // при обрыве джоба (зависание/отмена/таймаут) всё уже сгенерённое останется
      // согласованным и попадёт в коммит (шаг коммита в workflow — if: always)
      writeResults();
      console.log("ok");
    } catch (err) {
      const msg = err.name === "TimeoutError" ? "таймаут вызова (4 мин)" : err.message;
      console.log(`ошибка (${msg}) — оставляю прежний результат, если был`);
    }
  }

  const total = writeResults();
  console.log(`\nГотово: ${generated}/${targets.length} новых, в results.json ${total} моделей`);
  if (!generated && targets.length) process.exit(1); // все вызовы упали — сигнал в CI
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
