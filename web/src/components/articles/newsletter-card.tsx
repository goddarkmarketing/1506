"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";

export function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
  };

  return (
    <div className="overflow-hidden rounded-[16px] bg-gradient-to-br from-[#0B2E59] to-[#083B66] p-5 text-white shadow-[0_10px_30px_rgba(11,46,89,0.2)]">
      <h3 className="text-base font-bold tracking-tight">Newsletter</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/80">
        รับข่าวสารและโปรโมชั่นล่าสุด
      </p>
      {sent ? (
        <p className="mt-4 text-sm text-[#FFC48A]">ขอบคุณที่สมัครรับข่าวสาร</p>
      ) : (
        <form onSubmit={submit} className="mt-4 space-y-2.5">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="อีเมลของคุณ"
            className="h-11 w-full rounded-[12px] border-0 bg-white px-3 text-sm text-[#03121A] outline-none placeholder:text-[#8A9AAB]"
          />
          <Button type="submit" className="h-11 w-full rounded-[12px]">
            Subscribe
          </Button>
        </form>
      )}
    </div>
  );
}
