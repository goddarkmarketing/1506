import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { AboutPageContent } from "@/components/about/about-page-content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "About D&G Holiday Thailand — luxury Destination Management Company creating extraordinary journeys across Thailand and beyond.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader active="about" />
      <AboutPageContent />
    </>
  );
}
