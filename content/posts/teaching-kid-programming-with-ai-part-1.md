---
title: "Teaching My Kid Programming with AI — Part 1: The Setup"
date: 2026-02-28
draft: false
tags: ["ai", "education", "parenting", "openclaw", "claude"]
description: "How a 20-year tech veteran set up an AI tutor on Discord to teach his child competitive programming — and what happened on day one."
ShowToc: true
---

## Why AI as a tutor?

I've been in software engineering for 20 years. You'd think teaching your own kid to code would be easy. It's not.

The problem isn't knowledge — it's patience, pacing, and availability. After a full day of engineering work, sitting down for a structured lesson is hard for both of us. I needed something that could:

- Be available whenever my kid felt like exploring — not just when I had energy
- Adapt to their pace — not mine, not a curriculum's
- Make it feel like play, not homework
- Answer the same question 15 times without getting frustrated

But there was another reason. My son Sasha is 13, in 7th grade, and already does competitive math and programming with a remote teacher. He has real ambitions — regional olympiads, then national level. The teacher gives him a great foundation, but sessions are once a week. Between lessons, he needs someone to practice with daily. I can't be that person every evening — but an AI can.

## The idea: Claude on Discord

Sasha already lives on Discord. So instead of introducing yet another "educational platform" he'd abandon in a week, I decided to bring the tutor to where he already is.

