import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "D&G Holiday Thailand",
    template: "%s | D&G Holiday Thailand",
  },
  description:
    "Premium Destination Management Company creating extraordinary journeys across Thailand and beyond.",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/icon.png" }],
  },
  openGraph: {
    title: "D&G Holiday Thailand",
    description:
      "Premium Destination Management Company creating extraordinary journeys across Thailand and beyond.",
    images: ["/icon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body
        className="antialiased"
        style={{ fontFamily: '"Better Together", "Godwit", sans-serif' }}
      >
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
