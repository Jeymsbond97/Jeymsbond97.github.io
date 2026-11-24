---
title: "MuJoCo 기반 PiCar 사과 수확 로봇"
outcome: "카메라로 사과를 찾고 장애물을 피해 주행한 뒤 집어 올리는 시뮬레이션 로봇 카: 90회 중 87회 깔끔한 픽업, 장애물 접촉 0회."
order: 7
group: physical-ai
featured: true
role: "개인 프로젝트: 모델, 인식, 제어 및 벤치마크"
period: "2026"
team: "개인"
platform: "MuJoCo · Adeept PiCar Pro V2 MJCF 모델"
status: "오픈소스"
cover: "https://raw.githubusercontent.com/Jeymsbond97/picar-mujoco-apple-picker/HEAD/media/approach.png"
coverAlt: "빨간 사과를 검출하는 시뮬레이션 차량의 전방 카메라 화면과 추적 카메라 화면"
gallery:
  - { src: "https://raw.githubusercontent.com/Jeymsbond97/picar-mujoco-apple-picker/HEAD/media/grasp.png", alt: "사과를 파지하는 차량의 4자유도 팔" }
  - { src: "https://raw.githubusercontent.com/Jeymsbond97/picar-mujoco-apple-picker/HEAD/media/holding.png", alt: "사과를 지면 위로 들어 올린 차량" }
repo: "https://github.com/Jeymsbond97/picar-mujoco-apple-picker"
tags: ["MuJoCo", "MJCF", "Python", "OpenCV", "Inverse kinematics", "State machine", "Potential field"]
results:
  - { value: "87 / 90", label: "사과와 장애물을 무작위 배치한 3개 시드에서의 깔끔한 픽업 (97%)" }
  - { value: "0 / 90", label: "장애물과 한 번이라도 접촉한 에피소드" }
  - { value: "0.5–0.7 mm", label: "카메라 기반 사과 위치 평균 오차" }
  - { value: "28.0 s", label: "픽업까지의 평균 시뮬레이션 시간" }
diagram:
  lanes:
    - { label: "인식", nodes: ["전방 카메라", "HSV + 형태 필터", "거리 센서 레이 9개"] }
    - { label: "판단", nodes: ["탐색 ⇄ 탐사", "접근 / 이동 / 회피", "픽셀 → 3D"] }
    - { label: "동작", nodes: ["조향 + 구동", "해석적 IK", "픽업 시퀀스"] }
  sink: "접촉 없이 사과 들어 올리기"
---

## 문제

차량형 로봇을 이용한 비전 기반 모바일 매니퓰레이션 과제입니다. 로봇은 제자리 회전을 할 수 없고, 사과는 어디에나(심지어 로봇 뒤에도) 있을 수 있으며, 무작위로 놓인 장애물 6개(그중 하나는 사과로 가는 직선 경로 위)에 절대 닿아서는 안 됩니다.

## 내가 만든 것

- **로봇 모델.** 실제 키트를 따라 MJCF로 처음부터 구현했습니다. 서보 조향 앞바퀴, 모터 구동 뒷바퀴, 평행 그리퍼가 달린 4자유도 팔, 현실적인 토크 제한, 거리 센서 9개를 포함합니다.
- **인식.** HSV 분할과 형태 필터(원형도와 코너 수, 300프레임 주행 동안 두 물체를 측정해 선정)를 결합해 빨간 상자를 사과로 오인하지 않도록 했습니다. 사과의 3D 위치는 카메라 광선과 지면의 교점을 구해 단일 이미지로 산출합니다.
- **제어.** 초당 약 30회 동작하는 상태 머신(탐색, 탐사, 접근, 이동, 후진, 회피, 픽업)에 P 제어기, 포텐셜 필드 기반 장애물 회피, MuJoCo 순기구학으로 검증한 해석적(closed-form) IK(오차 0.0 mm)를 적용했습니다.
- **벤치마크.** 무작위 배치를 사용하는 헤드리스 평가기를 만들었습니다. 모든 실패를 로그와 경로 플롯으로 추적해 근본 원인을 수정했습니다(저장소에 14개 문제 기록).

## 배운 점과 다음 개선 사항

- 튜닝 전에 먼저 측정(원 주기, blob 특징, 실패 플롯)하는 것이, 추측으로는 계속 재발하던 문제들을 해결해 주었습니다.
- 다음 단계: 시뮬레이터의 실제 자세 값을 휠 오도메트리 + IMU로 대체하고, 접근 단계용 RL 정책을 학습시켜 직접 작성한 제어기와 비교할 계획입니다.
