"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-24">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/dg-abstract-bg.png')" }}
      />
      <div className="absolute inset-0 bg-[#FF6B21]/88" />
      <div className="relative mx-auto max-w-7xl px-5 text-center text-white lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl font-semibold tracking-tight md:text-4xl"
        >
          พร้อมออกเดินทางแล้วหรือยัง
        </motion.h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/90 md:text-base">
          ให้ทีม D&G Holiday ออกแบบทริปในแบบของคุณ
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild variant="ghost" className="rounded-[14px]">
            <Link href="/contact">ติดต่อเรา</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-[14px] border-white/80 text-white hover:bg-white/15"
          >
            <a href="https://page.line.me/354ejhoo" target="_blank" rel="noopener noreferrer">
              ขอใบเสนอราคา
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
