---
title: "Teaching My Kid Programming with AI — Part 3: From Side Project to Product"
date: 2026-04-27
draft: false
tags: ["ai", "education", "competitive-programming", "claude", "codepal", "product"]
description: "What three months of AI tutoring taught me about pedagogy, LLM limitations, and why I turned a personal experiment into a product."
ShowToc: true
---

## What I promised

In [Part 2]({{< ref "teaching-kid-programming-with-ai-part-2" >}}) I said I'd write about tutoring mechanics, session structure, and what happens when the AI is wrong. I will — but the story took a turn I didn't expect, and that's what this post is really about.

Three months of running an AI tutor for competitive programming taught me things I couldn't have learned any other way. Some confirmed my assumptions. Others broke them. And eventually, the whole experiment stopped being a side project and became something else entirely.

## The tutoring mechanics that worked

After iterating on the CLAUDE.md configuration across dozens of sessions, a few patterns proved consistently effective.

**The warmup ritual matters more than the main problem.** Every session starts with 1–2 quick questions about previous mistakes. "What's the base case for counting paths in a grid?" or "Write a BFS template from memory." This takes five minutes but does two things: it activates recall (spaced repetition, essentially), and it gives the agent a signal about the student's current state. If the warmup goes poorly, the agent dials back difficulty for the session. This adaptive behavior emerged naturally from the Socratic prompt — I didn't explicitly program it.

**One hint at a time, then wait.** The most important prompting rule. When a student is stuck, the instinct (human or AI) is to explain the full solution path. The agent is instructed to give exactly one nudge — "What if the array were sorted?" or "Think about what happens when n equals 1" — and then stop. Wait for a response. This feels painfully slow, but it's where the actual learning happens. The student has to sit with the discomfort and think.

**Post-session summaries drive the next session.** After each problem, the agent writes structured notes: what the student did well, specific errors, and 2–3 recommended problems. These notes persist in memory and become the starting point for the next session. Over time, this creates a feedback loop — the agent's recommendations get more targeted as it accumulates data about weak spots.

## When the AI was wrong

This happened more than I expected, and it's worth documenting honestly.

**Competitive programming has edge cases that trip up LLMs.** Claude is excellent at explaining algorithms conceptually. But when debugging a specific solution to a Codeforces problem — especially one with tricky constraints or non-obvious edge cases — it sometimes confidently suggests a fix that doesn't actually work. On two occasions, the agent spent 15+ minutes guiding the student down a wrong path before I intervened.

The failure mode is subtle: the agent doesn't say "I don't know." It says "try changing your loop bound from `n` to `n-1`" with the same confidence whether it's right or wrong. For an adult engineer, this is fine — you verify and move on. For a student who trusts the tutor, it's confusing.

**My solution: teach the student to verify, not trust.** I added a rule to the prompt: after every suggested fix, the agent must say "Test this with [specific input] — does it give the expected output?" This forces the student to run the code rather than blindly accept the fix. It also models a critical competitive programming skill: never submit without testing edge cases.

**The deeper lesson:** AI tutoring works best when the student treats the agent as a sparring partner, not an oracle. The errors are actually pedagogically useful — they teach the student that authority figures can be wrong, and that the only reliable source of truth is the judge's verdict.

## The pattern I couldn't ignore

Around month two, something shifted in how I was thinking about this project.

I'd been sharing the setup with other parents in Sasha's competitive programming circle. The reaction was always the same: "This is amazing. I could never set this up."

And they were right. My setup required:
- A Linux VPS or a working Docker installation
- Comfort with terminal, SSH, and devcontainers
- A Claude Max subscription ($200/month plan)
- The ability to write and iterate on a 2000-word system prompt
- Ongoing monitoring and configuration tweaks

I'm a software architect with 20 years of experience. This is a Tuesday afternoon for me. For a parent who just wants their kid to practice algorithms between weekly lessons? It's a wall.

