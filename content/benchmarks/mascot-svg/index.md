---
title: "The Mascot Test: a walrus playing a cello"
date: 2026-07-19
description: "Every model gets the same prompt: draw our mascot as an SVG. Pick a model and judge the result with your own eyes."
ShowToc: false
---

Most AI benchmarks are numbers. A model scores 88.7 on some acronym, another scores 91.2 — and unless you work in the field, neither number tells you anything about what these models can actually do.

This is the first task in a series of **human-friendly benchmarks**: small, real tasks where you don't need a leaderboard to understand the result — you can just look at it.

## The task

Every model gets the exact same prompt, once, with no retries and no cherry-picking:

> Generate an SVG of a walrus playing a cello. The walrus must have its two long tusks and visible whiskers. The cello must have a correctly shaped curved body with two f-holes, four strings, and a bridge, standing upright on its endpin. The walrus must be clearly drawing a bow across the strings with its flipper.

Why this is hard: the model writes SVG markup — shapes and coordinates — as text, without seeing what it draws. Getting a recognizable walrus, a structurally correct cello, *and* a plausible interaction between them is a surprisingly honest test of whether a model can reason about space it cannot see. (The idea of a fixed absurd drawing task owes a debt to Simon Willison's famous [pelican on a bicycle](https://github.com/simonw/pelican-bicycle).)

The checklist, if you want to score along: two tusks · whiskers · curved cello body · two f-holes · four strings and a bridge · cello upright on its endpin · bow in flipper, across the strings.

## The results

Pick a model — the drawing below is its actual, unedited output. New models are added as they come out.

<!--after-results-->

## Takeaways so far

A few patterns emerged after the first batch of frontier models:

- **The scene itself is basically solved.** Every model that returned a complete SVG drew something you would instantly caption "a walrus playing a cello". Compare that to the stick-figure pelicans of 2024 — spatial drawing-by-text has come a very long way.
- **Physical contact is the universal failure point.** Nobody fumbled the walrus or embarrassed themselves on the cello, but every single bow is doing something impossible: hovering in mid-air, fusing with a flipper, slicing through tusks. Models know what things look like; they still don't quite know how bodies touch.
- **Details migrate to plausible-looking spots.** Two models independently drew the cello's scroll as a decorative curl on the walrus's head. When a model can't fit a part where it belongs, it doesn't drop it — it relocates it somewhere that looks vaguely intentional.
- **Polish and correctness are different axes.** The most beautiful renders were not the most accurate ones, and the most naive-looking drawing ticked nearly every checklist item.
- **Finishing at all was a benchmark of its own.** Some models never made it onto this page: one kept truncating the SVG mid-file, others simply timed out. Before a model can draw a walrus, it has to reliably answer — that's a result too.

### Editor's picks

**Best so far — Gemini 3.1 Pro.** The cello actually looks like a crafted instrument — shaded, proportioned, believable. The flippers are planted right where they belong, and the spotlight shadows sell the whole scene. This is the one drawing you could put on a poster.

**Worst so far — Grok 4.5.** The slapdash entry: a barrel with hoops standing in for a cello, a bow balanced on a blob, everything looking like it was glued together in a hurry. To its credit, it is genuinely funny — which is not nothing for a mascot.

This section will be updated as more models run — the open-weights batch is next.
