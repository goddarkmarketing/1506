import Link from "next/link";
import { POPULAR_DESTINATIONS } from "@/lib/articles/data";

export function PopularDestinations() {
  return (
    <div>
      <h3 className="text-sm font-black tracking-wide text-[#0B2E59]">Popular Destinations</h3>
      <ul className="mt-4 flex flex-wrap gap-2">
        {POPULAR_DESTINATIONS.map((name) => (
          <li key={name}>
            <Link
              href={`/articles?q=${encodeURIComponent(name)}`}
              className="inline-flex rounded-full border border-[#E5EAF0] bg-white px-3 py-1.5 text-xs font-semibold text-[#52667A] transition hover:border-[#FF6B21]/40 hover:text-[#FF6B21]"
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
