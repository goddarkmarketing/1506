import { Fade } from "@/components/motion/fade";
import { SectionEyebrow, SectionLead, SectionTitle } from "@/components/about/section-heading";

const milestones = [
  { year: "2008", title: "Company Founded", desc: "Established as a dedicated travel partner in Thailand." },
  { year: "2014", title: "Expanded Corporate Services", desc: "Grew into full corporate travel and incentive programs." },
  { year: "2018", title: "Luxury FIT", desc: "Launched bespoke private journeys for high-end travelers." },
  { year: "2022", title: "International Expansion", desc: "Strengthened inbound partnerships across key markets." },
  { year: "2026", title: "Leading Thailand DMC", desc: "Recognized for premium destination management excellence." },
];

export function OurStory() {
  return (
    <section className="bg-[#F8FAFC] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Fade className="max-w-2xl">
          <SectionEyebrow>Our Story</SectionEyebrow>
          <SectionTitle>A journey built on trust and craft</SectionTitle>
          <SectionLead>
            From our founding to becoming a trusted Thailand DMC, every chapter
            reflects a commitment to precision hospitality.
          </SectionLead>
        </Fade>

        <div className="relative mt-16">
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-[#FF7A1A]/35 md:left-1/2 md:-translate-x-1/2" />
          <ol className="space-y-10 md:space-y-14">
            {milestones.map((m, i) => {
              const left = i % 2 === 0;
              return (
                <li key={m.year} className="relative">
                  <Fade delay={i * 0.05}>
                    <div className="grid items-start md:grid-cols-2 md:gap-12">
                      <div className={left ? "md:text-right md:pr-12" : "md:col-start-2 md:pl-12"}>
                        <div className="inline-flex flex-col rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0_12px_40px_rgba(11,46,89,0.06)] transition hover:scale-[1.02] md:max-w-md">
                          <span className="text-sm font-bold tracking-[0.12em] text-[#FF7A1A]">
                            {m.year}
                          </span>
                          <h3 className="mt-2 text-xl font-semibold text-[#0B2E59]">{m.title}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-slate-500">{m.desc}</p>
                        </div>
                      </div>
                    </div>
                    <span className="absolute left-[11px] top-7 h-3 w-3 rounded-full border-2 border-white bg-[#FF7A1A] shadow-[0_0_0_4px_rgba(255,122,26,0.2)] md:left-1/2 md:-translate-x-1/2" />
                  </Fade>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
