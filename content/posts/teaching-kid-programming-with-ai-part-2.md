---
title: "Teaching My Kid Programming with AI — Part 2: The Dev Container"
date: 2026-03-08
draft: false
tags: ["ai", "education", "parenting", "claude", "devcontainer", "docker", "vscode"]
description: "How I replaced a $600/month API setup with a reproducible VSCode dev container running Claude Code — and why it works better for teaching."
ShowToc: true
---

## The pivot

[Last time]({{< ref "teaching-kid-programming-with-ai-part-1-5" >}}) I ended with a cliffhanger: $20 for a single tutoring session, and a plan to switch from OpenClaw on Discord to Claude Code in a dev container.

This is that post. Here's what I built, how it works, and what surprised me.

## Why a dev container?

The core problem was cost: using Claude via the API charges per token, and interactive tutoring sessions are brutal for token economics. A 40-minute session balloons to $20 because every message re-sends the entire conversation history.

Claude Code, by contrast, runs under a flat subscription (Claude Max). Same model, same quality — different billing model. Use it 10 hours a day and it still costs the same monthly fee.

But there was a secondary reason beyond cost: **environment consistency**. One of the hidden costs of teaching a 13-year-old to code is the "it works on my machine" problem. Sasha was doing sessions from different devices. I'd spend 20 minutes per session just getting the C++ compiler working, fixing Python paths, dealing with whatever Windows had done to the environment overnight.

A dev container eliminates that entirely. One image, always the same state. Open VSCode, click "Reopen in Container," and in 30 seconds everything is ready: the compiler, Python, Claude Code, all the configs. No setup tax.

## The architecture

The final setup has three pieces:

1. **A custom Docker image** — Ubuntu 24.04 base with Node, Python, Claude Code pre-installed
2. **`devcontainer.json`** — VSCode configuration that wires everything together
3. **A `postcreate.sh` script** — initialization that runs once after the container starts

Let me walk through each.

## The Docker image

I built a custom image rather than using a pre-built devcontainer image. The reason: I wanted Claude Code to be baked in, not installed at runtime — container startup should be fast.

```dockerfile
FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive

# Core system tools
RUN apt-get update && apt-get install -y \
    curl git build-essential sudo wget unzip jq ripgrep fd-find zstd \
    ca-certificates openssh-client \
    && rm -rf /var/lib/apt/lists/*

# Remove default ubuntu user (UID 1000 in ubuntu:24.04) and create vscode with passwordless sudo
ARG USER_UID=1000
ARG USER_GID=1000
RUN userdel -r ubuntu 2>/dev/null || true \
    && groupdel ubuntu 2>/dev/null || true \
    && groupadd --gid $USER_GID vscode \
    && useradd --uid $USER_UID --gid $USER_GID -m -s /bin/bash vscode \
    && echo "vscode ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

USER vscode
WORKDIR /home/vscode

# Install nvm + Node 20
ENV NVM_DIR=/home/vscode/.nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash \
    && . "$NVM_DIR/nvm.sh" \
    && nvm install 20 \
    && nvm alias default 20 \
    && nvm use default

ENV PATH="/home/vscode/.nvm/versions/node/v20/bin:$PATH"

# Install uv + Python 3.12
RUN curl -LsSf https://astral.sh/uv/install.sh | sh
ENV PATH="/home/vscode/.local/bin:$PATH"
RUN uv python install 3.12

# Create default venv
RUN uv venv /home/vscode/.venv --python 3.12

# Activate venv globally via ENV
ENV VIRTUAL_ENV=/home/vscode/.venv
ENV PATH="/home/vscode/.venv/bin:$PATH"

# Install Claude Code (native installer, no Node.js required)
RUN curl -fsSL https://claude.ai/install.sh | bash

# Shell config for interactive sessions
RUN echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.bashrc \
    && echo '[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"' >> ~/.bashrc \
    && echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc \
    && echo 'export VIRTUAL_ENV="$HOME/.venv"' >> ~/.bashrc \
    && echo 'export PATH="$HOME/.venv/bin:$PATH"' >> ~/.bashrc

# Workspace mount point
WORKDIR /workspaces

CMD ["bash"]
```

A few things worth noting:

**`ripgrep` and `fd-find` are not optional.** Claude Code uses them internally for codebase search. Without them, the agent's ability to navigate files degrades significantly. Install them in the image, not as an afterthought.

**`uv` instead of pip.** `uv` is dramatically faster for Python package installation — relevant when rebuilding the container. For a 13-year-old who might accidentally break something and need a clean rebuild, fast startup matters.

**`build-essential` gives you `g++`.** That's the C++ compiler for competitive programming. One line, and you have the entire GCC toolchain.

**Claude Code uses its native installer**, not npm. The `curl -fsSL https://claude.ai/install.sh | bash` approach bundles everything it needs — no Node.js dependency for the CLI itself, even though Node is installed for other purposes.

## The devcontainer.json

```json
{
  "name": "Claude Code Sandbox",
  "image": "ilguzin/claude-sandbox:latest",
  "remoteUser": "vscode",
  "runArgs": [
    "--privileged",
    "--name", "claude-sandbox-${localWorkspaceFolderBasename}"
  ],
  "workspaceMount": "source=${localWorkspaceFolder},target=/workspaces/${localWorkspaceFolderBasename},type=bind,consistency=cached",
  "workspaceFolder": "/workspaces/${localWorkspaceFolderBasename}",
  "features": {
    "ghcr.io/devcontainers/features/docker-in-docker:2": {}
  },
  "postCreateCommand": ".devcontainer/postcreate.sh",
  "customizations": {
    "vscode": {
      "settings": {
        "terminal.integrated.cwd": "/workspaces/${localWorkspaceFolderBasename}",
        "python.defaultInterpreterPath": "/home/vscode/.venv/bin/python",
        "python.terminal.activateEnvironment": true
      }
    }
  }
}
```

