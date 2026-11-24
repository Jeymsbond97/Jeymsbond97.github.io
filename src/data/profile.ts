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
  /** Web3Forms access key (free, from web3forms.com). When set, the contact form sends through Web3Forms instead of FormSubmit. */
  web3formsKey: '0aea508a-c23c-43ba-ac75-24934f76e5b1',
};

export const stats = [
  { value: 4, suffix: '+', key: 'stats.software' },
  { value: 9, suffix: '', key: 'stats.robots' },
  { value: 2, suffix: '', key: 'stats.acceptance' },
  { value: 99.7, suffix: '%', key: 'stats.korean' },
] as const;

export interface Job {
  title: L;
  company: L;
  /** One line on what the company does, shown under the company name. */
  about?: L;
  place: L;
  period: L;
  current?: boolean;
  note?: L;
  points: Record<Lang, string[]>;
  tags: string[];
}

export const experience: Job[] = [
  {
    title: { en: 'Robotics Software Engineer', ko: '로보틱스 소프트웨어 엔지니어' },
    company: { en: 'Cutshion', ko: '쿳션(Cutshion)' },
    about: {
      en: 'Robot application company: AI vision, collaborative robots and AMRs for smart factories and service',
      ko: 'AI 비전, 협동로봇, AMR 기반 스마트 팩토리·서비스 로봇 애플리케이션 전문 기업',
    },
    place: { en: 'Seoul · Advanced Development Team', ko: '서울 · 선행개발실' },
    period: { en: 'May 2026 – Present', ko: '2026.05 – 현재' },
    current: true,
    points: {
      en: [
        'JAKA Lumi service robot: sole developer of the application software on NVIDIA Jetson AGX Thor. On-device speech recognition (whisper.cpp), a local LLM (Ollama) and TTS handle voice requests in Korean and English.',
        'Perception and manipulation: YOLO with TensorRT on RGB-D cameras detects people and objects with their 3D position. My own hand-eye calibration (3.3 mm) drives pick-and-place with the 6-axis arm and gripper.',
        'Navigation and localization with ROS 2: mapping, lidar localization and patrol routes with stops. REST API, web dashboard and React Native app for operators.',
        'Physical AI: training robot policies with reinforcement learning and imitation learning in NVIDIA Isaac Lab and MuJoCo. A MuJoCo digital twin of Lumi tests LLM and vision control before the real robot.',
        'Factory vision line for Taesung: replaced unreliable part sensors with 3 cameras and a trained full/empty classifier (99.7% accuracy). A FastAPI line server drives 2 JAKA cobots and an LS PLC over Modbus TCP. Passed customer acceptance in Aug 2026.',
        'Book palletizing cell for Prinpia: one generic JAKA program with exact resume after any stop and automatic stacker switching, a Python operator app and Modbus I/O. Delivered in Nov 2026.',
        'AI portrait drawing robot: Gemini line art, OpenCV path optimization and drawing over JAKA TCP. An LLM tool that writes JAKA block-code programs with safety validation.',
        'On-site installation, integration and teaching of robots, grippers, RGB-D cameras and sensors. STM32 ultrasonic sensor node over Modbus RTU and RS485.',
      ],
      ko: [
        'JAKA Lumi 서비스 로봇: NVIDIA Jetson AGX Thor 기반 애플리케이션 소프트웨어 단독 개발. 온디바이스 음성 인식(whisper.cpp), 로컬 LLM(Ollama), TTS로 한국어·영어 음성 요청 처리.',
        '인식과 매니퓰레이션: RGB-D 카메라와 YOLO·TensorRT 기반 사람·물체 검출 및 3D 위치 추정. 직접 구현한 핸드아이 캘리브레이션(3.3mm)으로 6축 로봇팔과 그리퍼의 픽앤플레이스 구현.',
        'ROS 2 기반 내비게이션·위치 추정: 지도 작성, 라이다 위치 추정, 정차 지점을 포함한 순찰 경로. 운영자용 REST API, 웹 대시보드, React Native 앱 개발.',
        'Physical AI: NVIDIA Isaac Lab과 MuJoCo에서 강화학습·모방학습 기반 로봇 정책 학습. 실제 로봇 적용 전에 LLM·비전 제어를 검증하는 Lumi MuJoCo 디지털 트윈 구축.',
        'Taesung 공장 비전 라인: 불안정한 부품 감지 센서를 카메라 3대와 직접 학습시킨 적재 판별 분류기(정확도 99.7%)로 대체. FastAPI 라인 서버로 JAKA 협동로봇 2대와 LS PLC(Modbus TCP) 제어. 2026년 8월 고객사 검수 통과.',
        'Prinpia 도서 팔레타이징 셀: 정지 후 정확한 위치 재개와 스태커 자동 전환을 지원하는 범용 JAKA 프로그램, Python 운영 앱, Modbus I/O 연동. 2026년 11월 납품.',
        'AI 초상화 드로잉 로봇: Gemini 라인 아트, OpenCV 경로 최적화, JAKA TCP 드로잉. 안전 검증을 포함한 JAKA 블록코딩 프로그램 생성 LLM 도구 개발.',
        '로봇, 그리퍼, RGB-D 카메라, 센서의 현장 설치·연동·티칭. Modbus RTU·RS485 기반 STM32 초음파 센서 노드 개발.',
      ],
    },
    tags: [
      'ROS 2', 'Python', 'C++', 'JAKA SDK', 'NVIDIA Isaac Lab', 'MuJoCo', 'Reinforcement learning', 'Imitation learning', 'YOLO', 'TensorRT',
      'OpenCV', 'Jetson AGX Thor', 'Ollama', 'whisper.cpp', 'FastAPI', 'React Native', 'LS PLC', 'Modbus TCP/RTU', 'STM32',
    ],
  },
  {
    title: { en: 'Software Engineer', ko: '소프트웨어 엔지니어' },
    company: { en: 'KEICO', ko: 'KEICO(케이코플러스)' },
    about: {
      en: 'IoT-based energy management (EMS) and demand response platform company',
      ko: 'IoT 기반 에너지관리시스템(EMS)·수요관리(DR) 플랫폼 기업',
    },
    place: { en: 'Seoul · Development Team', ko: '서울 · 개발팀' },
    period: { en: 'Oct 2025 – May 2026', ko: '2025.10 – 2026.05' },
    points: {
      en: [
        'Rebuilt the FECO energy management app (iOS, Android) in Flutter with real-time monitoring, schedules and alarms.',
        'Remote IoT control of smart plugs, IR controllers and Zigbee sensors over REST, MQTT and an edge gateway.',
        'Prototyped reinforcement-learning temperature control on real-time sensor data.',
        'Built the company websites keicoplus.com and keico.info with NestJS, GraphQL and Next.js on AWS (Docker).',
      ],
      ko: [
        'FECO 에너지 관리 앱(iOS, Android) Flutter 리빌드: 실시간 모니터링, 스케줄, 알람.',
        'REST, MQTT, 엣지 게이트웨이 기반 스마트 플러그, IR 컨트롤러, Zigbee 센서 원격 제어.',
        '실시간 센서 데이터 기반 강화학습 온도 제어 프로토타입 개발.',
        '기업 웹사이트 keicoplus.com, keico.info 개발(NestJS, GraphQL, Next.js, AWS Docker 배포).',
      ],
    },
    tags: ['Flutter', 'Dart', 'MQTT', 'Zigbee', 'REST', 'NestJS', 'GraphQL', 'Next.js', 'Docker', 'AWS'],
  },
  {
    title: { en: 'Backend Developer', ko: '백엔드 개발자' },
    company: { en: 'Exadot LLC', ko: 'Exadot LLC' },
    place: { en: 'Tashkent · Remote', ko: '타슈켄트 · 원격' },
    period: { en: 'Aug 2023 – Jul 2025', ko: '2023.08 – 2025.07' },
    points: {
      en: [
        'Built backends and GraphQL and REST APIs with NestJS, Node.js, Spring Boot and Python on PostgreSQL, MySQL and MongoDB.',
        'Implemented authentication with JWT and Spring Security.',
        'Built real-time features with WebSocket and Socket.IO.',
        'Deployed Docker services on AWS EC2 behind Nginx.',
      ],
      ko: [
        'NestJS, Node.js, Spring Boot, Python 기반 백엔드 및 GraphQL·REST API 개발(PostgreSQL, MySQL, MongoDB).',
        'JWT·Spring Security 기반 인증 구현.',
        'WebSocket·Socket.IO 기반 실시간 기능 구현.',
        'AWS EC2와 Nginx 환경에 Docker 서비스 배포.',
      ],
    },
    tags: ['NestJS', 'Node.js', 'Express', 'Spring Boot', 'GraphQL', 'REST', 'PostgreSQL', 'MySQL', 'MongoDB', 'JWT', 'WebSocket', 'Socket.IO', 'Docker', 'AWS EC2', 'Nginx'],
  },
  {
    title: { en: 'Frontend Developer', ko: '프론트엔드 개발자' },
    company: { en: 'Colibrisoft', ko: 'Colibrisoft' },
    place: { en: 'Tashkent · Remote', ko: '타슈켄트 · 원격' },
    period: { en: 'Nov 2021 – Feb 2023', ko: '2021.11 – 2023.02' },
    points: {
      en: [
        'Built responsive web apps with React, TypeScript, Redux and Tailwind CSS.',
        'Built multilingual (i18n) websites.',
        'Added Three.js 3D features and refactored code for performance.',
      ],
      ko: [
        'React, TypeScript, Redux, Tailwind CSS 기반 반응형 웹 앱 개발.',
        '다국어(i18n) 웹사이트 개발.',
        'Three.js 3D 기능 구현 및 성능 개선 리팩토링.',
      ],
    },
    tags: ['React', 'TypeScript', 'JavaScript', 'Redux', 'Tailwind CSS', 'Three.js', 'i18n'],
  },
];

