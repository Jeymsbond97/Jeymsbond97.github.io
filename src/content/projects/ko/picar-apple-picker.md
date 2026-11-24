---
title: "MuJoCo 기반 PiCar 사과 수확 로봇"
outcome: "카메라로 사과를 찾고 장애물을 피해 주행한 뒤 집어 올리는 시뮬레이션 로봇 카입니다."
order: 7
group: physical-ai
featured: true
period: "2026"
status: "오픈소스"
client: "개인 / 오픈소스"
role: "로봇 모델, 인식, 제어, 벤치마크 개발"
team: "개인"
hardware: "Adeept PiCar Pro V2 MJCF 모델: 4자유도 팔, 거리 센서 9개"
cover: "/projects/picar-apple-picker/benchmark-run.jpg"
coverPos: "0% 50%"
coverAlt: "빨간 사과를 검출하는 시뮬레이션 차량의 전방 카메라 화면과 추적 카메라 화면"
clip: { src: "/projects/picar-apple-picker/benchmark-run.mp4", poster: "/projects/picar-apple-picker/benchmark-run.jpg", caption: "MuJoCo 벤치마크 실행 화면: 왼쪽은 사과 검출이 표시된 전방 카메라, 오른쪽은 추적 카메라" }
gallery:
  - { src: "/projects/picar-apple-picker/robot.webp", alt: "MJCF로 처음부터 구현한 PiCar Pro V2 모델" }
  - { src: "/projects/picar-apple-picker/grasp.webp", alt: "사과를 파지하는 차량의 4자유도 팔" }
  - { src: "/projects/picar-apple-picker/holding.webp", alt: "사과를 지면 위로 들어 올린 차량" }
repo: "https://github.com/Jeymsbond97/picar-mujoco-apple-picker"
tags: ["MuJoCo", "MJCF", "Python", "OpenCV", "Inverse kinematics", "State machine", "Potential field"]
results:
  - { value: "87 / 90", label: "무작위 시드 3개 기준 깔끔한 픽업" }
  - { value: "0 / 90", label: "장애물 접촉 에피소드" }
  - { value: "≤0.7 mm", label: "사과 위치 평균 오차" }
  - { value: "28.0 s", label: "픽업까지 평균 시뮬레이션 시간" }
flow:
  - "전방 카메라가 빨간 사과 탐지"
  - "이미지 한 장으로 사과의 3D 위치 계산"
  - "상태 머신이 장애물을 피해 사과로 주행"
  - "4자유도 팔이 IK를 풀어 사과를 들어 올림"
stack:
  - { group: "언어", items: ["Python"] }
  - { group: "시뮬레이션", items: ["MuJoCo", "MJCF"] }
  - { group: "비전", items: ["OpenCV", "HSV segmentation", "Shape filters"] }
  - { group: "제어", items: ["State machine", "P-controller", "Potential field", "Analytic IK"] }
  - { group: "로봇·하드웨어", items: ["Adeept PiCar Pro V2 (모델)", "4자유도 팔 + 평행 그리퍼", "거리 센서 9개"] }
  - { group: "도구", items: ["헤드리스 벤치마크", "경로 플롯"] }
---

## 목표

- **탐색과 픽업.** 차량형 로봇이 카메라로 사과를 찾아 주행한 뒤 집어 올려야 함.
- **까다로운 주행.** 제자리 회전이 불가능하고 사과는 로봇 뒤를 포함해 어디에나 있을 수 있음.
- **무접촉.** 사과로 가는 직선 경로 위의 하나를 포함해 무작위로 놓인 장애물 6개에 절대 닿으면 안 됨.

## 제가 만든 것

- **로봇 모델.** 실제 키트를 MJCF로 처음부터 구현: 서보 조향 앞바퀴, 모터 구동 뒷바퀴, 평행 그리퍼가 달린 4자유도 팔, 현실적인 토크 제한, 거리 센서 9개.
- **인식.** 300프레임 주행 동안 두 물체를 측정해 정한 HSV 분할과 형태 필터(원형도, 코너 수)로 빨간 상자를 사과로 오인하지 않도록 설계.
- **이미지 한 장으로 3D.** 카메라 광선과 지면의 교점으로 사과의 3D 위치 산출.
- **제어.** 약 30 Hz 상태 머신(탐색, 탐사, 접근, 이동, 후진, 회피, 픽업)에 P 제어기와 포텐셜 필드 장애물 회피 적용.
- **해석적 IK.** MuJoCo 순기구학 대비 오차 0.0 mm인 4자유도 팔용 닫힌 형태 IK.
- **벤치마크.** 무작위 배치를 사용하는 헤드리스 평가기로 모든 실패를 로그와 경로 플롯으로 추적해 근본 원인 수정(저장소에 14건 기록).
