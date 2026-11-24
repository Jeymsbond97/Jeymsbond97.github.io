---
title: "Lumi understands like a human"
date: 2026-11-16T20:24:00+09:00
place: "Seoul"
category: Tech
summary: "Ordinary spoken requests, no fixed commands: how speech, a local LLM and RGB-D vision run together on JAKA Lumi's onboard computer."
cover: "https://i.ytimg.com/vi/pTycKLKFRaU/maxresdefault.jpg"
coverAlt: "JAKA Lumi in the office responding to a spoken request"
youtube: "pTycKLKFRaU"
linkedin: "https://www.linkedin.com/feed/update/urn:li:activity:7528055392053010432/"
---

This is JAKA Lumi, a wheeled mobile manipulator developed by JAKA Robotics as an embodied AI platform. It combines a mobile base with lidar-based navigation, a lifting column, a rotating waist, a two-axis head and a six-axis JAKA collaborative arm with a gripper: 12 degrees of freedom in total. For perception it uses two RGB-D cameras and a microphone array, and its onboard AI computing runs on an NVIDIA Jetson AGX Thor.

What if you could simply tell a robot what you need, the same way you would ask a colleague?

That is what I am building with Lumi. I gave Lumi ordinary spoken requests, with no fixed commands and no special phrasing, and it understood and acted on them.

## How it works

The system is a pipeline of several AI components, all running on the robot's onboard computer:

- **ASR** transcribes the speech into text.
- **An LLM** interprets the intent of each request, including short and informal phrasing, and translates it into executable tasks for the mobile base, the body and the arm.
- **TTS** gives spoken feedback, so the robot can confirm its actions during the interaction.

In parallel, the **computer vision system** works with the depth cameras to give the robot spatial awareness. It detects people and objects, estimates their position and distance relative to the robot, and identifies attributes such as colour and shape. This lets language-based instructions be grounded in the robot's physical environment.

## Why everything runs locally

Running the entire system on the robot was a deliberate design decision. It reduces response latency, keeps all audio and visual data on the device, and lets the robot work without a network.

This is only the first step. There is much more to learn, and I will keep sharing as Lumi grows.
