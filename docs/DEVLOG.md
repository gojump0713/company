# 개발일지 (DEVLOG)

IT 개발 전문 기업 **Tilon** 회사 사이트 개발 기록입니다.

---

## 2026-06-15 — 배포 방식 변경: GitHub Actions → gh-pages 수동 배포

### 한 일
- GitHub Actions 워크플로우(`.github/workflows/deploy.yml`) 제거
- `gh-pages` 패키지로 `dist`를 `gh-pages` 브랜치에 직접 푸시하는 **수동 배포**로 전환
  - 배포 명령: `npm run deploy` (`npm run build && gh-pages -d dist`)
- `public/.nojekyll` 추가 — GitHub Pages의 Jekyll 처리 비활성화
- Pages 소스를 **Deploy from a branch → `gh-pages` / (root)** 로 변경

### 참고
- 이제 `main` 푸시만으로는 사이트가 갱신되지 않음. 반드시 `npm run deploy` 실행 필요.

---

## 2026-06-15 — Hero에 Vanta.WAVES 애니메이션 배경 적용

### 한 일
- `three@0.134` + `vanta@0.5.24` 설치 (Vanta 호환 three 버전 고정)
- `VantaWaves` 컴포넌트로 Hero 배경에 WAVES 효과 적용
  - `three`/`vanta`를 **동적 import** → 초기 번들에서 분리(별도 청크, 지연 로드)
  - 활성 **액센트 팔레트 색상**(`--color-brand-800`)으로 파도 색 연동
  - `prefers-reduced-motion` 존중 → 모션 민감 사용자는 정적 배경 유지
  - 언마운트 시 `effect.destroy()`로 정리, StrictMode 이중 호출 가드
- `vanta`/`three` 타입 앰비언트 선언 추가(`src/types/vanta.d.ts`)
- 콘텐츠 `z-10`, 글로우 오버레이 `z-[1]`로 캔버스 위 레이어링 정리
- `vite.config.ts` `chunkSizeWarningLimit: 800` (three 청크 경고 정리)

### 검증
- `npm run build` 성공 — `three.module`(614KB)·`vanta.waves.min`(12KB) 별도 청크 분리 확인
- preview: 홈 200, lazy 청크 정상 제공

---

## 2026-06-15 — 다크/라이트 모드 + 5색 컬러 팔레트

### 한 일
- **시맨틱 컬러 토큰 도입** (`index.css`): `bg/fg/muted/surface/card/border`로 하드코딩
  컬러(white·slate·ink)를 대체 → 테마 전환의 기반 마련
- **다크 테마**: `[data-theme="dark"]` 토큰 오버라이드
- **5색 액센트 팔레트**: `[data-accent]`로 brand 램프 교체 (블루·바이올렛·에메랄드·로즈·앰버)
- **상태 관리**: `ThemeProvider`(Context) + `localStorage` 영속화, `useTheme` 훅
- **UI**: `ThemeControls`(라이트/다크 토글 + 5색 스와치)를 **헤더 우측 끝**에 배치
  (데스크톱: 우측 클러스터 / 모바일: 드롭다운 메뉴 하단)
- **FOUC 방지**: `index.html`에 pre-paint 인라인 스크립트로 저장된 테마 즉시 적용
- 폰트 로딩을 CSS `@import` → `<link>`로 이전 (빌드 경고 제거)

### 검증
- `npm run build` 경고 0
- preview: CSS에 `[data-theme=dark]` + 4종 액센트 오버라이드 + 시맨틱 토큰 번들 확인

---

## 2026-06-15 — 프로젝트 셋업 & 스타터 사이트 구축

### 개요
빈 리포지토리(`README`만 존재)에서 출발해, GitHub Pages 프로젝트 페이지
(`https://gojump0713.github.io/company/`)에 배포되는 회사 사이트의 개발 기반을
구축했다.

### 기술 스택
- **Vite 6** + **React 19** + **TypeScript**
- **Tailwind CSS v4** (`@tailwindcss/vite` 플러그인, `@theme` 토큰)
- **React Router v7** (브라우저 라우터, `basename: /company`)
- 폰트: Pretendard Variable (CDN)
- 배포: **GitHub Actions** → GitHub Pages

### 한 일
1. **프로젝트 설정**
   - `package.json`, `vite.config.ts`(`base: '/company/'`, `@` 별칭),
     `tsconfig*.json`, `.gitignore`, `index.html` 구성
2. **스타일 시스템**
   - `src/index.css`에 Tailwind v4 + 브랜드 컬러 토큰(`brand-*`, `ink`) 정의
   - Pretendard 웹폰트 적용, focus-visible 접근성 스타일
3. **공통 컴포넌트 / 레이아웃**
   - `Container`, `Section`/`SectionHeading`, `ButtonLink`(UI 프리미티브)
   - `Header`(반응형 모바일 메뉴 포함), `Footer`, `RootLayout`(스크롤 리셋)
   - 사이트 데이터 단일 소스: `src/data/site.ts`
4. **페이지 (4 + 404)**
   - `Home` — Hero · 통계 · 서비스 · 프로세스 · CTA
   - `Services` — 서비스 상세
   - `About` — 회사 소개 · 핵심 가치
   - `Contact` — 문의 폼(제출 상태 처리, 백엔드 연동 지점 표시)
   - `NotFound` — 404
5. **GitHub Pages SPA 대응**
   - `public/404.html` + `index.html` 리다이렉트 스크립트로 딥링크 새로고침 404 해결
6. **배포 자동화**
   - `.github/workflows/deploy.yml` — `main` 푸시 시 빌드 후 Pages 배포

### 검증
- `npm run build` 성공 (타입체크 + Vite 빌드, 경고 0)
- `vite preview`에서 `/company/` HTTP 200, root div / CSS 에셋 정상 로드 확인

### 다음 할 일 (TODO)
- [ ] 실제 회사 정보(상호/연락처/주소)로 `src/data/site.ts` 교체
- [ ] 포트폴리오/실적 페이지 추가
- [ ] Contact 폼 백엔드 연동 (Formspree / EmailJS 등)
- [ ] 메타 태그 · OG 이미지 · 파비콘 브랜딩
- [ ] 리포지토리 Settings → Pages → Source를 **GitHub Actions**로 설정 (최초 1회)
