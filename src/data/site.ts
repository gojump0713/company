export const site = {
  name: 'Tilon',
  legalName: 'Tilon Inc.',
  tagline: '기술로 비즈니스의 내일을 설계합니다',
  description:
    '웹·모바일·클라우드·AI까지, 아이디어를 실제 제품으로 구현하는 IT 개발 전문 기업입니다.',
  email: 'contact@tilon.dev',
  phone: '+82 2-0000-0000',
  address: '서울특별시 강남구 테헤란로 000',
  social: {
    github: 'https://github.com/gojump0713',
    linkedin: '#',
  },
} as const

export type NavItem = { label: string; to: string }

export const nav: NavItem[] = [
  { label: '홈', to: '/' },
  { label: '서비스', to: '/services' },
  { label: '회사소개', to: '/about' },
  { label: '문의', to: '/contact' },
]

export type Service = {
  icon: string
  title: string
  summary: string
  points: string[]
}

export const services: Service[] = [
  {
    icon: '🌐',
    title: '웹 애플리케이션',
    summary: '확장 가능한 모던 웹 서비스',
    points: ['React / Next.js', '반응형 UI/UX', '대시보드 · 관리자'],
  },
  {
    icon: '📱',
    title: '모바일 앱',
    summary: 'iOS · Android 크로스플랫폼',
    points: ['React Native / Flutter', '네이티브 연동', '스토어 배포 운영'],
  },
  {
    icon: '☁️',
    title: '클라우드 · DevOps',
    summary: '안정적인 인프라와 자동화',
    points: ['AWS / GCP', 'CI/CD 파이프라인', '컨테이너 · 쿠버네티스'],
  },
  {
    icon: '🤖',
    title: 'AI · 데이터',
    summary: 'LLM 기반 지능형 솔루션',
    points: ['LLM 통합 · RAG', '데이터 파이프라인', 'MLOps'],
  },
]

export type Stat = { value: string; label: string }

export const stats: Stat[] = [
  { value: '120+', label: '완료 프로젝트' },
  { value: '40+', label: '협력 기업' },
  { value: '8년', label: '업력' },
  { value: '99.9%', label: '서비스 가동률' },
]

export type Step = { no: string; title: string; desc: string }

export const process: Step[] = [
  { no: '01', title: '상담 · 분석', desc: '비즈니스 목표와 요구사항을 함께 정의합니다.' },
  { no: '02', title: '설계 · 기획', desc: '아키텍처와 UX를 설계하고 로드맵을 수립합니다.' },
  { no: '03', title: '개발 · 검증', desc: '애자일 방식으로 구현하고 지속적으로 검증합니다.' },
  { no: '04', title: '배포 · 운영', desc: '안정적으로 배포하고 지속적으로 유지보수합니다.' },
]
