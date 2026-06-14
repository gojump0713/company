# 개발일지 (DEVLOG)

IT 개발 전문 기업 **Tilon** 회사 사이트 개발 기록입니다.

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
