---
title: "JAKA Lumi: AI 서비스 로봇 소프트웨어"
outcome: "JAKA Lumi 로봇에 음성, 비전, 내비게이션, 픽앤플레이스 기능을 더하는 애플리케이션 소프트웨어입니다. 모든 기능이 로봇 내부에서 실행되며, 로보월드 2026(Robot World 2026)에서 라이브로 시연했습니다."
order: 1
group: robotics
featured: true
period: "2026년 5월 – 현재"
status: "로보월드 2026 출품 (2026년 11월)"
client: "쿳션 (사내 선행 개발)"
role: "애플리케이션 소프트웨어 단독 개발: 음성, 비전, 내비게이션, 매니퓰레이션, 앱"
team: "쿳션 선행개발실"
hardware: "JAKA Lumi 모바일 매니퓰레이터 · NVIDIA Jetson AGX Thor · RGB-D 카메라 2대 · 마이크 어레이"
cover: "https://i.ytimg.com/vi/NT1QNNQaFak/maxresdefault.jpg"
coverPos: "50% 35%"
coverAlt: "로보월드 2026 부스 앞을 자율주행하는 JAKA Lumi"
youtube:
  - { id: "NT1QNNQaFak", title: "로보월드 2026의 JAKA Lumi (1부)" }
  - { id: "bOgMzCQHOGQ", title: "로보월드 2026의 JAKA Lumi (2부)" }
  - { id: "pTycKLKFRaU", title: "Lumi 음성 테스트" }
gallery:
  - { src: "/projects/jaka-lumi/home.webp", alt: "실시간 3D 로봇, 행동 모드, 조이스틱, STOP 버튼이 있는 Lumi App 홈 화면" }
  - { src: "/projects/jaka-lumi/map-route-stops.webp", alt: "로봇의 라이다 맵 위에 순찰 경로와 정차 지점이 표시된 Lumi App 지도 화면" }
repo: "https://github.com/Jeymsbond97/Jaka-Lumi"
links:
  - { label: "Lumi App (React Native)", href: "https://github.com/Jeymsbond97/lumi-app" }
tags: ["Python", "FastAPI", "YOLO", "TensorRT", "whisper.cpp", "Ollama LLM", "TTS", "RGB-D", "Jetson Thor", "React Native"]
results:
  - { value: "~2 s", label: "질문 후 첫 음성 응답까지" }
  - { value: "4-13 ms", label: "프레임당 YOLO + TensorRT 검출" }
  - { value: "3.3 mm", label: "핸드아이 캘리브레이션 정확도" }
  - { value: "0", label: "필요한 클라우드 서비스" }
flow:
  - "방문객이 \"Hi Lumi\"라고 부른 뒤 자유롭게 요청"
  - "로봇 내부에서 음성을 텍스트로 변환"
  - "로컬 LLM이 요청을 로봇 작업으로 변환"
  - "카메라가 사람이나 물체의 위치 파악"
  - "Lumi가 대답하거나 이동하거나 물건을 집음"
stack:
  - { group: "언어", items: ["Python"] }
  - { group: "프레임워크", items: ["FastAPI", "React Native"] }
  - { group: "AI·비전", items: ["YOLO", "TensorRT", "whisper.cpp", "Ollama", "Gemma (로컬 LLM)", "TTS", "웨이크 워드", "핸드아이 캘리브레이션"] }
  - { group: "로봇·하드웨어", items: ["JAKA Lumi", "NVIDIA Jetson AGX Thor", "RGB-D 카메라 × 2", "6채널 마이크 어레이", "라이다 베이스", "6축 팔 + 그리퍼"] }
  - { group: "통신 프로토콜", items: ["REST API"] }
  - { group: "도구", items: ["Swagger", "웹 대시보드", "라이다 맵 내비게이션"] }
---

## 문제

JAKA Lumi는 JAKA Robotics가 만든 모바일 매니퓰레이터로, 기본 상태에서는 어시스턴트 기능이 없습니다. 제 역할은 방문객이 자연스럽게 말을 걸 수 있도록 하는 애플리케이션 소프트웨어 개발입니다.

- **클라우드 의존.** 클라우드 음성·LLM 서비스는 네트워크가 필요하고 지연이 생기며 음성과 영상이 로봇 밖으로 전송됨.
- **고정 명령어.** 정해진 명령어 목록은 방문객이 자연스럽게 말하는 순간 동작하지 않음.
- **느린 응답.** 단계마다 처리가 끝나기를 기다리면 로봇이 느리게 느껴짐.
- **파지.** 물건을 집으려면 카메라와 팔의 좌표가 일치해야 함.

## 제가 만든 것

- **온디바이스 음성.** 웨이크 워드, whisper.cpp 음성 인식, 자유 발화를 로봇 작업으로 바꾸는 로컬 LLM(Ollama 기반 Gemma), 한국어·영어 TTS를 모두 Jetson AGX Thor에서 실행.
- **스트리밍 응답.** STT, LLM, TTS를 모두 스트리밍해 질문 후 약 2초 만에 첫 마디를 출력하고 방문객의 끼어들기도 지원.
- **비전.** RGB-D 카메라에서 YOLO와 TensorRT(프레임당 4-13 ms)로 사람과 사물의 위치, 거리, 색상, 형태를 파악해 "이리 와", "컵 집어 줘" 같은 요청을 실제 대상과 연결.
- **픽앤플레이스.** 직접 구현한 핸드아이 캘리브레이션(3.3 mm)과 놓기 전 파지 확인, 모든 자세에 컨트롤러 IK 사용.
- **내비게이션.** 저장된 라이다 맵 위의 순찰 경로, 경로상의 사람 앞 정지, 전시회용 Greeter·Wave·Welcome 모드.
- **제어 인터페이스.** Swagger 문서를 갖춘 REST API, 실시간 카메라·지도·클릭 주행 웹 대시보드, 스마트폰·태블릿용 React Native 앱.
