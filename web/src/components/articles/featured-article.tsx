"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, CalendarDays } from "lucide-react";
import type { Article } from "@/lib/articles/types";
import { formatArticleDate } from "@/lib/articles/data";
import { Button } from "@/components/ui/button";

export function FeaturedArticle({ article }: { article: Article }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden rounded-[20px] border border-[#E5EAF0] bg-white shadow-[0_12px_40px_rgba(8,59,102,0.08)]"
    >
      <Link href={`/articles/${article.slug}`} className="group block">
        <div className="relative aspect-[16/9] overflow-hidden md:aspect-[21/9]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            className="object-cover transition duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 70vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#03121A]/75 via-[#03121A]/15 to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-[#FF6B21] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
            Featured
          </span>
        </div>
      </Link>
      <div className="p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-[#52667A]">
          <span className="rounded-full bg-[#FFF0E6] px-2.5 py-1 text-[#C2410C]">
            {article.category}
          </span>
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" />
            {formatArticleDate(article.publishedAt)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {article.readingTime} นาที
          </span>
        </div>
        <h2 className="font-display mt-4 text-2xl font-semibold tracking-tight text-[#0B2E59] md:text-3xl">
          <Link href={`/articles/${article.slug}`} className="hover:text-[#FF6B21]">
            {article.title}
          </Link>
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#52667A] md:text-base">
          {article.excerpt}
        </p>
        <Button asChild variant="soft" className="mt-6 rounded-[14px]">
          <Link href={`/articles/${article.slug}`}>
            Read More
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </motion.article>
  );
}
