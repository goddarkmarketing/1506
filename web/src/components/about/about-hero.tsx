"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HOME_URL } from "@/lib/site";

export function AboutHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.55]);

  return (
    <section
      ref={ref}
      className="relative -mt-[108px] flex min-h-[88vh] items-end overflow-hidden pt-[108px] text-white"
    >
      <motion.div style={{ y }} className="absolute inset-0 scale-105">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/dg-samui.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2E59]/90 via-[#0B2E59]/55 to-[#0B2E59]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2E59]/80 via-transparent to-[#0B2E59]/20" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-24 lg:px-8 lg:pb-28"
      >
        <motion.nav
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 flex items-center gap-2 text-sm text-white/75"
          aria-label="Breadcrumb"
        >
          <a href={HOME_URL} className="transition hover:text-white">
            Home
          </a>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-white">About</span>
        </motion.nav>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#FF7A1A]"
        >
          D&G Holiday Thailand
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.22 }}
          className="font-display max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight md:text-5xl lg:text-6xl"
        >
          About D&G Holiday Thailand
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.34 }}
          className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl"
        >
          Creating Extraordinary Journeys Across Thailand & Beyond
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-10"
        >
          <Button asChild size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
