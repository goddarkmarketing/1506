import Link from "next/link";
import type { NavItem, NavLeaf } from "@/lib/site-nav";

function cleanHref(href: string) {
  return href.replace(/\/$/, "") || "/";
}

export function ServiceLeaf({
  section,
  leaf,
}: {
  section: NavItem;
  leaf: NavLeaf;
}) {
  const bullets = leaf.bullets ?? [];
  const isGallery = Boolean(leaf.gallery);

  return (
    <div>
      <section className="bg-[#0B2E59] px-5 pb-14 pt-20 text-white lg:px-8 lg:pb-16 lg:pt-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#FFC48A]">
            <Link href={cleanHref(section.href)} className="hover:underline">
              {section.label}
            </Link>
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight lg:text-5xl">
            {leaf.heroTitle || leaf.label}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 lg:text-lg">
            {leaf.description}
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-12 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-16">
        <div>
          <h2 className="text-2xl font-extrabold text-[#0B2E59]">What we deliver</h2>
          <ul className="mt-5 space-y-3">
            {bullets.map((b) => (
              <li
                key={b}
                className="flex gap-3 rounded-xl border border-[#E8EEF5] bg-white px-4 py-3 text-[15px] text-[#1C2127] shadow-sm"
              >
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#FF7A1A]" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          {isGallery && (
            <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#FFE8D1] via-[#FFD0A8] to-[#F05A14]/40"
                  aria-hidden
                />
              ))}
            </div>
          )}
        </div>

        <aside className="h-fit rounded-2xl bg-[#0B2E59] p-6 text-white shadow-[0_18px_40px_rgba(11,46,89,0.18)]">
          <h3 className="text-xl font-extrabold">Plan with our partner desk</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/80">
            Share dates, group size, and goals — we will prepare a tailored proposal.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/proposal"
              className="inline-flex h-11 items-center justify-center rounded-full bg-[#FF7A1A] text-sm font-bold text-white"
            >
              Request a Proposal
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white ring-1 ring-white/20"
            >
              Contact Us
            </Link>
            <Link
              href={cleanHref(section.href)}
              className="text-center text-sm font-semibold text-[#FFC48A] hover:underline"
            >
              ← Back to {section.label}
            </Link>
          </div>
        </aside>
      </section>
    </div>
  );
}
