---
title: "The Chasm No One Talks About"
date: 2026-05-06
draft: false
tags: ["ai", "agents", "agentic-engineering", "engineering-leadership", "hiring", "career", "claude"]
description: "AI dev tooling crossed a threshold in 2026. Some engineers quietly ship what used to take a team — and the market can't tell who they are. A two-sided look at the gap: developers facing a profession without a curriculum, and companies that can't recognize the practitioners they need."
ShowToc: true
---

> AI tooling in 2026 got too good — and that's not a win for everyone. It's a quiet split in the industry between people who rebuilt themselves around agents and everyone else. The unpleasant part: the split is invisible from the outside, and you can't hire your way across it.

## The thesis

A modern AI-first developer isn't someone who chats with Copilot and reviews diffs the agent produced "for them." It's someone who organizes their working environment through AI: managing multiple agents, MCP servers, data sources, agent execution environments, review loops, automation.

The role has shifted. The developer is closer to a platform engineer for their own AI stack than to a user of an IDE assistant.

## What's happening in the market

Hacker News produces a new senior thread every week — AI dev tooling has gotten too good. Cursor, Claude Code, Codex, agentic pipelines. Some engineers have FOMO. Some ignore it. Some have quietly rebuilt their workflow and now ship, alone, what used to require a team.

The role really is shifting. This is no longer a forecast — it's a fact.

And that creates a gap that hits both sides of the labor market: the people who have to acquire the role, and the people who have to find them.

## Side one: the developer and a new profession

What looks from outside like "leveling up an AI skill" is, in practice, learning a new profession on top of the old one. Not "another tool in the IDE" — a separate competency layer that classical SWE training doesn't cover.

What's in that layer:

- **Agent orchestration** — decomposing tasks across subagents, separating contexts, distributing roles and permissions
- **Context engineering** — what to load into context, what to evict, how to structure memory across sessions
- **Spec-driven workflow** — formulating tasks so the agent executes them deterministically, not "by guessing"
- **TDD through agents** — tests as a forcing function for correctness, not optional hygiene
- **Agent environments** — devcontainers, sandboxes, hooks, granular permissions, safe automation surfaces
- **MCP and data channels** — your own data sources, indices, integrations for specific tasks
- **Review loops and observability** — quality metrics for agent output, gates, observability, trust through measurement

Why this is genuinely a profession and not "a few new tricks":

1. **The stack changes weekly.** No textbook, no certification, no course. Knowledge is assembled from HN, Twitter, other people's configs, your own experiments. Anyone waiting for an "official curriculum" loses years.
2. **It's a cross-discipline.** SWE + systems thinking + intuition for LLM behavior + the skill of precise written formulation in natural language (a prompt or spec is a *linguistic* interface between you and the agent — designing it is closer to technical writing than to programming). None of these alone is enough.
3. **Identity resists.** Many strong engineers experience the shift as devaluation — "now any junior with an agent can do what I do." It's an emotional blocker, not a technical one, but it really does keep people from investing.
4. **The investment compounds.** A personal agent stack is the new dotfiles, the new vim config, a toolkit you polish over years. People who started three years ago are already on a different productivity curve, and you can't catch up in a sprint.

This adds up to a concrete problem for the developer: you're in a silent race where you can see neither competitors nor yourself relative to them. No course — only self-study. No certification — no one will confirm you're at the level. No benchmark — nothing to measure whether you're ahead or behind. And the hours you don't invest don't come back: the compound advantage of those who *are* investing accrues without you. From the outside everything looks fine — until one day the gap becomes visible, and at that point catching up no longer makes sense.

So the practical conclusion is: the only correct action is to enter the race now, without a map. The window is open. In 2–3 years the market will saturate with people who have real orchestration competence, the premium will collapse, and today's exotica will become tomorrow's baseline. Today — not yet.

## Side two: the recruiter and an impossible task

The mirror problem is on the hiring side. Recruiters need to learn to find people whose competence has no established patterns, signals, or examples — and to do so before the demand itself stabilizes.

The old signals are broken:

