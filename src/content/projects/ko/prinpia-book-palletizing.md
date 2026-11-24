---
title: "Prinpia: 로봇 도서 팔레타이징 셀"
outcome: "책을 팔레트 2개에 적재하고 멈춘 지점부터 정확히 재개하는 JAKA 협동로봇 셀입니다."
order: 3
group: robotics
featured: true
period: "2026년 6월 – 2026년 11월"
status: "Prinpia 납품 완료 (2026년 11월)"
client: "Prinpia"
role: "로봇 프로그램과 작업자 앱 개발, 셀 전체 통합"
team: "쿳션"
cover: "https://i.ytimg.com/vi/LLDMCQPEUec/maxresdefault.jpg"
coverPos: "50% 40%"
coverAlt: "팔레트 위에 책을 적재하는 JAKA 협동로봇"
youtube:
  - { id: "LLDMCQPEUec", title: "로봇 도서 팔레타이징 시스템" }
tags: ["JAKA block programming", "Python", "Flask", "TCP/IP sockets", "Modbus I/O", "QR codes"]
results:
  - { value: "2", label: "팔레트 운영, 스태커 자동 전환" }
  - { value: "3", label: "포장 유형: 일반, 밴딩, 박스" }
  - { value: "재개", label: "멈춘 층·행·열에서 정확히 이어서 작업" }
  - { value: "QR", label: "주문 스캔으로 책 크기 자동 입력" }
flow:
  - "작업자가 주문 QR 코드를 스캔하거나 프리셋 선택"
  - "앱이 팔레트 적재 레이아웃 계산"
  - "로봇이 컨베이어에서 책을 하나씩 집어 적재"
  - "팔레트가 가득 차면 반대편 스태커로 자동 전환"
  - "정지 후에도 멈춘 층·행·열에서 정확히 재개"
stack:
  - { group: "언어", items: ["Python"] }
  - { group: "프레임워크", items: ["Flask"] }
  - { group: "로봇·하드웨어", items: ["JAKA 협동로봇", "JAKA block programming", "좌/우 스태커", "컨베이어 버퍼", "실린더", "그리퍼", "안전 도어"] }
  - { group: "통신 프로토콜", items: ["TCP/IP sockets", "Modbus I/O"] }
  - { group: "도구", items: ["QR codes"] }
---

## 문제

- **다양한 규격.** Prinpia는 크기가 다양한 책을 일반, 밴딩, 박스 세 가지 포장 유형으로 출고.
- **재티칭 부담.** 주문마다 적재 패턴이 달라 작업마다 로봇을 다시 티칭하기에는 시간 부담이 큼.
- **중단되는 적재.** 도어 개방, 오류, 교대 근무로 적재가 중간에 멈추며 팔레트를 처음부터 다시 쌓을 수는 없음.

## 제가 만든 것

- **범용 로봇 프로그램.** 좌/우 스태커 서브프로그램을 갖춘 JAKA 블록 프로그램이 작업 정보와 레이아웃을 앱에서 TCP 소켓으로 받아, 새 책 크기도 로봇 수정 없이 데이터 변경만으로 대응.
- **정확한 재개.** 로봇이 진행 상황을 저장해 어떤 정지 후에도 같은 층·행·열에서 이어서 작업.
- **스태커 2대.** 한쪽 팔레트가 가득 차면 반대편 스태커로 자동 전환.
- **작업자 앱.** 책 크기, 유형, 팔레트, 패턴별로 작업을 설정하고 주문 QR 코드에서 책 크기를 불러와 레이아웃을 계산하는 Python/Flask 데스크톱 앱.
- **운영 화면.** 실시간 진행률, 안전 도어 제어, 로그 제공.
- **셀 통합.** 컨베이어 버퍼, 실린더, 스태커 지지대, 그리퍼를 Modbus I/O로 제어해 셀 전체를 하나의 자동 사이클로 운영.
