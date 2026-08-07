"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";

export default function ProposalPage() {
  const [sentHint, setSentHint] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const lines = [
      "Request a Proposal",
      "",
      "Company: " + (data.get("company") || ""),
      "Contact: " + (data.get("name") || ""),
      "Email: " + (data.get("email") || ""),
      "Phone: " + (data.get("phone") || ""),
      "Service: " + (data.get("service") || ""),
      "Group Size: " + (data.get("group_size") || ""),
      "Dates: " + (data.get("dates") || ""),
      "Destination: " + (data.get("destination") || ""),
      "Details: " + (data.get("message") || ""),
    ];
    const subject = encodeURIComponent(
      "Proposal Request — " + (data.get("service") || "B2B")
    );
    const body = encodeURIComponent(lines.join("\n"));
    setSentHint(true);
    window.location.href =
      "mailto:partners@dgholidaythailand.com?subject=" + subject + "&body=" + body;
  }

  return (
    <>
      <SiteHeader active="proposal" />
      <main className="bg-[#F7F9FC]">
        <section className="bg-[#0B2E59] px-5 pb-14 pt-20 text-white lg:px-8 lg:pt-24">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#FFC48A]">
              B2B Partnership
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Request a Proposal
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/85">
              Tell us about your travel, MICE, event, India-market, or wedding program.
              Our partner desk replies within one business day.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-5 py-10 lg:px-8 lg:py-14">
          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0_14px_36px_rgba(11,46,89,0.08)] lg:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm font-semibold text-[#1C2127]">
                Company / Agency
                <input
                  name="company"
                  required
                  className="h-11 rounded-xl border border-[#D7DEE8] px-3 font-normal outline-none focus:border-[#FF7A1A] focus:ring-2 focus:ring-[#FF7A1A]/20"
                  placeholder="Agency or company name"
                />
              </label>
              <label className="grid gap-1.5 text-sm font-semibold text-[#1C2127]">
                Contact Name
                <input
                  name="name"
                  required
                  className="h-11 rounded-xl border border-[#D7DEE8] px-3 font-normal outline-none focus:border-[#FF7A1A] focus:ring-2 focus:ring-[#FF7A1A]/20"
                  placeholder="Full name"
                />
              </label>
              <label className="grid gap-1.5 text-sm font-semibold text-[#1C2127]">
                Work Email
                <input
                  type="email"
                  name="email"
                  required
                  className="h-11 rounded-xl border border-[#D7DEE8] px-3 font-normal outline-none focus:border-[#FF7A1A] focus:ring-2 focus:ring-[#FF7A1A]/20"
                  placeholder="name@company.com"
                />
              </label>
              <label className="grid gap-1.5 text-sm font-semibold text-[#1C2127]">
                Phone / WhatsApp
                <input
                  name="phone"
                  className="h-11 rounded-xl border border-[#D7DEE8] px-3 font-normal outline-none focus:border-[#FF7A1A] focus:ring-2 focus:ring-[#FF7A1A]/20"
                  placeholder="+66 XX XXX XXXX"
                />
              </label>
              <label className="grid gap-1.5 text-sm font-semibold text-[#1C2127]">
                Service Interest
                <select
                  name="service"
                  required
                  className="h-11 rounded-xl border border-[#D7DEE8] px-3 font-normal outline-none focus:border-[#FF7A1A] focus:ring-2 focus:ring-[#FF7A1A]/20"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  <option>Travel Services</option>
                  <option>MICE & Corporate</option>
                  <option>Event Management</option>
                  <option>India Market</option>
                  <option>Destination Weddings</option>
                  <option>Other</option>
                </select>
              </label>
              <label className="grid gap-1.5 text-sm font-semibold text-[#1C2127]">
                Estimated Group Size
                <input
                  name="group_size"
                  className="h-11 rounded-xl border border-[#D7DEE8] px-3 font-normal outline-none focus:border-[#FF7A1A] focus:ring-2 focus:ring-[#FF7A1A]/20"
                  placeholder="e.g. 40 pax"
                />
              </label>
              <label className="grid gap-1.5 text-sm font-semibold text-[#1C2127]">
                Travel / Event Dates
                <input
                  name="dates"
                  className="h-11 rounded-xl border border-[#D7DEE8] px-3 font-normal outline-none focus:border-[#FF7A1A] focus:ring-2 focus:ring-[#FF7A1A]/20"
                  placeholder="e.g. Oct 2026"
                />
              </label>
              <label className="grid gap-1.5 text-sm font-semibold text-[#1C2127]">
                Destination
                <input
                  name="destination"
                  className="h-11 rounded-xl border border-[#D7DEE8] px-3 font-normal outline-none focus:border-[#FF7A1A] focus:ring-2 focus:ring-[#FF7A1A]/20"
                  placeholder="e.g. Bangkok, Phuket"
                />
              </label>
            </div>
            <label className="mt-4 grid gap-1.5 text-sm font-semibold text-[#1C2127]">
              Project Details
              <textarea
                name="message"
                required
                rows={5}
                className="rounded-xl border border-[#D7DEE8] px-3 py-3 font-normal outline-none focus:border-[#FF7A1A] focus:ring-2 focus:ring-[#FF7A1A]/20"
                placeholder="Goals, budget range, and any special requirements"
              />
            </label>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                className="inline-flex h-11 items-center rounded-full bg-[#FF7A1A] px-6 text-sm font-bold text-white"
              >
                Send Inquiry →
              </button>
              <Link href="/contact" className="text-sm font-semibold text-[#0B2E59] hover:underline">
                Or contact us directly
              </Link>
            </div>
            {sentHint && (
              <p className="mt-4 text-sm text-[#5B656B]">
                Opening your email client… If nothing opens, email{" "}
                <a
                  className="font-semibold text-[#D94A0C] underline"
                  href="mailto:partners@dgholidaythailand.com"
                >
                  partners@dgholidaythailand.com
                </a>
                .
              </p>
            )}
          </form>
        </section>
      </main>
    </>
  );
}
