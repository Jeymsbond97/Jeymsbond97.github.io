---
title: "AI 초상화 드로잉 로봇"
outcome: "사진 → AI 라인 아트 → 최적화된 벡터 경로 → JAKA 협동로봇이 종이 위에 초상화를 실시간으로 그립니다."
order: 4
group: robotics
featured: true
role: "이미지 파이프라인, 로봇 경로 변환, 백엔드 및 앱 개발"
period: "2026"
team: "쿳션"
platform: "펜 툴을 장착한 JAKA 협동로봇 · 키오스크 태블릿"
status: "기업 행사에서 라이브 시연"
cover: "https://i.ytimg.com/vi/YgD8-ZfAPD8/maxresdefault.jpg"
coverAlt: "종이 위에 라인 초상화를 그리는 JAKA 로봇 팔"
youtube:
  - { id: "YgD8-ZfAPD8", title: "AI 초상화 드로잉 로봇" }
tags: ["Python", "FastAPI", "OpenCV", "scikit-image", "Gemini API", "Flutter", "React", "Docker", "MinIO", "TCP/IP"]
results:
  - { value: "4", label: "드로잉 스타일: 미니멀, 웨스턴, 아시안, 모던" }
  - { value: "A4", label: "펜 업/다운 및 속도 제한이 적용된 안전 작업 영역" }
  - { value: "1 → N", label: "여러 대의 로봇을 위한 중앙 모니터링 API" }
diagram:
  lanes:
    - { label: "촬영", nodes: ["Flutter 키오스크 카메라", "구도 가이드", "QR 모바일 웹앱"] }
    - { label: "이미지", nodes: ["Gemini 라인 아트", "스켈레톤 + 윤곽선", "Douglas–Peucker + NN 순서화"] }
    - { label: "로봇", nodes: ["A4 매핑 + 제한", "펜 캘리브레이션", "TCP 드로잉 세션"] }
  sink: "종이 위의 초상화"
---

## 문제

행사 방문객은 몇 분 안에 기념품을 받기를 원하지만, 로봇 팔은 깔끔하고 순서가 정해진 선만 그릴 수 있습니다. 원본 사진은 물론, AI가 만든 라인 드로잉조차 그대로 쓰면 수천 개의 작은 경로로 쪼개져 드로잉 시간이 매우 길어집니다.

## 내가 만든 것

- **이미지 파이프라인.** Google Gemini가 사진을 4가지 스타일 중 하나의 깔끔한 라인 드로잉으로 변환하고, OpenCV 스켈레톤화와 윤곽선 검출로 이를 벡터 경로로 바꿉니다.
- **경로 최적화.** Douglas–Peucker 단순화와 최근접 이웃(nearest-neighbour) 순서화로 펜 이동 거리를 줄였고, 눈과 입술 같은 세밀한 부분은 품질을 위해 더 천천히 그립니다.
- **로봇 드로잉.** 경로를 안전한 A4 작업 영역에 매핑한 뒤 로봇 명령(좌표, 펜 업/다운, 안전 제한)으로 변환해 TCP로 전송합니다. 펜 자동 캘리브레이션과 X/Y/Z 수동 보정도 지원합니다.
- **주변 소프트웨어.** 백그라운드 드로잉 세션(실시간 진행률, 일시정지 및 재개)을 갖춘 FastAPI 백엔드, Flutter 키오스크 앱, 방문객용 QR 모바일 웹앱, S3/MinIO 스토리지, Docker 배포, 여러 로봇을 위한 중앙 모니터링 API를 구축했습니다.

## 배운 점과 다음 개선 사항

- 드로잉 시간에는 로봇 속도보다 경로 순서가 더 큰 영향을 미쳤습니다.
- 다음 단계: 선 굵기를 반영한 렌더링으로 태블릿 미리보기가 종이 결과물과 정확히 일치하도록 개선할 계획입니다.
