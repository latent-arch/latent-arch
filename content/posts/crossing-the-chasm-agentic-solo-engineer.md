---
title: "Crossing the Chasm: Who Becomes an Agentic Solo Engineer"
date: 2026-05-10
draft: false
tags: ["ai", "agents", "agentic-engineering", "engineering-leadership", "platform-engineering", "career", "claude"]
description: "An honest look at which existing roles transform best into Agentic solo engineers, the four competency axes that define the role, and a week-by-week plan for the two strongest starting backgrounds. Plus the one thing background can't predict."
ShowToc: true
---

## Linking back

In the [previous article](/posts/the-chasm-no-one-talks-about/) I fixed in place two things: the role of the *Agentic solo engineer* is a full new profession, not "a skill on top," and the market by and large can neither acquire it nor recognize it. The natural next question: OK, which existing roles have the best starting kit to become the engineer who alone ships what used to take a team?

The obvious answer suggests itself — the platform engineer. They already have orchestration, observability, config-driven workflow, security boundaries, all in muscle memory. Sounds reasonable. But honestly broken down, the answer is more complicated: the platform engineer is strong only on certain layers of agentic work, and several other roles have equally strong starts on different axes.

To avoid arguing by taste, we need a shared frame.

## The four axes of competence for an Agentic solo engineer

Under the hood, this role has four distinct layers, each demanding a separate skill. Strong on all four is rare. Your starting background usually gives you an edge on one or two; the rest you have to build deliberately.

1. **Infrastructure and orchestration.** Stack assembly: subagents, MCP servers, hooks, skills, granular permissions, sandbox environments, observability of agent output. This is "the platform for one user" that the engineer builds for themselves.
2. **Intuition for model behavior.** When to decompose, when to switch models, when to give chain-of-thought, when an agent is going off the rails and needs to be stopped. Accumulates only through hours of watching LLMs at work.
3. **Spec and prompt design.** The linguistic interface to the agent. The skill of formulating a task so the model executes it deterministically rather than guessing. Closer to technical writing and product design than to programming.
4. **Code taste at the application level.** The ability to read agent output instantly and see: an abstraction is leaking, the boundary is wrong, this fixes the symptom not the cause. Without this layer, all the orchestration in the world produces fast low-quality work.

Plus a cross-cutting meta-skill, not tied to any single axis but determining everything: **iteration tempo.** Willingness to live in "tried — observed — reformulated" mode rather than "designed — implemented — maintained."

Now, by role.

## Platform engineer

**Starting position.** Very strong on axis 1 (infrastructure). Systems thinking, orchestration experience, observability as reflex, native fluency in permissions and sandboxes, comfort with declarative configs. When given `.claude/`, MCP servers, and hooks — they're not in shock; they recognize the landscape.

**Where they're weaker.** Axes 2 and 3 — near-zero starting bonus. The platform engineer is used to deterministic systems, and their reflex against instability is "add more constraints." With LLMs that's often the losing strategy. Prompt design as a craft is usually undeveloped.

**The main risk.** Transferring platform thinking where it doesn't apply. Trying to pin agent behavior through contracts instead of reformulating the task. Over-architecting the stack before understanding what's even needed from the agents.

**A short development path (one recommendation per week):**

- **Week 1.** An hour a day — observation, not configuration. Run an agent on a real task and watch *how* it does it: what it understood, where it stumbled, how it recovered. Don't rush, don't intervene early. Goal — develop a baseline of axis-2 intuition you don't have.
- **Week 2.** Take a strong system prompt from someone else (for example, a published Claude Code or agent-framework system prompt) — read it line by line, understand *why* every phrase is there. Then write your own prompt for one typical task. Rewrite it three times, running and comparing the behavior each time.
- **Week 3.** Take one real work task and reformulate it **five times in a row**, running the agent each time. Note what in the formulation actually moves the result. This exercise breaks the platform reflex of "design once, design well" and grows the tempo of micro-iteration.
- **Week 4.** Plug your first custom MCP server or non-standard hook into the stack — something that doesn't make things "more reliable" but the opposite: gives the agent more access to data or to the environment. Goal — flip the instinct from "constrain" to "extend," while keeping hygiene.

**And then — the big strategic investment.** Build a full review loop over agent output with measurable quality: automated gates, metrics, trace logs, regular review of what passed. This is your natural advantage (axis 1 + observability) applied to a new object. This is where you stop being "a platform engineer who uses agents" and become the actual Agentic solo engineer whose infra instinct works on a new material.

