"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Fade } from "@/components/motion/fade";
import { SectionEyebrow, SectionTitle } from "@/components/about/section-heading";

const stats = [
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 20, suffix: "K+", label: "Travelers" },
  { value: 300, suffix: "+", label: "Partners" },
  { value: 98, suffix: "%", label: "Customer Satisfaction" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const duration = 1200;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(value * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display text-5xl font-semibold tracking-tight text-white md:text-6xl">
      {n}
      {suffix}
    </span>
  );
}

export function Statistics() {
  return (
    <section className="relative overflow-hidden bg-[#0B2E59] py-24 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,122,26,0.18),transparent_55%)]" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Fade className="mb-14 max-w-2xl">
          <SectionEyebrow className="text-[#FF7A1A]">Statistics</SectionEyebrow>
          <SectionTitle className="text-white">Trusted by travelers and partners</SectionTitle>
        </Fade>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Fade key={s.label} delay={i * 0.08}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition hover:scale-[1.02]">
                <Counter value={s.value} suffix={s.suffix} />
                <p className="mt-3 text-sm font-medium tracking-wide text-white/70">{s.label}</p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}
