import { Compass, Eye } from "lucide-react";
import { Fade } from "@/components/motion/fade";
import { SectionEyebrow, SectionTitle } from "@/components/about/section-heading";

export function MissionVision() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Fade className="mb-14 max-w-2xl">
          <SectionEyebrow>Purpose</SectionEyebrow>
          <SectionTitle>Mission & Vision</SectionTitle>
        </Fade>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {[
            {
              icon: Compass,
              title: "Mission",
              text: "To design and deliver extraordinary journeys with precision, warmth, and uncompromising service—connecting the world to Thailand’s finest experiences.",
            },
            {
              icon: Eye,
              title: "Vision",
              text: "To be Asia’s most trusted luxury Destination Management Company, known for elegant craftsmanship and enduring partnerships.",
            },
          ].map((item, i) => (
            <Fade key={item.title} delay={i * 0.1}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/40 bg-[#0B2E59]/90 p-10 text-white shadow-[0_20px_60px_rgba(11,46,89,0.18)] backdrop-blur-xl transition hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
                <item.icon className="relative mb-8 h-12 w-12 text-[#FF7A1A]" strokeWidth={1.4} />
                <h3 className="relative font-display text-3xl font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="relative mt-4 max-w-md text-base leading-relaxed text-white/80">
                  {item.text}
                </p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}
