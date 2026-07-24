"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

function buildPages(page: number, total: number) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "...")[] = [1];
  if (page > 3) pages.push("...");
  for (let p = Math.max(2, page - 1); p <= Math.min(total - 1, page + 1); p++) {
    pages.push(p);
  }
  if (page < total - 2) pages.push("...");
  pages.push(total);
  return pages;
}

export function ServicePagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null;
  const pages = buildPages(page, totalPages);

  return (
    <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Pagination">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="inline-flex h-10 items-center gap-1 rounded-[12px] border border-[#E5EAF0] bg-white px-3 text-sm font-semibold text-[#083B66] disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </button>
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`e-${i}`} className="px-1 text-[#52667A]">
            ...
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-[12px] text-sm font-semibold transition",
              p === page
                ? "bg-[#FF6B21] text-white"
                : "border border-[#E5EAF0] bg-white text-[#083B66] hover:border-[#FF6B21]/40"
            )}
          >
            {p}
          </button>
        )
      )}
      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        className="inline-flex h-10 items-center gap-1 rounded-[12px] border border-[#E5EAF0] bg-white px-3 text-sm font-semibold text-[#083B66] disabled:opacity-40"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
