import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { ServiceLeaf } from "@/components/ia/service-leaf";
import { allAboutLeafParams, getLeaf } from "@/lib/site-nav";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allAboutLeafParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const found = getLeaf("about", slug);
  if (!found) return { title: "Not Found" };
  return {
    title: found.leaf.heroTitle || found.leaf.label,
    description: found.leaf.description,
  };
}

export default async function AboutLeafPage({ params }: Props) {
  const { slug } = await params;
  const found = getLeaf("about", slug);
  if (!found) notFound();

  return (
    <>
      <SiteHeader active={`about/${slug}`} />
      <main className="min-h-[60vh] bg-[#F7F9FC]">
        <ServiceLeaf section={found.section} leaf={found.leaf} />
      </main>
    </>
  );
}
