import { siteConfig } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-ink-200 bg-ink-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-ink-700 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {year} {siteConfig.name} · {siteConfig.author}
        </p>
        <p className="text-ink-700/70">
          현장과 사람을 잇는 기록 · {siteConfig.nameEn}
        </p>
      </div>
    </footer>
  );
}
