import Link from "next/link";
import { Fade } from "@/components/motion/fade";
import { Button } from "@/components/ui/button";

export function AboutCta() {
  return (
    <section className="bg-gradient-to-br from-[#FF7A1A] via-[#FF8A2E] to-[#E86B12] py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 text-center lg:px-8">
        <Fade>
          <h2 className="font-display mx-auto whitespace-nowrap text-[clamp(1.35rem,3.8vw,3rem)] font-semibold tracking-tight text-white leading-none">
            Let&apos;s Create Your Next Journey Together
          </h2>
          <p className="mx-auto mt-5 whitespace-nowrap text-[clamp(0.85rem,1.4vw,1.125rem)] text-white/90">
            Tell us your destination, dates, and group profile—our team will craft a refined proposal.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" variant="ghost">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="https://page.line.me/354ejhoo" target="_blank" rel="noopener noreferrer">
                Get Quotation
              </a>
            </Button>
          </div>
        </Fade>
      </div>
    </section>
  );
}
