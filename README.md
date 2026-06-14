# Tilon — 회사 사이트

IT 개발 전문 기업 **Tilon**의 공식 웹사이트입니다.
GitHub Pages로 배포됩니다 → **https://gojump0713.github.io/company/**

## 기술 스택
- Vite 6 · React 19 · TypeScript
- Tailwind CSS v4
- React Router v7
- GitHub Actions 자동 배포

## 시작하기
```bash
npm install      # 의존성 설치
npm run dev      # 개발 서버 (http://localhost:5173/company/)
npm run build    # 프로덕션 빌드 → dist/
npm run preview  # 빌드 결과 미리보기
```

## 프로젝트 구조
```
src/
  components/   공통 컴포넌트 (Header, Footer, ui/)
  data/         사이트 콘텐츠 단일 소스 (site.ts)
  layouts/      RootLayout
  pages/        Home, Services, About, Contact, NotFound
  index.css     Tailwind + 디자인 토큰
public/         favicon, 404.html(SPA 폴백)
.github/        Pages 배포 워크플로우
docs/DEVLOG.md  개발일지
```

## 배포
`main` 브랜치에 푸시하면 GitHub Actions가 자동으로 빌드 후 Pages에 배포합니다.

> 최초 1회: 리포지토리 **Settings → Pages → Build and deployment → Source**를
> **GitHub Actions**로 설정해야 합니다.

자세한 개발 내역은 [docs/DEVLOG.md](docs/DEVLOG.md)를 참고하세요.