- **Resume**: "AI" listed under skills in 2026 is noise. As meaningless as "worked with the internet" was in 2005.
- **GitHub profile**: commits and stars show code, but they don't show how someone's `.claude/` is structured, what hooks they've installed, how their MCP stack is configured, how they decompose tasks across agents.
- **Live coding**: tests how the candidate writes code by hand — but that's exactly what should be automated for a real orchestrator. The test measures a skill that has stopped being critical.
- **References**: "they used AI" tells you nothing. Everyone used AI.

New signals exist, but they're unstable and not normalized:

- A public personal agent stack (configs, skills, custom subagents)
- Custom MCP servers or integrations
- Posts, talks, write-ups where you can see how the person thinks about agentic architecture
- The portfolio shifts from "code I wrote" to "systems I orchestrated"

But these signals:
- have no canonical form — every practitioner publishes their own way
- require expertise to read — a recruiter without their own practice can't tell a strong config from a cargo-cult one
- decay quickly — what was leading-edge six months ago is the baseline today

Why this is a uniquely hard recruiting problem:

1. **Pattern recognition requires established patterns.** They don't exist yet. Recruiting is by nature a lagging indicator of role evolution, usually by 3–5 years. Here that window has to compress to months.
2. **Expert-in-the-loop is required, but unavailable.** To read the new signals, you need a practitioner inside the hiring loop. But those practitioners are the most overloaded and the least willing to sit on interviews.
3. **The meta-trap.** Recruiters are starting to use LLMs to screen candidates for AI orchestration. A weak signal-detector multiplied by an agent that also doesn't know what to look for produces negative value.
4. **Outsourced agencies lag even further.** Their economics depend on repeatable patterns and stable demand. Here you have neither.

And from this comes the typical company misdiagnosis. When leadership finally acknowledges the capability gap, the most common reaction is: "we'll buy everyone Cursor/Copilot licenses." But the problem isn't the tool. A license without process redesign yields +5% productivity where the right setup yields 5x. And the right setup can't be bought — it can only be hired or grown, and both options run into the same recognition problem.

## Synthesis: both sides hit the same wall

On both sides, the underlying problem is the same: **the field outpaces its own legible artifacts.**

- The developer has no textbook to learn from. Only practice, running ahead of any formalization.
- The recruiter has no pattern to recognize by. Only signals not yet hardened into a standard.
- The company has no process to integrate into. Only experiments to run in parallel with production work.

This is the typical phase of a new profession being born — early web developers went through it in the 90s, DevOps in the 2010s, ML engineers around 2015. The difference is that the cycle has compressed: what took those earlier roles a decade is happening here in two or three years, because both the tools and the practices evolve faster.

In this transitional window, what wins is pairs:

- **Developers who publish their practice.** Not "teaching AI," but making their stack visible: configs, write-ups, custom subagents, MCP servers, posts about how they think about a task. That's the new CV — and a contribution to the very patterns that don't yet exist.
- **Companies that hire on demonstrated practice, not credentials.** They put practitioners in the hiring loop. They run short paid trials instead of classical interviews. They grow people internally faster than they try to hire externally.

Anyone waiting for things to settle — developers and companies alike — misses the window. Developers wait for an "official program" and lose compounding time. Companies wait for "proven hiring patterns" and either hire the wrong people fast or hire no one at all.

The paradox of this phase is that the normal institutions — education, certification, recruiting — are designed to work with already-stabilized roles. The winners here are those who act *before* stabilization. Which is to say, those who can take uncertainty as a working medium rather than an obstacle.

That, fundamentally, is the main new skill — for both sides at once.

## A guide to action

If you accept that the gap is real and the window is open now, theoretical clarity is useless without action. Below are two checklists — one for developers, one for companies. They don't claim completeness, but if not a single item is done, the gap is definitely growing.

### If you're a developer

**To do this month:**
- Set up your own `.claude/` (or equivalent in any other agentic stack) — even a minimal one. CLAUDE.md, one slash command, one hook for your typical workflow. Daily contact with your own config, by itself, changes how you think.
- Spend an hour a day sitting next to your agent and **observing, not rushing**. Without this, intuition for model behavior doesn't develop — and that's an axis you can't close by reading.
- Look at recommended configs from the best people in the industry — for example, Boris Cherny (creator of Claude Code at Anthropic) and other engineers who publicly share their agentic workflow. This gives you a benchmark — what counts as "the level."
- Read 2–3 other people's public configs (`.claude/`, dotfiles, skills). Don't copy — watch how the person thinks about a task.

