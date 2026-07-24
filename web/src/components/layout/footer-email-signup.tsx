"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";

export function FooterEmailSignup() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
  };

  return (
    <div className="mt-8 rounded-[18px] border border-white/15 bg-white/5 p-5 md:p-6">
      <h3 className="text-base font-black tracking-wide text-white">รับข่าวสารและโปรโมชัน</h3>
      {sent ? (
        <p className="mt-3 text-sm text-[#FFC48A]">ขอบคุณที่สมัครรับข่าวสารจาก D&G Holiday</p>
      ) : (
        <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="sr-only" htmlFor="footer-email">
            อีเมล
          </label>
          <input
            id="footer-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="กรอกอีเมลของคุณ"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 w-full flex-1 rounded-[14px] border border-white/20 bg-white px-4 text-sm text-[#03121A] outline-none placeholder:text-[#52667A] focus:border-[#FF6B21] focus:ring-2 focus:ring-[#FF6B21]/25"
          />
          <Button
            type="submit"
            className="h-11 shrink-0 rounded-[14px] bg-[#FF6B21] px-5 text-sm font-semibold text-white hover:bg-[#E85E18]"
          >
            สมัครรับข่าวสาร
          </Button>
        </form>
      )}
    </div>
  );
}
