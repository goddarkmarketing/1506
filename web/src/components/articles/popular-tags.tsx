import Link from "next/link";
import { POPULAR_TAGS } from "@/lib/articles/data";

export function PopularTags() {
  return (
    <div>
      <h3 className="text-sm font-black tracking-wide text-[#0B2E59]">Popular Tags</h3>
      <ul className="mt-4 flex flex-wrap gap-2">
        {POPULAR_TAGS.map((tag) => (
          <li key={tag}>
            <Link
              href={`/articles?q=${encodeURIComponent(tag)}`}
              className="inline-flex rounded-[8px] bg-[#F7F9FC] px-2.5 py-1 text-xs font-semibold text-[#0B2E59] transition hover:bg-[#FFF0E6] hover:text-[#C2410C]"
            >
              #{tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
