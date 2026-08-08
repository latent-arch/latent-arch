---
title: "You're Not a 2023 Developer Anymore"
date: 2026-04-28
draft: false
tags: ["ai", "agents", "engineering-leadership", "career", "claude", "context-engineering"]
description: "Working with multiple AI agents isn't 'developer plus a faster tool.' It's a role change under a fixed job title. Notes from 20 years in tech on what's actually happening cognitively, why it's not burnout, and what to do."
ShowToc: true
---

A picture I encountered recently from a channel and haven't been able to shake:

> 4 AM. A developer opens their fifth agent. The first four are running in parallel — one's deploying a migration, the second is writing tests for a module the third just refactored, the fourth is hunting a regression all three may have introduced. The fifth is opened to review what the first four did.
>
> A year ago, four colleagues worked alongside this developer. Then they were laid off because "AI accelerates development 5x." And it does — code ships faster. One person now does the work of five. As promised.

The piece this came from framed the developer's experience as a kind of cognitive collapse: distributed cognition (the architecture used to live across 5–7 heads) collapsing into one. Working memory overflowing. Attention residue stuck on every open context. A "dissociation of the author from their own code" — your name on the `git blame`, no memory of why the decision was made.

The observation about dissociation is sharp. The diagnosis around it isn't quite right. And the missing piece — what's actually happening — is what I've been turning over in my head for the past few weeks.

## What it actually is

It's a role transition. From *executor* to *supervisor*. From writing code to deciding whether code should be merged.

Supervising agents isn't the same cognitive load as writing code yourself. When you're not *writing* five files but *checking* five PRs, you're holding ~5 statuses and dropping into one at a time, not 25 active elements. Otherwise no team lead with five juniors would survive the week. The discomfort developers feel with multiple agents isn't "my brain is overflowing" — it's something else.

The transition itself isn't new — every team lead has been through it. What's new is that it's happening:

- **Without the social scaffolding** that normally surrounds it (peers, standups, ADRs, an architect down the hall to sanity-check decisions).
- **At a 50–100x faster feedback loop** than human-team supervision (5–30 minutes per agent vs. 1–3 days per junior).
- **With executors that don't push back** — an agent will confidently attempt almost any task; a human junior will say "I don't understand" or "this seems wrong."
- **Under the same job title as before**, which makes it psychologically harder to recognize the shift.

Calling this "dissociation" is dramatic. It's a known transition, in unfamiliar conditions, without the usual support structures. The discomfort is real. The framing as a new psychiatric category isn't.

## The profession changed under you

Here's the reframe that landed for me:

**A developer working with agents in 2026 isn't "a developer plus a new tool." It's a different profession sharing the same job title.**

The 2023 developer:

- Wrote code by hand, with autocomplete and Stack Overflow.
- Worked in a team, synced via standups and reviews.
- Climbed the ladder junior → mid → senior → staff.
- Was measured by depth in domain and code.

The 2026 developer (with agents):

- Writes specifications and does context engineering.
- Reviews more than they write.
- Synchronizes parallel work streams in their own head, not a chat.
- Is measured by the quality of leverage they create — frames, docs, decision logs, runbooks.

These are different jobs. Not "same job, new tools." Different daily activities, different success metrics, different cognitive demands.

A useful analogy: a 2015 taxi driver and a 2030 self-driving-car supervisor. Formally both "drivers." Functionally different work — one trains reaction time, the other trains attention to the non-routine. One watches the road; the other watches the system.

## The Bainbridge paradox

The incident scenario at the end of that original picture — production breaks, nobody to ask, the developer alone with five terminals — has a name. Lisanne Bainbridge described it in 1983 in a paper called *Ironies of Automation*:

> The more advanced the automation, the more crucial may be the role of the human operator.

Because automation handles the routine. The human is left with what automation couldn't handle — the rare, complex, ambiguous cases. But skill in those cases is built through regular practice on routine ones. The human atrophies on the easy stuff and is summoned only when it's hard.

Aviation and nuclear plant operations have understood this for forty years. Software engineering is just arriving at the same pattern, late.