**To do in the next 3 months:**
- Write at least one custom MCP server, or at least one custom data integration into your stack. The "I'm just a user" boundary disappears only after this step.
- Convert one real work task into spec-driven format: write the spec → run the agent → automated check → iterate. At least one task, end-to-end.
- Publish one thing — a post, a write-up, a config repo. It's both an exercise for yourself (you can't write about what you haven't understood) and a market signal.

**Mindsets the checklist needs to actually work:**

- **Don't wait for an "official program."** The temptation to wait for a structured course or certification is strong — it feels like the responsible move. But by the time something official appears, the field will have moved another 2–3 generations, and people who learned messily and now will already be on compound. There is no "right way to learn"; there is only "started in time."
- **Don't cling to the identity "I write code with my hands."** The deepest resistance is identity-based: many strong developers feel that writing code by hand *is* what makes them a developer, and pushing that layer aside feels like being devalued. But the craft hasn't disappeared — it's moved up a level: from writing code to designing what the agent will write, to deciding what's good, to building the system that ensures correctness. The taste, the judgment, the architecture — all still you.
- **Treat your personal stack as a long-term investment.** Every hook, subagent, skill compounds on top of the previous ones, and in two years the difference vs. a "casual agent user" is not +20% — it's a multiple. Which means: don't dismiss tinkering with your config as "not real work." Those are the hours with the longest payoff, and the missed ones don't come back.

### If you're a company

**To do this quarter:**
- Put at least one practitioner-orchestrator in the hiring loop. Without that, no one can read the new signals, and any candidate funnel becomes noise.
- Stop measuring AI adoption by license counts. Replace it with: what fraction of work actually flows through an end-to-end agentic pipeline, what processes have been redesigned around it.
- Run one real paid trial instead of a classical interview — short task, a week of work, paid, and watch how the person *orchestrates*, not how they write code by hand.

**To do in the next six months:**
- Find 1–2 people inside the team who have already quietly rebuilt themselves (they exist, they just don't broadcast it) and officially give them the mandate to pull others along. Internal migration is cheaper and faster than hiring.
- Redesign at least one production process around an agentic pipeline with a review loop. Not "deploy a tool" — **change the process.** Without that, +5% is your ceiling.
- Acknowledge that part of the current team won't make the jump. It's not their fault — it's the phase the industry is in. Give them an honest choice: learn or migrate to roles where the old skills remain critical.

**Mindsets the checklist needs to actually work:**

- **Budget doesn't decide.** Money thrown at the problem — consultants, licenses, corporate trainings — does nothing if there isn't at least one real practitioner inside who can read the work and set the bar. Without that internal anchor, the budget goes into theater: workshops, "AI champions" with no depth, reports for the board. The practitioner inside is the multiplier; budget is just an enabler.
- **A license isn't a process.** A Cursor / Copilot / Claude license is the easy purchase that lets leadership claim "we adopted AI." But the productivity multiplier comes not from the tool but from redesigning how the work itself is structured around the agent: spec-driven task format, automated review loops, decomposition across subagents, MCP integrations with internal data. None of that comes with the license — all of it has to be built. Companies that confuse the purchase with the transformation get +5% and wonder where the promised 5x went.
- **The good signals exist, but only people who can build them themselves can read them.** Someone's `.claude/` structure, the way they decompose tasks, the review loops they've built — these are perfectly readable, but only by someone who has built the same things. Without an expert in the hiring loop, the company systematically misses the right people and picks the loud ones. The cost of HR-led screening is invisible: you don't see the people you didn't hire, or the wrong hires you made.

## What's next

This is the first article of two. Here I've fixed in place that the gap exists and why it's so hard to close. In the second I take the reverse side: **which existing roles have the best starting kit** for transforming into an *Agentic solo engineer*, what blind spots each role has, and what to develop first. Spoiler: the "obvious answer" (platform engineer) is half right — and the half it gets right matters more than you think.

→ [Crossing the Chasm: Who Becomes an Agentic Solo Engineer](/posts/crossing-the-chasm-agentic-solo-engineer/)
