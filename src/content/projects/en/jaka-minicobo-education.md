---
title: "JAKA MiniCobo pick-and-place demo"
outcome: "A colour- and shape-sorting pick-and-place sequence on the JAKA E02 education workstation, run live at an industry exhibition."
order: 6
group: robotics
featured: true
role: "Robot teaching, sequence and vision setup"
period: "2026"
team: "Cutshion"
platform: "JAKA MiniCobo (6-axis) · JAKA E02 Education Training Workstation"
status: "Shown at an industry exhibition in Korea"
cover: "https://i.ytimg.com/vi/y0vjoXO-Isk/maxresdefault.jpg"
coverPos: "50% 45%"
coverAlt: "JAKA MiniCobo picking coloured parts with a suction tool on a training workstation"
youtube:
  - { id: "y0vjoXO-Isk", title: "JAKA MiniCobo Pick & Place Demo" }
tags: ["JAKA App", "Drag teaching", "Graphical programming", "Node-RED", "Vision", "TCP"]
results:
  - { value: "4 × 3", label: "colours × shapes recognised by the kit camera" }
  - { value: "3", label: "training modules in one sequence: conveyor, storage plate, assembly station" }
---

## Problem

An exhibition demo has to run all day without help. It also has to show visitors both teaching and vision on a small educational cobot.

## What I built

- Taught all robot positions and motions with JAKA drag-and-teach and graphical programming.
- Built the full pick-and-place sequence across the conveyor, storage and assembly modules with a vacuum suction tool.
- Set up colour and shape recognition (red, yellow, green, blue; circle, square, hexagon) with the kit's camera and sent the results to the robot over TCP with Node-RED.
- Ran the demo continuously at the booth.

## What I learned and would improve next

- Small, clearly named subprograms made it fast to re-teach positions after moving the kit.
- Next: a short teaching guide so students can reproduce the demo themselves.
