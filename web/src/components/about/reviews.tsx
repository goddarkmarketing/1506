import Image from "next/image";
import { Star } from "lucide-react";
import { Fade } from "@/components/motion/fade";
import { SectionEyebrow, SectionLead, SectionTitle } from "@/components/about/section-heading";

const reviews = [
  {
    name: "Hiroshi Tanaka",
    company: "Sakura Travel Group",
    country: "Japan",
    flag: "/images/flags/jp.svg",
    photo: "/images/dg-phuket.jpg",
    quote:
      "Impeccable DMC execution. Our VIP groups experience Thailand with elegance and zero friction.",
  },
  {
    name: "Min-ji Park",
    company: "Seoul Premium Tours",
    country: "Korea",
    flag: "/images/flags/kr.svg",
    photo: "/images/dg-krabi.jpg",
    quote:
      "From private villas to flawless transfers, D&G Holiday delivers a true luxury standard.",
  },
  {
    name: "Marcus Chen",
    company: "Pacific Incentive Co.",
    country: "Singapore",
    flag: "/images/flags/sg.svg",
    photo: "/images/dg-samui.jpg",
    quote:
      "Our MICE programs ran perfectly. Professional, responsive, and beautifully organized.",
  },
];

export function Reviews() {
  return (
    <section className="bg-[#F8FAFC] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Fade className="max-w-2xl">
          <SectionEyebrow>Customer Reviews</SectionEyebrow>
          <SectionTitle>Words from partners worldwide</SectionTitle>
          <SectionLead>
            Trusted by travel companies and corporate clients who expect premium delivery.
          </SectionLead>
        </Fade>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <Fade key={r.name} delay={i * 0.08}>
              <article className="flex h-full flex-col rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-[0_12px_40px_rgba(11,46,89,0.06)] transition hover:scale-[1.02]">
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full">
                    <Image src={r.photo} alt={r.name} fill className="object-cover" sizes="56px" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-[#0B2E59]">{r.name}</h3>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={r.flag} alt={r.country} width={18} height={12} className="rounded-[2px]" />
                    </div>
                    <p className="text-sm text-slate-500">{r.company}</p>
                  </div>
                </div>
                <div className="mt-5 flex gap-1 text-[#FF7A1A]">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-slate-600">
                  “{r.quote}”
                </p>
              </article>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}
