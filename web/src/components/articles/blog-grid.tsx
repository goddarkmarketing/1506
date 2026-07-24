import type { Article } from "@/lib/articles/types";
import { BlogCard } from "./blog-card";

export function BlogGrid({ articles }: { articles: Article[] }) {
  if (articles.length === 0) {
    return (
      <div className="rounded-[18px] border border-dashed border-[#D5DEE8] bg-white px-6 py-16 text-center">
        <p className="text-base font-semibold text-[#0B2E59]">ไม่พบบทความที่ตรงกับการค้นหา</p>
        <p className="mt-2 text-sm text-[#52667A]">ลองเปลี่ยนคำค้นหาหรือเลือกหมวดหมู่อื่น</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {articles.map((article, index) => (
        <BlogCard key={article.id} article={article} index={index} />
      ))}
    </div>
  );
}