## Senior product engineer

**Starting position.** Strong on axis 4 (code taste — your main asset) and often on axis 3 (the ability to formulate requirements and to tell what matters in a task from what doesn't). You feel the productivity gain from agents most viscerally — because the agent is working on your home turf, not in infrastructure.

**Where you're weaker.** Axis 1 — usually a soft spot. Senior product engineers rarely went deep into infra, orchestration, or declarative configs. Axis 2 — zero starting bonus, like everyone except ML people.

**The main risk.** Staying at the level of "advanced Cursor user." Using the agent as smart autocomplete without moving up a layer to orchestration, custom MCP, automation of review loops. It's the most common "stuck in a local maximum" scenario.

**A short development path (one recommendation per week):**

- **Week 1.** Set up your own `.claude/` (or equivalent). A CLAUDE.md for the current project, one slash command for your repeating ritual, one simple hook. Not "right" — yours. Goal — cross the psychological barrier "infra is not my thing."
- **Week 2.** Write one custom hook for a real workflow. For example: auto-run tests after every change, auto-load logs into agent context when debugging, auto-commit with a message template. First contact with declarative configs as a normal tool.
- **Week 3.** Connect or write one MCP server. Can be trivial — a wrapper around your internal API, access to JIRA/Linear, to a local database. This is where the main shift happens: you become someone who **extends** the agent, not someone who uses it.
- **Week 4.** An hour a day observing the model, the same as week 1 for the platform engineer. This is your bottleneck: zero axis-2 intuition. Until you accumulate it, you won't understand *why* the agent sometimes works brilliantly and sometimes stumbles.

**And then — the big strategic investment.** Build a pipeline that decomposes a typical task across several subagents with different roles (planner → implementer → reviewer → integrator). This is the application of your strongest skill (product judgment about what matters in a task) to agent orchestration. From this point you're no longer "a product engineer who uses AI" — you're a full Agentic solo engineer whose agent team works in your rhythm.

## Tech lead with strong spec discipline

**Starting position.** Strong on axis 3 (writing specs, breaking tasks into executable chunks, formulating definitions of done). This is the most underrated starting kit — because spec-driven workflow lands on agents as native. Often moderately strong on axis 4 if they kept their hands in the code.

**Where they're weaker.** Axis 1 — depends on history. If the tech lead drifted into management long ago, infra instincts have atrophied. Axis 2 — no starting bonus.

**The main risk.** Delegating to the agent the same way they delegated to junior developers — and missing that the agent demands a different kind of verification. A junior you can check via PR review; an agent you have to check via an automated review loop, otherwise the speed is lost.

**What to develop first:**
- Get your hands back in code if you've been away. Without fresh code taste, all the other skills are useless.
- Infrastructure layer — the stack, MCP, hooks. From scratch it's intimidating, but tech leads with spec discipline pick this layer up faster than anyone, because the architectural thinking is already there.
- Tempo of micro-iteration. The managerial habit of "weekly sync" contradicts the rhythm of working with an agent.

## Honorable mentions

These roles didn't make the main breakdown, each has its own incomplete but interesting starting kit. Worth keeping in mind, especially if you're in one of them or assembling a mixed-background team.

- **ML / MLOps engineer.** The strongest intuition on axis 2 (model behavior) — they have more of it than anyone. Plus pipelines and experiments on axis 1. Weak zone — axis 4: a lot of time spent in notebooks and pipeline code that wasn't optimized for product reading. Main risk: approaching agentic work as an ML project — experiments for the sake of experiments, no production-quality output. What to develop: code taste outside ML code, product integration, the experience of shipping a feature to a user end-to-end.
- **Data engineer.** Strong on axis 1 (pipelines, data contracts, idempotency) and partially on axis 2 (used to dirty, probabilistic data). Weaker on 3 and 4. Main risk: reducing agentic work to an ETL task — building a perfect pipeline around the agent and missing that the agent's output requires a different kind of evaluation than data quality checks. What to develop: prompt design as a linguistic skill (not "another contract"), code taste in the product domain.
- **Game developer.** Often an underrated candidate: years of working with stochastic AI (NPCs, procedural generation), no shock at "the model behaves differently in identical conditions." Good seed on axis 2 and part of axis 4 (gamedev is a school of hard engineering discipline in product code). What to develop: axis 1 (agentic infra is a different genre than a game engine) and axis 3 (prompt design).
- **QA engineer with automation experience.** Strong on axis 1 (test infra, review loops, automation frameworks) and partially on axis 4 (eye for where the code is brittle). Main edge — innate "don't trust without verification" discipline, which is critical for working with agents. What to develop: axes 2 and 3, plus moving from the "checker" role into the "builder" role.
- **Technical writer.** The most unusual candidate, but potentially one of the strongest on axis 3 (formulation, language precision, sensitivity to ambiguity — exactly what prompt design needs). Obvious weak zones: axes 1 and 4. If the writer has an engineering background, conversion into Agentic solo engineer can be faster than for many senior developers, because the main new discipline (formulating so the agent understands) is their profession.

## Summary table

| Role | Strong on axes | Weaker on axes | Main risk |
|---|---|---|---|
| **Platform engineer** | 1 | 2, 3 | Transferring determinism where it doesn't apply |
| **Senior product engineer** | 4, partly 3 | 1 | Staying at the "advanced Cursor" level |
| **Tech lead with spec discipline** | 3, partly 4 | 1 (depends) | Delegating to the agent like to a junior |
| ML / MLOps engineer | 2, partly 1 | 4 | Experiments for the sake of experiments |
| Data engineer | 1, partly 2 | 3, 4 | Reducing to an ETL task |
| Game developer | 2, partly 4 | 1, 3 | Treating the agent as an NPC |
| QA automation engineer | 1, partly 4 | 2, 3 | Staying in the "checker" role |
| Technical writer | 3 | 1, 4 | Without an engineering background — never getting there |

## What everyone needs, regardless of background

Several things don't transfer from any starting competency — they have to be built by everyone:

- **Hours under the hood.** No background substitutes for real time spent watching agents execute tasks. It's the only way to grow axis 2.
- **A personal public stack.** Your own `.claude/` or equivalent, visible from outside. Both a working tool and a CV for the new era (see the [previous article](/posts/the-chasm-no-one-talks-about/) on the hiring gap).
- **Taste for micro-iteration.** Willingness to reformulate a task five times in an hour without suffering. This shifts habits ground in over years of project work.
- **The discipline of not trusting the agent by default.** Not "well, it did it, I'll look later" — but review loops, tests, gates, measurable quality. Without that, scaling output turns into scaling bugs.

## Personal case

Since the whole article is about roles — honestly, where I came from. My starting role is platform engineer. And the first thing I learned diving into the agentic stack: **the landscape recognition is real**. Hooks, permissions, observability, declarative configs — none of this was a new mental model. `.claude/` felt like another tool of the same class as k8s manifests or Terraform modules. Axis 1 actually works.

A parallel experience in product engineering — at high-level rather than daily code, but enough to read architectural decisions and look at someone else's code through a product lens — gave me a partial buffer on axis 4. Not what a senior product engineer has after years of polishing taste in one domain, but enough not to miss obvious leaks.

What I had to build from scratch: two things. **Axis 2 (intuition for models)** turned out to be exactly what I underestimated at the start. Hours of observing how the agent actually works, not just its final output — no background substitutes for that. And **axis 3 (prompt design)** — that was the most painful shift. The platform instinct of "formalize through contract" categorically does not work with a linguistic interface. I literally had to relearn: think of the prompt as text that has a specific reader, not as a spec a machine has to execute.

This is to say: the analysis above isn't an abstract model. I'm walking roughly the path I'm describing for the platform engineer, with a partial bonus on axis 4 from the product side. And I can say the "by week" plan above is roughly what would have worked for me had I been starting again and known where I was going to stumble.

## The main predictor — not background, but adaptation metabolism

Your starting kit defines the first six months. After that its influence dilutes fast. Over the long run, what wins isn't the "right" background but a high adaptation rate to a shifting stack.

A platform engineer clinging to determinism will lose to a junior who lives easily in uncertainty. A senior product engineer who refuses to learn infra will lose to an ML engineer who sat down and figured out product code in a month. A tech lead who never returned to the keyboard stays a spectator.

That's what explains why the market looks so fractured right now. It's not "some roles are better than others" — it's "inside every role, 5–10% of people have the right metabolism, and they're the ones becoming the Agentic solo engineers who alone ship what teams used to ship." Background predicts which trajectory someone takes toward AI-first, not whether they get there at all.

The good news: adaptation metabolism isn't innate. It's a habit you can train. The bad news: you should have started training it yesterday.
