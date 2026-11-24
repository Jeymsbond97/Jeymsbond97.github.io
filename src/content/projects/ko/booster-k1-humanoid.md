---
title: "Booster K1: 강화학습 기반 휴머노이드 보행"
outcome: "Booster K1 휴머노이드의 기립·균형·보행 학습 파이프라인을 처음부터 구축하고 있습니다."
order: 9
group: physical-ai
featured: true
period: "2026 – 현재"
status: "진행 중 · 오픈소스"
client: "개인 / 오픈소스"
role: "단독 개발: K1 모델 도구, PD 기준 제어기, PPO 학습 환경, sim2sim, sim2real"
cover: "/projects/booster-k1-humanoid/k1-standing.jpg"
coverAlt: "프로젝트 저장소의 Booster K1 모델을 MuJoCo에서 기립 자세로 렌더링한 이미지"
gallery:
  - { src: "/projects/booster-k1-humanoid/k1-joint-axes.jpg", alt: "관절 축을 표시한 MuJoCo의 K1 모델" }
repo: "https://github.com/Jeymsbond97/Booster"
tags: ["Reinforcement learning", "PPO", "MuJoCo", "Isaac Lab", "PyTorch", "Sim2sim", "Sim2real"]
results:
  - { value: "22", label: "K1 휴머노이드의 자유도" }
  - { value: "7", label: "모델부터 제로샷 배포까지의 단계" }
flow:
  - "MuJoCo에서 K1 모델을 불러와 구조 분석"
  - "직접 작성한 PD 제어기로 기립 시도"
  - "PPO로 기립, 푸시 복원, 보행 학습"
  - "두 번째 시뮬레이터에서 정책 검증 (sim2sim)"
  - "실제 로봇에 제로샷 배포 (sim2real)"
stack:
  - { group: "AI·학습", items: ["Reinforcement learning", "PPO", "PyTorch", "GPU training"] }
  - { group: "시뮬레이션", items: ["MuJoCo", "MJCF", "URDF", "Isaac Lab", "Isaac Gym"] }
  - { group: "로봇·하드웨어", items: ["Booster K1 (22 DoF)", "PD control", "직렬·병렬 발목 구조"] }
  - { group: "방법론", items: ["Sim2sim", "Sim2real", "Push recovery"] }
---

## 목표

- **보행 휴머노이드.** 시뮬레이션에서 학습한 정책으로 22자유도 Booster K1이 서고 균형을 잡고 걷도록 학습.
- **블랙박스 탈피.** Booster Gym 파이프라인을 직접 다시 구현해 모든 단계를 이해.
- **실제 로봇 적용.** PPO로 학습하고 두 번째 시뮬레이터에서 검증한 뒤 로봇에 제로샷 배포.

## 제가 만든 것

- **MuJoCo 기반 K1.** 기구학 트리, 관절, 액추에이터, 센서, 카메라 등 모델 구조와 상태를 읽는 분석 도구.
- **MJCF 해설.** 토크 제한, 발목 링크 구조 같은 세부 사항이 학습 전에 많은 sim2real 격차를 설명하므로 모델을 한 줄씩 정리한 해설 문서.
- **PD 기준 제어기.** 직접 작성한 PD 기립 제어기로 고전 제어만으로는 부족한 이유 확인.
- **최소 구현 PPO.** 처음부터 직접 작성하고 CartPole과 Walker2d로 검증한 PPO.
- **K1 학습 환경.** 기립·푸시 복원용 커스텀 K1 환경.
- **두 시뮬레이터용 모델.** 직렬·병렬 발목 구조의 MJCF와 Isaac Gym / Isaac Lab용 URDF.
- **로드맵.** 이후 단계는 GPU 보행 학습, sim2sim 검증, 제로샷 sim2real 배포.
