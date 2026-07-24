import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Fade } from "@/components/motion/fade";
import { SectionEyebrow, SectionTitle } from "@/components/about/section-heading";

const features = [
  {
    title: "Luxury Hotel",
    image: "/images/dg-phuket.jpg",
    points: [
      "Preferred rates with leading luxury properties",
      "Room allocation and VIP amenities arranged in advance",
      "On-site liaison for seamless arrivals",
    ],
  },
  {
    title: "Private Transfer",
    image: "/images/dg-samui.jpg",
    points: [
      "Premium vehicles with professional chauffeurs",
      "Airport meet & greet with name board",
      "Flexible scheduling for private itineraries",
    ],
  },
  {
    title: "MICE",
    image: "/images/dg-trang.jpg",
    points: [
      "Meetings, incentives, conferences, and exhibitions",
      "Venue sourcing, staging, and production support",
      "Team-building programs with polished logistics",
    ],
  },
  {
    title: "Wedding",
    image: "/images/dg-krabi.jpg",
    points: [
      "Destination wedding planning across iconic venues",
      "Guest coordination and hospitality desks",
      "Photography, styling, and celebration support",
    ],
  },
  {
    title: "VIP Service",
    image: "/images/dg-songkhla.jpg",
    points: [
      "Discreet handling for executives and high-profile guests",
      "Private guides and exclusive access experiences",
      "24/7 concierge-style assistance during travel",
    ],
  },
];

export function WhyChoose() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Fade className="mb-16 max-w-2xl">
          <SectionEyebrow>Why Choose D&G Holiday</SectionEyebrow>
          <SectionTitle>Excellence in every detail of travel</SectionTitle>
        </Fade>

        <div className="space-y-20 lg:space-y-28">
          {features.map((f, i) => {
            const reverse = i % 2 === 1;
            return (
              <div
                key={f.title}
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Fade>
                  <div className="relative aspect-[16/11] overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(11,46,89,0.12)]">
                    <Image
                      src={f.image}
                      alt={f.title}
                      fill
                      className="object-cover transition duration-700 hover:scale-[1.02]"
                      sizes="(max-width:1024px) 100vw, 50vw"
                    />
                  </div>
                </Fade>
                <Fade delay={0.1}>
                  <h3 className="font-display text-3xl font-semibold tracking-tight text-[#0B2E59]">
                    {f.title}
                  </h3>
                  <ul className="mt-6 space-y-4">
                    {f.points.map((p) => (
                      <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-slate-600">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#FF7A1A]" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </Fade>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
