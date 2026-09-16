# 현장기록 (worldgood001)

현장·사람·기록 — Next.js 기반 **AdSense 준비형** 한국어 블로그 스타터입니다.

글을 쓰고, 내용을 쌓고, Google AdSense로 광고를 받을 수 있도록 레이아웃·SEO·광고 자리까지 갖춘 기본 골격입니다. (인증·DB·결제 없음)

## 포함 기능

- 홈: `content/posts/*.md` 글 목록
- 글 상세: `/posts/[slug]`
- 소개: `/about` (박강원 — 현장형 기획자 소개 플레이스홀더)
- AdSense용 광고 자리 (사이드바·본문 중간) + `NEXT_PUBLIC_ADSENSE_CLIENT` 환경 변수
- SEO: 메타데이터, Open Graph, `sitemap.ts`, `robots.ts`
- 반응형·가독성 중심 한국어 타이포그래피
- 샘플 글 3편

## 기술 스택

- Next.js 15 (App Router) + TypeScript + Tailwind CSS
- gray-matter + remark / remark-html (마크다운)

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 (http://localhost:3000)
npm run dev

# 프로덕션 빌드
npm run build
npm start
```

## 글 추가하는 방법

1. `content/posts/` 폴더에 `내-글-제목.md` 파일을 만듭니다.
2. 파일 맨 위에 frontmatter를 넣습니다.

```markdown
---
title: "제목"
date: "2026-09-16"
description: "한 줄 요약 (검색·목록에 사용)"
tags: ["태그1", "태그2"]
---

본문을 마크다운으로 작성합니다.
```

3. 저장 후 개발 서버를 새로고침하면 `/posts/내-글-제목` 경로로 열립니다.  
   (파일 이름 = URL 슬러그)

## AdSense 설정

1. [Google AdSense](https://www.google.com/adsense/)에서 사이트를 등록·승인받습니다.
2. 프로젝트 루트에 `.env.local`을 만들고 (참고: `.env.example`):

```bash
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-여기에본인ID
NEXT_PUBLIC_SITE_URL=https://실제-도메인.com
```

3. `public/ads.txt`에 AdSense가 안내하는 한 줄을 넣어 배포합니다.  
   (지금은 주석 템플릿만 있습니다. **가짜 publisher ID를 넣지 마세요.**)
4. AdSense 콘솔에서 **광고 단위**를 만든 뒤, `components/AdSlot.tsx`의 `data-ad-slot`에 단위 ID를 넣으면 됩니다.

환경 변수가 비어 있으면 광고 자리에 **안내 플레이스홀더**가 보여, 레이아웃만 먼저 AdSense 친화적으로 유지합니다.

## Vercel 배포

1. 이 저장소를 [Vercel](https://vercel.com)에 Import합니다.
2. Framework Preset: **Next.js** (자동 감지)
3. Environment Variables에 `NEXT_PUBLIC_ADSENSE_CLIENT`, `NEXT_PUBLIC_SITE_URL`을 넣습니다.
4. Deploy 후 도메인을 연결하고, AdSense·Search Console에 같은 도메인을 등록합니다.

## 폴더 구조 (요약)

```
app/                 # 페이지·레이아웃·sitemap·robots
components/          # Header, Footer, PostCard, AdSlot 등
content/posts/       # 마크다운 글
lib/                 # 글 읽기·사이트 설정
public/ads.txt       # AdSense ads.txt 템플릿
```

## 다음 단계 제안

1. 소개 문구·사이트 이름 다듬기
2. 글을 꾸준히 추가 (AdSense 심사에 도움이 됨)
3. 커스텀 도메인 연결
4. AdSense 신청 및 `ads.txt` / 환경 변수 설정

---

만든이 소개 플레이스홀더: **박강원** — 현장형 기획자, 사람과 일을 잇고 글로 남기는 사람.
