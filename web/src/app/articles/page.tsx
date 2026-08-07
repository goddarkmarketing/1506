import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { ArticlesDirectory } from "@/components/articles/articles-directory";

export const metadata: Metadata = {
  title: "Blog & Travel Guide",
  description:
    "Travel inspiration, destination guides, and tips from the D&G Holiday Thailand team.",
  openGraph: {
    title: "Blog & Travel Guide | D&G Holiday Thailand",
    description:
      "Travel inspiration, destination guides, and tips from the D&G Holiday Thailand team.",
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
