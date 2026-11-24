---
title: "LLM 기반 로봇 프로그래밍 도구"
outcome: "자연어로 JAKA 블록 코딩 프로그램을 생성·편집하고 로봇 전송 전에 안전성을 검사합니다."
order: 5
group: robotics
featured: true
period: "2026"
status: "쿳션 사내 사용 중"
client: "쿳션 (사내 프로젝트)"
role: "백엔드, LLM tool calling, 안전 검사, 컨트롤러 전송 개발"
team: "쿳션"
hardware: "JAKA 협동로봇 컨트롤러"
cover: "svg:llm"
coverAlt: "자연어 요청이 JAKA 블록 코드로 변환되고 로봇에 전달되기 전에 안전 검사를 통과하는 흐름의 목업"
tags: ["Python", "FastAPI", "LLM tool calling", "JAKA block programming", "Safety validation"]
results:
  - { value: "2단계", label: "안전 검증 후 작업자 검토" }
  - { value: "사용 중", label: "쿳션 사내 도구" }
flow:
  - "작업자가 작업 내용을 자연어로 입력"
  - "LLM이 블록 프로그램을 생성하거나 수정"
  - "안전 검사로 제한값과 구조 검증"
  - "작업자가 프로그램을 검토하고 승인"
  - "승인된 프로그램을 로봇 컨트롤러로 전송"
stack:
  - { group: "언어", items: ["Python"] }
  - { group: "프레임워크", items: ["FastAPI"] }
  - { group: "AI", items: ["LLM tool calling", "Typed tools"] }
  - { group: "로봇·하드웨어", items: ["JAKA 협동로봇 컨트롤러", "JAKA block programming"] }
  - { group: "안전", items: ["제한값·구조 검증", "작업자 검토"] }
---

## 문제

- **느린 프로그래밍.** 블록 코딩으로 협동로봇 티칭은 쉬워졌지만, 긴 프로그램을 작성하고 수정하는 일은 여전히 오래 걸림.
- **안전 위험.** 언어 모델이 안전하지 않은 프로그램을 로봇에 직접 보내는 일은 절대 없어야 함.

## 제가 만든 것

- **자연어 프로그래밍.** LLM tool calling으로 JAKA 블록 코딩 프로그램을 생성하고 편집하는 엔진.
- **타입 지정 도구.** LLM이 소수의 타입 지정 도구만 호출하도록 제한해 자유 형식 코드 생성보다 안정적인 결과 확보.
- **안전 검사.** 생성된 모든 프로그램의 제한값과 구조를 검증한 뒤 작업자가 검토.
- **컨트롤러 전송.** 승인된 프로그램만 FastAPI 서비스를 통해 로봇 컨트롤러로 전송.
