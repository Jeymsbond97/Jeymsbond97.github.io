---
title: "MuJoCo 기반 JAKA Lumi 디지털 트윈"
outcome: "실제 로봇과 동일한 형태의 Python API를 갖춘 Lumi MuJoCo 모델로, 하드웨어 적용 전에 LLM 및 비전 제어를 테스트합니다."
order: 8
group: physical-ai
featured: true
role: "개인 프로젝트: 모델, API 및 모션 플래닝"
period: "2026"
team: "개인"
platform: "MuJoCo · 공식 URDF 기반 MJCF · Robotiq 2F-85 그리퍼"
status: "오픈소스"
cover: "/projects/lumi-digital-twin/pick.webp"
coverAlt: "MuJoCo에서 테이블 위의 컵을 집는 시뮬레이션 JAKA Lumi"
gallery:
  - { src: "/projects/lumi-digital-twin/wave.webp", alt: "사람에게 손을 흔드는 시뮬레이션 Lumi" }
  - { src: "/projects/lumi-digital-twin/robot.webp", alt: "MuJoCo의 JAKA Lumi 전체 모델" }
repo: "https://github.com/Jeymsbond97/Jaka-Lumi"
tags: ["MuJoCo", "MJCF / URDF", "Python", "Kinematics", "Sim-to-real", "LLM + vision"]
results:
  - { value: "~1 mm", label: "모델과 실제 팔 간의 순기구학 일치도" }
  - { value: "1 API", label: "동일한 호출로 시뮬레이션과 로봇을 모두 구동 (body, arm, pick, place)" }
diagram:
  lanes:
    - { label: "모델", nodes: ["공식 URDF", "MJCF + 그리퍼", "카메라 + 씬"] }
    - { label: "API", nodes: ["LumiSim (Python)", "body_moveto / pick / place", "팔 모션 플래닝"] }
  sink: "동일한 코드 → 실제 Lumi"
---

## 문제

사람 곁에서 작동하는 로봇에서 새로운 LLM·비전 동작을 직접 테스트하는 것은 느리고 위험합니다. 실제 로봇과 동일한 인터페이스를 갖춘 정확한 시뮬레이션이 필요했습니다.

## 제가 만든 것

- 공식 URDF(링크 형상, 관절 축, 질량, 제한값)를 따르고 Robotiq 2F-85 그리퍼, 헤드 카메라, 씬을 포함한 Lumi MuJoCo 모델.
- 실제 로봇과 같은 형태의 Python API인 `LumiSim`(`body_moveto`, `pick`, `place`). 동일한 제어 코드가 시뮬레이션과 하드웨어에서 모두 실행됩니다.
- 실제 로봇의 팔 모션에 사용되는 플래닝 모델. 순기구학이 실제 팔과 약 1 mm 이내로 일치합니다.

## 배운 점과 다음 개선 사항

- 형상뿐 아니라 API까지 일치시켜야 디지털 트윈이 일상적인 개발에 실제로 쓸모가 있습니다.
- 다음 단계: 조명과 사물에 도메인 랜덤화를 적용해 시뮬레이션에서 파지 검출기를 학습시킬 계획입니다.
