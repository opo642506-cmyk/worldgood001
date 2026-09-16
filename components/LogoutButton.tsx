"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function onLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.refresh();
    router.push("/");
  }

  return (
    <button
      type="button"
      onClick={onLogout}
      className="rounded-md px-2.5 py-1.5 text-sm font-medium text-ink-800 hover:bg-ink-100 hover:text-accent"
    >
      로그아웃
    </button>
  );
}
