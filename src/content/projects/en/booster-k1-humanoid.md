---
title: "Booster K1: humanoid locomotion with RL"
outcome: "A from-scratch pipeline to teach a 22-DoF humanoid to stand, balance and walk: MuJoCo, PPO, sim2sim, sim2real."
order: 9
group: physical-ai
featured: true
role: "Independent project"
period: "2026 – present"
team: "Solo"
platform: "Booster K1 humanoid (22 DoF) · MuJoCo · Isaac Lab / Isaac Gym URDFs"
status: "Active, open source"
cover: "svg:humanoid"
coverAlt: "Line drawing of a humanoid robot with joint markers"
repo: "https://github.com/Jeymsbond97/Booster"
tags: ["Reinforcement learning", "PPO", "MuJoCo", "Isaac Lab", "PyTorch", "Sim2sim", "Sim2real"]
results:
  - { value: "22", label: "degrees of freedom: head 2, arms 4 × 2, legs 6 × 2" }
  - { value: "7", label: "stages from the MJCF model to zero-shot deployment on the robot" }
diagram:
  lanes:
    - { label: "Sim", nodes: ["K1 MJCF / URDF", "PD standing baseline", "Custom K1 env"] }
    - { label: "Learn", nodes: ["PPO (GPU)", "Push recovery", "Walking policy"] }
    - { label: "Transfer", nodes: ["Sim2sim in MuJoCo", "Sim2real on K1"] }
  sink: "Stand · balance · walk"
---

## Problem

Humanoid locomotion policies are often run as black boxes. The aim of this project is to rebuild the full Booster Gym pipeline by hand, so every stage is understood: train a policy in simulation with PPO, validate it in a second simulator, then deploy it zero-shot on the robot.

## What I built

- The K1 setup in MuJoCo with model inspection and state-reading tools (kinematic tree, joints, actuators, sensors, cameras) and a written walkthrough of the MJCF.
- A staged roadmap: a hand-written PD standing controller and why it is not enough, a minimal PPO (CartPole → Walker2d), a custom K1 environment for standing and push recovery, GPU walking training, sim2sim and sim2real.
- Models for both simulators: MJCF with serial and parallel ankles, and URDFs for Isaac Gym / Isaac Lab.

## What I learned and would improve next

- Reading the MJCF line by line (torque limits, ankle linkage) explains many "mysterious" sim2real gaps before training even starts.
- Next: publish training curves and the sim2sim videos as each stage lands.
