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
  web3formsKey: '',
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
    company: { en: 'Cutshion', ko: '쿳션(Cutshion)' },
    place: { en: 'Seoul · Advanced Development Team', ko: '서울 · 선행개발실' },
    period: { en: 'May 2026 – Present', ko: '2026.05 – 현재' },
    current: true,
    points: {
      en: [
        'Sole developer of the JAKA Lumi service robot application: on-device voice AI, YOLO and TensorRT vision, navigation behaviours, pick-and-place, REST API, dashboard and mobile app.',
        'Backend and vision system for a factory line with two JAKA cobots and an LS PLC over Modbus TCP. Passed customer acceptance in Aug 2026.',
        'Book palletizing cell for Prinpia, an AI portrait drawing robot and an LLM tool that writes JAKA block-code programs with safety checks.',
        'On-site installation, integration and teaching of robots, grippers, RGB-D cameras and sensors. STM32 ultrasonic sensor node over Modbus RTU and RS485.',
      ],
      ko: [
        'JAKA Lumi 서비스 로봇 애플리케이션 단독 개발: 온디바이스 음성 AI, YOLO·TensorRT 비전, 주행 동작, 픽앤플레이스, REST API, 대시보드, 모바일 앱.',
        'JAKA 협동로봇 2대와 LS PLC(Modbus TCP)로 구성된 공장 라인의 백엔드 및 비전 시스템 개발. 2026년 8월 고객사 검수 통과.',
        'Prinpia 도서 팔레타이징 셀, AI 초상화 드로잉 로봇, 안전 검증을 포함한 JAKA 블록코딩 프로그램 생성 LLM 도구 개발.',
        '로봇, 그리퍼, RGB-D 카메라, 센서의 현장 설치·연동·티칭. Modbus RTU·RS485 기반 STM32 초음파 센서 노드 개발.',
      ],
    },
    tags: ['ROS 2', 'Python', 'C++', 'JAKA SDK', 'YOLO', 'TensorRT', 'Jetson', 'PLC', 'Modbus', 'FastAPI'],
  },
  {
    title: { en: 'Full-stack Developer', ko: '풀스택 개발자' },
    company: { en: 'KEICO', ko: 'KEICO(케이코플러스)' },
    place: { en: 'Seoul · Development Team', ko: '서울 · 개발팀' },
    period: { en: 'Oct 2025 – May 2026', ko: '2025.10 – 2026.05' },
    points: {
      en: [
        'Rebuilt the FECO energy management app (iOS, Android) in Flutter: monitoring, schedules, alarms and remote IoT control. Smart plugs, IR controllers and Zigbee sensors connect over REST, MQTT and an edge gateway.',
        'Prototyped reinforcement-learning temperature control on real-time sensor data.',
        'Built the company websites keicoplus.com and keico.info with NestJS, GraphQL and Next.js on AWS (Docker). Evaluated the tech stack and wrote the system documentation.',
      ],
      ko: [
        'FECO 에너지 관리 앱(iOS, Android)을 Flutter로 전체 리빌드: 모니터링, 스케줄, 알람, IoT 기기 원격 제어. 스마트 플러그, IR 컨트롤러, Zigbee 센서를 REST·MQTT·엣지 게이트웨이로 연동.',
        '실시간 센서 데이터 기반 강화학습 온도 제어 프로토타입 개발.',
        '기업 웹사이트 keicoplus.com, keico.info 개발(NestJS, GraphQL, Next.js, AWS Docker 배포). 기술 스택 검토 및 시스템 문서 작성.',
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
        'JWT and Spring Security authentication. Real-time features with WebSocket and Socket.IO. Docker services on AWS EC2 behind Nginx.',
      ],
      ko: [
        'NestJS, Node.js, Spring Boot, Python 기반 백엔드 및 GraphQL/REST API 개발 (PostgreSQL, MySQL, MongoDB).',
        'JWT·Spring Security 인증, WebSocket·Socket.IO 실시간 기능 구현. Docker 서비스를 AWS EC2와 Nginx로 배포.',
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
      en: ['Responsive web apps with React, TypeScript, Redux and Tailwind CSS.', 'Multilingual (i18n) sites, Three.js 3D features and performance refactoring.'],
      ko: ['React, TypeScript, Redux, Tailwind CSS 기반 반응형 웹 개발.', '다국어(i18n) 사이트, Three.js 3D 기능 구현, 성능 개선 리팩토링.'],
    },
    tags: ['React', 'TypeScript', 'Redux', 'Three.js'],
  },
];

export const education = [
  {
    school: { en: 'Jeonbuk National University', ko: '전북대학교' },
    degree: { en: 'B.E. Computer Science and Engineering · GPA 3.7', ko: '컴퓨터공학부 컴퓨터공학전공 학사 · 학점 3.7' },
    period: { en: 'Sep 2021 – Feb 2025', ko: '2021.09 – 2025.02' },
    place: { en: 'Jeonju, South Korea', ko: '대한민국 전주' } as L,
    years: '2021–2025',
    note: { en: 'Excellent Student Award 2023 (top 10 of the department)', ko: '2023 우수학생상 (학과 성적 상위 10명)' } as L | undefined,
  },
  {
    school: { en: 'Ferghana Polytechnic Institute', ko: '페르가나 공과대학교 (우즈베키스탄)' },
    degree: { en: 'Mechanical Engineering', ko: '기계공학' },
    period: { en: '2016 – 2019', ko: '2016 – 2019' },
    place: { en: 'Ferghana, Uzbekistan', ko: '우즈베키스탄 페르가나' } as L,
    years: '2016–2019',
    note: undefined as L | undefined,
  },
];

