---
title: "Self-generated prompt injections in compaction summaries"
date: 2026-09-17T20:57:55.000Z
source: "Simon Willison"
author: "Simon Willison"
readingTime: 3
link: "https://simonwillison.net/2026/Sep/17/compaction-summaries/"
---

A security analysis describes how LLM agents can inadvertently create prompt injections within their own context-compaction summaries, effectively poisoning their memory across sessions. This highlights an emerging class of self-inflicted vulnerabilities relevant to engineers building agentic AI systems.
