import {
  Award,
  Handshake,
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Fade } from "@/components/motion/fade";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionEyebrow, SectionLead, SectionTitle } from "@/components/about/section-heading";

const values = [
  { icon: Award, title: "Professional", desc: "Disciplined planning and polished execution on every itinerary." },
  { icon: ShieldCheck, title: "Trust", desc: "Transparent communication and reliable delivery for every partner." },
  { icon: HeartHandshake, title: "Hospitality", desc: "Warm, attentive service that feels personal and refined." },
  { icon: Sparkles, title: "Quality", desc: "Curated hotels, experiences, and suppliers that meet luxury standards." },
  { icon: Lightbulb, title: "Innovation", desc: "Fresh ideas and smart logistics for modern travel programs." },
  { icon: Handshake, title: "Customer First", desc: "Every decision begins with the traveler’s comfort and delight." },
];

export function OurValues() {
  return (
    <section className="bg-[#F8FAFC] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Fade className="max-w-2xl">
          <SectionEyebrow>Our Values</SectionEyebrow>
          <SectionTitle>Principles that guide every journey</SectionTitle>
          <SectionLead>
            Six commitments that shape how we plan, host, and partner.
          </SectionLead>
        </Fade>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <Fade key={v.title} delay={i * 0.05}>
              <Card className="h-full border-[#E2E8F0] transition duration-300 hover:scale-[1.02] hover:shadow-[0_18px_50px_rgba(11,46,89,0.1)]">
                <CardHeader>
                  <v.icon className="mb-2 h-8 w-8 text-[#FF7A1A]" strokeWidth={1.5} />
                  <CardTitle>{v.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-slate-500">{v.desc}</p>
                </CardContent>
              </Card>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}
