---
title: "Prinpia: robotic book palletizing cell"
outcome: "A JAKA cobot cell that stacks books onto two pallets and resumes from the exact spot after any stop. Delivered to Prinpia in Nov 2026."
order: 3
group: robotics
featured: true
period: "Jun 2026 – Nov 2026"
status: "Delivered to Prinpia (Nov 2026)"
client: "Prinpia"
role: "Wrote the robot program and the operator app, integrated the full cell"
team: "Cutshion"
hardware: "JAKA cobot · left and right stackers · conveyor · safety door"
cover: "https://i.ytimg.com/vi/LLDMCQPEUec/maxresdefault.jpg"
coverPos: "50% 40%"
coverAlt: "A JAKA collaborative robot stacking books onto a pallet"
youtube:
  - { id: "LLDMCQPEUec", title: "Robotic Book Palletizing System" }
tags: ["JAKA block programming", "Python", "Flask", "TCP/IP sockets", "Modbus I/O", "QR codes"]
results:
  - { value: "2", label: "Pallets, automatic stacker switching" }
  - { value: "3", label: "Packaging types: normal, banded, boxed" }
  - { value: "Resume", label: "At the exact layer, row and column" }
  - { value: "QR", label: "Order scan loads the book size" }
flow:
  - "The operator scans the order QR code or picks a preset"
  - "The app calculates the pallet layout"
  - "The robot picks each book from the conveyor and stacks it"
  - "When one pallet is full, it switches to the other stacker"
  - "After any stop, it resumes at the exact layer, row and column"
stack:
  - { group: "Languages", items: ["Python"] }
  - { group: "Frameworks", items: ["Flask"] }
  - { group: "Robot / Hardware", items: ["JAKA cobot", "JAKA block programming", "Left and right stackers", "Conveyor buffers", "Cylinders", "Gripper", "Safety door"] }
  - { group: "Protocols", items: ["TCP/IP sockets", "Modbus I/O"] }
  - { group: "Tools", items: ["QR codes"] }
---

## Problem

- **Many formats.** Prinpia ships books in many sizes and three packaging types: normal, banded and boxed.
- **Slow re-teaching.** Every order needs its own stacking pattern, so re-teaching the robot for each job is too slow.
- **Interrupted pallets.** Stacking stops halfway on a door open, an error or a shift change and restacking from zero is not an option.

## What I built

- **One generic program.** A JAKA block program with left and right stacker subprograms gets the job and layout from the app over TCP sockets, so a new book size is a data change.
- **Exact resume.** The robot saves its progress and continues from the same layer, row and column after any stop.
- **Two stackers.** When one pallet is full, the robot switches to the other stacker automatically.
- **Operator app.** A Python/Flask desktop app sets up jobs by book size, type, pallet and pattern, loads the size from the order QR code and calculates the layout.
- **Live operation.** The app shows live progress, controls the safety door and keeps logs.
- **Cell integration.** Modbus I/O drives the conveyor buffers, cylinders, stacker supports and gripper so the whole cell runs as one automatic cycle.