The `--privileged` flag enables Docker-in-Docker — useful for running test environments inside the container. For pure competitive programming this isn't needed, but I kept it because the same image is my own daily development environment.

`consistency=cached` on the workspace mount is a performance optimization for macOS — it tells Docker to prefer read performance over strict consistency, which makes file operations noticeably faster.

## The postcreate script

This runs once when the container is first created:

```bash
#!/usr/bin/env bash
set -euo pipefail

user_name="Claude Code User"
user_email="vscode@claude-code-sandbox-$(hostname)"

# Git: mark workspace as safe
git config --global --add safe.directory "/workspaces/$(basename "$PWD")"

# Git: set user identity
git config --global user.name "$user_name"
git config --global user.email "$user_email"
git config --global init.defaultBranch main

# SSH: add GitHub to known_hosts
mkdir -p ~/.ssh && chmod 700 ~/.ssh
ssh-keyscan github.com >> ~/.ssh/known_hosts 2>/dev/null

# SSH: generate key if none exists
if [ ! -f ~/.ssh/id_ed25519 ]; then
    ssh-keygen -t rsa -b 4096 -C $user_email -f ~/.ssh/id_rsa -N ""
    echo ""
    echo "========================================="
    echo "New SSH key generated. Add it to GitHub:"
    echo "========================================="
    cat ~/.ssh/id_rsa.pub
    echo "========================================="
    echo "https://github.com/settings/ssh/new"
    echo "========================================="
fi
```

The most important line here is the `safe.directory` config. When VSCode mounts your workspace into a container, the files are owned by a different UID on the host versus inside the container. Git refuses to operate on foreign-owned repositories by default — a security feature that will silently break everything until you add this config.

## The CLAUDE.md file

This is where the tutor's personality lives. In the old OpenClaw setup, it was a `SOUL.md` file. In Claude Code, the equivalent is `CLAUDE.md` in the repository root — a Markdown file that Claude Code reads at the start of every session and uses as persistent context.

My tutor configuration carries over almost verbatim:

- Identity: competitive programming trainer, 20-year veteran, informal tone
- Language: Russian, informal "ты"
- Core rule: **never give ready-made solutions**
- Session structure: warmup → student-chosen problem → Socratic walkthrough → summary
- Memory: Claude Code maintains its own memory files across sessions

The memory system works differently than OpenClaw's workspace files, but the effect is the same — the agent remembers previous sessions, tracks Sasha's error patterns, and picks up where it left off.

## What VSCode adds

One thing I didn't expect: the IDE context makes the tutor *better*.

With OpenClaw on Discord, Sasha would describe his code in chat. The agent was working blind — relying on copy-pasted snippets and descriptions. With Claude Code running in VSCode, the agent has direct access to the actual files. When Sasha writes a solution and asks "why doesn't this work," the agent reads the file, sees the context, and gives a precise answer rather than guessing from a snippet.

This matters for competitive programming especially. The difference between "your array index might be off" and "line 14: `dp[i+1]` — you're accessing index `n` when the array has size `n`" is pedagogically significant.

## The reality check

**What works better than Discord:**

- The agent sees actual code, not snippets
- Built-in code runner (terminal in the same window)
- No copy-paste friction
- For a kid already using VSCode — zero learning curve

**What's worse:**

- Sasha occasionally misses the Discord notifications. With the old setup, the bot would ping him when I wanted to suggest a problem. Now it's more "I'll open VSCode when I feel like it." Not necessarily bad — more self-directed — but the ambient nudges are gone.
- The initial container startup takes ~30 seconds the first time on a new machine. Fine for a development setup, mildly annoying for a 13-year-old who wants to start immediately.

**The cost:**

Zero API fees beyond the flat Max subscription. A session that would have cost $20 in April now costs exactly $0 in incremental terms. At whatever daily usage Sasha feels like — no guilt, no throttling, no "maybe don't ask follow-up questions because tokens."

That change in psychology is surprisingly significant. When tutoring is metered, you unconsciously cut sessions short. When it's flat-rate, you let them run as long as the student is engaged. Sasha's sessions are longer now.

## One month in

Sasha has been using the container setup for about a month. The verdict: it works. He opens VSCode, runs `claude` in the terminal, and starts a session. The agent remembers where they left off. The C++ compiler is always there. Python is always there.

He's solved about 60 Codeforces problems since switching. His Codeforces rating has moved. The "tried to get free answers" behavior from Part 1 is mostly gone — he's internalized the Socratic approach and usually tries to articulate his thinking before asking for hints.

Whether that's the setup or just 13-year-old brain development — hard to say. But the system is consistently available, consistently patient, and consistently holding the pedagogical line. That's more than I can reliably deliver on a Tuesday evening after work.

## What's next

In **Part 3**, I'll dig into the actual tutoring mechanics — the CLAUDE.md configuration, how sessions are structured, and what happens when an AI tutor disagrees with a student's approach for 20 minutes and eventually turns out to be wrong.

---

*This is Part 2 of a series on AI tutoring:*
1. [The Setup]({{< ref "teaching-kid-programming-with-ai-part-1" >}}) — Discord + OpenClaw + Claude API
2. [The $20 Session]({{< ref "teaching-kid-programming-with-ai-part-1-5" >}}) — why it cost too much and the pivot
3. **The Dev Container** (you are here) — the actual setup and one month in
4. [From Side Project to Product]({{< ref "teaching-kid-programming-with-ai-part-3" >}}) — lessons learned and the birth of CodePal
