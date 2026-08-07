import Link from "next/link";
import type { NavItem } from "@/lib/site-nav";

function cleanHref(href: string) {
  return href.replace(/\/$/, "") || "/";
}

export function SectionHub({ section }: { section: NavItem }) {
  const children = section.children ?? [];
  return (
    <div>
      <section className="relative overflow-hidden bg-[#0B2E59] px-5 pb-16 pt-20 text-white lg:px-8 lg:pb-20 lg:pt-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,122,26,0.35),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(255,231,168,0.2),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#FFC48A]">
            D&G Holiday
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight lg:text-5xl">
            {section.heroTitle || section.label}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 lg:text-lg">
            {section.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/proposal"
              className="inline-flex h-11 items-center rounded-full bg-[#FF7A1A] px-5 text-sm font-bold text-white"
            >
              Request a Proposal
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center rounded-full bg-white/10 px-5 text-sm font-bold text-white ring-1 ring-white/25"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {children.map((child) => (
            <Link
              key={child.id}
              href={cleanHref(child.href)}
              className="group rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_rgba(11,46,89,0.05)] transition hover:-translate-y-0.5 hover:border-[#FFB070] hover:shadow-[0_14px_32px_rgba(11,46,89,0.1)]"
            >
              <h2 className="text-lg font-extrabold text-[#0B2E59] group-hover:text-[#D94A0C]">
                {child.label}
              </h2>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#5B656B]">
                {child.description}
              </p>
              <span className="mt-4 inline-flex text-sm font-bold text-[#FF7A1A]">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
