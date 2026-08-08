---
title: "Packaging My Meeting Workflow Into a Claude Code Skill"
date: 2026-07-18
draft: false
tags: ["ai", "agents", "claude", "claude-code", "skills", "agentic-engineering", "workflow", "plugins"]
description: "The story of a private meeting-minutes routine becoming a published Claude Code plugin: local Whisper transcription, templates that live in your repo instead of the tool, and why packaging a workflow beats merely having one."
---

Zoom leaves an `.mp4` on my disk after every recorded call. When I finally counted, there were eleven of them, going back to April. Eleven meetings where someone — usually me — said "I'll write this up," and then didn't.

For a while my fix was a duct-tape routine: a Whisper script I ran by hand, a summary prompt I kept pasting into Claude, and a folder convention that existed mostly in my head. It worked, in the sense that things I babysit personally always work. A few weeks ago I got tired of babysitting and turned the whole thing into a proper Claude Code skill. Then I did something slightly scarier: published it in a [plugin marketplace](https://github.com/latent-arch/claude-marketplace) I'd been meaning to start anyway.

This post is about that trip — from "my routine" to "a thing strangers can install," and what I had to decide along the way.

## What it became

The skill has two modes. `plan` runs before a meeting and produces an agenda file from a template — topic, goals, participants, open questions. `protocol` runs after: I drop the recording into a gitignored folder, say "make minutes from this," and the skill transcribes it locally, reads the transcript against the agenda, and fills in what actually happened — decisions, action items with owners, what got punted. Only the minutes land in git; the audio and raw transcript never leave my machine.

That last part was the one decision I was sure about from day one. Work calls are where salaries, unannounced products and honest opinions about clients live. I've sat through enough security reviews to know that "we upload your meetings to a third-party API" ends the conversation, and "the recording never leaves the machine" is the sentence that keeps it going. So: [faster-whisper](https://github.com/SYSTRAN/faster-whisper) on CPU. An hour of audio takes tens of minutes, the agent runs it in the background, and I genuinely don't care that a cloud API would shave a few percent off the error rate.

Two smaller decisions I'd made without noticing, and only articulated when I had to write the skill down:

- **The template belongs to the repo, not the tool.** On first run the skill sets up a `meetings/` folder with a README, a template and an index — in your team's language — and from then on *that* copy is canonical. Edit it however you like; the skill follows your version. If you uninstall the plugin tomorrow, you keep a folder of plain markdown that any human or agent can read.
- **The agent lints its own output.** Frontmatter on every minutes file, checked by a script, run until green. I added this after watching an agent slowly mutate my format over a few weeks — a renamed field here, an invented status there. I review whether the minutes capture the meeting; the machine reviews whether the file parses. I don't want to spend attention on the second thing, ever.

## Why publish it at all

Not distribution — let's be honest, a meeting-minutes skill isn't setting the world on fire. The value was in the exercise itself: turning a routine only I could run into something that works without me forced me to notice everything I'd been quietly doing by hand. I've [written before](/posts/autopilot-is-not-a-destination) that a personal agentic stack changes in kind the moment a second copy runs in someone else's hands. A marketplace listing is the smallest version of that moment I've found — no contract, no hire, just your workflow executing in a repo you'll never see, without you there to explain what you meant.

And fine, there's a simpler motive too: I hope it saves somebody money. Paid transcription services charge a subscription for what Whisper does on your own CPU for free — and for meeting minutes, free is plenty.

## Try it

```
/plugin marketplace add latent-arch/claude-marketplace
/plugin install la-toolkit@latent-arch
```

Drop a recording into `meetings/.audio/`, ask for minutes, and find out what your last meeting actually decided. In my case it was less than I remembered. That's the whole argument for writing it down.
