---
title: "Zombie Team. Leave Now."
date: 2026-05-18
draft: false
tags: ["ai", "agents", "engineering-leadership", "management", "career", "ai-native", "team"]
description: "Some management teams are formally alive — meetings, plans, approvals — and functionally dead. In 2026, with the industry rewiring around AI-native and an economic crunch on top, that's no longer 'inefficient' — it's a 12-month trajectory to bankruptcy. Eight signs from one planning meeting, the contrast with a live team, and what to do if you're on one."
ShowToc: true
---

A C-level friend caught me right after his extended planning meeting — CEO, his C-level peers, and the directors reporting under each. He said:

> Some management teams are formally alive — they show up to planning, they approve, they plan, they sign off. But they're zombies. Twenty-year-old thinking, twenty-year-old technologies, interaction patterns from the waterfall era. They keep moving by inertia, they perform the rituals of transformation, but they can no longer make 2026-grade decisions or evaluate people against criteria that matter today.

He said it as a diagnosis of his team. I want to push it further, because in 2026 this stops being one team's problem and becomes a question of business survival.

A business that, in the unstable economy of 2026, keeps running on the 2023 paradigm — waterfall, scrum-imitation, ticket-driven work, hand-written code, manual reviews, sprint-as-release-unit — won't merely fall behind. It goes bankrupt. The competitor on an AI-native stack ships a feature in a day where you ship in a sprint, validates a product hypothesis in a week where you take a quarter, runs a fraction of your headcount for the same revenue. The new IT business of 2026 stands on two legs: **effective product thinking** (metrics from live users, hypotheses with success criteria, decisions by data) and **the AI-native engineering stack** (agent orchestration, spec-as-code, day-cycle releases, security through attacking agents). A zombie management team has neither. That's why it's a zombie.

## What he saw on the planning meeting

He caught himself realizing that for every discussion he had something to say — and didn't want to say a word. His own read: he's already mentally gone.

What's happening on the team:

