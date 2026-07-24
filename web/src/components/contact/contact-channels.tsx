"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";

type Channel = {
  label: string;
  value: string;
  href: string;
  icon?: LucideIcon;
  iconSrc?: string;
  external?: boolean;
};

const channels: Channel[] = [
  {
    label: "โทรศัพท์",
    value: "+66 82 147 9553",
    href: "tel:+66821479553",
    icon: Phone,
  },
  {
    label: "อีเมล",
    value: "dgholidaythailand@gmail.com",
    href: "mailto:dgholidaythailand@gmail.com",
    icon: Mail,
  },
  {
    label: "LINE Official",
    value: "@354ejhoo",
    href: "https://page.line.me/354ejhoo",
    icon: MessageCircle,
    external: true,
  },
  {
    label: "Facebook",
    value: "dgholidaythailand",
    href: "https://www.facebook.com/dgholidaythailand",
    iconSrc: "/images/social/facebook.svg",
    external: true,
  },
];

export function ContactChannels() {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#FF7A1A]">Get in touch</p>
      <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-[#0B2E59]">
        ช่องทางติดต่อ
      </h2>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#52667A] md:text-base">
        เลือกช่องทางที่สะดวกที่สุด ทีมเราพร้อมช่วยวางแผนทริปให้
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {channels.map((item, index) => (
          <motion.a
            key={item.label}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="group rounded-[16px] border border-[#E5EAF0] bg-white p-5 shadow-[0_8px_24px_rgba(8,59,102,0.05)] transition hover:-translate-y-0.5 hover:border-[#FF6B21]/35 hover:shadow-[0_14px_32px_rgba(8,59,102,0.1)]"
          >
            {item.icon ? (
              <item.icon className="h-6 w-6 text-[#FF6B21]" strokeWidth={1.6} />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.iconSrc} alt="" width={24} height={24} className="h-6 w-6" />
            )}
            <p className="mt-4 text-xs font-bold uppercase tracking-wide text-[#8A9AAB]">
              {item.label}
            </p>
            <p className="mt-1 text-base font-semibold text-[#0B2E59] group-hover:text-[#FF6B21]">
              {item.value}
            </p>
          </motion.a>
        ))}
      </div>

      <div className="mt-8 rounded-[16px] border border-[#E5EAF0] bg-white p-5 shadow-[0_8px_24px_rgba(8,59,102,0.05)]">
        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#FF6B21]" />
          <div>
            <h3 className="text-base font-bold text-[#0B2E59]">ที่อยู่สำนักงาน</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#52667A]">
              D&G Holiday Thailand Co., Ltd.
              <br />
              852/7 พฤกษาวิลล์ 60/2 ถนนหลวงแพ่ง
              <br />
              แขวงทับยาว เขตลาดกระบัง
              <br />
              กรุงเทพมหานคร 10520
            </p>
          </div>
        </div>
      </div>

      <a
        href="https://page.line.me/354ejhoo"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 flex items-center gap-4 rounded-[16px] border border-[#E5EAF0] bg-white p-4 shadow-[0_8px_24px_rgba(8,59,102,0.05)] transition hover:border-[#06C755]/40"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/dg-line-qr.png"
          alt="LINE QR Code D&G Holiday"
          width={120}
          height={120}
          className="h-[120px] w-[120px] rounded-[10px] bg-white object-contain p-1.5 ring-1 ring-[#E5EAF0]"
        />
        <div>
          <p className="text-base font-bold text-[#0B2E59]">SCAN QR</p>
          <p className="mt-1 text-sm leading-relaxed text-[#52667A]">
            สแกนเพื่อเพิ่มเพื่อน LINE Official Account และสอบถามทัวร์ได้ทันที
          </p>
          <p className="mt-2 text-sm font-semibold text-[#06C755]">@354ejhoo</p>
        </div>
      </a>
    </div>
  );
}
