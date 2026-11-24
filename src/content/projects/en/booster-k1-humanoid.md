---
title: "Booster K1: humanoid locomotion with RL"
outcome: "A from-scratch pipeline that teaches a K1 humanoid to stand, balance and walk."
order: 9
group: physical-ai
featured: true
period: "2026 – present"
status: "Active · open source"
client: "Independent / open source"
role: "Solo: K1 model tools, PD baseline, PPO training environments, sim2sim and sim2real"
team: "Solo"
hardware: "Booster K1 humanoid (22 DoF: head 2, arms 4 × 2, legs 6 × 2)"
cover: "/projects/booster-k1-humanoid/k1-standing.jpg"
coverAlt: "The Booster K1 model from the project repository, rendered in MuJoCo in a standing pose"
gallery:
  - { src: "/projects/booster-k1-humanoid/k1-joint-axes.jpg", alt: "The same K1 model in MuJoCo with the joint axes shown" }
repo: "https://github.com/Jeymsbond97/Booster"
tags: ["Reinforcement learning", "PPO", "MuJoCo", "Isaac Lab", "PyTorch", "Sim2sim", "Sim2real"]
results:
  - { value: "22", label: "Degrees of freedom on the K1 humanoid" }
  - { value: "7", label: "Stages from model to zero-shot deployment" }
flow:
  - "Load and inspect the K1 model in MuJoCo"
  - "Try a hand-written PD controller for standing"
  - "Train standing, push recovery and walking with PPO"
  - "Check the policy in a second simulator (sim2sim)"
  - "Deploy it zero-shot on the real robot (sim2real)"
stack:
  - { group: "AI / Learning", items: ["Reinforcement learning", "PPO", "PyTorch", "GPU training"] }
  - { group: "Simulation", items: ["MuJoCo", "MJCF", "URDF", "Isaac Lab", "Isaac Gym"] }
  - { group: "Robot / Hardware", items: ["Booster K1 (22 DoF)", "PD control", "Serial and parallel ankles"] }
  - { group: "Methods", items: ["Sim2sim", "Sim2real", "Push recovery"] }
---

## Goal

- **Walking humanoid.** Teach the 22-DoF Booster K1 to stand, balance and walk with a policy trained in simulation.
- **No black box.** Rebuild the Booster Gym pipeline by hand so every stage is understood.
- **Sim to real.** Train with PPO, validate in a second simulator, then deploy zero-shot on the robot.

## What I built

- **K1 in MuJoCo.** Tools that inspect the model and read its state: kinematic tree, joints, actuators, sensors and cameras.
- **MJCF walkthrough.** A line-by-line write-up of the model, since details such as torque limits and ankle linkage explain many sim2real gaps before training starts.
- **PD baseline.** A hand-written PD standing controller that shows why classic control is not enough.
- **Minimal PPO.** A PPO tested on CartPole and Walker2d, then a custom K1 environment for standing and push recovery.
- **Roadmap.** The later stages cover GPU walking training, sim2sim checks and zero-shot sim2real deployment.
- **Two simulators.** MJCF with serial and parallel ankles plus URDFs for Isaac Gym and Isaac Lab.
