import type { Lang } from '../i18n/ui';

type L = Record<Lang, string>;

export const profile = {
  name: 'Tokhirbek Aminjonov',
  shortName: 'Tokhirbek A.',
  nickname: 'James',
  email: 'aminjonovtoxirbek@gmail.com',
  location: { en: 'Seoul, South Korea', ko: '대한민국 서울' } as L,
  links: {
    linkedin: 'https://www.linkedin.com/in/aminjonov-tokhirbek/',
    github: 'https://github.com/Jeymsbond97',
    youtube: 'https://www.youtube.com/@jeyms_bond97',
  },
  /** FormSubmit AJAX endpoint: messages arrive in the inbox above. */
  formEndpoint: 'https://formsubmit.co/ajax/aminjonovtoxirbek@gmail.com',
};

export const stats = [
  { value: 4, suffix: '+', key: 'stats.software' },
  { value: 5, suffix: '', key: 'stats.robots' },
  { value: 1, suffix: '', key: 'stats.acceptance' },
  { value: 4, prefix: 'TOPIK ', suffix: '', key: 'stats.korean' },
] as const;

export interface Job {
  title: L;
  company: L;
  place: L;
  period: L;
  current?: boolean;
  note?: L;
  points: Record<Lang, string[]>;
  tags: string[];
}

export const experience: Job[] = [
  {
    title: { en: 'Robotics Engineer', ko: 'Robotics Engineer (로봇 엔지니어)' },
    company: { en: 'Cutshion', ko: '쿳션 (Cutshion)' },
    place: { en: 'Seoul · Advanced Development Team', ko: '서울 · 선행개발실' },
    period: { en: 'May 2026 – Present', ko: '2026.05 – 현재' },
    current: true,
    points: {
      en: [
        'Application software for JAKA Lumi as the sole developer: on-device voice AI, YOLO/TensorRT vision, navigation behaviours, pick-and-place, REST API, dashboard and mobile app.',
        'Backend and vision system for a factory line with two JAKA cobots and an LS PLC (Modbus TCP); passed customer acceptance in Aug 2026.',
        'Book palletizing cell, AI portrait drawing robot and an LLM tool that writes JAKA block-code programs with safety checks.',
        'On-site installation, integration and teaching of robots, grippers, RGB-D cameras and sensors; STM32 ultrasonic node (Modbus RTU, RS485).',
      ],
      ko: [
        'JAKA Lumi 애플리케이션 소프트웨어 단독 개발: 온디바이스 음성 AI, YOLO/TensorRT 비전, 주행 동작, Pick-and-Place, REST API, 대시보드와 모바일 앱.',
        'JAKA 협동로봇 2대와 LS PLC(Modbus TCP)로 구성된 공장 라인의 백엔드 및 비전 시스템 개발, 2026년 8월 고객사 검수 통과.',
        '도서 팔레타이징 셀, AI 초상화 드로잉 로봇, 안전 검증을 포함한 JAKA 블록코딩 프로그램 생성 LLM 도구 개발.',
        '로봇, 그리퍼, RGB-D 카메라, 센서의 현장 설치·연동·티칭, STM32 초음파 센서 노드(Modbus RTU, RS485) 개발.',
      ],
    },
    tags: ['ROS 2', 'Python', 'C++', 'JAKA SDK', 'YOLO', 'TensorRT', 'Jetson', 'PLC', 'Modbus', 'FastAPI'],
  },
  {
    title: { en: 'Full-stack Developer', ko: '풀스택 개발자' },
    company: { en: 'KEICO', ko: 'KEICO (케이코플러스)' },
    place: { en: 'Seoul · Development Team', ko: '서울 · 개발팀' },
    period: { en: 'Oct 2025 – May 2026', ko: '2025.10 – 2026.05' },
    points: {
      en: [
        'Rebuilt the FECO energy management app (iOS, Android) in Flutter: monitoring, schedules, alarms and remote IoT control (smart plugs, IR controllers, Zigbee sensors) over REST, MQTT and an edge gateway.',
        'Reinforcement-learning temperature control prototype on real-time sensor data.',
        'Company websites keicoplus.com and keico.info (NestJS + GraphQL, Next.js, Docker on AWS); tech-stack evaluation and system documentation.',
      ],
      ko: [
        'FECO 에너지 관리 앱(iOS, Android)을 Flutter로 전체 리빌드: 모니터링, 스케줄, 알람, REST·MQTT·엣지 게이트웨이를 통한 IoT 기기 원격 제어(스마트 플러그, IR 컨트롤러, Zigbee 센서).',
        '실시간 센서 데이터 기반 강화학습 온도 제어 프로토타입.',
        '기업 웹사이트 keicoplus.com, keico.info 개발(NestJS + GraphQL, Next.js, AWS Docker 배포) 및 기술 스택 검토·시스템 문서 작성.',
      ],
    },
    tags: ['Flutter', 'MQTT', 'Zigbee', 'NestJS', 'GraphQL', 'Next.js', 'AWS'],
  },
  {
    title: { en: 'Backend Developer', ko: '백엔드 개발자' },
    company: { en: 'Exadot LLC', ko: 'Exadot LLC' },
    place: { en: 'Tashkent · Remote, while studying', ko: '타슈켄트 · 원격 (재학 중)' },
    period: { en: 'Aug 2023 – Jul 2025', ko: '2023.08 – 2025.07' },
    points: {
      en: [
        'Backends and GraphQL/REST APIs with NestJS, Node.js, Spring Boot and Python on PostgreSQL, MySQL and MongoDB.',
        'JWT and Spring Security authentication, real-time features with WebSocket and Socket.IO; Docker services on AWS EC2 behind Nginx.',
      ],
      ko: [
        'NestJS, Node.js, Spring Boot, Python 기반 백엔드 및 GraphQL/REST API 개발 (PostgreSQL, MySQL, MongoDB).',
        'JWT·Spring Security 인증, WebSocket·Socket.IO 실시간 기능 구현, Docker 서비스를 AWS EC2와 Nginx로 배포.',
      ],
    },
    tags: ['NestJS', 'Spring Boot', 'GraphQL', 'PostgreSQL', 'Docker'],
  },
  {
    title: { en: 'Frontend Developer', ko: '프론트엔드 개발자' },
    company: { en: 'Colibrisoft', ko: 'Colibrisoft' },
    place: { en: 'Tashkent · Remote, while studying', ko: '타슈켄트 · 원격 (재학 중)' },
    period: { en: 'Nov 2021 – Feb 2023', ko: '2021.11 – 2023.02' },
    points: {
      en: ['Responsive web apps with React, TypeScript, Redux and Tailwind CSS; multilingual (i18n) sites and Three.js 3D features; performance refactoring.'],
      ko: ['React, TypeScript, Redux, Tailwind CSS 기반 반응형 웹 개발, 다국어(i18n) 지원 및 Three.js 3D 기능 구현, 성능 개선 리팩토링.'],
    },
    tags: ['React', 'TypeScript', 'Redux', 'Three.js'],
  },
];

