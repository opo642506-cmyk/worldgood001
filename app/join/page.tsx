import type { Metadata } from "next";
import JoinForm from "@/components/JoinForm";

export const metadata: Metadata = {
  title: "가입",
  description: "추천 코드로 현장기록 회원에 가입합니다.",
};

export default function JoinPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-sm font-medium text-accent">Join</p>
      <h1 className="mt-2 font-serif text-3xl font-semibold text-ink-900">
        회원 가입
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-ink-700">
        가입에는 <strong>추천 코드</strong>가 필요합니다. 아이디·비밀번호를
        정한 뒤 코드를 입력해 주세요.
      </p>
      <div className="mt-8">
        <JoinForm />
      </div>
    </div>
  );
}
