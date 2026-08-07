import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SectionHub } from "@/components/ia/section-hub";
import {
  DYNAMIC_SECTIONS,
  allSectionParams,
  getSection,
  type DynamicSectionId,
} from "@/lib/site-nav";

type Props = { params: Promise<{ section: string }> };

export function generateStaticParams() {
  return allSectionParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section: sectionId } = await params;
  const section = getSection(sectionId);
  if (!section) return { title: "Not Found" };
  return {
    title: section.heroTitle || section.label,
    description: section.description,
  };
}

export default async function SectionHubPage({ params }: Props) {
  const { section: sectionId } = await params;
  if (!(DYNAMIC_SECTIONS as readonly string[]).includes(sectionId)) {
    notFound();
  }
  const section = getSection(sectionId as DynamicSectionId);
  if (!section) notFound();

  return (
    <>
      <SiteHeader active={sectionId} />
      <main className="min-h-[60vh] bg-[#F7F9FC]">
        <SectionHub section={section} />
      </main>
    </>
  );
}
