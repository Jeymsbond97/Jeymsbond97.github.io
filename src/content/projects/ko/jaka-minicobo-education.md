---
title: "JAKA MiniCobo 픽앤플레이스 데모"
outcome: "JAKA E02 교육용 워크스테이션에서 색상·형태별로 분류하는 픽앤플레이스 시퀀스를 산업 전시회에서 라이브 시연."
order: 6
group: robotics
featured: true
role: "로봇 티칭, 시퀀스 및 비전 설정"
period: "2026"
team: "쿳션"
platform: "JAKA MiniCobo (6축) · JAKA E02 교육용 트레이닝 워크스테이션"
status: "국내 산업 전시회 출품"
cover: "https://i.ytimg.com/vi/y0vjoXO-Isk/maxresdefault.jpg"
coverPos: "50% 45%"
coverAlt: "트레이닝 워크스테이션에서 흡착 툴로 컬러 부품을 집는 JAKA MiniCobo"
youtube:
  - { id: "y0vjoXO-Isk", title: "JAKA MiniCobo 픽앤플레이스 데모" }
tags: ["JAKA App", "Drag teaching", "Graphical programming", "Node-RED", "Vision", "TCP"]
results:
  - { value: "4 × 3", label: "키트 카메라로 인식하는 색상 × 형태" }
  - { value: "3", label: "하나의 시퀀스에 포함된 트레이닝 모듈: 컨베이어, 보관 플레이트, 조립 스테이션" }
---

## 문제

전시회 데모는 사람의 도움 없이 하루 종일 작동해야 합니다. 또한 소형 교육용 협동로봇으로 티칭과 비전을 모두 방문객에게 보여 줘야 합니다.

## 제가 만든 것

- JAKA 드래그 티칭과 그래픽 프로그래밍으로 로봇의 모든 위치와 동작을 티칭했습니다.
- 진공 흡착 툴을 사용해 컨베이어, 보관, 조립 모듈을 아우르는 전체 픽앤플레이스 시퀀스를 구축했습니다.
- 키트 카메라로 색상과 형태(빨강, 노랑, 초록, 파랑 / 원, 사각형, 육각형) 인식을 설정하고 Node-RED로 결과를 TCP를 통해 로봇에 전송했습니다.
- 부스에서 데모를 연속으로 운영했습니다.

## 배운 점과 다음 개선 사항

- 작고 이름이 명확한 서브프로그램으로 나누어 두니 키트를 옮긴 후에도 위치를 빠르게 다시 티칭할 수 있었습니다.
- 다음 단계: 학생들이 직접 데모를 재현할 수 있도록 간단한 티칭 가이드를 만들 계획입니다.
