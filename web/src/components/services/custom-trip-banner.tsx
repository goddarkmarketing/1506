"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export function CustomTripBanner({ className }: Props) {
  return (
    <section className={cn("relative overflow-hidden rounded-[18px]", className)}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/dg-abstract-bg.png')" }}
      />
      <div className="absolute inset-0 bg-[#03121A]/35" />
      <div className="relative p-6 md:p-8 lg:p-10">
        <div className="text-white">
          <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
            ยังไม่พบบริการที่ตรงกับการเดินทางของคุณ?
          </h3>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="rounded-[14px] bg-white text-[#083B66] hover:bg-[#F7F9FC]">
              <Link href="/contact">ออกแบบทริปของฉัน</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-[14px]">
              <a href="https://page.line.me/354ejhoo" target="_blank" rel="noopener noreferrer">
                ปรึกษาทีมงาน
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
