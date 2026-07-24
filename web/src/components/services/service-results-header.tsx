"use client";

import { LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { SORT_OPTIONS, type SortId, type ViewMode } from "@/lib/services/types";

type Props = {
  total: number;
  sort: SortId;
  view: ViewMode;
  onSort: (sort: SortId) => void;
  onView: (view: ViewMode) => void;
  title?: string;
};

export function ServiceResultsHeader({
  total,
  sort,
  view,
  onSort,
  onView,
  title = "บริการทั้งหมด",
}: Props) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-2xl font-bold text-[#083B66]">{title}</h2>
        <p className="mt-1 text-sm text-[#52667A]">
          พบ {total.toLocaleString("th-TH")} บริการที่ตรงกับการค้นหา
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-[14px] border border-[#E5EAF0] bg-white p-1">
          <button
            type="button"
            aria-label="Grid view"
            onClick={() => onView("grid")}
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-xl transition",
              view === "grid" ? "bg-[#FF6B21] text-white" : "text-[#52667A]"
            )}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="List view"
            onClick={() => onView("list")}
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-xl transition",
              view === "list" ? "bg-[#FF6B21] text-white" : "text-[#52667A]"
            )}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
        <select
          value={sort}
          onChange={(e) => onSort(e.target.value as SortId)}
          className="h-11 rounded-[14px] border border-[#E5EAF0] bg-white px-3 text-sm font-semibold text-[#102A43] outline-none"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
