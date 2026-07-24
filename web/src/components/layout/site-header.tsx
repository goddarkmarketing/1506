"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { HOME_URL } from "@/lib/site";

const nav = [
  { href: HOME_URL, label: "หน้าแรก", external: true },
  { href: "/services", label: "บริการ" },
  { href: "/about", label: "เกี่ยวกับเรา" },
  { href: "/articles", label: "บทความ" },
  { href: "/contact", label: "ติดต่อ" },
];

export function SiteHeader({ active = "about" }: { active?: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      <div className="relative mx-auto flex h-16 max-w-7xl items-center gap-4 px-5 lg:h-[72px] lg:px-8">
        <a
          href={HOME_URL}
          className={cn(
            "shrink-0 text-[22px] font-extrabold tracking-tight transition-colors",
            scrolled ? "text-[#0B2E59]" : "text-white"
          )}
        >
          D&G Holiday
        </a>
        <nav className="mx-auto hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const isActive =
              !item.external &&
              (item.href.includes(active) ||
                (active === "home" && item.href === "/"));
            const className = cn(
              "rounded-xl px-3 py-2 text-sm font-semibold transition-colors",
              scrolled
                ? isActive
                  ? "bg-[#0B2E59]/8 text-[#0B2E59]"
                  : "text-[#0B2E59]/80 hover:bg-[#0B2E59]/5"
                : isActive
                  ? "bg-white/15 text-white"
                  : "text-white/90 hover:bg-white/10"
            );
            if (item.external) {
              return (
                <a key={item.href} href={item.href} className={className}>
                  {item.label}
                </a>
              );
            }
            return (
              <Link key={item.href} href={item.href} className={className}>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <div
            className={cn(
              "hidden items-center gap-2 text-sm font-semibold sm:flex",
              scrolled ? "text-[#0B2E59]" : "text-white"
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/flags/th.svg" alt="" width={20} height={14} className="rounded-[2px]" />
            <span>THB | TH</span>
          </div>
          <span
            className={cn(
              "hidden h-9 items-center rounded-full px-4 text-sm font-semibold lg:inline-flex",
              "bg-[#FFE8D1] text-[#8B3A00]"
            )}
          >
            เข้าสู่ระบบ
          </span>
          <span className="inline-flex h-9 items-center rounded-full bg-[#FF7A1A] px-4 text-sm font-semibold text-white">
            สมัครใช้งาน
          </span>
        </div>
      </div>
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
                บริษัท ดีแอนด์จี ฮอลิเดย์ ไทยแลนด์ จำกัด พันธมิตรด้านการท่องเที่ยวแบบ B2B ในประเทศไทย | ทัวร์กลุ่ม | ทัวร์สำหรับนักท่องเที่ยวรายบุคคล | งานอีเวนต์ | บริการขอวีซ่า
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
