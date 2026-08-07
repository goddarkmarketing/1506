"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { HOME_URL } from "@/lib/site";
import { getNavItems, getMegaChildren, type NavItem } from "@/lib/site-nav";

function hrefFor(item: NavItem | { href: string; external?: boolean }) {
  if ("external" in item && item.external) return HOME_URL;
  return item.href.replace(/\/$/, "") || "/";
}

export function SiteHeader({ active = "" }: { active?: string }) {
  const nav = getNavItems();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const linkTone = (isActive: boolean) =>
    cn(
      "rounded-xl px-2.5 py-2 text-[13px] font-semibold transition-colors lg:px-3 lg:text-sm",
      scrolled
        ? isActive
          ? "bg-[#0B2E59]/8 text-[#0B2E59]"
          : "text-[#0B2E59]/80 hover:bg-[#0B2E59]/5"
        : isActive
          ? "bg-white/15 text-white"
          : "text-white/90 hover:bg-white/10"
    );

  const isItemActive = (item: NavItem) => {
    if (item.external) return active === "home";
    const id = item.id;
    return active === id || active.startsWith(`${id}/`) || active.startsWith(`${id}-`);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 shadow-[0_8px_30px_rgba(11,46,89,0.08)] backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 transition-opacity duration-300",
          scrolled
            ? "opacity-0"
            : "bg-gradient-to-b from-[#0B2E59]/70 via-[#0B2E59]/35 to-transparent opacity-100"
        )}
      />
      <div className="relative mx-auto flex h-16 max-w-[1280px] items-center gap-3 px-4 lg:h-[72px] lg:px-6">
        <a
          href={HOME_URL}
          className={cn(
            "shrink-0 text-[20px] font-extrabold tracking-tight transition-colors lg:text-[22px]",
            scrolled ? "text-[#0B2E59]" : "text-white"
          )}
        >
          D&G Holiday
        </a>

        <nav className="mx-auto hidden items-center gap-0.5 xl:flex">
          {nav.map((item) => {
            const activeItem = isItemActive(item);
            const hasChildren = Boolean(getMegaChildren(item).length);
            const className = linkTone(activeItem);

            if (item.kind === "cta") {
              return (
                <Link
                  key={item.id}
                  href={hrefFor(item)}
                  className={cn(
                    "ml-0.5 rounded-full px-3 py-2 text-[13px] font-bold transition-colors",
                    item.id === "proposal"
                      ? "bg-[#FF7A1A] text-white hover:brightness-105"
                      : scrolled
                        ? "bg-[#0B2E59]/10 text-[#0B2E59]"
                        : "bg-white/15 text-white"
                  )}
                >
                  {item.label}
                </Link>
              );
            }

            if (!hasChildren) {
              if (item.external) {
                return (
                  <a key={item.id} href={hrefFor(item)} className={className}>
                    {item.label}
                  </a>
                );
              }
              return (
                <Link key={item.id} href={hrefFor(item)} className={className}>
                  {item.label}
                </Link>
              );
            }

            return (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.id)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <Link
                  href={hrefFor(item)}
                  className={cn(className, "inline-flex items-center gap-1")}
                  aria-expanded={openMenu === item.id}
                >
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                </Link>
                <div
                  className={cn(
                    "absolute left-1/2 top-full z-50 w-[min(520px,92vw)] -translate-x-1/2 pt-2 transition",
                    openMenu === item.id
                      ? "pointer-events-auto opacity-100"
                      : "pointer-events-none opacity-0"
                  )}
                >
                  <div className="rounded-2xl border border-[#E8EEF5] bg-white p-3 shadow-[0_18px_40px_rgba(11,46,89,0.14)]">
                    <Link
                      href={hrefFor(item)}
                      className="mb-2 block rounded-xl bg-[#FFF5EB] px-3 py-2 text-sm font-bold text-[#9A3F0A]"
                    >
                      View all {item.label}
                    </Link>
                    <ul className="grid max-h-[420px] grid-cols-2 gap-x-2 gap-y-0.5 overflow-auto">
                      {getMegaChildren(item).map((child) => (
                        <li key={child.id}>
                          <Link
                            href={hrefFor(child)}
                            className="block rounded-lg px-3 py-2 text-sm font-medium text-[#1C2127] hover:bg-[#F5F8FC]"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-xl xl:hidden",
              scrolled ? "text-[#0B2E59]" : "text-white"
            )}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="relative max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-white/10 bg-[#0B2E59] xl:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {nav.map((item) => {
              const hasChildren = Boolean(getMegaChildren(item).length);
              if (!hasChildren) {
                const Comp = item.external ? "a" : Link;
                return (
                  <Comp
                    key={item.id}
                    href={hrefFor(item)}
                    className="rounded-xl px-3 py-3 text-sm font-semibold text-white hover:bg-white/10"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Comp>
                );
              }
              const open = mobileAccordion === item.id;
              return (
                <div key={item.id} className="rounded-xl bg-white/5">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between px-3 py-3 text-left text-sm font-semibold text-white"
                    onClick={() =>
                      setMobileAccordion((cur) => (cur === item.id ? null : item.id))
                    }
                  >
                    {item.label}
                    <ChevronDown
                      className={cn("h-4 w-4 transition", open && "rotate-180")}
                    />
                  </button>
                  {open && (
                    <div className="space-y-1 px-2 pb-3">
                      <Link
                        href={hrefFor(item)}
                        className="block rounded-lg px-3 py-2 text-sm font-bold text-[#FFC48A]"
                        onClick={() => setMobileOpen(false)}
                      >
                        Overview
                      </Link>
                      {getMegaChildren(item).map((child) => (
                        <Link
                          key={child.id}
                          href={hrefFor(child)}
                          className="block rounded-lg px-3 py-2 text-sm text-white/90 hover:bg-white/10"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      )}

      <div
        className={cn(
          "relative overflow-hidden border-t transition-colors duration-300",
          scrolled ? "border-[#E2E8F0] bg-white" : "border-white/10"
        )}
      >
        <div className="mx-auto flex h-9 max-w-7xl items-center overflow-hidden px-5 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] lg:px-8">
          <div className="animate-marquee flex w-max gap-16 whitespace-nowrap">
            {[0, 1].map((i) => (
              <span
                key={i}
                className={cn(
                  "text-[13px] font-medium",
                  scrolled ? "text-[#0B2E59]" : "text-white/90"
                )}
              >
                D&G Holiday (Thailand) Co., Ltd. — Travel Services | MICE & Corporate |
                Events | India Market | Destination Weddings
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
