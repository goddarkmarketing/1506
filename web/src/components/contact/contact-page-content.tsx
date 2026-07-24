"use client";

import { ContactHero } from "./contact-hero";
import { ContactChannels } from "./contact-channels";
import { ContactForm } from "./contact-form";
import { ContactMap } from "./contact-map";

export function ContactPageContent() {
  return (
    <>
      <ContactHero />
      <section className="bg-[#F7F9FC] py-14 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12 lg:px-8">
          <ContactChannels />
          <ContactForm />
        </div>
      </section>
      <ContactMap />
    </>
  );
}
