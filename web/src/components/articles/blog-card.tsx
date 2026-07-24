"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, CalendarDays, User } from "lucide-react";
import type { Article } from "@/lib/articles/types";
import { formatArticleDate } from "@/lib/articles/data";

export function BlogCard({ article, index = 0 }: { article: Article; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="group overflow-hidden rounded-[18px] border border-[#E5EAF0] bg-white shadow-[0_8px_28px_rgba(8,59,102,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(8,59,102,0.12)]"
    >
      <Link href={`/articles/${article.slug}`} className="block">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 35vw"
          />
          <span className="absolute left-3 top-3 rounded-full bg-[#0B2E59]/90 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
            {article.category}
          </span>
        </div>
      </Link>
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold text-[#52667A]">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {article.readingTime} นาที
          </span>
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" />
            {formatArticleDate(article.publishedAt)}
          </span>
        </div>
        <h3 className="mt-3 text-lg font-bold leading-snug text-[#0B2E59]">
          <Link href={`/articles/${article.slug}`} className="hover:text-[#FF6B21]">
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#52667A]">
          {article.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#EEF2F6] pt-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#52667A]">
            <User className="h-3.5 w-3.5" />
            {article.author}
          </span>
          <Link
            href={`/articles/${article.slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#FF6B21] hover:underline"
          >
            Read More
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