export const education = [
  {
    school: { en: 'Jeonbuk National University', ko: '전북대학교' },
    degree: { en: 'B.E. Computer Science and Engineering · GPA 3.9', ko: '컴퓨터공학부 컴퓨터공학전공 학사 · 학점 3.9' },
    period: { en: 'Sep 2021 – Feb 2025', ko: '2021.09 – 2025.02' },
    place: { en: 'Jeonju, South Korea', ko: '대한민국 전주' } as L,
    years: '2021–2025',
    note: { en: 'Excellent Student Award 2023 (top 10 of the department)', ko: '2023 우수학생상 (학과 성적 상위 10명)' } as L | undefined,
  },
  {
    school: { en: 'Ferghana Polytechnic Institute', ko: '페르가나 공과대학교 (우즈베키스탄)' },
    degree: { en: 'B.E. Mechanical Engineering', ko: '기계공학 학사' },
    period: { en: '2016 – 2019', ko: '2016 – 2019' },
    place: { en: 'Ferghana, Uzbekistan', ko: '우즈베키스탄 페르가나' } as L,
    years: '2016–2019',
    note: undefined as L | undefined,
  },
];

export type AchievementKind = 'degree' | 'award' | 'community' | 'code' | 'globe' | 'expo' | 'run';

export interface Achievement {
  kind: AchievementKind;
  /** Shown only when known. */
  year?: string;
  title: L;
  detail: L;
}

