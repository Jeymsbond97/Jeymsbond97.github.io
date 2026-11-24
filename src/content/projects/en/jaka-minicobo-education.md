---
title: "Educational Teaching Robot"
subtitle: "JAKA MiniCobo pick-and-place"
outcome: "Colour and shape sorting with a JAKA MiniCobo, run live at an industry exhibition."
order: 6
group: robotics
featured: true
period: "2026"
status: "Shown at an industry exhibition in Korea"
client: "Cutshion (in-house exhibition demo)"
role: "Taught the robot, built the pick-and-place sequence and set up the vision"
team: "Cutshion"
cover: "https://i.ytimg.com/vi/y0vjoXO-Isk/maxresdefault.jpg"
coverPos: "50% 45%"
coverAlt: "JAKA MiniCobo picking coloured parts with a suction tool on a training workstation"
youtube:
  - { id: "y0vjoXO-Isk", title: "JAKA MiniCobo Pick & Place Demo" }
tags: ["JAKA App", "Drag teaching", "Graphical programming", "Node-RED", "Vision", "TCP"]
results:
  - { value: "4 × 3", label: "Colours × shapes recognised" }
  - { value: "3", label: "Training modules in one sequence" }
flow:
  - "The kit camera reads each part's colour and shape"
  - "Node-RED sends the result to the robot over TCP"
  - "The robot picks the part with a suction tool"
  - "It moves parts between the conveyor, storage and assembly modules"
stack:
  - { group: "Robot / Hardware", items: ["JAKA MiniCobo (6-axis)", "JAKA E02 workstation", "Vacuum suction tool", "Kit camera"] }
  - { group: "Robot software", items: ["JAKA App", "Drag teaching", "Graphical programming"] }
  - { group: "Vision", items: ["Colour recognition", "Shape recognition"] }
  - { group: "Protocols", items: ["TCP"] }
  - { group: "Tools", items: ["Node-RED"] }
---

## Goal

- **Booth demo.** Build a pick-and-place demo for an industry exhibition booth in Korea.
- **Unattended.** It had to run all day without help.
- **Two skills.** It had to show both robot teaching and vision on a small educational cobot.

## What I built

- **Teaching.** All positions and motions taught with JAKA drag teaching and graphical programming, split into small named subprograms so re-teaching after moving the kit was fast.
- **Sequence.** A full pick-and-place flow with a vacuum suction tool across the conveyor, storage and assembly modules.
- **Vision.** The kit camera recognises 4 colours and 3 shapes.
- **Node-RED link.** Node-RED sends each result to the robot over TCP.
- **Booth run.** The demo ran continuously during the exhibition.
