import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Star } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/services/data";
import { formatPrice } from "@/lib/services/filter";
import {
  CATEGORY_META,
  DESTINATION_META,
} from "@/lib/services/types";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = SERVICES.find((s) => s.slug === slug);
  return {
    title: item?.title ?? "บริการ",
    description: item?.description,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = SERVICES.find((s) => s.slug === slug);
  if (!item) notFound();

  return (
    <>
      <SiteHeader active="services" />
      <main className="bg-[#F7F9FC] py-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div className="overflow-hidden rounded-[16px] border border-[#E5EAF0] bg-white shadow-[0_10px_32px_rgba(8,59,102,0.06)]">
            <div className="relative aspect-[16/10]">
              <Image src={item.image} alt={item.title} fill className="object-cover" priority />
            </div>
            <div className="p-6 md:p-8">
              <p className="text-xs font-bold uppercase tracking-wide text-[#FF6B21]">
                {CATEGORY_META[item.category].label}
              </p>
              <h1 className="mt-2 text-3xl font-bold text-[#083B66]">{item.title}</h1>
              <p className="mt-3 flex items-center gap-2 text-sm text-[#52667A]">
                <MapPin className="h-4 w-4 text-[#FF6B21]" />
                {item.destination.map((d) => DESTINATION_META[d]).join(", ")}
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-sm">
                <Star className="h-4 w-4 fill-[#FF6B21] text-[#FF6B21]" />
                <span className="font-semibold">{item.rating.toFixed(1)}</span>
                <span className="text-[#52667A]">({item.reviewCount} รีวิว)</span>
              </div>
              <p className="mt-5 text-base leading-relaxed text-[#52667A]">{item.description}</p>
              <ul className="mt-5 space-y-2">
                {item.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-[#102A43]">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#FF6B21]" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="h-fit rounded-[16px] border border-[#E5EAF0] bg-white p-6 shadow-[0_10px_32px_rgba(8,59,102,0.06)] lg:sticky lg:top-28">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#52667A]">ราคา</p>
            <p className="mt-2 text-xl font-bold text-[#083B66]">
              {formatPrice(item.price, item.priceUnit)}
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Button asChild className="rounded-[14px] bg-[#FF6B21] hover:bg-[#E85E18]">
                <a href="https://page.line.me/354ejhoo" target="_blank" rel="noopener noreferrer">
                  ขอใบเสนอราคา
                </a>
              </Button>
              <Button asChild variant="soft" className="rounded-[14px]">
                <Link href="/services">กลับไปบริการทั้งหมด</Link>
              </Button>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
