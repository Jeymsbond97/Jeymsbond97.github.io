---
title: "교육용 티칭 로봇"
outcome: "JAKA MiniCobo의 색상·형태 분류 픽앤플레이스를 산업 전시회에서 라이브로 시연했습니다."
order: 6
group: robotics
featured: true
period: "2026"
status: "국내 산업 전시회 출품"
client: "쿳션 (사내 전시 데모)"
role: "로봇 티칭, 픽앤플레이스 시퀀스 구축, 비전 설정"
team: "쿳션"
cover: "https://i.ytimg.com/vi/y0vjoXO-Isk/maxresdefault.jpg"
coverPos: "50% 45%"
coverAlt: "트레이닝 워크스테이션에서 흡착 툴로 컬러 부품을 집는 JAKA MiniCobo"
youtube:
  - { id: "y0vjoXO-Isk", title: "JAKA MiniCobo 픽앤플레이스 데모" }
tags: ["JAKA App", "Drag teaching", "Graphical programming", "Node-RED", "Vision", "TCP"]
results:
  - { value: "4 × 3", label: "인식하는 색상 × 형태" }
  - { value: "3", label: "하나의 시퀀스에 포함된 모듈" }
flow:
  - "키트 카메라가 부품의 색상과 형태 인식"
  - "Node-RED가 결과를 TCP로 로봇에 전송"
  - "로봇이 흡착 툴로 부품 픽업"
  - "컨베이어, 보관, 조립 모듈 사이로 부품 이동"
stack:
  - { group: "로봇·하드웨어", items: ["JAKA MiniCobo (6축)", "JAKA E02 워크스테이션", "진공 흡착 툴", "키트 카메라"] }
  - { group: "로봇 소프트웨어", items: ["JAKA App", "Drag teaching", "Graphical programming"] }
  - { group: "비전", items: ["색상 인식", "형태 인식"] }
  - { group: "통신 프로토콜", items: ["TCP"] }
  - { group: "도구", items: ["Node-RED"] }
---

## 목표

- **부스 데모.** 국내 산업 전시회 부스용 픽앤플레이스 데모 제작.
- **무인 운영.** 사람의 도움 없이 하루 종일 작동해야 함.
- **두 가지 시연.** 소형 교육용 협동로봇으로 로봇 티칭과 비전을 모두 보여 줘야 함.

## 제가 만든 것

- **티칭.** JAKA 드래그 티칭과 그래픽 프로그래밍으로 모든 위치와 동작을 티칭하고, 이름이 명확한 작은 서브프로그램으로 나눠 키트를 옮긴 뒤에도 빠르게 재티칭.
- **시퀀스.** 진공 흡착 툴로 컨베이어, 보관, 조립 모듈을 아우르는 전체 픽앤플레이스 흐름 구축.
- **비전.** 키트 카메라로 4가지 색상과 3가지 형태 인식.
- **Node-RED 연동.** Node-RED가 인식 결과를 TCP로 로봇에 전송.
- **부스 운영.** 전시회 기간 동안 데모를 연속 운영.
