---
title: "Booster K1: 강화학습 기반 휴머노이드 보행"
outcome: "22자유도 휴머노이드가 서고, 균형을 잡고, 걷도록 학습시키는 파이프라인을 처음부터 구축: MuJoCo, PPO, sim2sim, sim2real."
order: 9
group: physical-ai
featured: true
role: "개인 프로젝트"
period: "2026 – 현재"
team: "개인"
platform: "Booster K1 휴머노이드 (22 DoF) · MuJoCo · Isaac Lab / Isaac Gym URDF"
status: "진행 중, 오픈소스"
cover: "svg:humanoid"
coverAlt: "관절 표시가 있는 휴머노이드 로봇 라인 드로잉"
repo: "https://github.com/Jeymsbond97/Booster"
tags: ["Reinforcement learning", "PPO", "MuJoCo", "Isaac Lab", "PyTorch", "Sim2sim", "Sim2real"]
results:
  - { value: "22", label: "자유도: 머리 2, 팔 4 × 2, 다리 6 × 2" }
  - { value: "7", label: "MJCF 모델부터 로봇 제로샷 배포까지의 단계" }
diagram:
  lanes:
    - { label: "시뮬레이션", nodes: ["K1 MJCF / URDF", "PD 기립 베이스라인", "커스텀 K1 환경"] }
    - { label: "학습", nodes: ["PPO (GPU)", "푸시 복원", "보행 정책"] }
    - { label: "전이", nodes: ["MuJoCo에서 sim2sim", "K1 실기체 sim2real"] }
  sink: "기립 · 균형 · 보행"
---

## 문제

휴머노이드 보행 정책은 블랙박스처럼 실행되는 경우가 많습니다. 이 프로젝트의 목표는 Booster Gym 파이프라인 전체를 직접 다시 구현해 모든 단계를 이해하는 것입니다. 시뮬레이션에서 PPO로 정책을 학습하고, 두 번째 시뮬레이터에서 검증한 뒤, 로봇에 제로샷으로 배포합니다.

## 내가 만든 것

- 모델 분석 및 상태 읽기 도구(기구학 트리, 관절, 액추에이터, 센서, 카메라)를 포함한 MuJoCo 기반 K1 환경 구성과 MJCF 해설 문서 작성.
- 단계별 로드맵: 직접 작성한 PD 기립 제어기와 그 한계, 최소 구현 PPO(CartPole → Walker2d), 기립 및 푸시 복원을 위한 커스텀 K1 환경, GPU 보행 학습, sim2sim 및 sim2real.
- 두 시뮬레이터용 모델: 직렬/병렬 발목 구조의 MJCF, Isaac Gym / Isaac Lab용 URDF.

## 배운 점과 다음 개선 사항

- MJCF를 한 줄씩 읽어 보면(토크 제한, 발목 링크 구조) 학습을 시작하기도 전에 많은 '이해하기 어려운' sim2real 격차의 원인을 알 수 있습니다.
- 다음 단계: 각 단계가 완료될 때마다 학습 곡선과 sim2sim 영상을 공개할 예정입니다.
