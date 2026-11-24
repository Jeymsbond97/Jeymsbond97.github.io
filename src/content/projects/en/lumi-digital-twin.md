---
title: "JAKA Lumi digital twin in MuJoCo"
outcome: "A MuJoCo model of Lumi with a Python API shaped like the real robot's, to test LLM and vision control before moving to hardware."
order: 8
group: physical-ai
featured: true
role: "Independent project: model, API and planning"
period: "2026"
team: "Solo"
platform: "MuJoCo · MJCF from the official URDF · Robotiq 2F-85 gripper"
status: "Open source"
cover: "https://raw.githubusercontent.com/Jeymsbond97/Jaka-Lumi/HEAD/sim/media/pick.png"
coverAlt: "Simulated JAKA Lumi picking a cup from a table in MuJoCo"
gallery:
  - { src: "https://raw.githubusercontent.com/Jeymsbond97/Jaka-Lumi/HEAD/sim/media/wave.png", alt: "Simulated Lumi waving at a person" }
  - { src: "https://raw.githubusercontent.com/Jeymsbond97/Jaka-Lumi/HEAD/sim/media/robot.png", alt: "The full JAKA Lumi model in MuJoCo" }
repo: "https://github.com/Jeymsbond97/Jaka-Lumi"
tags: ["MuJoCo", "MJCF / URDF", "Python", "Kinematics", "Sim-to-real", "LLM + vision"]
results:
  - { value: "~1 mm", label: "forward kinematics match between the model and the real arm" }
  - { value: "1 API", label: "the same calls drive the simulation and the robot (body, arm, pick, place)" }
diagram:
  lanes:
    - { label: "Model", nodes: ["Official URDF", "MJCF + gripper", "Cameras + scene"] }
    - { label: "API", nodes: ["LumiSim (Python)", "body_moveto / pick / place", "Arm motion planning"] }
  sink: "Same code → real Lumi"
---

## Problem

Testing new LLM and vision behaviours directly on a robot that works next to people is slow and risky. I needed a faithful simulation with the same interface as the real robot.

## What I built

- A MuJoCo model of Lumi that follows the official URDF (link geometry, joint axes, masses, limits) with a Robotiq 2F-85 gripper, a head camera and a scene.
- `LumiSim`, a Python API shaped like the real robot's (`body_moveto`, `pick`, `place`), so the same control code runs in simulation and on hardware.
- The planning model used for arm motion on the real robot; forward kinematics matches the real arm within about 1 mm.

## What I learned and would improve next

- Matching the API, not just the geometry, is what makes a digital twin useful day to day.
- Next: domain randomization of lighting and objects to train the grasp detector in simulation.
