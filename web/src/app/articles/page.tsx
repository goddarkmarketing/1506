import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { ArticlesDirectory } from "@/components/articles/articles-directory";

export const metadata: Metadata = {
  title: "บทความ | Travel Journal",
  description:
    "คู่มือท่องเที่ยว แรงบันดาลใจ และเคล็ดลับการเดินทางจากทีม D&G Holiday Thailand",
  openGraph: {
    title: "Travel Journal | D&G Holiday Thailand",
    description:
      "คู่มือท่องเที่ยว แรงบันดาลใจ และเคล็ดลับการเดินทางจากทีม D&G Holiday Thailand",
    images: ["/images/dg-phuket-sunset.png"],
  },
};

export default function ArticlesPage() {
  return (
    <>
      <SiteHeader active="articles" />
      <main>
        <ArticlesDirectory />
      </main>
    </>
  );
}
