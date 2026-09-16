"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function JoinForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, referralCode }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error || "가입에 실패했습니다.");
        return;
      }
      router.refresh();
      router.push("/");
    } catch {
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-ink-200 bg-white p-6 shadow-sm">
      <label className="block text-sm">
        <span className="font-medium text-ink-800">아이디</span>
        <input
          className="mt-1 w-full rounded-md border border-ink-200 px-3 py-2 text-ink-900 outline-none focus:border-accent"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
          minLength={3}
          maxLength={24}
          pattern="[a-zA-Z0-9_]+"
          placeholder="영문·숫자·밑줄"
        />
      </label>
      <label className="block text-sm">
        <span className="font-medium text-ink-800">비밀번호</span>
        <input
          type="password"
          className="mt-1 w-full rounded-md border border-ink-200 px-3 py-2 text-ink-900 outline-none focus:border-accent"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          required
          minLength={8}
          placeholder="8자 이상"
        />
      </label>
      <label className="block text-sm">
        <span className="font-medium text-ink-800">추천 코드</span>
        <input
          className="mt-1 w-full rounded-md border border-ink-200 px-3 py-2 text-ink-900 outline-none focus:border-accent"
          value={referralCode}
          onChange={(e) => setReferralCode(e.target.value)}
          required
          placeholder="예: HJ-START-01"
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
        className="w-full rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent/90 disabled:opacity-60"
      >
        {loading ? "처리 중…" : "가입하기"}
      </button>
      <p className="text-center text-sm text-ink-700/80">
        이미 회원이신가요?{" "}
        <Link href="/login" className="font-medium text-accent hover:underline">
          로그인
        </Link>
      </p>
    </form>
  );
}
