"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import {
  CATEGORY_META,
  type ServiceItem,
} from "@/lib/services/types";
import { cn } from "@/lib/utils";

type Props = {
  item: ServiceItem;
  favorite?: boolean;
  onToggleFavorite?: (id: string) => void;
};

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-px">
      {Array.from({ length: 5 }).map((_, i) => {
        const on = i < Math.round(rating);
        return (
          <Star
            key={i}
            className={cn(
              "h-3.5 w-3.5",
              on ? "fill-[#FF5E1F] text-[#FF5E1F]" : "text-gray-300"
            )}
          />
        );
      })}
    </span>
  );
}

export function ServiceCard({ item, favorite, onToggleFavorite }: Props) {
  const priceLabel =
    item.price === null
      ? item.priceUnit
      : `${item.price.toLocaleString("th-TH")}`;

  return (
    <article className="group h-full overflow-hidden rounded-2xl bg-white shadow-[0_4px_14px_rgba(3,18,26,0.08)] transition duration-250 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(3,18,26,0.14)]">
      <Link href={`/services/${item.slug}`} className="flex h-full flex-col text-inherit no-underline">
        <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl bg-[#F0F1F2]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition duration-350 group-hover:scale-105"
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[rgba(3,18,26,0.45)] to-transparent" />
          <span className="absolute left-3 top-3 z-[2] inline-flex max-w-[calc(100%-64px)] items-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap rounded-full bg-[#FF5E1F] px-2.5 py-1 text-[11px] font-bold leading-tight text-white">
            {CATEGORY_META[item.category].short}
          </span>
          <button
            type="button"
            aria-label="Favorite"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite?.(item.id);
            }}
            className="absolute right-2.5 top-2.5 z-[2] inline-flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white/90 text-[#687176] transition hover:scale-105 hover:bg-white"
          >
            <Heart
              className={cn(
                "h-4 w-4",
                favorite && "fill-[#EF4444] text-[#EF4444]"
              )}
            />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-2 px-3.5 pb-4 pt-3.5">
          <h3 className="line-clamp-2 min-h-[2.4em] text-[14px] font-bold leading-[1.3] text-[#03121A]">
            {item.title}
          </h3>

          <div className="flex flex-wrap items-center gap-1.5 text-[12px]">
            <Stars rating={item.rating} />
            <span className="font-bold text-[#03121A]">{item.rating.toFixed(1)}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500">{item.reviewCount} รีวิว</span>
          </div>

          <div className="my-1 h-px bg-[#EEF0F2]" />

          <div className="mt-auto">
            <p className="mb-0.5 text-[11px] text-gray-400">เริ่มต้น</p>
            <div className="flex flex-wrap items-baseline gap-1">
              {item.price !== null && (
                <span className="text-[11px] font-bold text-[#03121A]">THB</span>
              )}
              <span className="text-[16px] font-extrabold leading-none text-[#FF5E1F]">
                {priceLabel}
              </span>
              {item.price !== null && (
                <span className="text-[11px] text-gray-500">/ {item.priceUnit.replace(/^บาท\s*\/\s*/, "")}</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
