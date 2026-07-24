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
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html, body, button, input, select, textarea, a, p, h1, h2, h3, h4, h5, h6, span, div, li, label {
                font-family: "Godwit", sans-serif !important;
              }
            `,
          }}
        />
      </head>
      <body className="antialiased" style={{ fontFamily: '"Godwit", sans-serif' }}>
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
