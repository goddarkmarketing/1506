"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export function BlogPagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Pagination">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] border border-[#E5EAF0] bg-white text-[#0B2E59] disabled:opacity-40"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          className={cn(
            "inline-flex h-10 min-w-10 items-center justify-center rounded-[12px] px-3 text-sm font-semibold",
            p === page
              ? "bg-[#FF6B21] text-white"
              : "border border-[#E5EAF0] bg-white text-[#52667A] hover:text-[#0B2E59]"
          )}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] border border-[#E5EAF0] bg-white text-[#0B2E59] disabled:opacity-40"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}

export function ArticleNavLinks({
  prev,
  next,
}: {
  prev: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
}) {
  return (
    <div className="mt-12 grid gap-4 border-t border-[#E5EAF0] pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          href={`/articles/${prev.slug}`}
          className="rounded-[14px] border border-[#E5EAF0] bg-white p-4 transition hover:border-[#FF6B21]/40"
        >
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#8A9AAB]">
            <ChevronLeft className="h-3.5 w-3.5" /> Previous
          </span>
          <p className="mt-2 text-sm font-bold text-[#0B2E59]">{prev.title}</p>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/articles/${next.slug}`}
          className="rounded-[14px] border border-[#E5EAF0] bg-white p-4 text-right transition hover:border-[#FF6B21]/40"
        >
          <span className="inline-flex items-center justify-end gap-1 text-xs font-semibold text-[#8A9AAB]">
            Next <ChevronRight className="h-3.5 w-3.5" />
          </span>
          <p className="mt-2 text-sm font-bold text-[#0B2E59]">{next.title}</p>
        </Link>
      ) : null}
    </div>
  );
}