export const education = [
  {
    school: { en: 'Jeonbuk National University', ko: '전북대학교' },
    degree: { en: 'B.E. Computer Science and Engineering · GPA 3.7', ko: '컴퓨터공학부 컴퓨터공학전공 학사 · 학점 3.7' },
    period: { en: 'Sep 2021 – Feb 2025', ko: '2021.09 – 2025.02' },
    note: { en: 'Excellent Student Award 2023 (top 10 of the department)', ko: '2023 우수학생상 (학과 성적 상위 10위)' },
  },
  {
    school: { en: 'Ferghana Polytechnic Institute', ko: '페르가나 공과대학교 (우즈베키스탄)' },
    degree: { en: 'Mechanical Engineering (not completed)', ko: '기계공학 (중퇴)' },
    period: { en: '2016 – 2019', ko: '2016 – 2019' },
  },
];

export const skills: { key: string; items: string[] }[] = [
  {
    key: 'skills.robotics',
    items: ['ROS 2', 'JAKA SDK', 'Cobot programming and teaching', 'Block coding', 'Pick-and-place', 'Grippers', 'Hand-eye calibration', 'Mapping and navigation', 'On-site commissioning'],
  },
  {
    key: 'skills.physical',
    items: ['Reinforcement learning', 'Imitation learning', 'NVIDIA Isaac Lab', 'MuJoCo', 'Humanoid locomotion', 'Whole-body control', 'VLA models', 'Sim-to-real'],
  },
  {
    key: 'skills.vision',
    items: ['Python', 'C++', 'OpenCV', 'YOLO', 'TensorRT', 'CUDA', 'LLMs (Ollama, Gemini, OpenAI)', 'Speech recognition and TTS', 'RGB-D cameras'],
  },
  {
    key: 'skills.edge',
    items: ['NVIDIA Jetson AGX Thor', 'LS PLC (XGB, XG5000)', 'Modbus TCP / RTU', 'RS485', 'STM32', 'Sensors and conveyors', 'MQTT', 'Zigbee', 'Linux'],
  },
  {
    key: 'skills.software',
    items: ['FastAPI', 'NestJS', 'Spring Boot', 'React', 'Next.js', 'React Native', 'Flutter', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS'],
  },
];

export const certificates = [
  {
    id: 'google-pm',
    name: { en: 'Google Project Management Professional Certificate', ko: 'Google 프로젝트 관리 전문가 자격증' },
    issuer: 'Google · Coursera',
    issued: { en: 'Sep 2026', ko: '2026년 9월' },
    detail: {
      en: 'Seven courses: project initiation, planning, execution, Agile project management and a capstone, with risk management and stakeholder communication.',
      ko: '프로젝트 착수, 계획, 실행, 애자일 프로젝트 관리, 캡스톤으로 구성된 7개 과정. 리스크 관리와 이해관계자 커뮤니케이션 포함.',
    },
    verify: 'https://www.credly.com/go/mZNQ0bkLJx6YX6o7a5qKFg',
    post: '/blog/2026-09-11-google-project-management-certificate/',
    accent: 'google',
  },
  {
    id: 'udemy-prompt',
    name: { en: 'The Complete Prompt Engineering for AI Bootcamp (2025)', ko: 'The Complete Prompt Engineering for AI Bootcamp (2025)' },
    issuer: 'Udemy',
    issued: { en: 'Aug 2025', ko: '2025년 8월' },
    detail: {
      en: 'Prompt design strategies for ChatGPT and other LLMs, and applying AI in development and productivity work.',
      ko: 'ChatGPT 등 LLM을 위한 프롬프트 설계 전략과 개발·업무 생산성에 AI를 적용하는 방법.',
    },
    verify: undefined,
    post: '/blog/2025-08-24-prompt-engineering-bootcamp/',
    accent: 'udemy',
  },
];

export const languageTests = [
  { name: 'TOPIK', level: { en: 'Level 4', ko: '4급' }, date: { en: 'Oct 2026', ko: '2026년 10월' }, lang: { en: 'Korean', ko: '한국어' } },
  { name: 'IELTS', level: { en: '7.0', ko: '7.0' }, date: { en: 'Sep 2021', ko: '2021년 9월' }, lang: { en: 'English', ko: '영어' } },
];

export const videos = [
  { id: 'NT1QNNQaFak', title: { en: 'JAKA Lumi at Robot World 2026 (Part 1)', ko: '로보월드 2026의 JAKA Lumi (1부)' }, project: 'jaka-lumi' },
  { id: '3sMe1mavDQk', title: { en: 'Real-time vision for a factory line', ko: '공장 라인 실시간 비전' }, project: 'factory-vision-line' },
  { id: 'LLDMCQPEUec', title: { en: 'Robotic book palletizing cell', ko: '로봇 도서 팔레타이징 셀' }, project: 'principia-book-palletizing' },
  { id: 'YgD8-ZfAPD8', title: { en: 'AI portrait drawing robot', ko: 'AI 초상화 드로잉 로봇' }, project: 'ai-drawing-robot' },
  { id: 'bOgMzCQHOGQ', title: { en: 'JAKA Lumi at Robot World 2026 (Part 2)', ko: '로보월드 2026의 JAKA Lumi (2부)' }, project: 'jaka-lumi' },
  { id: 'y0vjoXO-Isk', title: { en: 'JAKA MiniCobo pick-and-place demo', ko: 'JAKA MiniCobo Pick-and-Place 데모' }, project: 'jaka-minicobo-education' },
];

export const techMarquee = [
  'ROS 2', 'JAKA SDK', 'NVIDIA Jetson Thor', 'YOLO', 'TensorRT', 'OpenCV', 'MuJoCo', 'Isaac Lab', 'PPO', 'Imitation learning',
  'whisper.cpp', 'Ollama', 'LS PLC', 'Modbus TCP', 'STM32', 'FastAPI', 'React Native', 'Flutter', 'Docker', 'C++', 'Python',
];
