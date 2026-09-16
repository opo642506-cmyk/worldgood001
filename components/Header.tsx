import Link from "next/link";
import { getSession } from "@/lib/auth";
import { siteConfig } from "@/lib/site";
import LogoutButton from "@/components/LogoutButton";

export default async function Header() {
  const session = await getSession();
  const isAdmin = session?.role === "admin";
  const isMember = !!session && session.role === "member";

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
        <nav className="flex shrink-0 flex-wrap items-center justify-end gap-1 text-sm font-medium text-ink-800 sm:gap-2">
          <Link
            href="/"
            className="rounded-md px-2.5 py-1.5 hover:bg-ink-100 hover:text-accent"
          >
            글홈
          </Link>
          <Link
            href="/about"
            className="rounded-md px-2.5 py-1.5 hover:bg-ink-100 hover:text-accent"
          >
            소개
          </Link>
          {!session ? (
            <>
              <Link
                href="/join"
                className="rounded-md px-2.5 py-1.5 hover:bg-ink-100 hover:text-accent"
              >
                가입
              </Link>
              <Link
                href="/login"
                className="rounded-md px-2.5 py-1.5 hover:bg-ink-100 hover:text-accent"
              >
                로그인
              </Link>
            </>
          ) : null}
          {isMember ? (
            <span className="hidden text-xs text-ink-700/70 sm:inline">
              {session.username}
            </span>
          ) : null}
          {isAdmin ? (
            <Link
              href="/admin"
              className="rounded-md bg-accent/10 px-2.5 py-1.5 text-accent hover:bg-accent/20"
            >
              관리
            </Link>
          ) : null}
          {session ? <LogoutButton /> : null}
        </nav>
      </div>
    </header>
  );
}
