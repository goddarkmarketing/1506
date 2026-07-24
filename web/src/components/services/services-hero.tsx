"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  BedDouble,
  Building2,
  CarFront,
  ChevronRight,
  Search,
  Ship,
  Sparkles,
  Ticket,
  TrendingUp,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HOME_URL } from "@/lib/site";

const POPULAR = [
  { label: "โรงแรม", icon: BedDouble },
  { label: "รถรับส่งสนามบิน", icon: CarFront },
  { label: "กรุ๊ปทัวร์", icon: Users },
  { label: "ทัวร์ FIT", icon: Sparkles },
  { label: "MICE", icon: Building2 },
  { label: "กิจกรรม", icon: Ticket },
  { label: "เรือและการเดินทาง", icon: Ship },
];

type Props = {
  initialQuery?: string;
  onSearch: (q: string) => void;
  onPopular: (q: string) => void;
};

export function ServicesHero({ initialQuery = "", onSearch, onPopular }: Props) {
  const [q, setQ] = useState(initialQuery);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(q);
  };

  return (
    <section className="relative -mt-[108px] flex min-h-[420px] items-center overflow-hidden pt-[108px] text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/dg-phuket.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-5 py-14 text-center lg:px-8 lg:py-16">
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 flex items-center justify-center gap-2 text-sm text-white/75"
          aria-label="Breadcrumb"
        >
          <a href={HOME_URL} className="hover:text-white">
            หน้าแรก
          </a>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-white">บริการทั้งหมด</span>
        </motion.nav>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-3xl font-bold tracking-tight md:text-5xl"
        >
          บริการท่องเที่ยวครบวงจร
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="mt-3 w-full whitespace-nowrap text-[clamp(0.78rem,1.35vw,1.125rem)] text-white/85"
        >
          ออกแบบทุกการเดินทางให้ตอบโจทย์ทั้งนักท่องเที่ยวทั่วไป องค์กร กรุ๊ปทัวร์ และการเดินทางแบบส่วนตัว
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 flex w-full flex-col gap-3"
        >
          <form
            onSubmit={submit}
            className="flex w-full items-center gap-2 rounded-2xl bg-white p-2 shadow-[0_16px_40px_rgba(8,59,102,0.25)]"
          >
            <Search className="ml-3 h-5 w-5 shrink-0 text-[#52667A]" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="ค้นหาบริการ สถานที่ หรือกิจกรรมที่คุณสนใจ"
              className="h-11 w-full bg-transparent text-left text-sm text-[#102A43] outline-none placeholder:text-[#52667A]/70 md:text-base"
            />
            <Button
              type="submit"
              className="shrink-0 rounded-[14px] bg-[#FF6B21] hover:bg-[#E85E18]"
            >
              ค้นหา
            </Button>
          </form>

          <div className="flex w-full flex-wrap items-center gap-2 sm:gap-2.5">
            <span className="inline-flex items-center gap-1.5 pr-1 text-xs font-semibold text-white/80">
              <TrendingUp className="h-3.5 w-3.5 text-white" />
              Popular Search
            </span>
            <span className="hidden h-4 w-px bg-white/25 sm:block" />
            {POPULAR.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  setQ(item.label);
                  onPopular(item.label);
                }}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/20"
              >
                <item.icon className="h-3.5 w-3.5 text-white" strokeWidth={2} />
                {item.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
