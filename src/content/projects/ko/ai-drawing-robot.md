---
title: "AI 초상화 드로잉 로봇"
outcome: "방문객 사진을 AI 라인 아트로 바꾸고 JAKA 협동로봇이 종이에 실시간으로 그립니다."
order: 4
group: robotics
featured: true
period: "2026"
status: "기업 행사에서 라이브 시연"
client: "쿳션 (사내 프로젝트)"
role: "이미지 파이프라인, 펜 경로 최적화, 로봇 TCP 제어, 백엔드 및 방문객 앱 개발"
team: "쿳션"
cover: "https://i.ytimg.com/vi/YgD8-ZfAPD8/maxresdefault.jpg"
coverAlt: "종이 위에 라인 초상화를 그리는 JAKA 로봇팔"
youtube:
  - { id: "YgD8-ZfAPD8", title: "AI 초상화 드로잉 로봇" }
tags: ["Python", "FastAPI", "OpenCV", "scikit-image", "Gemini API", "Flutter", "React", "Docker", "MinIO", "TCP/IP"]
results:
  - { value: "4", label: "사진 한 장으로 고르는 드로잉 스타일" }
  - { value: "A4", label: "속도·안전 제한이 적용된 드로잉 영역" }
  - { value: "1 → N", label: "모니터링 API 하나로 여러 로봇 관리" }
flow:
  - "키오스크 태블릿으로 방문객 사진 촬영"
  - "AI가 사진을 깔끔한 라인 아트로 변환"
  - "선을 짧고 순서가 정해진 펜 경로로 변환"
  - "로봇이 종이 위에 초상화 드로잉"
stack:
  - { group: "언어", items: ["Python"] }
  - { group: "프레임워크", items: ["FastAPI", "Flutter", "React"] }
  - { group: "AI·비전", items: ["Gemini API", "OpenCV", "scikit-image", "Douglas-Peucker", "Nearest-neighbour ordering"] }
  - { group: "로봇·하드웨어", items: ["JAKA 협동로봇", "펜 툴", "키오스크 태블릿"] }
  - { group: "통신 프로토콜", items: ["TCP/IP"] }
  - { group: "도구·인프라", items: ["Docker", "MinIO (S3)", "QR codes"] }
---

## 목표

- **실시간 초상화.** 행사 현장에서 방문객의 초상화를 실시간으로 그리는 로봇을 팀과 함께 처음부터 개발.
- **빠른 제공.** 방문객이 몇 분 안에 초상화를 받을 수 있어야 함.
- **그릴 수 있는 선.** 원본 사진이나 AI 라인 아트는 수천 개의 작은 경로로 쪼개지므로 짧고 순서가 정해진 선으로 변환 필요.

## 제가 만든 것

- **이미지 파이프라인.** Google Gemini로 사진을 4가지 스타일 중 하나의 라인 아트로 변환하고 OpenCV 스켈레톤화와 윤곽선 검출로 벡터 경로 생성.
- **경로 최적화.** 드로잉 시간에는 로봇 속도보다 경로 순서가 더 중요해 Douglas-Peucker 단순화와 최근접 이웃 순서화로 펜 이동 거리 단축.
- **로봇 드로잉.** 경로를 안전한 A4 영역에 매핑하고 로봇 명령(좌표, 펜 업/다운, 안전 제한)으로 변환해 TCP로 전송.
- **캘리브레이션.** 펜 자동 캘리브레이션과 X/Y/Z 수동 보정 지원.
- **백엔드.** 드로잉을 백그라운드 세션으로 실행하는 FastAPI 서비스(실시간 진행률, 일시정지, 재개).
- **키오스크 앱.** 키오스크 태블릿에서 방문객 사진을 촬영하는 Flutter 앱.
- **방문객 웹앱.** 방문객이 QR 코드로 여는 모바일 웹앱.
- **모니터링 API.** 여러 로봇을 하나의 API로 모니터링.
- **배포.** MinIO(S3) 스토리지와 Docker 배포.
