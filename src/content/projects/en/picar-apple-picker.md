---
title: "PiCar apple picker in MuJoCo"
outcome: "A simulated robot car finds an apple, drives around obstacles and picks it up."
order: 7
group: physical-ai
featured: true
period: "2026"
status: "Open source"
client: "Independent / open source"
role: "Built the robot model, perception, control and benchmark"
cover: "/projects/picar-apple-picker/benchmark-run.jpg"
coverPos: "0% 50%"
coverAlt: "Front camera view of the simulated car detecting a red apple, next to a chase camera view"
clip: { src: "/projects/picar-apple-picker/benchmark-run.mp4", poster: "/projects/picar-apple-picker/benchmark-run.jpg", caption: "Benchmark run in MuJoCo: front camera with the apple detection on the left, chase camera on the right" }
gallery:
  - { src: "/projects/picar-apple-picker/robot.webp", alt: "The PiCar Pro V2 model built from scratch in MJCF" }
  - { src: "/projects/picar-apple-picker/grasp.webp", alt: "The car's 4-DoF arm grasping the apple" }
  - { src: "/projects/picar-apple-picker/holding.webp", alt: "The car holding the apple above the ground" }
repo: "https://github.com/Jeymsbond97/picar-mujoco-apple-picker"
tags: ["MuJoCo", "MJCF", "Python", "OpenCV", "Inverse kinematics", "State machine", "Potential field"]
results:
  - { value: "87 / 90", label: "Clean pick-ups over 3 random seeds" }
  - { value: "0 / 90", label: "Episodes with obstacle contact" }
  - { value: "≤0.7 mm", label: "Mean apple position error" }
  - { value: "28.0 s", label: "Average simulated time to pick" }
flow:
  - "The front camera finds the red apple"
  - "One image gives the apple's 3D position"
  - "A state machine drives around obstacles toward it"
  - "The 4-DoF arm solves IK and lifts the apple"
stack:
  - { group: "Languages", items: ["Python"] }
  - { group: "Simulation", items: ["MuJoCo", "MJCF"] }
  - { group: "Vision", items: ["OpenCV", "HSV segmentation", "Shape filters"] }
  - { group: "Control", items: ["State machine", "P-controller", "Potential field", "Analytic IK"] }
  - { group: "Robot / Hardware", items: ["Adeept PiCar Pro V2 (model)", "4-DoF arm + parallel gripper", "9 range sensors"] }
  - { group: "Tools", items: ["Headless benchmark", "Path plots"] }
---

## Goal

- **Find and pick.** A car-like robot must find an apple with its camera, drive to it and pick it up.
- **Hard motion.** It cannot turn on the spot and the apple can be anywhere, even behind it.
- **No contact.** Six random obstacles must never be touched, including one on the straight line to the apple.

## What I built

- **Robot model.** The real kit rebuilt from scratch in MJCF: servo-steered front wheels, motor-driven rear wheels, a 4-DoF arm with a parallel gripper, realistic torque limits and 9 range sensors.
- **Perception.** HSV segmentation plus shape filters (circularity, corner count), tuned by measuring both objects over a 300-frame drive, so a red box is never taken for the apple.
- **3D from one image.** The apple's 3D position comes from where the camera ray meets the ground.
- **Control.** A 30 Hz state machine (search, explore, approach, goto, backup, evade, pick) with a P-controller.
- **Obstacle avoidance.** A potential-field avoider keeps the car clear of the six obstacles.
- **Closed-form IK.** Analytic IK for the 4-DoF arm with 0.0 mm error against MuJoCo's forward kinematics.
- **Benchmark.** A headless evaluator with random placements, where every failure was traced with logs and path plots and fixed at its cause (14 documented in the repo).
