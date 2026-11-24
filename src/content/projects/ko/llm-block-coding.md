---
title: "LLM 기반 로봇 프로그래밍 도구"
outcome: "자연어로 JAKA 협동로봇 블록 코딩 프로그램을 생성·편집하고, 로봇에 전달하기 전에 안전성을 검사합니다."
order: 5
group: robotics
featured: true
role: "백엔드, LLM tool calling, 안전 검사 및 컨트롤러 전송"
period: "2026"
team: "쿳션"
platform: "JAKA 협동로봇 컨트롤러"
status: "쿳션 사내 사용 중"
cover: "svg:llm"
coverAlt: "자연어 요청이 JAKA 블록 코드로 변환되고 로봇에 전달되기 전에 안전 검사를 통과하는 흐름의 목업"
tags: ["Python", "FastAPI", "LLM tool calling", "JAKA block programming", "Safety validation"]
diagram:
  lanes:
    - { label: "입력", nodes: ["자연어 요청", "기존 프로그램 (선택)"] }
    - { label: "LLM", nodes: ["Tool calling", "블록 코드 생성 / 편집"] }
    - { label: "안전", nodes: ["제한값 + 구조 검사", "작업자 검토"] }
  sink: "로봇 컨트롤러로 전송"
---

## 문제

블록 코딩을 이용한 협동로봇 티칭은 접근하기 쉽지만, 긴 프로그램을 작성하고 수정하는 일은 작업자에게 여전히 시간이 많이 듭니다. 또한 언어 모델이 안전하지 않은 프로그램을 로봇에 직접 보내는 일은 절대 없어야 합니다.

## 제가 만든 것

- LLM tool calling을 활용해 자연어로 JAKA 블록 코딩 프로그램을 생성하고 편집하는 엔진을 개발했습니다.
- 생성된 프로그램이 로봇에 전달되기 전에 검증하는 안전 검사 기능을 구현했습니다.
- 승인된 프로그램을 FastAPI 서비스를 통해 로봇 컨트롤러로 전송하도록 구성했습니다.

## 배운 점과 다음 개선 사항

- 자유 형식의 코드 생성보다 LLM을 소수의 타입이 지정된 도구로 제한하는 방식이 훨씬 안정적이었습니다.
- 다음 단계: 생성된 모든 프로그램을 작업자에게 제시하기 전에 시뮬레이션으로 사전 실행(dry run)하는 기능을 추가할 계획입니다.
