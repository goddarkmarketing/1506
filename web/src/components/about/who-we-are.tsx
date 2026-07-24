import Image from "next/image";
import { Fade } from "@/components/motion/fade";
import { SectionEyebrow, SectionTitle } from "@/components/about/section-heading";

const highlights = [
  "20+ Years Experience",
  "15,000+ Travelers",
  "Corporate & MICE Specialist",
  "Tailor-made Experiences",
];

export function WhoWeAre() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <Fade className="relative overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(11,46,89,0.12)]">
          <div className="relative aspect-[4/5]">
            <Image
              src="/images/dg-krabi.jpg"
              alt="Luxury coastal destination managed by D&G Holiday"
              fill
              className="object-cover transition duration-700 hover:scale-[1.02]"
              sizes="(max-width:1024px) 100vw, 50vw"
              priority
            />
          </div>
        </Fade>

        <Fade delay={0.1}>
          <SectionEyebrow>Who We Are</SectionEyebrow>
          <SectionTitle>Luxury Destination Management Company</SectionTitle>
          <div className="mt-6 space-y-5 text-[15px] leading-[1.85] text-slate-500 md:text-base">
            <p>
              D&G Holiday Thailand is a premium Destination Management Company
              dedicated to crafting precise, elegant travel experiences for
              discerning travelers, corporate groups, and international partners.
            </p>
            <p>
              From private FIT itineraries to complex MICE programs, our team
              designs every journey with operational rigor—logistics, hospitality,
              and on-ground excellence—so your clients feel cared for from arrival
              to departure.
            </p>
            <p>
              Based in Bangkok and deeply connected across Thailand&apos;s key
              destinations, we combine local insight with international service
              standards expected of a high-end DMC.
            </p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {highlights.map((item, i) => (
              <Fade key={item} delay={0.12 + i * 0.06}>
                <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] px-5 py-4 text-sm font-semibold text-[#0B2E59] shadow-[0_8px_24px_rgba(11,46,89,0.04)] transition hover:scale-[1.02]">
                  <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#FF7A1A]" />
                  {item}
                </div>
              </Fade>
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
}
