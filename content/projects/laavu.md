---
title: "Laavu — Agent Sessions on Your Own Server"
date: 2026-10-29
draft: false
tags: ["ai", "agents", "claude-code", "self-hosted", "open-source"]
summary: "Claude Code and other CLI agents running on your own server. You check in from a laptop or a phone when they need you."
ShowToc: false
weight: 1
---

Most of my work now happens in Claude Code sessions that run for hours. For a long time the setup was a VPS, Tailscale, ssh and tmux. It works fine. I close the laptop and the agent keeps going. Later I attach and look at what it did.

The phone is where it falls apart. The agent asks "can I run this migration?" while I'm in a car or waiting at my son's training, and answering through a phone ssh client is painful. Reading what it wrote is worse. It writes reports in markdown with formulas, sometimes a PDF or an HTML dashboard, and the terminal shows me raw text. Sending it a photo of a handwritten solution meant scp.

That's how Laavu started. It's a small daemon on the server plus a web client that the same server serves. Each session is a plain tmux session with the real CLI inside. The browser just shows it. Close the tab and nothing stops.

<img class="project-shot" src="/images/projects/laavu/desktop-split-light.webp" alt="Laavu on a desktop: files on the left, a rendered report, the agent session on the right">

When an agent is waiting for me, the phone gets a push. I open it, type "yes", put the phone back. The files the agent wrote open next to the conversation already rendered: markdown with KaTeX, images, PDF, HTML. I can drop a file into the project folder from any device, on the phone straight from the camera. And there's one list of all sessions where I see who's working and who's stuck waiting for me.

<img class="project-shot" src="/images/projects/laavu/phone-session-light.webp" alt="A Claude Code session on a phone">

I didn't build a chat on top of the agent and don't plan to. You get the actual Claude Code TUI with your settings, hooks and MCP servers. When Anthropic ships something new, it works in Laavu that day, because I have nothing to catch up with.

It isn't tied to Claude Code either. Codex works fine, and so will whatever CLI comes out next year. If you need more, open a plain terminal session and do whatever you'd do over ssh. Hooking up GitHub takes a minute: the agent makes a deploy key, you add it to the repo, and from then on it commits and pushes by itself.

The server can be a cheap VPS or a box at home with Ubuntu 24.04 or newer, and everything stays there. Every agent is its own Linux user, login is passkey only, and the model is your call: subscription, API key, OpenRouter, your own gateway. Laavu doesn't see your tokens. Install is one line, on the server itself or on your laptop, and then it goes over ssh:

```
curl -fsSL https://getlaavu.com/install.sh | sh
```

Anthropic has Remote Control and Claude Code on the web, and I use both sometimes. Remote Control keeps the agent on my laptop, so the laptop can't sleep. Claude Code on the web keeps the project in Anthropic's cloud, and some of my projects can't go there, my son's olympiad prep for one.

The name is Finnish. A laavu is an open lean-to in the forest. Anyone can stop there, and the people passing through keep it in order. Seemed like a good word for a place where agents live.

The code is open, AGPL-3.0: [github.com/ilguzin/laavu](https://github.com/ilguzin/laavu). Site and install guide: [getlaavu.com](https://getlaavu.com/?utm_source=latent-arch&utm_medium=project-page&utm_campaign=projects-laavu). There's also a console in free beta that installs updates at night and pings you when the server goes down or the disk fills up. It doesn't read sessions or files. It's all early, so expect rough edges and tell me about them.
