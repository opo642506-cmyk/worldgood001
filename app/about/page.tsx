import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "소개",
  description: `${siteConfig.author} — 현장형 기획자. 사람과 일을 잇고 글로 남깁니다.`,
  openGraph: {
    title: `소개 · ${siteConfig.name}`,
    description: `${siteConfig.author} — 현장형 기획자.`,
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-sm font-medium text-accent">About</p>
      <h1 className="mt-2 font-serif text-3xl font-semibold text-ink-900 sm:text-4xl">
        소개
      </h1>

      <div className="prose-ko mt-8">
        <p>
          안녕하세요. <strong>{siteConfig.author}</strong>입니다.
        </p>
        <p>
          현장형 기획자로, 사람과 일을 잇고 그 과정을 글로 남기려 합니다.
          이 블로그 <strong>{siteConfig.name}</strong>({siteConfig.nameEn})는
          현장에서 보고 들은 것, 만난 사람들, 그리고 기록으로 남기고 싶은
          생각을 모아 두는 공간입니다.
        </p>
        <p>
          거창한 전문가 선언보다는, 현장에서 천천히 배우고 정리하는 태도를
          지키려 합니다. 읽으시는 분께 작은 단서나 공감이 닿으면 좋겠습니다.
        </p>
        <h2>이 블로그에서 다루는 것</h2>
        <ul>
          <li>현장 노트와 짧은 기록</li>
          <li>사람과 일을 잇는 기획 이야기</li>
          <li>글을 쓰고 남기는 과정에 대한 생각</li>
        </ul>
        <p className="text-base text-ink-700/80">
          ※ 소개 문구는 필요에 따라{" "}
          <code>app/about/page.tsx</code>에서 수정할 수 있습니다.
        </p>
      </div>
    </div>
  );
}
