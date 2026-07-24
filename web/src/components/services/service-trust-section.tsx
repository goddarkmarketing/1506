"use client";

import { Handshake, Headphones, Settings2, ShieldCheck } from "lucide-react";

const items = [
  {
    icon: Headphones,
    title: "ทีมงานดูแลอย่างมืออาชีพ",
    desc: "ที่ปรึกษาการเดินทางพร้อมดูแลตั้งแต่บรีฟจนจบทริป",
  },
  {
    icon: Settings2,
    title: "โปรแกรมปรับแต่งได้",
    desc: "ออกแบบเส้นทาง ที่พัก และกิจกรรมตามงบและความต้องการ",
  },
  {
    icon: Handshake,
    title: "พาร์ตเนอร์ที่ผ่านการคัดเลือก",
    desc: "โรงแรม รถ และซัพพลายเออร์คุณภาพที่เชื่อถือได้",
  },
  {
    icon: ShieldCheck,
    title: "ดูแลตลอดการเดินทาง",
    desc: "ติดตามสถานะและพร้อมช่วยเหลือเมื่อแผนต้องปรับเปลี่ยน",
  },
];

export function ServiceTrustSection() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-20">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/dg-phuket-sunset.png')" }}
      />
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <h2 className="text-center text-3xl font-bold tracking-tight text-white md:text-4xl">
          ให้ทุกการเดินทางเป็นเรื่องง่ายกับ D&G Holiday
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/15 bg-white/95 p-6 shadow-[0_8px_28px_rgba(3,18,26,0.12)] backdrop-blur-sm"
            >
              <item.icon className="h-8 w-8 text-[#FF5E1F]" strokeWidth={1.5} />
              <h3 className="mt-4 text-base font-bold text-[#03121A]">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#52667A]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
