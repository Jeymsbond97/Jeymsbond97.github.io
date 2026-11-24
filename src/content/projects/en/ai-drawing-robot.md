---
title: "AI portrait drawing robot"
outcome: "Turns a visitor's photo into AI line art and has a JAKA cobot draw the portrait live on paper."
order: 4
group: robotics
featured: true
period: "2026"
status: "Shown live at a corporate event"
client: "Cutshion (in-house)"
role: "Built the image pipeline, pen path optimizer, robot TCP control, backend and visitor apps"
team: "Cutshion"
hardware: "JAKA cobot with pen tool · kiosk tablet"
cover: "https://i.ytimg.com/vi/YgD8-ZfAPD8/maxresdefault.jpg"
coverAlt: "A JAKA robot arm drawing a line portrait on paper"
youtube:
  - { id: "YgD8-ZfAPD8", title: "AI Portrait Drawing Robot" }
tags: ["Python", "FastAPI", "OpenCV", "scikit-image", "Gemini API", "Flutter", "React", "Docker", "MinIO", "TCP/IP"]
results:
  - { value: "4", label: "Drawing styles from one photo" }
  - { value: "A4", label: "Drawing area with speed and safety limits" }
  - { value: "1 → N", label: "Robots on one monitoring API" }
flow:
  - "The kiosk tablet takes the visitor's photo"
  - "AI turns the photo into clean line art"
  - "The lines become short, ordered pen paths"
  - "The robot draws the portrait on paper"
stack:
  - { group: "Languages", items: ["Python"] }
  - { group: "Frameworks", items: ["FastAPI", "Flutter", "React"] }
  - { group: "AI / Vision", items: ["Gemini API", "OpenCV", "scikit-image", "Douglas-Peucker", "Nearest-neighbour ordering"] }
  - { group: "Robot / Hardware", items: ["JAKA cobot", "Pen tool", "Kiosk tablet"] }
  - { group: "Protocols", items: ["TCP/IP"] }
  - { group: "Tools / Infra", items: ["Docker", "MinIO (S3)", "QR codes"] }
---

## Goal

- **Live portraits.** Build a robot from scratch as a team that draws each visitor's portrait live at an event.
- **Fast turnaround.** Each visitor should get the portrait within a few minutes.
- **Drawable lines.** A raw photo or raw AI line art breaks into thousands of tiny paths, so the image must become short, ordered strokes.

## What I built

- **Image pipeline.** Google Gemini turns the photo into line art in one of 4 styles, then OpenCV skeletonization and contour detection convert it into vector paths.
- **Path optimization.** Douglas-Peucker simplification and nearest-neighbour ordering cut pen travel, because path order mattered more for drawing time than robot speed.
- **Robot drawing.** Paths are mapped into a safe A4 area and sent over TCP as robot commands (coordinates, pen up/down, safety limits).
- **Calibration.** The pen is calibrated automatically and can be adjusted by hand in X, Y and Z.
- **Backend.** A FastAPI service runs each drawing as a background session with live progress, pause and resume.
- **Apps and deployment.** A Flutter kiosk app, a QR mobile web app for visitors, MinIO (S3) storage, Docker deployment and one monitoring API for several robots.