The practical implication: if you spend six months supervising agents and never opening unfamiliar code by hand, your ability to debug a complex incident degrades. And that incident is coming for you specifically — because the agents will have failed on it first.

## The shift no one prepares you for: external memory

This is, in my experience, the single biggest change, and the one nobody warns you about.

In 2023, system architecture lived distributed across the team — in heads, standups, kitchen conversations, code-review threads. When the team is gone, the architecture has to live **in files**: README, ADRs (Architectural Decision Records), runbooks, design docs, decision logs. Otherwise it falls when you fall — when you're sick, on vacation, or simply quit.

And here's the paradox I didn't see coming: in 2023, "I know this system well in my head" was an asset. In 2026, it's a liability. Knowledge living only in your head means *you are the bottleneck*. The day you're unavailable, everything stops.

So the discipline shifts: deliberately externalize. For three audiences:

- **For the agents** — so they can work in your project without you in the chat every time. The `CLAUDE.md` / `AGENTS.md` / context-file practice.
- **For yourself in six months** — so you can remember why you made a decision when an incident or an architecture review brings it up.
- **For whoever inherits this** — including a future colleague, or yourself returning after time away.

This takes time. Time that didn't have to come from anywhere in the old profession, because the old profession didn't need to spend it. In the new profession, this *is* the job.

## New skills the role demands

The skills that are now baseline in 2026 weren't on most curricula in 2023:

1. **Context engineering** — designing the environment (rules files, ADRs, runbooks, spec templates) in which agents are productive. A new engineering discipline in itself.
2. **Specification quality** — writing tasks with acceptance criteria, non-goals, relevant files. If you can't articulate "how I'll know it was done well" in five minutes, the task isn't ready.
3. **Epistemic discipline** — tracking what you know because you verified vs. what you know because an agent told you and you didn't check. Sounds paranoid until your first incident.
4. **Confidence calibration** — knowing how confidently you know what you know. In a team, peers calibrate this for you. With agents, you do it alone, and the agent won't help — it states truths and hallucinations with equal certainty.
5. **Synthesis across parallel work** — predicting how two parallel agent outputs will merge or conflict. The standup did this for us before. Now it happens in your head, in real time.

These can be trained. They're new skill stacks, not personality traits. But you have to know they exist before you can train them.

## Practices that have helped

Six things, in order of return on effort:

- **Hard limit on parallelism: 2 agents, 3 max.** Five doesn't make you faster; it makes review quality collapse. After two weeks at five-agent speed, you have a codebase nobody understands — including the agents, who start fresh each time.
- **Specification before agent.** No starting an agent without a 5–15 minute spec. A bad spec produces confidently wrong code, which you debug for longer than it would have taken you to write the thing yourself.
- **Close contexts explicitly.** Each agent ends with one of three states: merge, explicit pause with state recorded, kill. No "it's hanging, I'll look later." Open contexts eat ambient cognitive bandwidth even when you aren't looking at them.
- **Two-hour daily slot with no agents.** Read unfamiliar code, debug a real bug, refactor by hand. This is the maintenance dose against the Bainbridge paradox. Without it, you lose the ability to be the engineer the agents can't replace.
- **Decision log, lightweight.** Five lines per non-trivial decision: what, why, what we rejected (including what the agent suggested), what would trigger reconsidering. Twenty seconds to write, hours saved during incidents.
- **Bus factor honesty.** If you're solo and the architecture lives in your head, that's an operational risk, not a personal achievement. Either get a second person, or make external memory good enough that a stranger can pick it up. "It's fine" is a bet that the incident won't come.

## Closing

The picture this post started with ended sad: a developer alone with five terminals at 4 AM, and nobody to help when the inevitable incident lands.

The sadness is real. But the diagnosis matters. This isn't burnout from working too hard. It's a profession that changed under the developer's feet without anyone telling them — and a person trying to do the new job by 2023 rules.

There's no going back. The 2023 role isn't coming back to the market in pure form. But there isn't a catastrophe either, if the new role is learned deliberately rather than fought against.

It's not chess being played by checkers rules. It's chess. You just have to notice that, and learn the moves.
