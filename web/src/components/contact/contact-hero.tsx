"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { HOME_URL } from "@/lib/site";

export function ContactHero() {
  return (
    <section className="relative -mt-[108px] flex min-h-[360px] items-end overflow-hidden pt-[108px] text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/dg-songkhla.jpg')" }}
      />
      <div className="absolute inset-0 bg-[#0B2E59]/78" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B2E59]/90 via-[#0B2E59]/35 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-12 pt-16 lg:px-8 lg:pb-14">
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 flex items-center gap-2 text-sm text-white/75"
          aria-label="Breadcrumb"
        >
          <a href={HOME_URL} className="hover:text-white">
            หน้าแรก
          </a>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-white">ติดต่อ</span>
        </motion.nav>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-xs font-bold uppercase tracking-[0.16em] text-[#FF7A1A]"
        >
          Contact Us
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display mt-3 text-4xl font-semibold tracking-tight md:text-5xl"
        >
          ติดต่อเรา
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 md:text-base"
        >
          สอบถามแพ็กเกจ ขอใบเสนอราคา หรือคุยออกแบบทริปกับทีมได้โดยตรง
        </motion.p>
      </div>
    </section>
  );
}
