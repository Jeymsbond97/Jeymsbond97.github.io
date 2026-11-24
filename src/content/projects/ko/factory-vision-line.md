---
title: "Taesung 공장 자동화 로봇"
subtitle: "JAKA 협동로봇 2대와 비전 기반 포장 라인"
outcome: "불안정한 부품 센서를 카메라로 대체해 협동로봇 2대와 PLC를 비전으로 구동합니다."
order: 2
group: robotics
featured: true
period: "2026년 4월 – 2026년 8월"
status: "납품 완료 · 고객사 검수 통과"
client: "Taesung"
role: "비전 시스템, 라인 서버, PLC·로봇 연동, 작업자 대시보드 개발"
team: "쿳션"
cover: "https://i.ytimg.com/vi/3sMe1mavDQk/maxresdefault.jpg"
coverPos: "50% 20%"
coverAlt: "투명 부품이 도착하면 픽업 슬롯이 초록색으로 바뀌는 비전 시스템 실시간 대시보드"
youtube:
  - { id: "3sMe1mavDQk", title: "생산 라인용 실시간 비전 시스템" }
tags: ["Python", "OpenCV", "scikit-learn", "FastAPI", "React", "Modbus TCP", "LS PLC (XG5000)", "JAKA SDK"]
results:
  - { value: "99.7%", label: "포켓 적재 판별 정확도 (기존 89.9%)" }
  - { value: "33 → 3", label: "샘플 960개 기준 오검출 수" }
  - { value: "0", label: "실가동 테스트 빈 포켓 오트리거" }
  - { value: "2026.08", label: "고객사 검수 통과" }
flow:
  - "컨베이어마다 설치한 카메라가 도착하는 부품 촬영"
  - "비전이 포켓별로 적재 여부 판별"
  - "서버가 PLC와 로봇에 픽업 시점 전달"
  - "로봇이 부품을 집어 트레이에 적재하고 박스 포장"
stack:
  - { group: "언어", items: ["Python"] }
  - { group: "프레임워크", items: ["FastAPI", "React"] }
  - { group: "AI·비전", items: ["OpenCV", "scikit-learn", "CLAHE", "Hough circles", "적재 여부 분류기"] }
  - { group: "로봇·하드웨어", items: ["JAKA 협동로봇 × 2", "JAKA SDK", "LS PLC", "USB 카메라 × 3 (720p30)", "미니 PC", "비상 정지·도어 인터록"] }
  - { group: "통신 프로토콜", items: ["Modbus TCP", "Digital I/O"] }
  - { group: "도구", items: ["XG5000 (PLC 프로그래밍)"] }
---

## 문제

- **불안정한 센서.** Taesung의 포장 라인은 센서로 부품을 감지했으나, 센서가 불안정해 라인 정지와 오류가 빈발.
- **투명 부품.** 투명 사출 부품은 흰색 컨베이어 포켓과 대비가 거의 없고, 빈 포켓도 원형으로 보임.
- **필요한 신호 부재.** 원 검출로는 개수만 셀 수 있고, 로봇에 꼭 필요한 포켓 적재 여부는 구분 불가.

## 제가 만든 것

- **센서 대신 카메라.** 컨베이어별 카메라 1대가 CLAHE 대비 향상과 Hough 원 검출로 도착 부품 계수.
- **적재 여부 판별.** 실제 조명 아래의 빈 포켓(하드 네거티브)으로 포켓 분류기를 재학습해 정확도를 89.9%에서 99.7%로 개선.
- **라인 서버.** 카메라, PLC, 로봇, 트레이 피더, 그리퍼를 연결하고 픽업 구역이 가득 차면 픽업 프로그램을 실행하는 Python/FastAPI 서버.
- **PLC 연동.** 라인 서버와 LS PLC를 Modbus TCP로 연결.
- **로봇 제어.** JAKA SDK로 협동로봇 2대의 픽업, 트레이 적재, 박스 분류 동작 구현.
- **안전.** 비상 정지, 충돌 정지, 안전 도어 인터록 적용.
- **작업자 대시보드.** 실시간 카메라 화면, 슬롯별 상태, 수동 제어를 제공하는 React 대시보드.