export const achievements: Achievement[] = [
  {
    kind: 'degree',
    year: '2025',
    title: { en: "Bachelor's diploma", ko: '학사 학위' },
    detail: {
      en: 'B.E. Computer Science and Engineering, Jeonbuk National University. Graduated in Feb 2025 with a GPA of 3.9.',
      ko: '전북대학교 컴퓨터공학 학사. 2025년 2월 학점 3.9로 졸업.',
    },
  },
  {
    kind: 'award',
    year: '2023',
    title: { en: 'Excellent Student Award', ko: '우수학생상' },
    detail: { en: 'Top 10 of the department at Jeonbuk National University.', ko: '전북대학교 학과 성적 상위 10명.' },
  },
  {
    kind: 'community',
    year: '2024',
    title: { en: 'WAYU city coordinator', ko: 'WAYU 시티 코디네이터' },
    detail: {
      en: 'City coordinator of the Wayu.uz Korea branch in Jeonju. Recruited volunteers and ran community events.',
      ko: 'Wayu.uz 한국 지사 전주 시티 코디네이터. 자원봉사자 모집, 지역 행사·봉사 프로젝트 운영.',
    },
  },
  {
    kind: 'code',
    year: '2020',
    title: { en: 'National Youth Web Hackathon', ko: '전국 청소년 웹 해커톤' },
    detail: { en: 'Built and presented a web app as a team in Uzbekistan.', ko: '우즈베키스탄 대회에서 팀으로 웹 앱 개발 및 발표.' },
  },
  {
    kind: 'globe',
    year: '2026',
    title: { en: 'Global Seoul Supporter', ko: '글로벌 서울 서포터즈' },
    detail: { en: 'Selected to represent Uzbekistan. Run by the Seoul Metropolitan Government and IWIK with members from 26 countries.', ko: '우즈베키스탄 대표로 선발. 서울특별시와 IWIK가 운영하며 26개국 참가.' },
  },
  {
    kind: 'expo',
    year: '2026',
    title: { en: 'Robot World 2026', ko: '로보월드 2026' },
    detail: { en: 'Represented Cutshion at KINTEX and showed visitors JAKA Lumi running the software I built.', ko: 'KINTEX에서 쿳션을 대표해 직접 개발한 소프트웨어로 동작하는 JAKA Lumi 시연.' },
  },
  {
    kind: 'run',
    year: '2026',
    title: { en: 'Full marathon, 42 km', ko: '풀코스 마라톤 42km' },
    detail: { en: 'Finished the full distance, plus 4 km after a wrong turn.', ko: '길을 잘못 들어 4km를 더 달리고도 풀코스 완주.' },
  },
  {
    kind: 'run',
    year: '2026',
    title: { en: 'Trail marathons', ko: '트레일 마라톤' },
    detail: { en: 'First official trail race: 26th of 213 runners on a rainy mountain course. A half trail marathon followed.', ko: '첫 공식 트레일 대회에서 213명 중 26위. 이어서 하프 트레일 마라톤 완주.' },
  },
];

