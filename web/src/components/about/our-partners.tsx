import { Fade } from "@/components/motion/fade";
import { SectionEyebrow, SectionLead, SectionTitle } from "@/components/about/section-heading";

const partners = [
  { name: "Airlines", items: ["Thai Airways", "Bangkok Airways", "Singapore Airlines", "Emirates"] },
  { name: "Hotels", items: ["Marriott", "Hilton", "Accor", "Minor Hotels"] },
  { name: "Transportation", items: ["Private Fleet", "VIP Coaches", "Speedboats", "Charters"] },
  { name: "Government", items: ["TAT Network", "Airport Authority", "Immigration Desk", "Local Admin"] },
  { name: "Corporate", items: ["MICE Partners", "Event Venues", "AV Houses", "Brand Agencies"] },
];

export function OurPartners() {
  const logos = partners.flatMap((g) =>
    g.items.map((item) => ({ group: g.name, name: item }))
  );

  return (
    <section className="bg-[#F8FAFC] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Fade className="max-w-5xl">
          <SectionEyebrow>Our Partners</SectionEyebrow>
          <SectionTitle>A trusted network across travel</SectionTitle>
          <SectionLead className="max-w-none whitespace-nowrap text-[clamp(0.9rem,1.35vw,1.125rem)]">
            Airlines, hotels, transport, government, and corporate partners that power premium delivery.
          </SectionLead>
        </Fade>

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {logos.map((logo, i) => (
            <Fade key={`${logo.group}-${logo.name}`} delay={(i % 10) * 0.03}>
              <div className="flex h-28 flex-col items-center justify-center rounded-2xl border border-[#E2E8F0] bg-white px-4 text-center shadow-[0_8px_24px_rgba(11,46,89,0.04)] transition duration-300 hover:scale-[1.02] hover:border-[#FF7A1A]/40 hover:shadow-[0_14px_36px_rgba(11,46,89,0.08)]">
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-300 transition group-hover:text-[#FF7A1A]">
                  {logo.group}
                </span>
                <span className="mt-2 text-sm font-semibold text-slate-400 transition hover:text-[#0B2E59]">
                  {logo.name}
                </span>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}
