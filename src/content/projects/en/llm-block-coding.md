---
title: "LLM robot programming tool"
outcome: "Writes and edits JAKA block code from plain language, then checks it for safety."
order: 5
group: robotics
featured: true
period: "2026"
status: "In use at Cutshion"
client: "Cutshion (in-house)"
role: "Built the backend, LLM tool calling, safety check and controller transfer"
team: "Cutshion"
hardware: "JAKA cobot controller"
cover: "svg:llm"
coverAlt: "Mock-up of the flow: a plain-language request becomes JAKA block code, which passes a safety check before it reaches the robot"
tags: ["Python", "FastAPI", "LLM tool calling", "JAKA block programming", "Safety validation"]
results:
  - { value: "2 checks", label: "Safety validation, then operator review" }
  - { value: "In use", label: "In-house tool at Cutshion" }
flow:
  - "The operator describes the task in plain language"
  - "The LLM writes or edits the block program"
  - "A safety check validates limits and structure"
  - "The operator reviews and approves the program"
  - "The program is sent to the robot controller"
stack:
  - { group: "Languages", items: ["Python"] }
  - { group: "Frameworks", items: ["FastAPI"] }
  - { group: "AI", items: ["LLM tool calling", "Typed tools"] }
  - { group: "Robot / Hardware", items: ["JAKA cobot controller", "JAKA block programming"] }
  - { group: "Safety", items: ["Limit and structure validation", "Operator review"] }
---

## Problem

- **Slow programming.** Block coding makes cobot teaching approachable, but writing and editing long programs is still slow for operators.
- **Safety risk.** A language model must never send an unsafe program straight to a robot.

## What I built

- **Plain-language programming.** An engine that creates and edits JAKA block-code programs from natural language through LLM tool calling.
- **Typed tools.** The LLM can only call a small set of typed tools, which proved more reliable than free-form code generation.
- **Safety check.** Every generated program is validated for limits and structure before the operator reviews it.
- **Controller transfer.** A FastAPI service sends only approved programs to the robot controller.
