---
title: "LLM robot programming tool"
outcome: "Create and edit JAKA cobot block-code programs in plain language, with a safety check before anything reaches the robot."
order: 5
group: robotics
featured: true
role: "Developer"
period: "2026"
team: "Cutshion"
platform: "JAKA cobot controller"
status: "Internal tool"
cover: "svg:llm"
coverAlt: "Diagram of natural language turning into robot block code"
tags: ["Python", "FastAPI", "LLM tool calling", "JAKA block programming", "Safety validation"]
diagram:
  lanes:
    - { label: "Input", nodes: ["Natural-language request", "Existing program (optional)"] }
    - { label: "LLM", nodes: ["Tool calling", "Block-code generation / edit"] }
    - { label: "Safety", nodes: ["Limits + structure check", "Operator review"] }
  sink: "Transfer to the robot controller"
---

## Problem

Teaching a cobot with block coding is approachable, but writing and editing longer programs is still slow for operators, and a language model must never send an unsafe program straight to a robot.

## What I built

- An engine that creates and edits JAKA block-coding programs from natural language using LLM tool calling.
- A safety check that validates the generated program before anything reaches the robot.
- Transfer of the approved program to the robot controller, behind a FastAPI service.

## What I learned and would improve next

- Constraining the LLM to a small set of typed tools was far more reliable than free-form code generation.
- Next: a simulated dry run of every generated program before it is offered to the operator.
