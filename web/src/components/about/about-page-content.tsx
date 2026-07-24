"use client";

import { AboutHero } from "@/components/about/about-hero";
import { WhoWeAre } from "@/components/about/who-we-are";
import { OurStory } from "@/components/about/our-story";
import { MissionVision } from "@/components/about/mission-vision";
import { OurValues } from "@/components/about/our-values";
import { WhyChoose } from "@/components/about/why-choose";
import { Statistics } from "@/components/about/statistics";
import { OurTeam } from "@/components/about/our-team";
import { OurPartners } from "@/components/about/our-partners";
import { Awards } from "@/components/about/awards";
import { Reviews } from "@/components/about/reviews";
import { AboutCta } from "@/components/about/about-cta";

export function AboutPageContent() {
  return (
    <main>
      <AboutHero />
      <WhoWeAre />
      <OurStory />
      <MissionVision />
      <OurValues />
      <WhyChoose />
      <Statistics />
      <OurTeam />
      <OurPartners />
      <Awards />
      <Reviews />
      <AboutCta />
    </main>
  );
}
