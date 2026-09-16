import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function Header() {
  return (
    <header className="border-b border-ink-200 bg-white/90 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="group block min-w-0">
          <span className="block font-serif text-xl font-semibold tracking-tight text-ink-900 group-hover:text-accent sm:text-2xl">
            {siteConfig.name}
          </span>
          <span className="mt-0.5 block truncate text-xs text-ink-700/70 sm:text-sm">
            {siteConfig.tagline}
          </span>
        </Link>
        <nav className="flex shrink-0 items-center gap-1 text-sm font-medium text-ink-800 sm:gap-2">
          <Link
            href="/"
            className="rounded-md px-2.5 py-1.5 hover:bg-ink-100 hover:text-accent"
          >
            글
          </Link>
          <Link
            href="/about"
            className="rounded-md px-2.5 py-1.5 hover:bg-ink-100 hover:text-accent"
          >
            소개
          </Link>
        </nav>
      </div>
    </header>
  );
}
