import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <>
      <SiteHeader active="contact" />
      <main className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-start justify-center px-5 py-24 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#FF7A1A]">Contact</p>
        <h1 className="font-display mt-3 text-4xl font-semibold text-[#0B2E59]">
          Let&apos;s plan your next journey
        </h1>
        <p className="mt-4 max-w-xl text-slate-500">
          Reach our team by phone, email, or LINE Official Account.
        </p>
        <ul className="mt-8 space-y-2 text-[#0B2E59]">
          <li>
            <a className="font-semibold hover:text-[#FF7A1A]" href="tel:+66821479553">
              +66 82 147 9553
            </a>
          </li>
          <li>
            <a
              className="font-semibold hover:text-[#FF7A1A]"
              href="mailto:dgholidaythailand@gmail.com"
            >
              dgholidaythailand@gmail.com
            </a>
          </li>
          <li>
            <a
              className="font-semibold hover:text-[#FF7A1A]"
              href="https://page.line.me/354ejhoo"
              target="_blank"
              rel="noopener noreferrer"
            >
              LINE @354ejhoo
            </a>
          </li>
        </ul>
        <div className="mt-10 flex gap-3">
          <Button asChild>
            <a href="https://page.line.me/354ejhoo" target="_blank" rel="noopener noreferrer">
              Chat on LINE
            </a>
          </Button>
          <Button asChild variant="soft">
            <Link href="/about">Back to About</Link>
          </Button>
        </div>
      </main>
    </>
  );
}
