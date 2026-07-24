"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { DESTINATION_GUIDES } from "@/lib/articles/data";

export function DestinationGuide() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#FF7A1A]">
          Travel Guide
        </p>
        <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-[#0B2E59] md:text-4xl">
          Destination Guide
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-[#52667A] md:text-base">
          สำรวจคู่มือจุดหมายยอดนิยมสำหรับทริปส่วนตัวและองค์กร
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DESTINATION_GUIDES.map((item, index) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={`/articles?q=${encodeURIComponent(item.name)}`}
                className="group relative block aspect-[4/3] overflow-hidden rounded-[18px]"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#03121A]/80 via-[#03121A]/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="mt-1 text-sm text-white/85">{item.blurb}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
