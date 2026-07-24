"use client";

import { useMemo, useState } from "react";
import { BlogHero } from "./blog-hero";
import { BlogGrid } from "./blog-grid";
import { BlogSidebar } from "./blog-sidebar";
import { BlogPagination } from "./blog-pagination";
import { DestinationGuide } from "./destination-guide";
import {
  getLatestArticles,
  getRecommendedArticles,
} from "@/lib/articles/data";

const PAGE_SIZE = 4;

export function ArticlesDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return getLatestArticles().filter((a) => {
      const matchCat = !category || a.category === category;
      const matchQ =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q)) ||
        a.category.toLowerCase().includes(q) ||
        (a.destination?.toLowerCase().includes(q) ?? false);
      return matchCat && matchQ;
    });
  }, [query, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const applySearch = (q: string) => {
    setQuery(q);
    setPage(1);
  };

  const applyCategory = (name: string) => {
    setCategory((prev) => (prev === name ? "" : name));
    setPage(1);
  };

  return (
    <>
      <BlogHero />

      <section className="bg-[#F7F9FC] py-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10 lg:px-8">
          <div className="order-2 lg:order-1">
            <BlogSidebar
              recommended={getRecommendedArticles(5)}
              onSearch={applySearch}
              onCategory={applyCategory}
              activeCategory={category}
              searchQuery={query}
            />
          </div>

          <div className="order-1 min-w-0 lg:order-2">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#FF7A1A]">
                  Latest Articles
                </p>
                <h2 className="font-display mt-2 text-2xl font-semibold text-[#0B2E59] md:text-3xl">
                  บทความล่าสุด
                </h2>
              </div>
              {(query || category) && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setCategory("");
                    setPage(1);
                  }}
                  className="text-sm font-semibold text-[#FF6B21] hover:underline"
                >
                  ล้างตัวกรอง
                </button>
              )}
            </div>

            <BlogGrid articles={pageItems} />
            <BlogPagination
              page={currentPage}
              totalPages={totalPages}
              onChange={setPage}
            />
          </div>
        </div>
      </section>

      <DestinationGuide />
    </>
  );
}
