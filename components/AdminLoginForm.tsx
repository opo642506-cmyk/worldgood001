"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function AdminLoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error || "인증에 실패했습니다.");
        return;
      }
      router.refresh();
    } catch {
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-ink-200 bg-white p-6 shadow-sm">
      <label className="block text-sm">
        <span className="font-medium text-ink-800">관리자 아이디</span>
        <input
          className="mt-1 w-full rounded-md border border-ink-200 px-3 py-2 outline-none focus:border-accent"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
        />
      </label>
      <label className="block text-sm">
        <span className="font-medium text-ink-800">비밀번호</span>
        <input
          type="password"
          className="mt-1 w-full rounded-md border border-ink-200 px-3 py-2 outline-none focus:border-accent"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
      </label>
      {error ? (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-ink-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent/90 disabled:opacity-60"
      >
        {loading ? "확인 중…" : "관리자 로그인"}
      </button>
    </form>
  );
}
