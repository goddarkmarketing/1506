"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/services/filter";
import {
  CATEGORY_META,
  DESTINATION_META,
  type ServiceItem,
} from "@/lib/services/types";

export function ServiceListItem({ item }: { item: ServiceItem }) {
  const dest = item.destination.map((d) => DESTINATION_META[d]).join(", ");

  return (
    <article className="grid overflow-hidden rounded-[16px] border border-[#E5EAF0] bg-white shadow-[0_8px_28px_rgba(8,59,102,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(8,59,102,0.1)] md:grid-cols-[280px_1fr_220px]">
      <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[200px]">
        <Image src={item.image} alt={item.title} fill className="object-cover" sizes="280px" />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-[#083B66]">
          {CATEGORY_META[item.category].short}
        </span>
      </div>

      <div className="p-5 md:p-6">
        <h3 className="text-lg font-bold text-[#102A43]">{item.title}</h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-[#52667A]">
          <MapPin className="h-4 w-4 text-[#FF6B21]" />
          {dest}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#52667A]">{item.description}</p>
        <div className="mt-3 flex items-center gap-1.5 text-sm">
          <Star className="h-4 w-4 fill-[#FF6B21] text-[#FF6B21]" />
          <span className="font-semibold">{item.rating.toFixed(1)}</span>
          <span className="text-[#52667A]">({item.reviewCount} รีวิว)</span>
        </div>
        <ul className="mt-3 flex flex-wrap gap-2">
          {item.features.map((f) => (
            <li
              key={f}
              className="rounded-full bg-[#EEF5FA] px-2.5 py-1 text-xs font-medium text-[#083B66]"
            >
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col justify-between border-t border-[#E5EAF0] p-5 md:border-l md:border-t-0 md:p-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#52667A]">ราคา</p>
          <p className="mt-1 text-base font-bold text-[#083B66]">
            {formatPrice(item.price, item.priceUnit)}
          </p>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <Button asChild className="rounded-[14px] bg-[#FF6B21] hover:bg-[#E85E18]">
            <Link href={`/services/${item.slug}`}>ดูรายละเอียด</Link>
          </Button>
          <Button asChild variant="soft" className="rounded-[14px]">
            <a href="https://page.line.me/354ejhoo" target="_blank" rel="noopener noreferrer">
              ขอใบเสนอราคา
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}
