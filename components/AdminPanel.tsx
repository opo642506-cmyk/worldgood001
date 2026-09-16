"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";

type ReferralCode = {
  code: string;
  maxUses: number;
  usedCount: number;
  createdAt: string;
  active: boolean;
};

export default function AdminPanel() {
  const [codes, setCodes] = useState<ReferralCode[]>([]);
  const [code, setCode] = useState("");
  const [maxUses, setMaxUses] = useState(10);
  const [errText, setErrText] = useState("");
  const [okText, setOkText] = useState("");
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/referrals");
    if (!res.ok) {
      setErrText("목록을 불러오지 못했습니다.");
      return;
    }
    const data = (await res.json()) as { codes: ReferralCode[] };
    setCodes(data.codes || []);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    setErrText("");
    setOkText("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/referrals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, maxUses }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setErrText(data.error || "생성에 실패했습니다.");
        return;
      }
      setCode("");
      setMaxUses(10);
      setOkText("코드를 만들었습니다.");
      await load();
    } catch {
      setErrText("네트워크 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  async function setActive(target: string, active: boolean) {
    setErrText("");
    setOkText("");
    const res = await fetch(`/api/admin/referrals/${encodeURIComponent(target)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active }),
    });
    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setErrText(data.error || "변경에 실패했습니다.");
      return;
    }
    setOkText(active ? "코드를 활성화했습니다." : "코드를 비활성화했습니다.");
    await load();
  }

  return (
    <div className="space-y-8">
      <form
        onSubmit={onCreate}
        className="space-y-4 rounded-xl border border-ink-200 bg-white p-6 shadow-sm"
      >
        <h2 className="font-serif text-lg font-semibold text-ink-900">
          추천 코드 만들기
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="font-medium text-ink-800">코드</span>
            <input
              className="mt-1 w-full rounded-md border border-ink-200 px-3 py-2 outline-none focus:border-accent"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="HJ-NEW-06"
              required
              pattern="[A-Za-z0-9-]{4,32}"
            />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-ink-800">최대 사용 횟수</span>
            <input
              type="number"
              min={1}
              max={10000}
              className="mt-1 w-full rounded-md border border-ink-200 px-3 py-2 outline-none focus:border-accent"
              value={maxUses}
              onChange={(e) => setMaxUses(Number(e.target.value))}
              required
            />
          </label>
        </div>
        {errText ? (
          <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{errText}</p>
        ) : null}
        {okText ? (
          <p className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-800">{okText}</p>
        ) : null}
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent/90 disabled:opacity-60"
        >
          {loading ? "저장 중…" : "코드 생성"}
        </button>
      </form>

      <section className="rounded-xl border border-ink-200 bg-white p-6 shadow-sm">
        <h2 className="font-serif text-lg font-semibold text-ink-900">
          추천 코드 목록
        </h2>
        {codes.length === 0 ? (
          <p className="mt-4 text-sm text-ink-700">코드가 없습니다.</p>
        ) : (
          <ul className="mt-4 divide-y divide-ink-100">
            {codes.map((c) => (
              <li
                key={c.code}
                className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-mono text-sm font-semibold text-ink-900">
                    {c.code}
                  </p>
                  <p className="mt-1 text-xs text-ink-700/80">
                    사용 {c.usedCount}/{c.maxUses} ·{" "}
                    {c.active ? (
                      <span className="text-green-700">활성</span>
                    ) : (
                      <span className="text-red-600">비활성</span>
                    )}{" "}
                    · 생성 {new Date(c.createdAt).toLocaleString("ko-KR")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => void setActive(c.code, !c.active)}
                  className="rounded-md border border-ink-200 px-3 py-1.5 text-xs font-medium hover:bg-ink-50"
                >
                  {c.active ? "비활성" : "활성"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
