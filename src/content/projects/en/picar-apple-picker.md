---
title: "PiCar apple picker in MuJoCo"
outcome: "A simulated robot car that finds an apple with its camera, drives around obstacles and picks it up: 87 of 90 clean pick-ups, 0 obstacle contacts."
order: 7
group: physical-ai
featured: true
role: "Independent project: model, perception, control and benchmark"
period: "2026"
team: "Solo"
platform: "MuJoCo · MJCF model of the Adeept PiCar Pro V2"
status: "Open source"
cover: "https://raw.githubusercontent.com/Jeymsbond97/picar-mujoco-apple-picker/HEAD/media/approach.png"
coverAlt: "Front camera view of the simulated car detecting a red apple, next to a chase camera view"
gallery:
  - { src: "https://raw.githubusercontent.com/Jeymsbond97/picar-mujoco-apple-picker/HEAD/media/grasp.png", alt: "The car's 4-DOF arm grasping the apple" }
  - { src: "https://raw.githubusercontent.com/Jeymsbond97/picar-mujoco-apple-picker/HEAD/media/holding.png", alt: "The car holding the apple above the ground" }
repo: "https://github.com/Jeymsbond97/picar-mujoco-apple-picker"
tags: ["MuJoCo", "MJCF", "Python", "OpenCV", "Inverse kinematics", "State machine", "Potential field"]
results:
  - { value: "87 / 90", label: "clean pick-ups across 3 seeds with random apple and obstacle placement (97%)" }
  - { value: "0 / 90", label: "episodes with any obstacle contact" }
  - { value: "0.5–0.7 mm", label: "mean camera-based apple position error" }
  - { value: "28.0 s", label: "average simulated time to pick up" }
diagram:
  lanes:
    - { label: "Sense", nodes: ["Front camera", "HSV + shape filter", "9 range rays"] }
    - { label: "Decide", nodes: ["Search ⇄ explore", "Approach / goto / evade", "Pixel → 3D"] }
    - { label: "Act", nodes: ["Steering + drive", "Analytic IK", "Pick sequence"] }
  sink: "Apple lifted, no contact"
---

## Problem

Vision-guided mobile manipulation with a car-like robot: it cannot turn on the spot, the apple can be anywhere (even behind it), and six random obstacles, one of them in the straight line to the apple, must never be touched.

## What I built

- **The robot model** from scratch in MJCF, following the real kit: servo-steered front wheels, motor-driven rear wheels, a 4-DOF arm with a parallel gripper, realistic torque limits and nine range sensors.
- **Perception.** HSV segmentation plus shape filters (circularity and corner count, chosen by measuring both objects over a 300-frame drive) so a red box is never taken for the apple; the apple's 3D position comes from a single image by intersecting the camera ray with the ground.
- **Control.** A state machine running ~30 times a second (search, explore, approach, goto, backup, evade, pick) with a P-controller, a potential-field obstacle avoider and closed-form IK checked against MuJoCo's forward kinematics (0.0 mm error).
- **Benchmark.** A headless evaluator with random placements; every failure was traced with logs and path plots and fixed at its cause (14 problems documented in the repo).

## What I learned and would improve next

- Measuring before tuning (circle period, blob features, failure plots) solved problems that guessing kept reintroducing.
- Next: replace the simulator's true pose with wheel odometry + IMU, then train an RL policy for the approach and compare it with the hand-written controller.