1. **Managers with no experience in modern development** — sometimes no experience in development at all. They manage what they've never done.
2. **A new idea gets routed to the weakest manager** still operating in waterfall, even as the company formally declares a product-model transition. The idea dies, or mutates into a six-month project with no horizon.
3. **Discussion of how long a refactor will take → followed by taking on another project.** No link between "we don't have hands" and "let's take more." Planning isn't from capacity.
4. **Nobody shows initiative.** Everyone waits to be told.
5. **The CEO assigns tasks over the C-levels' heads** — directly two levels down. C-level finds out after. The hierarchy is decorative.
6. **Democratic CEO meets total silence.** "It'd be good to solve problem X" — and nobody picks it up. A democratic style only works on an initiative-driven team; on this one it's a black hole.
7. **Every cross-functional task becomes a debate about ownership zones.** Two modes: genuine confusion (nobody knows where the lines are) and deliberate stalling (while we negotiate ownership, the deadline becomes someone else's problem). Both look like discussion. Both are refusal-to-work without an explicit "no."
8. **Toxic communication.** Personal jabs, passive aggression, dismissing ideas before they're finished. It's not "tough engineering culture" — it's the defense mechanism of people without substantive arguments. Side effect: nobody brings raw thinking to the table, and initiative (#4) dies at the reflex level.

Each in isolation is tolerable. All eight on the same meeting is a zombie team. The specific items will differ team to team — back-channel decisions, fear of showing prod metrics, ritual retrospectives. The point isn't the list. The point is the **moment**: a harsh industry rewrite toward AI-native, plus an economic crunch. In stable years a zombie team lives for decades on cash and inertia. In 2026 the cushion is gone.

## What a live team looks like

Two branches of markers, one per leg of the 2026 business model. Readable in an hour: one planning meeting, one demo, one way of stating a goal.

### Branch 1: product-driven, initiative-based building

1. **Owns the outcome, not the tickets.** There's a business metric — activation, retention, segment revenue — the team personally answers for.
2. **Hypothesis with a success criterion BEFORE work starts.** "If conversion doesn't lift Y% in two weeks, roll back." Not "let's build and see."
3. **Top-down goals are directions, not tasks.** "Where we aim this quarter"; *how* is up to the team. On a zombie team, "goals" arrive as specs disguised as goals.
4. **Initiative is the work itself.** See it → take it. Prototype, user call, experiment — within a day. On a live team, the *lack* of initiative is what's punished.
5. **Decisions by data, not by status.** A junior with data outranks a director with an opinion — and that's normal.
6. **End-to-end teams.** Product, engineer, designer, analyst in one harness from hypothesis to prod. No handoffs between "departments."
7. **Engineers talk to users directly.** Not "the PM told us at planning." An engineer who hasn't seen a user with their own eyes doesn't make product decisions.

### Branch 2: AI-native engineering stack

I saw a list like this on a blog recently and the points landed for me — they line up with what I watch filter Staff AI-native candidates at the Berlin bar (€150k all-in, Series A) right now: out of 11 senior+ engineers, **one** passes. Not because the rest are bad engineers — because the profession shifted in two years and the old résumé markers stopped meaning anything. Below is my own take on the seven markers (missing three = reject):

1. **Parallel work with agents.** Not "Cursor for autocomplete," but three running at once: one writing, one reviewing, one testing. Daily, as habit.
2. **Thinks in tokens.** Knows the daily spend. If they ask "what's that?" — diagnosis.
3. **Security through attacking agents.** Asks "what happens if five attacking agents are pointed at my endpoint?"
4. **Spec first, code second.** Writes a spec for the agent, reads the result, refines the spec. Not "I coded something and asked the AI to help."
5. **Knows where to get prebuilt parts.** Anthropic Skills, Claude Code recipes, MCP. Doesn't disappear for two weeks to reinvent a wheel.
6. **Ships in a day, not a sprint** — handoffs go through agents, not Slack threads.
7. **Has a Loom of something they built alone.** An internal CRM over a weekend. Live prod.

A team with only the product leg validates one hypothesis a month while the AI-native competitor validates four. A team with only the AI-native leg ships the wrong thing fast. A zombie team has neither. A live team in 2026 has both.

## The reframe

Zombie team and live team aren't two points on a "technology" scale. They're different **mental models of how work works** — and you see the split on the product side and the engineering side at once:

| Zombie | Live |
|---|---|
| Managed by random signals from above | Managed from capacity and product |
| Idea → weakest executor | Idea → quick prototype, hypothesis in a day |
| Initiative is dangerous — punished | Initiative *is* the work |
| Hires by checklist: "Python 5+ / AWS / Docker" | Hires for agent orchestration and product ownership |
| Release = sprint = "someday" | Release = day = "in prod today" |
| Metric = reporting | Metric = live users |

And here's the trap: a zombie team can't grow into either branch, however much it wants to. It can't become product-driven — owning outcomes, killing hypotheses on a criterion, putting engineers in front of users all run on initiative, and initiative is exactly what it punishes by reflex. It can't go AI-native either — it can't even hire its way there, because it doesn't recognize an AI-native engineer in the interview, can't give them work at their tempo, and buries them in approvals. Same management core, both directions, same wall. The people who'd actually move it — the engineer running four agents, the builder who owns a metric end to end — either rot there or walk. Mostly walk.

If there's no one around to talk to about the things your work actually runs on — tokens, specs, agent orchestration if you build, or user metrics, hypotheses, outcomes if you do product — that's a symptom. If the eight signs above pile on top, that's the diagnosis. Doesn't matter which side you're on; a zombie team starves both.

## What to do

**CEO of a zombie team:**

- Don't "improve the process." The process isn't the root — the management's composition and mental model is.
- Replace part of the management with people who do both themselves — work with agents hands-on *and* think in metrics and hypotheses. Miss one and the transition stalls on that side. It's the only intervention that actually works.
- Half-measures — training, AI-tool rollouts, "let's all use Copilot" — on top of an unchanged management core are wasted money and a wasted year.

**Engineer or product person on a zombie team** — the playbook is the same:

- Step 1: flag the problem to the CEO. Once. Concretely. With examples. That's your honest attempt.
- Step 2: if nothing happens in 1–2 months — **leave**. Not "look around." Leave. Time on a zombie team is atrophy: your agent fluency rots, or your product instinct does, depending on what you came in with.
- You're worth €130–180k+ on the 2026 market whether you orchestrate agents or own a metric end to end. Every month here is roughly **–€10k of optionality** on your résumé.
- 3–6 months of runway is enough to move into a live team. "Save up for another year" is the zombie talking.

## The hard line

If you're sitting in a planning meeting and you have nothing to say — that's not maturity, and it's not political wisdom. That's the moment the team becomes formally alive and functionally dead, and you become part of it.

The market won't wait for it to wake up. The competitor on agents and product will ship the year you spent on transformation theater. The cushion that protected zombie teams for decades is gone in 2026.

Leave now. There's better.