export type AchievementKind = 'award' | 'globe' | 'expo' | 'run' | 'community';

export interface Achievement {
  kind: AchievementKind;
  year: string;
  title: L;
  detail: L;
  /** Blog post slugs (under /blog/) that document the achievement. */
  posts: string[];
}

export const achievements: Achievement[] = [
  {
    kind: 'award',
    year: '2023',
    title: { en: 'Excellent Student Award', ko: '우수학생상' },
    detail: { en: 'Top 10 of the department at Jeonbuk National University. Graduated with a GPA of 3.7.', ko: '전북대학교 학과 성적 상위 10명. 학점 3.7로 졸업.' },
    posts: [],
  },
  {
    kind: 'globe',
    year: '2026',
    title: { en: 'Global Seoul Supporter', ko: '글로벌 서울 서포터즈' },
    detail: { en: 'Selected to represent Uzbekistan. Run by the Seoul Metropolitan Government and IWIK with members from 26 countries.', ko: '우즈베키스탄 대표로 선발. 서울특별시와 IWIK가 운영하며 26개국 참가.' },
    posts: ['2026-06-28-global-seoul-supporters'],
  },
  {
    kind: 'expo',
    year: '2026',
    title: { en: 'Robot World 2026', ko: '로보월드 2026' },
    detail: { en: 'Represented Cutshion at KINTEX and showed visitors JAKA Lumi running the software I built.', ko: 'KINTEX에서 쿳션을 대표해 직접 개발한 소프트웨어로 동작하는 JAKA Lumi 시연.' },
    posts: ['2026-11-11-robot-world-2026'],
  },
  {
    kind: 'expo',
    year: '2026',
    title: { en: 'SMATEC 2026', ko: 'SMATEC 2026' },
    detail: { en: 'Represented Cutshion at the smart manufacturing and AI exhibition in Suwon.', ko: '수원 스마트 제조·AI 전시회에 쿳션 대표로 참가.' },
    posts: ['2026-11-22-smatec-2026'],
  },
  {
    kind: 'expo',
    year: '2026',
    title: { en: 'KICEF 2026', ko: 'KICEF 2026' },
    detail: { en: 'Exhibited Cutshion robotic arm systems with my team in Daegu and supported customer consultations.', ko: '대구에서 팀과 함께 쿳션 로봇팔 시스템을 전시하고 고객 상담 지원.' },
    posts: ['2026-09-24-kicef-2026'],
  },
  {
    kind: 'run',
    year: '2026',
    title: { en: 'Full marathon, 42 km', ko: '풀코스 마라톤 42km' },
    detail: { en: 'Finished the full distance, plus 4 km after a wrong turn.', ko: '길을 잘못 들어 4km를 더 달리고도 풀코스 완주.' },
    posts: ['2026-08-05-full-marathon'],
  },
  {
    kind: 'run',
    year: '2026',
    title: { en: 'Trail marathons', ko: '트레일 마라톤' },
    detail: { en: 'First official trail race: 26th of 213 runners on a rainy mountain course. A half trail marathon followed.', ko: '첫 공식 트레일 대회에서 213명 중 26위. 이어서 하프 트레일 마라톤 완주.' },
    posts: ['2026-07-07-first-trail-marathon', '2026-07-23-half-trail-marathon'],
  },
  {
    kind: 'community',
    year: '2025',
    title: { en: 'Uzbek IT community in Korea', ko: '재한 우즈베키스탄 IT 커뮤니티' },
    detail: { en: 'Meetups with Uzbek engineers working at IT companies in Korea. Dev Korea at Google Campus Seoul.', ko: '한국 IT 기업에서 일하는 우즈베키스탄 엔지니어 밋업 참여. 구글 캠퍼스 서울 Dev Korea 참가.' },
    posts: ['2025-12-13-uzbek-it-professionals-meetup', '2025-12-11-dev-korea-google-campus'],
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

export const videos = [
  { id: 'NT1QNNQaFak', title: { en: 'JAKA Lumi at Robot World 2026 (Part 1)', ko: '로보월드 2026의 JAKA Lumi (1부)' }, project: 'jaka-lumi' },
  { id: '3sMe1mavDQk', title: { en: 'Real-time vision for a factory line', ko: '공장 라인 실시간 비전' }, project: 'factory-vision-line' },
  { id: 'LLDMCQPEUec', title: { en: 'Robotic book palletizing cell', ko: '로봇 도서 팔레타이징 셀' }, project: 'prinpia-book-palletizing' },
  { id: 'YgD8-ZfAPD8', title: { en: 'AI portrait drawing robot', ko: 'AI 초상화 드로잉 로봇' }, project: 'ai-drawing-robot' },
  { id: 'bOgMzCQHOGQ', title: { en: 'JAKA Lumi at Robot World 2026 (Part 2)', ko: '로보월드 2026의 JAKA Lumi (2부)' }, project: 'jaka-lumi' },
  { id: 'y0vjoXO-Isk', title: { en: 'JAKA MiniCobo pick-and-place demo', ko: 'JAKA MiniCobo 픽앤플레이스 데모' }, project: 'jaka-minicobo-education' },
];

export const techMarquee = [
  'ROS 2', 'JAKA SDK', 'NVIDIA Jetson Thor', 'YOLO', 'TensorRT', 'OpenCV', 'MuJoCo', 'Isaac Lab', 'PPO', 'Imitation learning',
  'whisper.cpp', 'Ollama', 'LS PLC', 'Modbus TCP', 'STM32', 'FastAPI', 'React Native', 'Flutter', 'Docker', 'C++', 'Python',
];
