---
title: "JAKA Lumi: AI service robot"
outcome: "Voice, vision, navigation and pick-and-place running fully on the robot, shown live at Robot World 2026."
order: 1
group: robotics
featured: true
role: "Sole developer of the application software"
period: "May 2026 – present"
team: "Cutshion, Advanced Development Team"
platform: "JAKA Lumi mobile manipulator · NVIDIA Jetson AGX Thor"
status: "Shown at Robot World 2026 (Nov 2026)"
cover: "https://i.ytimg.com/vi/NT1QNNQaFak/maxresdefault.jpg"
coverAlt: "JAKA Lumi driving autonomously in front of the booth at Robot World 2026"
youtube:
  - { id: "NT1QNNQaFak", title: "JAKA Lumi at Robot World 2026 (Part 1)" }
  - { id: "bOgMzCQHOGQ", title: "JAKA Lumi at Robot World 2026 (Part 2)" }
  - { id: "pTycKLKFRaU", title: "Lumi voice test" }
gallery:
  - { src: "https://raw.githubusercontent.com/Jeymsbond97/lumi-app/HEAD/docs/media/home.png", alt: "Lumi App home screen with a live 3D robot, behaviour modes, joystick and STOP button" }
  - { src: "https://raw.githubusercontent.com/Jeymsbond97/lumi-app/HEAD/docs/media/map-route-stops.png", alt: "Lumi App map screen with a patrol route and stops on the robot's lidar map" }
repo: "https://github.com/Jeymsbond97/Jaka-Lumi"
links:
  - { label: "Lumi App (React Native)", href: "https://github.com/Jeymsbond97/lumi-app" }
tags: ["Python", "FastAPI", "YOLO", "TensorRT", "whisper.cpp", "Ollama LLM", "TTS", "RGB-D", "Jetson Thor", "React Native"]
results:
  - { value: "~2 s", label: "from the end of a question to the first spoken words of the answer" }
  - { value: "4–13 ms", label: "YOLO + TensorRT detection per frame on the Jetson" }
  - { value: "3.3 mm", label: "hand-eye calibration accuracy, implemented myself" }
  - { value: "0", label: "cloud services needed: speech, LLM, TTS and vision all run on the robot" }
diagram:
  lanes:
    - { label: "Voice", nodes: ["6-mic array", "whisper.cpp STT", "Local LLM (Ollama)", "Task planner"] }
    - { label: "Vision", nodes: ["RGB-D camera", "YOLO + TensorRT", "3D position + depth", "Grasp / follow"] }
    - { label: "Control", nodes: ["Dashboard + app", "REST API", "Supervisor", "Safety STOP"] }
  sink: "Base · lift · waist · head · arm · gripper · speaker"
---

## Problem

JAKA Lumi is a wheeled mobile manipulator made by JAKA Robotics: a lidar base, a lifting column, a turning waist, a two-axis head, a 6-axis arm with a gripper, two RGB-D cameras and a microphone array. Out of the box it is a capable platform with no assistant behaviour. The goal was to turn it into a robot that people can simply talk to, which greets visitors, drives where it is asked and picks things up, with no cloud and no fixed command phrases.

## What I built

- **Voice assistant.** Wake word "Hi Lumi", speech recognition with whisper.cpp on the GPU, a local LLM (Gemma via Ollama) that turns ordinary requests into robot tasks, and text-to-speech replies in Korean and English. Replies stream, so the first words come about 2 s after the question, and the robot can be interrupted.
- **Vision.** YOLO with TensorRT on the RGB-D cameras for people and objects, with position, distance, colour and shape, so language is grounded in the room: "come here", "look at me", "pick up the cup".
- **Navigation and behaviour modes.** Patrol routes and loops on a saved lidar map, stopping for people in the path; Greeter, Wave and Welcome modes for exhibitions.
- **Manipulation.** Pick-and-place with the arm and gripper, using a hand-eye calibration I implemented (3.3 mm), the controller's IK for every pose and a grip check before placing.
- **Control surface.** A REST API (Swagger docs) for every function, a web dashboard with live cameras, map and click-to-drive, and a React Native app for phones and tablets.

Everything runs on the robot's NVIDIA Jetson AGX Thor: low latency, no audio or video leaves the robot, and it works without a network.

## What I learned and would improve next

- Streaming every stage (STT → LLM → TTS) matters more for perceived speed than raw model size.
- Next: voice-driven fetch tasks end to end, and moving the assistant onto ROS 2 so other robots can reuse the nodes.
