# Supabase 연동 가이드 (인증 + 게시판 + 문의)

이 프로젝트는 Supabase 로 **로그인/회원가입**, **게시판 CRUD**, **문의 폼 저장**을 처리합니다.
코드는 모두 연결돼 있고, 아래 **대시보드 설정 3가지**만 하면 바로 동작합니다.

- 프로젝트 URL: `https://mogxucueizvnoggfurmv.supabase.co`
- 키는 `.env` 에 설정됨 (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)

---

## 1. 데이터베이스 테이블 + 보안 정책(RLS) 만들기

> `posts` 테이블은 이미 존재합니다 (컬럼: `id, title, content, author_id, author_name, created_at`).
> 코드는 이 스키마에 맞춰져 있습니다. 아래 SQL 은 **보안 정책(RLS)** 을 정리하고, 없는 `contacts` 테이블만 새로 만듭니다.

Supabase 대시보드 → **SQL Editor** 에 아래 SQL 전체를 붙여넣고 **Run** 하세요.

```sql
-- ========== 게시판: posts (기존 테이블에 RLS 적용) ==========
alter table public.posts enable row level security;

-- 기존 정책이 있으면 지우고 다시 만들기 (멱등 실행용)
drop policy if exists "posts are viewable by everyone" on public.posts;
drop policy if exists "logged-in users can insert their own posts" on public.posts;
drop policy if exists "authors can update their own posts" on public.posts;
drop policy if exists "authors can delete their own posts" on public.posts;

-- 목록/상세: 누구나 읽기 가능
create policy "posts are viewable by everyone"
  on public.posts for select
  using (true);

-- 작성: 로그인 사용자만, 그리고 본인 id 로만 저장 가능
create policy "logged-in users can insert their own posts"
  on public.posts for insert to authenticated
  with check (auth.uid() = author_id);

-- 수정: 작성자 본인만
create policy "authors can update their own posts"
  on public.posts for update to authenticated
  using (auth.uid() = author_id)
  with check (auth.uid() = author_id);

-- 삭제: 작성자 본인만
create policy "authors can delete their own posts"
  on public.posts for delete to authenticated
  using (auth.uid() = author_id);


-- ========== 문의 폼: contacts (신규 생성) ==========
create table if not exists public.contacts (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  company    text,
  message    text not null,
  created_at timestamptz not null default now()
);

alter table public.contacts enable row level security;

-- 익명 사용자도 문의 등록(INSERT)만 가능 (조회/수정/삭제 불가)
create policy "anyone can insert contacts"
  on public.contacts for insert to anon, authenticated
  with check (true);
```

> **RLS(Row Level Security)** 가 핵심입니다. 위 정책 덕분에
> - 게시글은 누구나 읽지만, **작성은 로그인 사용자만**,
> - **수정·삭제는 글쓴이 본인만** 할 수 있습니다. (다른 사람이 API 를 직접 호출해도 막힘)

---

## 2. 이메일/비밀번호 로그인 설정

기본적으로 회원가입 시 **이메일 인증**이 켜져 있습니다.

- **인증 메일 흐름 그대로 쓰기(권장, 운영용):** 별도 설정 불필요. 가입하면 확인 메일이 가고, 링크를 눌러야 로그인됩니다. 앱은 이 경우 "확인 메일을 보냈습니다" 화면을 보여줍니다.
- **테스트 중 바로 로그인되게 하기:** 대시보드 → **Authentication → Sign In / Providers → Email** 에서 **"Confirm email"** 을 끄면, 가입 즉시 로그인됩니다.

> 참고: 로컬 개발(`http://localhost:5173`)에서 메일 링크가 잘 돌아오도록
> **Authentication → URL Configuration → Site URL** 과 **Redirect URLs** 에
> `http://localhost:5173/company` 와 배포 주소 `https://gojump0713.github.io/company` 를 등록해 두세요.

---

## 3. 카카오 로그인 설정

카카오 버튼은 코드에 이미 있고, **카카오 개발자센터 + Supabase provider 설정**만 하면 됩니다.
(이 프로젝트의 카카오 앱 ID: `1486468`)

### 카카오 개발자센터
1. [developers.kakao.com](https://developers.kakao.com) → 해당 앱(ID 1486468)
2. **제품 설정 → 카카오 로그인** → 활성화 **ON**
3. **Redirect URI** 에 아래를 정확히 등록:
   ```
   https://mogxucueizvnoggfurmv.supabase.co/auth/v1/callback
   ```
4. Supabase 에 넣을 값 2개 확보:
   - **REST API 키** (앱 설정 → 앱 키) → Supabase 의 **Client ID**
   - **Client Secret** (제품 설정 → 카카오 로그인 → 보안 → 코드 생성 후 "사용함") → Supabase 의 **Client Secret**
5. (권장) **동의 항목**에서 **닉네임** 동의 설정 → 작성자 이름 표시에 사용

### Supabase 대시보드
**Authentication → Sign In / Providers → Kakao**:
- enabled 켜기
- **Client ID** ← 카카오 REST API 키
- **Client Secret** ← 카카오 Client Secret
- Save

> 설정 전까지는 카카오 버튼을 누르면 "해당 소셜 로그인이 아직 설정되지 않았습니다" 한국어 안내가 표시됩니다.

---

## 4. 실행

```bash
npm run dev
```

- `/signup` 회원가입 · `/login` 로그인 · 헤더에 로그인한 이메일/로그아웃 표시
- `/board` 게시판 목록(최신순) · `/board/new` 글쓰기(로그인 필요) · `/board/:id` 상세 · 본인 글만 수정/삭제

## 5. 배포 (GitHub Pages)

`npm run deploy` 로컬 배포 시 `.env` 값이 빌드에 포함됩니다.
GitHub Actions 로 배포한다면 리포지토리 **Settings → Secrets and variables → Actions** 에
`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` 를 추가하고 빌드 스텝에 주입하세요.
