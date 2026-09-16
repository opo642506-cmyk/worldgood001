# 현장기록 (worldgood001)

현장·사람·기록 — Next.js 기반 **AdSense 준비형** 한국어 블로그입니다.

짧은 URL, 마크다운 글, 추천 코드 기반 회원 가입, 관리자 추천 코드 관리까지 포함한 개인 사이트 골격입니다.

## 포함 기능

- 홈: `content/posts/*.md` 글 목록
- 글 상세: `/p/[slug]` (구 `/posts/[slug]` 는 리다이렉트)
- 소개: `/about`
- 가입: `/join` (추천 코드 필수)
- 로그인: `/login`
- 관리: `/admin` (관리자만 추천 코드 생성·목록·비활성)
- AdSense용 광고 자리 (사이드바·본문 중간) + `NEXT_PUBLIC_ADSENSE_CLIENT`
- SEO: 메타데이터, Open Graph, `sitemap.ts`, `robots.ts`
- 샘플·본문 글 16편 (영문 kebab-case 슬러그)

## 짧은 주소 / 도메인

- 사이트 제목 메타: **현장기록**
- 글 URL은 `/p/why-write`처럼 짧은 영문 슬러그를 사용합니다. (한글 경로의 긴 인코딩을 피함)
- 나중에 커스텀 도메인(예: `hyeonjang.kr`)을 연결하면 GitHub/Vercel 기본 URL 대신 쓸 수 있습니다. `NEXT_PUBLIC_SITE_URL`만 바꾸면 사이트맵·OG에 반영됩니다.

## 기술 스택

- Next.js 15 (App Router) + TypeScript + Tailwind CSS
- gray-matter + remark / remark-html (마크다운)
- bcryptjs + httpOnly 세션 쿠키 (로컬 JSON 스토어)

## 시작하기

```bash
cp .env.example .env.local
# SESSION_SECRET, ADMIN_USERNAME, ADMIN_PASSWORD 를 채우세요

npm install
npm run dev
```

프로덕션 빌드:

```bash
npm run build
npm start
```

첫 실행 시 `data/store.json`이 생성되며, 관리자 계정과 초기 추천 코드가 시드됩니다. (`data/store.json`은 gitignore)

## 회원·추천 코드·관리자

1. `/join`에서 아이디·비밀번호·**추천 코드**로 가입
2. `/login`으로 회원 로그인
3. `/admin`에서 관리자 로그인 후 추천 코드 생성·목록·비활성
4. 헤더: 글홈 · 소개 · 가입 · 로그인 (관리자 세션일 때만 **관리** 링크)

비밀번호는 bcryptjs로 해시하고, 세션은 `SESSION_SECRET`으로 서명한 httpOnly 쿠키를 사용합니다. **실제 비밀번호·시크릿을 저장소에 커밋하지 마세요.** `.env.example`의 플레이스홀더만 참고하세요.

## 글 추가하는 방법

1. `content/posts/`에 `short-english-slug.md` 파일을 만듭니다.
2. frontmatter 예시:

```markdown
---
title: "제목"
date: "2026-09-16"
description: "한 줄 요약"
tags: ["태그1", "태그2"]
---

본문…
```

3. 저장 후 `/p/short-english-slug`로 열립니다.

## AdSense 설정

1. [Google AdSense](https://www.google.com/adsense/)에서 사이트를 등록·승인받습니다.
2. `.env.local`에 `NEXT_PUBLIC_ADSENSE_CLIENT`를 넣습니다.
3. `public/ads.txt`에 AdSense가 안내하는 한 줄을 넣어 배포합니다. (**가짜 publisher ID 금지**)
4. 광고 단위 ID는 `components/AdSlot.tsx`의 `data-ad-slot`에 넣습니다.

환경 변수가 비어 있으면 안내 플레이스홀더가 표시됩니다.

## Vercel 배포

1. 저장소를 Vercel에 Import
2. Environment Variables: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_ADSENSE_CLIENT`, `SESSION_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`
3. 배포 후 커스텀 도메인 연결 (예: hyeonjang.kr)
4. 서버리스 환경에서는 로컬 파일 스토어(`data/store.json`)가 영속적이지 않을 수 있습니다. 개인 `npm run dev`·단일 인스턴스에 맞춰 설계되었습니다. 프로덕션에서는 DB로 옮기는 것을 권장합니다.

## 폴더 구조 (요약)

```
app/                 # 페이지·API·sitemap·robots
components/          # Header, 폼, AdSlot 등
content/posts/       # 마크다운 글
data/                # store.json (런타임 시드, gitignore)
lib/                 # posts, site, auth, store
public/ads.txt       # AdSense 템플릿
```

---

만든이: **박강원** — 현장형 기획자, 사람과 일을 잇고 글로 남기는 사람.
