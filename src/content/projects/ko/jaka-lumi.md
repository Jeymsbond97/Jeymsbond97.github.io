---
title: "JAKA Lumi: AI 서비스 로봇"
outcome: "음성, 비전, 내비게이션, 픽앤플레이스를 모두 로봇 내부에서 실행하는 애플리케이션 소프트웨어. 로보월드 2026(Robot World 2026)에서 라이브 시연."
order: 1
group: robotics
featured: true
role: "애플리케이션 소프트웨어 단독 개발"
period: "2026년 5월 – 현재"
team: "쿳션 선행개발실"
platform: "JAKA Lumi 모바일 매니퓰레이터 · NVIDIA Jetson AGX Thor"
status: "로보월드 2026 출품 (2026년 11월)"
cover: "https://i.ytimg.com/vi/NT1QNNQaFak/maxresdefault.jpg"
coverAlt: "로보월드 2026 부스 앞을 자율주행하는 JAKA Lumi"
youtube:
  - { id: "NT1QNNQaFak", title: "로보월드 2026의 JAKA Lumi (1부)" }
  - { id: "bOgMzCQHOGQ", title: "로보월드 2026의 JAKA Lumi (2부)" }
  - { id: "pTycKLKFRaU", title: "Lumi 음성 테스트" }
gallery:
  - { src: "https://raw.githubusercontent.com/Jeymsbond97/lumi-app/HEAD/docs/media/home.png", alt: "실시간 3D 로봇, 행동 모드, 조이스틱, STOP 버튼이 있는 Lumi App 홈 화면" }
  - { src: "https://raw.githubusercontent.com/Jeymsbond97/lumi-app/HEAD/docs/media/map-route-stops.png", alt: "로봇의 라이다 맵 위에 순찰 경로와 정차 지점이 표시된 Lumi App 지도 화면" }
repo: "https://github.com/Jeymsbond97/Jaka-Lumi"
links:
  - { label: "Lumi App (React Native)", href: "https://github.com/Jeymsbond97/lumi-app" }
tags: ["Python", "FastAPI", "YOLO", "TensorRT", "whisper.cpp", "Ollama LLM", "TTS", "RGB-D", "Jetson Thor", "React Native"]
results:
  - { value: "~2 s", label: "질문이 끝난 후 답변의 첫 음성이 나오기까지의 시간" }
  - { value: "4–13 ms", label: "Jetson에서 YOLO + TensorRT 프레임당 검출 시간" }
  - { value: "3.3 mm", label: "직접 구현한 핸드-아이 캘리브레이션 정확도" }
  - { value: "0", label: "필요한 클라우드 서비스: 음성, LLM, TTS, 비전 모두 로봇에서 실행" }
diagram:
  lanes:
    - { label: "음성", nodes: ["6채널 마이크 어레이", "whisper.cpp STT", "로컬 LLM (Ollama)", "작업 플래너"] }
    - { label: "비전", nodes: ["RGB-D 카메라", "YOLO + TensorRT", "3D 위치 + 깊이", "파지 / 추종"] }
    - { label: "제어", nodes: ["대시보드 + 앱", "REST API", "슈퍼바이저", "안전 STOP"] }
  sink: "베이스 · 리프트 · 허리 · 머리 · 팔 · 그리퍼 · 스피커"
---

## 문제

JAKA Lumi는 JAKA Robotics가 제작한 바퀴형 모바일 매니퓰레이터로, 라이다 베이스, 승강 컬럼, 회전 허리, 2축 헤드, 그리퍼가 달린 6축 팔, RGB-D 카메라 2대, 마이크 어레이로 구성됩니다. 기본 상태에서는 성능 좋은 플랫폼이지만 어시스턴트 기능은 없습니다. 목표는 클라우드나 정해진 명령어 없이도 사람이 자연스럽게 말을 걸 수 있고, 방문객을 맞이하며, 요청한 곳으로 이동하고 물건을 집는 로봇으로 만드는 것이었습니다.

## 내가 만든 것

- **음성 어시스턴트.** 웨이크 워드 "Hi Lumi", GPU 기반 whisper.cpp 음성 인식, 일상적인 요청을 로봇 작업으로 변환하는 로컬 LLM(Ollama 기반 Gemma), 한국어·영어 TTS 응답을 구현했습니다. 응답을 스트리밍하여 질문 후 약 2초 만에 첫 마디가 나오며, 말하는 도중에도 끼어들 수 있습니다.
- **비전.** RGB-D 카메라에서 YOLO와 TensorRT로 사람과 사물을 검출하고 위치, 거리, 색상, 형태를 파악해 "이리 와", "나를 봐", "컵 집어 줘" 같은 언어 지시를 실제 공간과 연결했습니다.
- **내비게이션 및 행동 모드.** 저장된 라이다 맵 위에서 순찰 경로와 반복 주행을 수행하며 경로상의 사람 앞에서는 정지합니다. 전시회용 Greeter, Wave, Welcome 모드를 제공합니다.
- **매니퓰레이션.** 직접 구현한 핸드-아이 캘리브레이션(3.3 mm), 모든 자세에 대한 컨트롤러 IK, 놓기 전 파지 확인을 활용해 팔과 그리퍼로 픽앤플레이스를 수행합니다.
- **제어 인터페이스.** 모든 기능을 위한 REST API(Swagger 문서), 실시간 카메라·지도·클릭 주행을 지원하는 웹 대시보드, 스마트폰과 태블릿용 React Native 앱을 개발했습니다.

모든 기능은 로봇에 탑재된 NVIDIA Jetson AGX Thor에서 실행됩니다. 지연 시간이 짧고, 음성이나 영상 데이터가 로봇 밖으로 나가지 않으며, 네트워크 없이도 동작합니다.

## 배운 점과 다음 개선 사항

- 체감 속도에는 모델 크기보다 모든 단계(STT → LLM → TTS)를 스트리밍하는 것이 더 중요했습니다.
- 다음 단계: 음성 기반 물건 가져오기 작업을 엔드투엔드로 구현하고, 다른 로봇도 노드를 재사용할 수 있도록 어시스턴트를 ROS 2로 이전할 계획입니다.
