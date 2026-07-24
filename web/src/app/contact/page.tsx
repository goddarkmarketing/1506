import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { ContactPageContent } from "@/components/contact/contact-page-content";

export const metadata: Metadata = {
  title: "ติดต่อเรา",
  description:
    "ติดต่อ D&G Holiday Thailand — โทร อีเมล LINE Official และแบบฟอร์มสอบถามแพ็กเกจทัวร์",
  openGraph: {
    title: "ติดต่อเรา | D&G Holiday Thailand",
    description:
      "สอบถามแพ็กเกจ ขอใบเสนอราคา หรือคุยออกแบบทริปกับทีม D&G Holiday ได้โดยตรง",
    images: ["/images/dg-songkhla.jpg"],
  },
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader active="contact" />
      <main>
        <ContactPageContent />
      </main>
    </>
  );
}
