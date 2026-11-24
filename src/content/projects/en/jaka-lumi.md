---
title: "JAKA Lumi: AI service robot software"
outcome: "The application software that gives the JAKA Lumi robot voice, vision, navigation and pick-and-place, all running on board. Shown live at Robot World 2026."
order: 1
group: robotics
featured: true
period: "May 2026 – present"
status: "Shown at Robot World 2026 (Nov 2026)"
client: "Cutshion (in-house R&D)"
role: "Sole developer of the application software: voice, vision, navigation, manipulation and apps"
team: "Cutshion, Advanced Development Team"
hardware: "JAKA Lumi mobile manipulator · NVIDIA Jetson AGX Thor · 2 RGB-D cameras · mic array"
cover: "/video/pTycKLKFRaU.jpg"
coverPos: "50% 40%"
coverAlt: "JAKA Lumi service robot answering spoken requests with on-device AI"
youtube:
  - { id: "pTycKLKFRaU", title: "JAKA Lumi Service Robot" }
  - { id: "NT1QNNQaFak", title: "JAKA Lumi at Robot World 2026 (Part 1)" }
  - { id: "bOgMzCQHOGQ", title: "JAKA Lumi at Robot World 2026 (Part 2)" }
gallery:
  - { src: "/projects/jaka-lumi/home.webp", alt: "Lumi App home screen with a live 3D robot, behaviour modes, joystick and STOP button" }
  - { src: "/projects/jaka-lumi/map-route-stops.webp", alt: "Lumi App map screen with a patrol route and stops on the robot's lidar map" }
repo: "https://github.com/Jeymsbond97/Jaka-Lumi"
links:
  - { label: "Lumi App (React Native)", href: "https://github.com/Jeymsbond97/lumi-app" }
tags: ["Python", "FastAPI", "YOLO", "TensorRT", "whisper.cpp", "Ollama LLM", "TTS", "RGB-D", "Jetson Thor", "React Native"]
results:
  - { value: "~2 s", label: "From question to first spoken word" }
  - { value: "4-13 ms", label: "YOLO + TensorRT per frame" }
  - { value: "3.3 mm", label: "Hand-eye calibration accuracy" }
  - { value: "0", label: "Cloud services needed" }
flow:
  - "A visitor says \"Hi Lumi\" and asks in their own words"
  - "Speech becomes text on the robot itself"
  - "A local LLM turns the request into robot tasks"
  - "The cameras locate the person or object"
  - "Lumi answers, drives there or picks the object up"
stack:
  - { group: "Languages", items: ["Python"] }
  - { group: "Frameworks", items: ["FastAPI", "React Native"] }
  - { group: "AI / Vision", items: ["YOLO", "TensorRT", "whisper.cpp", "Ollama", "Gemma (local LLM)", "Text-to-speech", "Wake word", "Hand-eye calibration"] }
  - { group: "Robot / Hardware", items: ["JAKA Lumi", "NVIDIA Jetson AGX Thor", "2 × RGB-D cameras", "6-mic array", "Lidar base", "6-axis arm + gripper"] }
  - { group: "Protocols", items: ["REST API"] }
  - { group: "Tools", items: ["Swagger", "Web dashboard", "Lidar map navigation"] }
---

## Problem

JAKA Lumi is a mobile manipulator made by JAKA Robotics. It has no assistant behaviour out of the box. My job was the application software that lets visitors simply talk to it.

- **Cloud dependence.** Cloud speech and LLM services need a network, add delay and send audio and video off the robot.
- **Fixed commands.** A list of fixed command phrases fails as soon as a visitor speaks naturally.
- **Slow replies.** A pipeline that waits for each stage to finish makes the robot feel slow.
- **Grasping.** Picking needs the camera and the arm to agree on positions.

## What I built

- **On-device voice.** Wake word, whisper.cpp speech recognition, a local LLM (Gemma via Ollama) that turns free speech into robot tasks and Korean/English TTS, all on the Jetson AGX Thor.
- **Streaming replies.** STT, LLM and TTS all stream, so the first words come about 2 s after the question and visitors can interrupt.
- **Vision.** YOLO with TensorRT (4-13 ms per frame) finds people and objects with position, distance, colour and shape, so "come here" or "pick up the cup" maps to a real target.
- **Pick-and-place.** My own hand-eye calibration (3.3 mm) plus a grip check before placing, with the controller's IK for every pose.
- **Navigation.** Patrol routes on a saved lidar map, stops for people in the path and Greeter, Wave and Welcome modes for exhibitions.
- **Control surface.** A REST API with Swagger docs, a web dashboard (live cameras, map, click-to-drive) and a React Native app for phones and tablets.
