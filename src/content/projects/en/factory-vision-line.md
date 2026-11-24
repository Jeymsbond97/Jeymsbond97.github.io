---
title: "Real-time vision for a factory line"
outcome: "Transparent-part detection that drives two JAKA cobots and the PLC on a live production line. Passed customer acceptance in Aug 2026."
order: 2
group: robotics
featured: true
role: "Backend and vision system developer"
period: "2026"
team: "Cutshion"
platform: "3 USB cameras · mini PC · 2 JAKA cobots · LS PLC"
status: "Passed customer acceptance (Aug 2026)"
cover: "https://i.ytimg.com/vi/3sMe1mavDQk/maxresdefault.jpg"
coverAlt: "Live dashboard of the vision system with pickup slots turning green as transparent parts arrive"
youtube:
  - { id: "3sMe1mavDQk", title: "Real-Time Vision for a Factory Line" }
tags: ["Python", "OpenCV", "scikit-learn", "FastAPI", "React", "Modbus TCP", "LS PLC (XG5000)", "JAKA SDK"]
results:
  - { value: "99.7%", label: "full/empty pocket accuracy after retraining (up from 89.9%)" }
  - { value: "33 → 3", label: "false positives on 960 test samples" }
  - { value: "0%", label: "false triggers on empty pockets in live tests on the tuned line" }
  - { value: "Aug 2026", label: "customer acceptance passed" }
diagram:
  lanes:
    - { label: "Sense", nodes: ["3 cameras · 720p30", "CLAHE + Hough count", "Per-pocket classifier"] }
    - { label: "Decide", nodes: ["FastAPI server", "Pickup timing", "Dashboard + manual control"] }
    - { label: "Act", nodes: ["LS PLC · Modbus TCP", "Clamps · conveyors", "2 JAKA cobots"] }
  sink: "Pick → tray → stack → box out"
---

## Problem

Molded parts arrive on three chain conveyors and must be picked, placed on trays and packed by robots. The parts are **transparent**: they have almost no contrast against the white conveyor pockets, and an empty pocket also looks like a circle. Plain circle detection could count parts, but it could not tell a full pocket from an empty one, which is exactly the signal the robot needs.

## What I built

- **Vision.** One camera per line. A counting zone with CLAHE contrast enhancement and Hough circles counts parts as they arrive; in the pickup zone, each of the 5 pockets is cropped and checked by a trained full/empty classifier.
- **Line server.** A Python/FastAPI server that ties together the cameras, the PLC, the robots, the tray feeder and the grippers, and triggers the robot's pick program when the pickup zone is full.
- **PLC integration.** LS PLC over Modbus TCP for the conveyors, clamps and sensors; digital outputs for the clamps.
- **Robot control.** Motion control of the two JAKA cobots: pickup, tray loading and box sorting.
- **Safety.** E-stop, collision stop and safety-door interlocks.
- **Operator dashboard.** Live camera views, per-slot status and manual controls.

## What I learned and would improve next

- Retraining on hard negatives (empty pockets under real lighting) moved accuracy far more than tuning thresholds.
- Next: log every decision with its image so drift can be caught before it becomes a stop on the line.
