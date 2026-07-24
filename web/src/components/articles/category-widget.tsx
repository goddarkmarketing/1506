"use client";

import Link from "next/link";
import { CATEGORY_COUNTS } from "@/lib/articles/data";

export function CategoryWidget({
  active,
  onSelect,
}: {
  active?: string;
  onSelect?: (name: string) => void;
}) {
  return (
    <div>
      <h3 className="text-sm font-black tracking-wide text-[#0B2E59]">หมวดหมู่บทความ</h3>
      <ul className="mt-4 space-y-1.5">
        {CATEGORY_COUNTS.map((cat) => {
          const isActive = active === cat.name;
          const className = `flex w-full items-center justify-between rounded-[10px] px-3 py-2 text-sm transition ${
            isActive
              ? "bg-[#FFF0E6] font-semibold text-[#C2410C]"
              : "text-[#52667A] hover:bg-[#F7F9FC] hover:text-[#0B2E59]"
          }`;
          if (onSelect) {
            return (
              <li key={cat.name}>
                <button type="button" onClick={() => onSelect(cat.name)} className={className}>
                  <span>{cat.name}</span>
                  <span className="text-xs opacity-70">({cat.count})</span>
                </button>
              </li>
            );
          }
          return (
            <li key={cat.name}>
              <Link href={`/articles?category=${encodeURIComponent(cat.name)}`} className={className}>
                <span>{cat.name}</span>
                <span className="text-xs opacity-70">({cat.count})</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
