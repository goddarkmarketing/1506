"use client";

import { SidebarSearch } from "./sidebar-search";
import { CategoryWidget } from "./category-widget";
import { RecommendedPosts } from "./recommended-posts";
import type { Article } from "@/lib/articles/types";

type Props = {
  recommended: Article[];
  onSearch?: (q: string) => void;
  onCategory?: (name: string) => void;
  activeCategory?: string;
  searchQuery?: string;
};

export function BlogSidebar({
  recommended,
  onSearch,
  onCategory,
  activeCategory,
  searchQuery,
}: Props) {
  return (
    <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
      <div className="rounded-[16px] border border-[#E5EAF0] bg-white p-5 shadow-[0_8px_24px_rgba(8,59,102,0.05)]">
        <h3 className="mb-3 text-sm font-black tracking-wide text-[#0B2E59]">ค้นหา</h3>
        <SidebarSearch onSearch={onSearch} initialQuery={searchQuery} />
      </div>

      <div className="rounded-[16px] border border-[#E5EAF0] bg-white p-5 shadow-[0_8px_24px_rgba(8,59,102,0.05)]">
        <CategoryWidget active={activeCategory} onSelect={onCategory} />
      </div>

      <div className="rounded-[16px] border border-[#E5EAF0] bg-white p-5 shadow-[0_8px_24px_rgba(8,59,102,0.05)]">
        <RecommendedPosts articles={recommended} />
      </div>
    </aside>
  );
}