export interface SkillGroup {
  key: string;
  code: string;
  items: string[];
  proof: L;
}

export const skills: SkillGroup[] = [
  {
    key: 'skills.robotics',
    code: 'ROBOT.APP',
    items: ['ROS 2', 'JAKA SDK', 'Cobot programming and teaching', 'JAKA block programming', 'Pick-and-place', 'Palletizing', 'Grippers', 'Hand-eye calibration', 'Mapping and navigation', 'On-site commissioning'],
    proof: {
      en: 'Lumi pick-and-place with my own hand-eye calibration (3.3 mm), the Prinpia book palletizing cell and two cobots on a live factory line.',
      ko: '직접 구현한 핸드아이 캘리브레이션(3.3mm) 기반 Lumi 픽앤플레이스, Prinpia 도서 팔레타이징 셀, 실제 공장 라인의 협동로봇 2대.',
    },
  },
  {
    key: 'skills.physical',
    code: 'PHYS.AI',
    items: ['Reinforcement learning (PPO)', 'Imitation learning', 'NVIDIA Isaac Lab', 'MuJoCo', 'Humanoid locomotion', 'Sim-to-real', 'VLA models', 'PyTorch'],
    proof: {
      en: 'Booster K1 humanoid locomotion with PPO, a MuJoCo digital twin of Lumi and a PiCar apple picker with 87 of 90 clean pick-ups.',
      ko: 'PPO 기반 Booster K1 휴머노이드 보행, MuJoCo 기반 Lumi 디지털 트윈, 90회 중 87회 성공한 PiCar 사과 집기.',
    },
  },
  {
    key: 'skills.vision',
    code: 'PERCEPT',
    items: ['OpenCV', 'YOLO', 'TensorRT', 'CUDA', 'RGB-D cameras', 'scikit-learn', 'Local LLMs (Ollama)', 'Speech recognition (whisper.cpp)', 'Text-to-speech'],
    proof: {
      en: 'Lumi runs speech, LLM, TTS and YOLO on the robot with no cloud. The factory line detects transparent parts at 99.7% accuracy.',
      ko: 'Lumi는 음성 인식, LLM, TTS, YOLO를 클라우드 없이 로봇에서 실행합니다. 공장 라인은 투명 부품을 99.7% 정확도로 판별합니다.',
    },
  },
  {
    key: 'skills.edge',
    code: 'EDGE.IO',
    items: ['NVIDIA Jetson AGX Thor', 'LS PLC (XGB, XG5000)', 'Modbus TCP / RTU', 'RS485', 'STM32', 'Sensors and conveyors', 'Safety interlocks', 'MQTT', 'Zigbee'],
    proof: {
      en: 'LS PLC over Modbus TCP on the factory line, an STM32 ultrasonic node on RS485 and Zigbee devices over MQTT in the KEICO energy app.',
      ko: '공장 라인의 Modbus TCP 기반 LS PLC 연동, RS485 기반 STM32 초음파 노드, KEICO 에너지 앱의 MQTT 기반 Zigbee 기기 제어.',
    },
  },
  {
    key: 'skills.software',
    code: 'SOFTWARE',
    items: ['Python', 'C++', 'TypeScript', 'FastAPI', 'NestJS', 'Spring Boot', 'React', 'Next.js', 'React Native', 'Flutter', 'PostgreSQL', 'Docker', 'AWS', 'Linux'],
    proof: {
      en: 'The REST API, web dashboard and React Native app for Lumi, after four years of backend, web and mobile work.',
      ko: '4년간의 백엔드, 웹, 모바일 개발 경험을 바탕으로 Lumi의 REST API, 웹 대시보드, React Native 앱 개발.',
    },
  },
];

