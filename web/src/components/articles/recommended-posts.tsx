import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/articles/types";
import { formatArticleDate } from "@/lib/articles/data";

export function RecommendedPosts({ articles }: { articles: Article[] }) {
  return (
    <div>
      <h3 className="text-sm font-black tracking-wide text-[#0B2E59]">แนะนำบทความ</h3>
      <ul className="mt-4 space-y-4">
        {articles.map((article) => (
          <li key={article.id}>
            <Link href={`/articles/${article.slug}`} className="group flex gap-3">
              <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-[10px]">
                <Image
                  src={article.image}
                  alt=""
                  fill
                  className="object-cover transition group-hover:scale-105"
                  sizes="80px"
                />
              </div>
              <div className="min-w-0">
                <p className="line-clamp-2 text-sm font-semibold leading-snug text-[#0B2E59] group-hover:text-[#FF6B21]">
                  {article.title}
                </p>
                <p className="mt-1 text-[11px] text-[#8A9AAB]">
                  {formatArticleDate(article.publishedAt)}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
