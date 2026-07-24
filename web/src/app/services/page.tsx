import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { ServicesDirectory } from "@/components/services/services-directory";
import { ServiceCardSkeleton } from "@/components/services/service-states";

export const metadata: Metadata = {
  title: "บริการทั้งหมด",
  description:
    "บริการท่องเที่ยวครบวงจรของ D&G Holiday Thailand — ที่พัก ทัวร์ FIT MICE รถรับส่ง และกิจกรรม",
};

function ServicesFallback() {
  return (
    <div className="bg-[#F7F9FC] py-16">
      <div className="mx-auto grid max-w-7xl gap-5 px-5 sm:grid-cols-2 lg:px-8 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <ServiceCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <SiteHeader active="services" />
      <main>
        <Suspense fallback={<ServicesFallback />}>
          <ServicesDirectory />
        </Suspense>
      </main>
    </>
  );
}
