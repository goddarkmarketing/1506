"use client";

import { ServiceCard } from "@/components/services/service-card";
import type { ServiceItem } from "@/lib/services/types";

export function FeaturedServices({ items }: { items: ServiceItem[] }) {
  if (!items.length) return null;

  return (
    <section className="mb-10">
      <h3 className="text-xl font-bold text-[#083B66]">บริการแนะนำสำหรับคุณ</h3>
      <div className="mt-5 grid max-sm:grid-cols-2 grid-cols-4 gap-3 sm:gap-4">
        {items.slice(0, 4).map((item) => (
          <ServiceCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