The demand was obvious. The solution — an AI competitive programming tutor — clearly worked. The barrier was purely technical.

## Building CodePal

So I built [CodePal](https://codepal.ru/?utm_source=latent-arch&utm_medium=blog&utm_campaign=teaching-kid-programming-part-3).

The idea: take everything I learned from three months of AI tutoring and package it into a web platform that anyone can use. No server setup, no Docker, no system prompts — just open a browser and start a session.

The core principles carried over directly:

- **Socratic method** — the tutor asks guiding questions, never gives solutions
- **Session memory** — the system remembers progress across sessions and adapts
- **Built-in code editor** — C++ and Python, runs in the browser, no local setup needed
- **Contest-focused training** — aligned with Codeforces, ICPC, and olympiad problem formats

What changed is everything around those principles. The architecture is completely different — a Next.js frontend instead of a terminal, server-side infrastructure instead of a local devcontainer, multi-model backend (Claude for premium sessions, GPT-5 for the base tier) instead of a single API key in my config file.

The pricing model was the hardest part. My whole journey started because API costs were unsustainable at $20/session. CodePal sessions cost a fraction of that on the backend, thanks to aggressive context management, prompt caching, and model routing. The savings get passed through — a subscription costs less than a single session did in my original setup.

## What got lost, what got better

**Lost:** the raw flexibility of a devcontainer. In my personal setup, I could change the tutor's personality on a whim, add new memory fields, tweak session structure mid-conversation. CodePal users get a curated experience — better for most people, but less hackable.

**Better:** onboarding. Sasha's setup took me an hour (and I'm the one who built it). A CodePal session starts in 30 seconds. For the target audience — students and parents who want a competitive programming tutor without infrastructure work — this is the only metric that matters.

**Better:** the feedback loop. With hundreds of sessions across multiple students, the tutoring mechanics improve faster than they did with a single user. Patterns that took me weeks to notice in Sasha's sessions become visible in days across a cohort.

## The uncomfortable question

Is this just another AI wrapper? A thin skin over an API call?

I thought about this a lot. Here's my honest answer: the value isn't in the API call. It's in the pedagogical framework built on top of it. A raw Claude conversation about competitive programming is mediocre — it either gives away answers or meanders without structure. The Socratic session framework, the memory system, the warmup mechanics, the "never give the answer" discipline — that's three months of iteration with a real student, and it's what makes the tutoring actually work.

Whether that's enough to build a business on is a different question. But it's not a wrapper.

## What's next

This is the last post in the "Teaching My Kid Programming with AI" series — at least in its current form. The experiment succeeded beyond what I expected: Sasha's Codeforces rating has meaningfully improved, he's training daily without me nagging, and the whole thing turned into a product.

I'll be posting updates on CodePal's progress separately — how the platform evolves, what I learn from a broader user base, and whether the pedagogical principles that worked for one student generalize to many. I also plan to revisit the tutoring mechanics in depth — things like optimal session length, which Socratic patterns actually move the needle, how different students respond to the "no free answers" rule — once there's enough real-user data to draw meaningful conclusions rather than anecdotes from a sample size of one. If you're interested in competitive programming, AI tutoring, or just want to see how a side project turns into a product, stay tuned.

You can try CodePal at [codepal.ru](https://codepal.ru/?utm_source=latent-arch&utm_medium=blog&utm_campaign=teaching-kid-programming-part-3) — there's a free tier to see if the approach works for you.

---

*This was a series on AI tutoring for competitive programming:*
1. [The Setup]({{< ref "teaching-kid-programming-with-ai-part-1" >}}) — Discord + OpenClaw + Claude API
2. [The $20 Session]({{< ref "teaching-kid-programming-with-ai-part-1-5" >}}) — why it cost too much and the pivot
3. [The Dev Container]({{< ref "teaching-kid-programming-with-ai-part-2" >}}) — VSCode + Claude Code + zero API costs
4. **From Side Project to Product** (you are here) — lessons learned and the birth of CodePal
