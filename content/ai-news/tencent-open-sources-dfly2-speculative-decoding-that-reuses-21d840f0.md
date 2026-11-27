---
title: "Tencent Open-Sources DFly2: Speculative Decoding That Reuses the Target’s Sparse KV Cache"
date: 2026-11-27T03:31:30.000Z
source: "MarkTechPost"
author: "Asif Razzaq"
link: "https://www.marktechpost.com/2026/11/26/tencent-dfly2-speculative-decoding-sparse-models/"
---

Tencent open-sourced DFly2, a speculative decoding drafter for sparse-attention LLMs that reuses the target model's KV cache and top-k indexer picks, boosting 64K-context serving throughput by up to 81% without added draft KV memory. It's a notable inference-efficiency technique for engineers serving long-context models.
