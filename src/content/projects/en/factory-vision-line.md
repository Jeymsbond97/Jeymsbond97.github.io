---
title: "Real-time vision for a factory line"
outcome: "Cameras replaced unreliable part sensors on a live production line. Vision now drives two JAKA cobots and the PLC. Passed customer acceptance in Aug 2026."
order: 2
group: robotics
featured: true
period: "Apr 2026 – Aug 2026"
status: "Delivered, passed customer acceptance (Aug 2026)"
client: "Taesung"
role: "Built the vision system, line server, PLC and robot integration and the operator dashboard"
team: "Cutshion"
hardware: "3 USB cameras · mini PC · 2 JAKA cobots · LS PLC"
cover: "https://i.ytimg.com/vi/3sMe1mavDQk/maxresdefault.jpg"
coverPos: "50% 20%"
coverAlt: "Live dashboard of the vision system with pickup slots turning green as transparent parts arrive"
youtube:
  - { id: "3sMe1mavDQk", title: "Real-Time Vision for a Factory Line" }
tags: ["Python", "OpenCV", "scikit-learn", "FastAPI", "React", "Modbus TCP", "LS PLC (XG5000)", "JAKA SDK"]
results:
  - { value: "99.7%", label: "Full/empty accuracy (was 89.9%)" }
  - { value: "33 → 3", label: "False positives on 960 samples" }
  - { value: "0", label: "Empty-pocket false triggers in live tests" }
  - { value: "Aug 2026", label: "Customer acceptance passed" }
flow:
  - "A camera above each conveyor watches the parts arrive"
  - "Vision checks every pocket: full or empty"
  - "The server tells the PLC and robots when to pick"
  - "Robots pick the parts, fill trays and pack boxes"
stack:
  - { group: "Languages", items: ["Python"] }
  - { group: "Frameworks", items: ["FastAPI", "React"] }
  - { group: "AI / Vision", items: ["OpenCV", "scikit-learn", "CLAHE", "Hough circles", "Full/empty classifier"] }
  - { group: "Robot / Hardware", items: ["2 × JAKA cobots", "JAKA SDK", "LS PLC", "3 × USB cameras (720p30)", "Mini PC", "E-stop and door interlocks"] }
  - { group: "Protocols", items: ["Modbus TCP", "Digital I/O"] }
  - { group: "Tools", items: ["XG5000 (PLC programming)"] }
---

## Problem

- **Unreliable sensors.** Taesung's packing line detected parts with sensors that were unreliable and caused frequent stops and errors.
- **Transparent parts.** The clear molded parts barely stand out against the white conveyor pockets, where even an empty pocket looks like a circle.
- **Wrong signal.** Circle detection could count parts but could not tell a full pocket from an empty one, which is the signal the robots need.

## What I built

- **Cameras instead of sensors.** One camera per conveyor counts arriving parts with CLAHE contrast enhancement and Hough circles.
- **Full/empty check.** Retraining the pocket classifier on hard negatives (empty pockets under real lighting) lifted accuracy from 89.9% to 99.7%.
- **Line server.** A Python/FastAPI server links cameras, PLC, robots, tray feeder and grippers and starts the pick program when the pickup zone is full.
- **PLC and robots.** I connected the LS PLC over Modbus TCP and programmed two JAKA cobots for pickup, tray loading and box sorting.
- **Safety.** The cell has E-stop, collision stop and safety-door interlocks.
- **Operator dashboard.** A React dashboard shows live cameras and per-slot status with manual controls.
