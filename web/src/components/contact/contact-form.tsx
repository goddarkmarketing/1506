"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";

const TOPICS = [
  "แพ็กเกจทัวร์",
  "ทัวร์ส่วนตัว / Custom",
  "แลนด์ทัวร์ / DMC",
  "รับ-ส่งสนามบิน",
  "อีเวนต์ / MICE",
  "วีซ่า",
  "อื่น ๆ",
];

const fieldClass =
  "mt-1.5 h-12 w-full rounded-[12px] border border-[#E5EAF0] bg-[#F7F9FC] px-4 text-sm text-[#03121A] outline-none transition placeholder:text-[#8A9AAB] focus:border-[#FF6B21] focus:bg-white focus:ring-2 focus:ring-[#FF6B21]/20";

export function ContactForm() {
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const email = String(data.get("email") || "").trim();
    const topic = String(data.get("topic") || "").trim();
    const message = String(data.get("message") || "").trim();

    const lines = [
      "ติดต่อจากเว็บ D&G Holiday",
      name ? `ชื่อ: ${name}` : "",
      phone ? `โทร: ${phone}` : "",
      email ? `อีเมล: ${email}` : "",
      topic ? `เรื่อง: ${topic}` : "",
      message ? `รายละเอียด: ${message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    setSending(true);
    try {
      await navigator.clipboard?.writeText(lines);
    } catch {
      // clipboard may be blocked; still open LINE
    }
    window.open("https://page.line.me/354ejhoo", "_blank", "noopener,noreferrer");
    setNote(
      "เปิด LINE Official Account แล้ว และคัดลอกข้อความของคุณไว้แล้ว กรุณาวางในแชทเพื่อส่งให้ทีม"
    );
    setSending(false);
  };

  return (
    <div className="rounded-[20px] border border-[#E5EAF0] bg-white p-6 shadow-[0_12px_40px_rgba(8,59,102,0.08)] md:p-8">
      <h2 className="font-display text-2xl font-semibold tracking-tight text-[#0B2E59] md:text-3xl">
        ส่งข้อความหาเรา
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[#52667A]">
        กรอกข้อมูลแล้วกดส่ง ระบบจะเปิด LINE และคัดลอกข้อความของคุณไว้ให้วางในแชท
      </p>

      <form onSubmit={onSubmit} className="mt-8 grid gap-4 sm:grid-cols-2" noValidate>
        <label className="block text-sm font-semibold text-[#0B2E59]">
          ชื่อ-นามสกุล
          <input
            name="name"
            required
            autoComplete="name"
            placeholder="ชื่อของคุณ"
            className={fieldClass}
          />
        </label>
        <label className="block text-sm font-semibold text-[#0B2E59]">
          เบอร์โทร
          <input
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="08x xxx xxxx"
            className={fieldClass}
          />
        </label>
        <label className="block text-sm font-semibold text-[#0B2E59]">
          อีเมล
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@email.com"
            className={fieldClass}
          />
        </label>
        <label className="block text-sm font-semibold text-[#0B2E59]">
          เรื่องที่สนใจ
          <select name="topic" className={fieldClass} defaultValue={TOPICS[0]}>
            {TOPICS.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-semibold text-[#0B2E59] sm:col-span-2">
          รายละเอียด
          <textarea
            name="message"
            required
            rows={5}
            placeholder="บอกปลายทาง วันที่ จำนวนผู้เดินทาง และงบโดยประมาณ"
            className={`${fieldClass} h-auto min-h-[140px] resize-y py-3`}
          />
        </label>

        <div className="sm:col-span-2">
          <Button
            type="submit"
            disabled={sending}
            className="h-12 w-full rounded-[14px] sm:w-auto sm:min-w-[200px]"
          >
            {sending ? "กำลังเปิด LINE..." : "ส่งผ่าน LINE"}
          </Button>
          {note ? (
            <p className="mt-4 rounded-[12px] bg-[#ECFDF5] px-4 py-3 text-sm leading-relaxed text-[#047857]">
              {note}
            </p>
          ) : null}
        </div>
      </form>
    </div>
  );
}
