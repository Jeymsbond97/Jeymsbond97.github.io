---
title: "Principia: robotic book palletizing cell"
outcome: "A JAKA cobot that stacks books layer by layer onto two pallets and resumes from the exact spot after any stop."
order: 3
group: robotics
featured: true
role: "Robot program, operator app and cell integration"
period: "2026"
team: "Cutshion"
platform: "JAKA cobot · left/right stackers · conveyor · safety door"
status: "Built for a book printing and distribution company in Korea"
cover: "https://i.ytimg.com/vi/LLDMCQPEUec/maxresdefault.jpg"
coverAlt: "A JAKA collaborative robot stacking books onto a pallet"
youtube:
  - { id: "LLDMCQPEUec", title: "Robotic Book Palletizing System" }
tags: ["JAKA block programming", "Python", "Flask", "TCP/IP sockets", "Modbus I/O", "QR codes"]
results:
  - { value: "2", label: "pallets served from 2 stackers, switching automatically when one is full" }
  - { value: "3", label: "book types handled: normal, banded and boxed" }
  - { value: "Exact", label: "resume from the same layer, row and column after a door open, error or shift change" }
diagram:
  lanes:
    - { label: "Operator", nodes: ["QR scan / presets", "Layout calculator", "Live progress + logs"] }
    - { label: "Cell", nodes: ["Conveyor buffers", "Stacker alignment", "Safety door"] }
    - { label: "Robot", nodes: ["TCP job + layout", "Resume logic", "Pick / place subprograms"] }
  sink: "Left pallet ⇄ right pallet"
---

## Problem

Books come off the conveyor in many sizes and three packaging types, and each order needs its own stacking pattern. Operators should not have to re-teach the robot for every job, and a stop in the middle of a pallet (door opened, error, shift change) must not mean starting the pallet again.

## What I built

- **Robot program** in JAKA block programming: TCP socket communication with the app, left and right stacker subprograms, and Modbus I/O for conveyor buffers, cylinders, stacker supports and the gripper.
- **Resume logic.** The robot stores progress and continues from the exact layer, row and column where it stopped.
- **Operator app** (Python, Flask, desktop UI): job setup by book size, type, pallet and pattern (normal or one-line), a QR-code mode that loads the book size from the order, presets, the pallet layout calculation (rows, columns, layers, with a different pattern on even layers), live progress, door control and logs.
- **Integration** of the robot, stackers, conveyor and safety door into one automatic cycle.

## What I learned and would improve next

- Putting the layout maths in the app and keeping the robot program generic made new book sizes a data change, not a robot change.
- Next: a simulation preview of the pallet pattern before the first box is placed.
