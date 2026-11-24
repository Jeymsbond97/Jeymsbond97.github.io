export const languages = { en: 'English', ko: '한국어' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

export const ui = {
  en: {
    'skip': 'Skip to content',
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.blog': 'Blog',
    'nav.certificates': 'Certificates',
    'nav.resume': 'Resume',
    'nav.contact': 'Contact',
    'nav.menu': 'Menu',
    'nav.close': 'Close menu',
    'theme.toggle': 'Toggle light and dark theme',
    'lang.switch': '한국어로 보기',

    'hero.status': 'Seoul · E-7 visa · Korean TOPIK 4 · On-site and travel OK',
    'hero.role': 'Robot Software Engineer · Physical AI',
    'hero.value':
      'I build the software that makes collaborative and service robots work in real places: computer vision, on-device AI, robot motion and PLC integration, plus the backend and apps people use to operate them.',
    'hero.cta.projects': 'View projects',
    'hero.cta.resume': 'Resume',
    'hero.cta.contact': 'Get in touch',
    'hero.pendant.program': 'Program',
    'hero.pendant.running': 'Running',
    'hero.pendant.cycle': 'Cycle',
    'hero.pendant.target': 'Target',

    'stats.software': 'years building software',
    'stats.robots': 'robot projects delivered in 2026',
    'stats.acceptance': 'factory line passed customer acceptance',
    'stats.korean': 'Korean, used daily on site',

    'about.title': 'About',
    'about.body1':
      'Robot software engineer in Seoul building collaborative and service robots that work in real places. Before robotics I spent about four years as a software developer (mobile apps, web platforms, IoT and backend services), so I can build the full system around a robot.',
    'about.body2':
      'I also work in Physical AI: reinforcement learning and imitation learning for robot control and humanoid locomotion in NVIDIA Isaac Lab and MuJoCo, and VLA models for language-driven manipulation.',
    'about.langs': 'Korean TOPIK 4 · English IELTS 7.0 · Uzbek native',
    'about.visa': 'E-7 visa holder; a new employer files the workplace-change procedure.',

    'section.featured': 'Selected robot projects',
    'section.featured.lead': 'Real robots, real sites. What I built, with my role separated from the company and the robot maker.',
    'section.physical': 'Physical AI',
    'section.physical.lead': 'My own simulation and robot-learning projects: MuJoCo, reinforcement learning, sim-to-real.',
    'section.videos': 'On video',
    'section.videos.lead': 'Short demos from my YouTube channel. Click to play.',
    'section.blog': 'Latest from the blog',
    'section.experience': 'Experience',
    'section.skills': 'Skills',
    'section.certs': 'Certificates',
    'section.contact': 'Let’s build robots that work.',
    'section.contact.lead': 'Open to robot software, robot application and Physical AI roles in Seoul and Gyeonggi.',
    'all.projects': 'All projects',
    'all.posts': 'All posts',
    'all.certs': 'All certificates',
    'view.case': 'Case study',

    'skills.robotics': 'Robotics',
    'skills.physical': 'Physical AI',
    'skills.vision': 'AI and vision',
    'skills.edge': 'Edge and industrial',
    'skills.software': 'Software',

    'project.role': 'Role',
    'project.period': 'Period',
    'project.team': 'Team',
    'project.platform': 'Platform',
    'project.status': 'Status',
    'project.diagram': 'System diagram',
    'project.stack': 'Tech stack',
    'project.results': 'Results',
    'project.videos': 'Videos',
    'project.gallery': 'Gallery',
    'project.repo': 'Source code',
    'project.next': 'Next project',
    'project.prev': 'Previous project',
    'projects.title': 'Projects',
    'projects.lead': 'Robots I have built software for at work, and the Physical AI projects I build on my own.',
    'projects.robotics': 'Robotics at work',
    'projects.physical': 'Physical AI, independent',

    'blog.title': 'Blog',
    'blog.lead': 'Exhibitions, engineering notes and life in Korea. Newest first; every post is also on LinkedIn.',
    'blog.original': 'Originally posted on LinkedIn',
    'blog.newer': 'Newer post',
    'blog.older': 'Older post',
    'blog.back': 'All posts',
    'blog.watch': 'Watch on YouTube',
    'blog.translationNote': 'This post was translated from the original.',

    'certs.title': 'Certificates',
    'certs.lead': 'Courses and credentials I have completed. More will be added as I earn them.',
    'certs.issued': 'Issued',
    'certs.verify': 'Verify credential',
    'certs.post': 'Read the post',
    'certs.languages': 'Language tests',

    'resume.title': 'Resume',
    'resume.lead': 'A one-page summary for recruiters. Download the PDF or read it here.',
    'resume.download.en': 'Download PDF (English)',
    'resume.download.ko': 'Download PDF (Korean)',
    'resume.summary': 'Summary',
    'resume.experience': 'Experience',
    'resume.projects': 'Key projects',
    'resume.education': 'Education',
    'resume.skills': 'Skills',
    'resume.languages': 'Languages and certificates',

    'contact.title': 'Contact',
    'contact.lead': 'Tell me about your robot, your team or the role. I usually reply within a day.',
    'contact.form.name': 'Your name',
    'contact.form.email': 'Your email',
    'contact.form.company': 'Company (optional)',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.send': 'Send message',
    'contact.form.sending': 'Sending…',
    'contact.form.ok': 'Thank you. Your message is on its way to my inbox.',
    'contact.form.err': 'Something went wrong. Please email me directly instead.',
    'contact.direct': 'Direct',
    'contact.social': 'Social',
    'contact.location': 'Seoul, South Korea',
    'contact.copy': 'Copy',
    'contact.copied': 'Copied',

    'footer.built': 'Built with Astro. Hosted on GitHub Pages.',
    'footer.top': 'Back to top',

    '404.title': 'This waypoint does not exist',
    '404.body': 'The robot reached the end of its path. The page you are looking for may have moved.',
    '404.home': 'Return home',
  },
  ko: {
    'skip': '본문으로 건너뛰기',
    'nav.home': '홈',
    'nav.projects': '프로젝트',
    'nav.blog': '블로그',
    'nav.certificates': '자격증',
    'nav.resume': '이력서',
    'nav.contact': '연락하기',
    'nav.menu': '메뉴',
    'nav.close': '메뉴 닫기',
    'theme.toggle': '라이트/다크 테마 전환',
    'lang.switch': 'View in English',

    'hero.status': '서울 · E-7 비자 · 한국어 TOPIK 4급 · 현장 근무·출장 가능',
    'hero.role': '로봇 소프트웨어 엔지니어 · Physical AI',
    'hero.value':
      '협동로봇과 서비스 로봇이 실제 현장에서 동작하도록 만드는 소프트웨어를 개발합니다. 컴퓨터 비전, 온디바이스 AI, 로봇 모션, PLC 연동부터 로봇을 운영하는 백엔드와 앱까지 담당합니다.',
    'hero.cta.projects': '프로젝트 보기',
    'hero.cta.resume': '이력서',
    'hero.cta.contact': '연락하기',
    'hero.pendant.program': '프로그램',
    'hero.pendant.running': '실행 중',
    'hero.pendant.cycle': '사이클',
    'hero.pendant.target': '목표',

    'stats.software': '년 소프트웨어 개발 경력',
    'stats.robots': '2026년 로봇 프로젝트',
    'stats.acceptance': '공장 자동화 라인 고객사 검수 통과',
    'stats.korean': '현장에서 매일 한국어 사용',

    'about.title': '소개',
    'about.body1':
      '서울에서 실제 현장에서 동작하는 협동로봇과 서비스 로봇을 개발하는 로봇 소프트웨어 엔지니어입니다. 로봇 분야 이전에 약 4년간 모바일 앱, 웹 플랫폼, IoT, 백엔드 서비스를 개발했기 때문에 로봇을 둘러싼 전체 시스템을 직접 만들 수 있습니다.',
    'about.body2':
      'Physical AI 분야에서도 일합니다. NVIDIA Isaac Lab과 MuJoCo에서 강화학습과 모방학습으로 로봇 제어와 휴머노이드 보행을 다루고, 언어 기반 매니퓰레이션을 위한 VLA 모델을 활용합니다.',
    'about.langs': '한국어 TOPIK 4급 · 영어 IELTS 7.0 · 우즈베크어 모국어',
    'about.visa': 'E-7 비자 보유. 이직 시 새 회사에서 근무처 변경 절차를 진행합니다.',

    'section.featured': '대표 로봇 프로젝트',
    'section.featured.lead': '실제 로봇, 실제 현장. 회사와 로봇 제조사의 역할과 구분해 제가 직접 만든 부분을 소개합니다.',
    'section.physical': 'Physical AI',
    'section.physical.lead': 'MuJoCo, 강화학습, sim-to-real을 활용한 개인 시뮬레이션 및 로봇 학습 프로젝트입니다.',
    'section.videos': '영상',
    'section.videos.lead': '유튜브 채널의 짧은 데모 영상입니다. 클릭하면 재생됩니다.',
    'section.blog': '최근 블로그',
    'section.experience': '경력',
    'section.skills': '보유 기술',
    'section.certs': '자격증',
    'section.contact': '현장에서 동작하는 로봇을 함께 만들어요.',
    'section.contact.lead': '서울·경기 지역의 로봇 소프트웨어, 로봇 애플리케이션, Physical AI 포지션에 열려 있습니다.',
    'all.projects': '전체 프로젝트',
    'all.posts': '전체 글',
    'all.certs': '전체 자격증',
    'view.case': '자세히 보기',

    'skills.robotics': '로보틱스',
    'skills.physical': 'Physical AI',
    'skills.vision': 'AI 및 비전',
    'skills.edge': '엣지 및 산업',
    'skills.software': '소프트웨어',

    'project.role': '역할',
    'project.period': '기간',
    'project.team': '소속',
    'project.platform': '플랫폼',
    'project.status': '상태',
    'project.diagram': '시스템 구성도',
    'project.stack': '기술 스택',
    'project.results': '성과',
    'project.videos': '영상',
    'project.gallery': '갤러리',
    'project.repo': '소스 코드',
    'project.next': '다음 프로젝트',
    'project.prev': '이전 프로젝트',
    'projects.title': '프로젝트',
    'projects.lead': '회사에서 소프트웨어를 개발한 로봇들과, 개인적으로 진행하는 Physical AI 프로젝트입니다.',
    'projects.robotics': '회사 로봇 프로젝트',
    'projects.physical': 'Physical AI 개인 프로젝트',

    'blog.title': '블로그',
    'blog.lead': '전시회, 엔지니어링 노트, 한국 생활 이야기. 최신 글부터 보여주며, 모든 글은 링크드인에도 있습니다.',
    'blog.original': '링크드인 원문 보기',
    'blog.newer': '최근 글',
    'blog.older': '이전 글',
    'blog.back': '전체 글',
    'blog.watch': '유튜브에서 보기',
    'blog.translationNote': '이 글은 원문을 번역한 것입니다.',

    'certs.title': '자격증',
    'certs.lead': '이수한 교육과 자격증입니다. 새로 취득하면 계속 추가할 예정입니다.',
    'certs.issued': '발급',
    'certs.verify': '자격 확인',
    'certs.post': '관련 글 보기',
    'certs.languages': '어학 시험',

    'resume.title': '이력서',
    'resume.lead': '채용 담당자를 위한 한 페이지 요약입니다. PDF로 내려받거나 여기서 읽을 수 있습니다.',
    'resume.download.en': 'PDF 다운로드 (영문)',
    'resume.download.ko': 'PDF 다운로드 (국문)',
    'resume.summary': '요약',
    'resume.experience': '경력',
    'resume.projects': '주요 프로젝트',
    'resume.education': '학력',
    'resume.skills': '보유 기술',
    'resume.languages': '어학 및 자격증',

    'contact.title': '연락하기',
    'contact.lead': '로봇, 팀, 포지션에 대해 알려주세요. 보통 하루 안에 답장드립니다.',
    'contact.form.name': '이름',
    'contact.form.email': '이메일',
    'contact.form.company': '회사 (선택)',
    'contact.form.subject': '제목',
    'contact.form.message': '메시지',
    'contact.form.send': '메시지 보내기',
    'contact.form.sending': '보내는 중…',
    'contact.form.ok': '감사합니다. 메시지가 제 메일함으로 전송되었습니다.',
    'contact.form.err': '전송에 실패했습니다. 이메일로 직접 연락해 주세요.',
    'contact.direct': '직접 연락',
    'contact.social': '소셜',
    'contact.location': '대한민국 서울',
    'contact.copy': '복사',
    'contact.copied': '복사됨',

    'footer.built': 'Astro로 제작, GitHub Pages에서 호스팅.',
    'footer.top': '맨 위로',

    '404.title': '존재하지 않는 웨이포인트입니다',
    '404.body': '로봇이 경로의 끝에 도착했습니다. 찾으시는 페이지가 이동했을 수 있습니다.',
    '404.home': '홈으로 돌아가기',
  },
} as const;

export type UIKey = keyof (typeof ui)['en'];

export function t(lang: Lang, key: UIKey): string {
  return ui[lang][key] ?? ui.en[key];
}

/** Prefix a site path with the locale ("/projects/" -> "/ko/projects/"). */
export function localize(lang: Lang, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return lang === 'en' ? clean : `/ko${clean === '/' ? '/' : clean}`;
}

/** The same page in the other language. */
export function alternatePath(pathname: string, target: Lang): string {
  const stripped = pathname.replace(/^\/ko(?=\/|$)/, '') || '/';
  return localize(target, stripped);
}

export function formatDate(date: Date, lang: Lang, withTime = false): string {
  const opts: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: lang === 'ko' ? 'long' : 'short',
    day: 'numeric',
    timeZone: 'Asia/Seoul',
  };
  if (withTime) {
    opts.hour = '2-digit';
    opts.minute = '2-digit';
    opts.hour12 = false;
  }
  return new Intl.DateTimeFormat(lang === 'ko' ? 'ko-KR' : 'en-GB', opts).format(date);
}

export const categoryLabel: Record<string, Record<Lang, string>> = {
  all: { en: 'All', ko: '전체' },
  Exhibition: { en: 'Exhibition', ko: '전시회' },
  Tech: { en: 'Tech', ko: '기술' },
  Event: { en: 'Event', ko: '행사' },
  Career: { en: 'Career', ko: '커리어' },
  Certificate: { en: 'Certificate', ko: '자격증' },
  Life: { en: 'Life', ko: '일상' },
};
