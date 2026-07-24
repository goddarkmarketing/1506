import Image from "next/image";
import { Globe2, Link2, Share2 } from "lucide-react";
import { Fade } from "@/components/motion/fade";
import { SectionEyebrow, SectionLead, SectionTitle } from "@/components/about/section-heading";

const team = [
  {
    name: "Daniel Greyson",
    role: "Managing Director",
    bio: "Leads strategy and partner relationships across premium inbound markets.",
    image: "/images/dg-phuket.jpg",
  },
  {
    name: "Grace Ananda",
    role: "Head of Destination Experience",
    bio: "Crafts luxury FIT and signature journeys with refined local insight.",
    image: "/images/dg-krabi.jpg",
  },
  {
    name: "Nattapol Siri",
    role: "Director of MICE & Corporate",
    bio: "Delivers complex corporate programs with precision operations.",
    image: "/images/dg-samui.jpg",
  },
  {
    name: "Elena Moreau",
    role: "Guest Relations Manager",
    bio: "Ensures every VIP itinerary feels seamless, discreet, and personal.",
    image: "/images/dg-trang.jpg",
  },
];

export function OurTeam() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Fade className="max-w-4xl">
          <SectionEyebrow>Our Team</SectionEyebrow>
          <SectionTitle className="whitespace-nowrap text-[clamp(1.35rem,3.6vw,2.75rem)] lg:leading-none">
            People behind exceptional journeys
          </SectionTitle>
          <SectionLead className="max-w-none whitespace-nowrap text-[clamp(0.9rem,1.35vw,1.125rem)]">
            A senior team combining destination expertise, hospitality craft, and corporate precision.
          </SectionLead>
        </Fade>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <Fade key={m.name} delay={i * 0.06}>
              <article className="group overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_12px_40px_rgba(11,46,89,0.06)] transition duration-300 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(11,46,89,0.12)]">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width:1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2E59]/70 via-transparent to-transparent opacity-80" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#0B2E59]">{m.name}</h3>
                  <p className="mt-1 text-sm font-medium text-[#FF7A1A]">{m.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500">{m.bio}</p>
                  <div className="mt-5 flex gap-3 text-slate-400">
                    <a
                      href="https://www.facebook.com/dgholidaythailand"
                      aria-label="Facebook"
                      className="transition hover:text-[#0B2E59]"
                    >
                      <Share2 className="h-4 w-4" />
                    </a>
                    <a
                      href="https://www.instagram.com/dg.holiday"
                      aria-label="Instagram"
                      className="transition hover:text-[#0B2E59]"
                    >
                      <Globe2 className="h-4 w-4" />
                    </a>
                    <a
                      href="https://www.facebook.com/dgholidaythailand"
                      aria-label="Profile"
                      className="transition hover:text-[#0B2E59]"
                    >
                      <Link2 className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </article>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}
