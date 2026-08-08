---
title: "Teaching My Kid Programming with AI — Part 1.5: The $20 Session"
date: 2026-03-01
draft: false
tags: ["ai", "education", "parenting", "claude", "cost"]
description: "One tutoring session cost $20 in API fees. Here's why, and what I'm doing about it."
ShowToc: true
---

## The bill

After the first few tutoring sessions ([described in Part 1]({{< ref "teaching-kid-programming-with-ai-part-1" >}})), I checked my Anthropic dashboard.

One session — about 40 minutes of back-and-forth between Sasha and the AI tutor — cost roughly **$20**.

Let that sink in. Twenty dollars for a single practice session. At daily use, that's $600/month. More than a live human tutor would charge.

I knew the API wasn't free, but I expected maybe $2–3 per session. Not $20.

## Why so expensive?

I see two possible explanations, and it's probably a mix of both.

**The agent might be inefficient.** OpenClaw runs an agentic loop — it reads workspace files, updates session state, writes memory after each exchange. Every tool call, every file read, every memory write adds tokens to the context. The agent's `SOUL.md` alone is substantial, and it gets sent with every single API call. Add session history, the skills matrix, problem write-ups — the context balloons fast.

**But the bigger issue is architectural.** Interactive tutoring is the worst-case scenario for LLM API pricing. A typical session has 30–50 short exchanges. Each message sends the *entire* conversation history plus system prompt plus tool results. Early messages are cheap, but by message 40, you're sending tens of thousands of tokens just to add a one-line student response. The cost curve isn't linear — it's closer to quadratic.

For batch tasks — "summarize this document," "review this code" — API pricing makes sense. For a real-time conversation that lasts an hour? The math doesn't work.

## The subscription loophole that isn't

My first thought: "I have a Claude Max subscription. Can I route OpenClaw through that?"

Short answer: **no.**

Claude subscriptions (Pro, Max) are for Anthropic's own apps — claude.ai, Claude Code, the mobile apps. The [terms of service](https://www.anthropic.com/terms) explicitly prohibit using subscription access through third-party clients or gateways. OpenClaw uses the API, and the API requires separate pay-per-token billing.

This isn't a technical limitation — it's a policy one. And it makes sense from Anthropic's perspective: subscriptions are priced for human-speed interaction through their apps, not for automated agent loops that can burn through tokens at machine speed.

So the Max plan I'm already paying for can't help here. The API bill is separate and non-negotiable.

## Plan B: the dev container

If I can't bring the subscription to my agent, I need to bring my agent to the subscription.

**Claude Code** — Anthropic's official CLI tool — *is* covered by the Max subscription. It runs in a terminal, has agentic capabilities (file reading, writing, multi-step reasoning), and can be configured with custom system prompts. Sound familiar?

The idea: recreate the tutor setup inside a **VSCode dev container**. The pieces:

- **VSCode** as the interface — not Discord, but Sasha can handle it. It's also a better environment for actual coding.
- **Claude Code** as the AI agent — running under my Max subscription, no per-token API costs.
- **Dev container** — a reproducible, isolated environment with all the tools pre-configured. C++ compiler, Python, problem templates — everything ready to go.
- **Multi-agent configuration** — Claude Code supports spawning sub-agents with different roles. I can potentially have a tutor agent and a code review agent working together.

The tradeoff seems obvious: Discord chat vs. a CLI in a terminal. But Sasha has been using VSCode for a while now — it's already his daily tool. Moving from Discord to Claude Code running in VSCode's integrated terminal isn't a downgrade, it's a lateral move. And the cost difference — $0 vs $600/month — makes it a no-brainer.

I've been prototyping this setup. It's not fully baked yet, but it's promising.

## What's next

In [**Part 2**]({{< ref "teaching-kid-programming-with-ai-part-2" >}}), I walk through the dev container setup in detail: how I ported the tutor's personality and memory system, and whether VSCode works as a tutoring interface for a 13-year-old.

---

*This is Part 1.5 of a series on AI tutoring:*
1. [The Setup]({{< ref "teaching-kid-programming-with-ai-part-1" >}}) — Discord + OpenClaw + Claude API
2. **The $20 Session** (you are here) — why it cost too much and the pivot
3. [The Dev Container]({{< ref "teaching-kid-programming-with-ai-part-2" >}}) — the actual setup and one month in
4. [From Side Project to Product]({{< ref "teaching-kid-programming-with-ai-part-3" >}}) — lessons learned and the birth of CodePal
