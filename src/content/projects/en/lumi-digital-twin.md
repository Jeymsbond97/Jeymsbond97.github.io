---
title: "JAKA Lumi digital twin in MuJoCo"
outcome: "A MuJoCo model of Lumi to test LLM and vision control before running on the real robot."
order: 8
group: physical-ai
featured: true
period: "2026"
status: "Open source"
client: "Independent / open source"
role: "Built the MuJoCo model, the LumiSim API and the arm planning model"
team: "Solo"
hardware: "JAKA Lumi (simulated) · Robotiq 2F-85 gripper · head camera"
cover: "/projects/lumi-digital-twin/pick.webp"
coverAlt: "Simulated JAKA Lumi picking a cup from a table in MuJoCo"
gallery:
  - { src: "/projects/lumi-digital-twin/wave.webp", alt: "Simulated Lumi waving at a person" }
  - { src: "/projects/lumi-digital-twin/robot.webp", alt: "The full JAKA Lumi model in MuJoCo" }
repo: "https://github.com/Jeymsbond97/Jaka-Lumi"
tags: ["MuJoCo", "MJCF / URDF", "Python", "Kinematics", "Sim-to-real", "LLM + vision"]
results:
  - { value: "~1 mm", label: "Model vs real arm kinematics" }
  - { value: "1 API", label: "Same calls for sim and robot" }
flow:
  - "Build Lumi in MuJoCo from the official URDF"
  - "Add the gripper, head camera and a scene"
  - "Write control code against the LumiSim API"
  - "Test LLM and vision behaviours safely in simulation"
  - "Run the same code on the real robot"
stack:
  - { group: "Languages", items: ["Python"] }
  - { group: "Simulation", items: ["MuJoCo", "MJCF", "URDF"] }
  - { group: "Robotics", items: ["Forward kinematics", "Arm motion planning"] }
  - { group: "Robot / Hardware", items: ["JAKA Lumi", "Robotiq 2F-85 gripper", "Head camera"] }
  - { group: "AI / Vision", items: ["LLM + vision control"] }
---

## Problem

- **Risky testing.** Trying new LLM and vision behaviours directly on a robot that works next to people is slow and risky.
- **Same interface.** Code tested in simulation should run on the real robot without changes.

## What I built

- **Lumi in MuJoCo.** A model built from the official URDF (link geometry, joint axes, masses, limits) with a Robotiq 2F-85 gripper, a head camera and a scene.
- **LumiSim API.** A Python API shaped like the real robot's (`body_moveto`, `pick`, `place`), so the same control code runs in simulation and on hardware.
- **Arm planning model.** A kinematic model used for arm motion on the real robot, with forward kinematics within about 1 mm of the real arm.
