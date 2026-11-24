---
title: "MuJoCo 기반 JAKA Lumi 디지털 트윈"
outcome: "실제 로봇 적용 전에 LLM·비전 제어를 테스트하는 Lumi의 MuJoCo 모델입니다."
order: 8
group: physical-ai
featured: true
period: "2026"
status: "오픈소스"
client: "개인 / 오픈소스"
role: "MuJoCo 모델, LumiSim API, 팔 모션 플래닝 모델 개발"
team: "개인"
hardware: "JAKA Lumi (시뮬레이션) · Robotiq 2F-85 그리퍼 · 헤드 카메라"
cover: "/projects/lumi-digital-twin/pick.webp"
coverAlt: "MuJoCo에서 테이블 위의 컵을 집는 시뮬레이션 JAKA Lumi"
gallery:
  - { src: "/projects/lumi-digital-twin/wave.webp", alt: "사람에게 손을 흔드는 시뮬레이션 Lumi" }
  - { src: "/projects/lumi-digital-twin/robot.webp", alt: "MuJoCo의 JAKA Lumi 전체 모델" }
repo: "https://github.com/Jeymsbond97/Jaka-Lumi"
tags: ["MuJoCo", "MJCF / URDF", "Python", "Kinematics", "Sim-to-real", "LLM + vision"]
results:
  - { value: "~1 mm", label: "모델과 실제 팔의 순기구학 차이" }
  - { value: "1 API", label: "시뮬레이션과 로봇에 같은 호출" }
flow:
  - "공식 URDF를 기반으로 MuJoCo에 Lumi 구현"
  - "그리퍼, 헤드 카메라, 씬 추가"
  - "LumiSim API로 제어 코드 작성"
  - "시뮬레이션에서 LLM·비전 동작을 안전하게 테스트"
  - "같은 코드를 실제 로봇에서 실행"
stack:
  - { group: "언어", items: ["Python"] }
  - { group: "시뮬레이션", items: ["MuJoCo", "MJCF", "URDF"] }
  - { group: "로보틱스", items: ["순기구학", "팔 모션 플래닝"] }
  - { group: "로봇·하드웨어", items: ["JAKA Lumi", "Robotiq 2F-85 그리퍼", "헤드 카메라"] }
  - { group: "AI·비전", items: ["LLM + vision control"] }
---

## 문제

- **위험한 테스트.** 사람 곁에서 작동하는 로봇에서 새로운 LLM·비전 동작을 직접 테스트하면 느리고 위험함.
- **같은 인터페이스.** 시뮬레이션에서 검증한 코드를 수정 없이 실제 로봇에서 실행할 수 있어야 함.

## 제가 만든 것

- **MuJoCo 기반 Lumi.** 공식 URDF(링크 형상, 관절 축, 질량, 제한값)를 따르고 Robotiq 2F-85 그리퍼, 헤드 카메라, 씬을 포함한 모델.
- **LumiSim API.** 실제 로봇과 같은 형태의 Python API(`body_moveto`, `pick`, `place`)로 같은 제어 코드를 시뮬레이션과 하드웨어에서 모두 실행.
- **팔 플래닝 모델.** 실제 로봇의 팔 모션에 사용하는 기구학 모델로, 순기구학이 실제 팔과 약 1 mm 이내로 일치.