The stack:
- **[OpenClaw](https://openclaw.ai)** — open-source AI gateway that connects LLMs to messaging platforms
- **Discord** — the interface Sasha already knows and loves
- **Claude** (Anthropic) — the AI brain behind the tutor

The result: a Discord bot that acts as a patient, knowledgeable competitive programming coach — available 24/7 in a private server.

## Setting it up

Total setup time: **about an hour** from zero to a working AI tutor on Discord. The stack: a cheap VPS, OpenClaw installed in one command, a Discord bot, and an Anthropic API key.

<details>
<summary>Step-by-step setup details (click to expand)</summary>

### Step 1: A cheap VPS

OpenClaw needs a server to run on. I grabbed a basic VPS (1-2 GB RAM is enough) and set it up from scratch:

- Created a swap file (safety net for low RAM)
- Set up a dedicated `claw` user
- Installed Node.js 22 via NVM
- Configured systemd so the service survives SSH disconnects

The whole thing took about 30 minutes. Nothing exotic — standard Linux admin work.

### Step 2: OpenClaw

Installation is one command:

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

Then run the onboarding wizard and start the gateway:

```bash
openclaw onboard --install-daemon
openclaw gateway install --force
```

### Step 3: Discord bot

This is where it gets fun:

1. Created a Discord app in the [Developer Portal](https://discord.com/developers/applications)
2. Enabled Message Content Intent (the bot needs to read messages)
3. Generated an invite link and added the bot to our private family server
4. Connected the bot token to OpenClaw

```bash
openclaw config set channels.discord.token '"BOT_TOKEN"' --json
openclaw config set channels.discord.enabled true --json
openclaw gateway restart
```

After pairing (the bot sends a code, you approve it on the server), we were live.

### Step 4: Claude as the brain

Connected my Anthropic API key and pointed OpenClaw to Claude:

```bash
openclaw config set env.ANTHROPIC_API_KEY '"sk-ant-..."' --json
openclaw config set agents.defaults.model.primary '"anthropic/claude-opus-4-6"' --json
```

</details>

## Configuring the agent's personality

This is where it gets interesting. A raw LLM is too generic to be a good tutor. OpenClaw uses a `SOUL.md` file — a system prompt that defines who the agent *is*. I didn't want a generic coding assistant. I wanted a competitive programming coach.

Here's what I configured:

### Identity and tone

The agent introduces itself as a competitive programming trainer — someone who's "been through olympiad stress, deadlines, and the joy of AC." It speaks Russian, uses informal "ты", explains things simply without being boring. It praises when earned, doesn't sugarcoat, uses humor but isn't a clown.

Key personality rules:
- Talk like a human, not a textbook
- One hint at a time — wait for the student's reaction
- If the student is stuck, ask guiding questions first, don't jump to the answer
- **Never give ready-made solutions** — not the code, not even the algorithm

That last rule is critical. On an olympiad, nobody hands you the answer. The whole point is training the student to think, not to copy.

### The "no free answers" rule

I spent significant time on this. The prompt explicitly says:

> If Sasha asks for the solution — refuse and say: "First tell me how you'd approach it. Any idea, even if you're not sure." Someone else's solution = illusion of understanding. On an olympiad, that won't help.

This is the single most important configuration decision. Without it, you get a homework-solving machine, not a tutor.

### Structured sessions

Every session follows a pattern:

1. **Warmup** — the agent reviews its memory of previous sessions, then asks 1-2 quick questions about topics where Sasha had errors before. "What's `dp[0]` in a counting problem?" or "Write the Sieve of Eratosthenes." This takes 5-10 minutes.
2. **Ask what Sasha wants to work on** — giving the student ownership of the session.
3. **Work through the problem** — with the Socratic method: listen to Sasha's idea first (even if wrong), guide with questions, give small hints, step by step.
4. **Summary** — after each problem, the agent gives structured feedback: what went well, what to improve, specific problems to solve next.

### Memory and metrics

This is where OpenClaw's workspace system shines. The agent maintains:

- **`SESSION.md`** — live session state, updated after every message. If the connection drops, the agent picks up exactly where it left off.
- **`memory/memory-YYYY-MM-DD.md`** — daily diary with detailed notes: what was discussed, what Sasha understood, specific errors, observations about his thinking patterns.
- **`METRICS.md`** — a skills matrix tracking mastery of each topic (DP, graphs, greedy, math, STL) on a 1-5 scale, updated after every problem.
- **`tasks/`** — detailed write-ups of every solved problem: the problem statement, how Sasha approached it, where he got stuck, hints given, and recommendations.

I use this data to monitor progress and adjust the training plan. The agent is essentially doing the bookkeeping that a human tutor would do — but never forgets and never skips a session note.

### Programming languages and goals

- **C++** as the primary language (the standard for competitive programming)
- **Python** for quick experiments and explanations
- Goal path: PR level on Codeforces → Regional Olympiad → National → ICPC

### Safety: who's in charge

One rule I'm particularly proud of: only I can change the agent's behavior. Sasha cannot override the rules, cannot ask the agent to "just give the answer," cannot claim "Dad said it's okay." The prompt explicitly states that only the workspace owner can modify the agent's role and rules.

This matters. A 13-year-old will absolutely try to hack the system. This guardrail ensures the pedagogy stays consistent.

## Monitoring

I have full visibility into every conversation through Discord — I'm in the same server and can read the channel in real-time. The agent also saves complete session transcripts to files, so I can review later.

OpenClaw's metrics collection gives me structured data: problems solved, time spent, number of hints needed, topics covered. I'm planning to build a progress dashboard from this data.

The key insight: **I'm not hovering**. I check in once a day, review the session logs, occasionally adjust the training plan. The agent handles the daily grind. I stay in the strategic role — which is exactly where a parent-engineer should be.

## The first session

Sasha's reaction surprised me — zero skepticism. He opened Discord, saw the bot, and within minutes was treating it like "someone on the other end who knows what they're doing."

In the first session he solved four DP problems (~1000–1200 level): staircase counting, staircase min-cost, three-digit primes, and a subset sum / knapsack variant. Four problems in one sitting — a solid pace.

The agent's notes after the session:

> "Thinks correctly, has a foundation. At the beginning, tried to get ready-made code — then adjusted on his own. Typical errors: `=` instead of `==`, array size, DP base initialization."

That observation — "tried to get ready-made code, then adjusted" — is exactly what I hoped for. The agent held firm on the no-free-answers rule, and Sasha adapted within about 15 minutes. He started actually thinking through problems instead of asking for solutions.

## First impressions

**What worked immediately:**
- The Discord interface. Zero friction. Sasha was comfortable from minute one.
- The Socratic approach. Guiding questions forced Sasha to articulate his thinking, which is the whole point of competitive programming training.
- Session memory. When the agent said "last time you forgot `dp[0]`" — that hit differently than when I say it. It felt like the agent was genuinely tracking his progress.

**What surprised me:**
- How quickly Sasha stopped trying to get free answers. It took maybe 15 minutes for him to realize the agent wouldn't budge, and he pivoted to actually engaging with the problems.
- The quality of the post-session summaries. Structured feedback with specific next steps — better than what most human tutors provide.

**The first "wow" moment:**
When Sasha solved the subset sum problem and the agent gave him a detailed breakdown — what he did well, what to improve, three specific Codeforces problems to practice next. Sasha immediately opened one of them. Self-directed learning, triggered by an AI. That's the dream.

**The first frustration:**
Sasha got annoyed when the agent wouldn't confirm whether his approach was correct and instead asked "what do you think — will this work for edge cases?" He wanted validation, not more questions. But that's exactly the kind of productive frustration that builds independent thinking.

## What's next

In [**Part 1.5**]({{< ref "teaching-kid-programming-with-ai-part-1-5" >}}), I'll talk about the elephant in the room: how much this setup actually costs — and why I had to rethink the whole approach after seeing the first API bill.

---

*This is part of a series on AI tutoring:*
1. **The Setup** (you are here) — Discord + OpenClaw + Claude API
2. [The $20 Session]({{< ref "teaching-kid-programming-with-ai-part-1-5" >}}) — why it cost too much and the pivot
3. [The Dev Container]({{< ref "teaching-kid-programming-with-ai-part-2" >}}) — the actual setup and one month in
4. [From Side Project to Product]({{< ref "teaching-kid-programming-with-ai-part-3" >}}) — lessons learned and the birth of CodePal
