---
title: "AI portrait drawing robot"
outcome: "Photo → AI line art → optimized vector paths → a JAKA cobot draws the portrait live on paper."
order: 4
group: robotics
featured: true
role: "Image pipeline, robot path conversion, backend and apps"
period: "2026"
team: "Cutshion"
platform: "JAKA cobot with pen tool · kiosk tablet"
status: "Shown live at a corporate event"
cover: "https://i.ytimg.com/vi/YgD8-ZfAPD8/maxresdefault.jpg"
coverAlt: "A JAKA robot arm drawing a line portrait on paper"
youtube:
  - { id: "YgD8-ZfAPD8", title: "AI Portrait Drawing Robot" }
tags: ["Python", "FastAPI", "OpenCV", "scikit-image", "Gemini API", "Flutter", "React", "Docker", "MinIO", "TCP/IP"]
results:
  - { value: "4", label: "drawing styles: minimal, western, asian, modern" }
  - { value: "A4", label: "safe workspace with pen up/down and speed limits" }
  - { value: "1 → N", label: "central monitoring API for several robots" }
diagram:
  lanes:
    - { label: "Capture", nodes: ["Flutter kiosk camera", "Framing guides", "QR mobile web app"] }
    - { label: "Image", nodes: ["Gemini line art", "Skeleton + contours", "Douglas–Peucker + NN order"] }
    - { label: "Robot", nodes: ["A4 mapping + limits", "Pen calibration", "TCP drawing session"] }
  sink: "Portrait on paper"
---

## Problem

Event visitors want a souvenir in a few minutes, and a robot arm can only draw clean, ordered strokes. A raw photo, or even a raw AI line drawing, turns into thousands of tiny paths and a very long drawing time.

## What I built

- **Image pipeline.** Google Gemini turns the photo into a clean line drawing in one of 4 styles; OpenCV skeletonization and contour detection convert it into vector paths.
- **Path optimization.** Douglas–Peucker simplification and nearest-neighbour ordering cut pen travel; small details such as eyes and lips are drawn slower for quality.
- **Robot drawing.** Paths are mapped into a safe A4 workspace and turned into robot commands (coordinates, pen up/down, safety limits) sent over TCP, with automatic pen calibration and manual X/Y/Z adjustment.
- **Software around it.** A FastAPI backend with background drawing sessions (live progress, pause and resume), a Flutter kiosk app, a QR mobile web app for visitors, S3/MinIO storage, Docker deployment and a central monitoring API for multiple robots.

## What I learned and would improve next

- Path ordering mattered more for drawing time than the robot's speed.
- Next: stroke-width aware rendering so the preview on the tablet matches the paper exactly.
