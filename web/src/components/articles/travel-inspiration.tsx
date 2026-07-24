"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Article } from "@/lib/articles/types";
import { Button } from "@/components/ui/button";

export function TravelInspiration({ articles }: { articles: Article[] }) {
  const items = articles.slice(0, 4);

  return (
    <section className="bg-[#F8FAFC] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#FF7A1A]">
          Travel Inspiration
        </p>
        <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-[#0B2E59] md:text-4xl">
          แรงบันดาลใจสำหรับการเดินทางครั้งถัดไป
        </h2>

        <div className="mt-12 space-y-10">
          {items.map((article, index) => {
            const reverse = index % 2 === 1;
            return (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                className={`grid items-center gap-8 overflow-hidden rounded-[20px] border border-[#E5EAF0] bg-white shadow-[0_10px_32px_rgba(8,59,102,0.06)] lg:grid-cols-2 ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[280px]">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6 lg:p-10">
                  <span className="text-xs font-bold uppercase tracking-wide text-[#FF6B21]">
                    {article.category}
                  </span>
                  <h3 className="font-display mt-3 text-2xl font-semibold text-[#0B2E59]">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#52667A] md:text-base">
                    {article.excerpt}
                  </p>
                  <Button asChild variant="soft" className="mt-6 rounded-[14px]">
                    <Link href={`/articles/${article.slug}`}>
                      อ่านต่อ
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
