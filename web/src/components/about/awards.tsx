import { BadgeCheck, FileBadge2, Medal, ScrollText } from "lucide-react";
import { Fade } from "@/components/motion/fade";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionEyebrow, SectionLead, SectionTitle } from "@/components/about/section-heading";

const awards = [
  {
    icon: FileBadge2,
    title: "Certificates",
    desc: "Professional tourism certifications and operational compliance standards.",
  },
  {
    icon: Medal,
    title: "Awards",
    desc: "Recognition for service excellence in destination management and hospitality.",
  },
  {
    icon: ScrollText,
    title: "Licenses",
    desc: "Licensed tour operator credentials supporting inbound and outbound programs.",
  },
  {
    icon: BadgeCheck,
    title: "Association Memberships",
    desc: "Active memberships with industry associations and travel trade networks.",
  },
];

export function Awards() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Fade className="max-w-2xl">
          <SectionEyebrow>Awards & Certifications</SectionEyebrow>
          <SectionTitle>Credentials of a premium DMC</SectionTitle>
          <SectionLead>
            Elegant proof of professionalism—certificates, awards, licenses, and associations.
          </SectionLead>
        </Fade>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {awards.map((a, i) => (
            <Fade key={a.title} delay={i * 0.06}>
              <Card className="h-full transition hover:scale-[1.02]">
                <CardHeader>
                  <a.icon className="mb-2 h-8 w-8 text-[#FF7A1A]" strokeWidth={1.5} />
                  <CardTitle className="text-lg">{a.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-slate-500">{a.desc}</p>
                </CardContent>
              </Card>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}