export interface CertImage {
  src: string;
  width: number;
  height: number;
  alt: L;
  kind: 'certificate' | 'badge';
}

export const certificates = [
  {
    id: 'google-pm',
    name: { en: 'Google Project Management Professional Certificate', ko: 'Google 프로젝트 관리 전문가 자격증' },
    issuer: 'Google · Coursera',
    issued: { en: 'Sep 2026', ko: '2026년 9월' },
    detail: {
      en: 'Seven courses: project initiation, planning, execution, Agile project management and a capstone. Covers risk management and stakeholder communication.',
      ko: '프로젝트 착수, 계획, 실행, 애자일 프로젝트 관리, 캡스톤으로 구성된 7개 과정. 리스크 관리와 이해관계자 커뮤니케이션 포함.',
    },
    verify: 'https://www.credly.com/go/mZNQ0bkLJx6YX6o7a5qKFg' as string | undefined,
    post: '/blog/2026-09-11-google-project-management-certificate/',
    accent: 'google',
    images: [
      {
        src: '/certificates/google-project-management.jpg', width: 484, height: 374, kind: 'certificate',
        alt: { en: 'Google Project Management Professional Certificate issued by Coursera to Tokhirbek Aminjonov', ko: 'Coursera에서 Tokhirbek Aminjonov에게 발급한 Google 프로젝트 관리 전문가 자격증' },
      },
      {
        src: '/certificates/google-pm-badge.png', width: 672, height: 352, kind: 'badge',
        alt: { en: 'Credly badge for the Google Project Management Professional Certificate', ko: 'Google 프로젝트 관리 전문가 자격증 Credly 배지' },
      },
    ] as CertImage[],
  },
  {
    id: 'udemy-prompt',
    name: { en: 'The Complete Prompt Engineering for AI Bootcamp (2025)', ko: 'The Complete Prompt Engineering for AI Bootcamp (2025)' },
    issuer: 'Udemy',
    issued: { en: 'Aug 2025', ko: '2025년 8월' },
    detail: {
      en: 'Prompt design strategies for ChatGPT and other LLMs. Applying AI in development and productivity work.',
      ko: 'ChatGPT 등 LLM을 위한 프롬프트 설계 전략과 개발·업무 생산성에 AI를 적용하는 방법.',
    },
    verify: 'https://www.udemy.com/certificate/UC-e5e3ffd0-7e82-42bc-9a83-e89dfb964d8d/' as string | undefined,
    post: '/blog/2025-08-24-prompt-engineering-bootcamp/',
    accent: 'udemy',
    images: [
      {
        src: '/certificates/udemy-prompt-engineering.jpg', width: 1600, height: 1190, kind: 'certificate',
        alt: { en: 'Udemy certificate of completion for The Complete Prompt Engineering for AI Bootcamp (2025)', ko: 'The Complete Prompt Engineering for AI Bootcamp (2025) Udemy 수료증' },
      },
    ] as CertImage[],
  },
];

export const languageTests = [
  { name: 'TOPIK', score: '4', unit: { en: 'Level', ko: '급' }, level: { en: 'Level 4', ko: '4급' }, date: { en: 'Oct 2026', ko: '2026년 10월' }, lang: { en: 'Korean', ko: '한국어' } },
];

/** Home page field footage: the two JAKA Lumi clips from Robot World 2026. */
export const videos = [
  { id: 'NT1QNNQaFak', title: { en: 'JAKA Lumi at Robot World 2026 (Part 1)', ko: '로보월드 2026의 JAKA Lumi (1부)' }, project: 'jaka-lumi' },
  { id: 'bOgMzCQHOGQ', title: { en: 'JAKA Lumi at Robot World 2026 (Part 2)', ko: '로보월드 2026의 JAKA Lumi (2부)' }, project: 'jaka-lumi' },
];

export const techMarquee = [
  'ROS 2', 'JAKA SDK', 'NVIDIA Jetson Thor', 'YOLO', 'TensorRT', 'OpenCV', 'MuJoCo', 'Isaac Lab', 'PPO', 'Imitation learning',
  'whisper.cpp', 'Ollama', 'LS PLC', 'Modbus TCP', 'STM32', 'FastAPI', 'React Native', 'Flutter', 'Docker', 'C++', 'Python',
];
