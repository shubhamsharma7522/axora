"use client";

import { useState } from "react";
import { Fade, Lines, SectionLabel } from "./Reveal";
import { Arrow } from "./Icons";
import { SITE_CONFIG } from "@/lib/config";
import { enquiryMessage, whatsappLink } from "@/lib/whatsapp";

const field =
  "w-full border-0 border-b border-white/15 bg-transparent py-4 text-base text-fg placeholder:text-white/30 transition-colors duration-300 focus:border-accent-hi focus:outline-none";

export function Contact() {
  const [error, setError] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const name = String(d.get("name") ?? "");
    const phone = String(d.get("phone") ?? "");
    const message = String(d.get("message") ?? "");
    if (!name.trim() || phone.replace(/\D/g, "").length < 7) {
      setError("Please enter your name and a valid phone number.");
      return;
    }
    setError("");
    window.open(whatsappLink(enquiryMessage(name, phone, message)), "_blank", "noopener,noreferrer");
  }

  const details = [
    { label: "Phone", value: SITE_CONFIG.phone, href: `tel:${SITE_CONFIG.phone}` },
    { label: "Email", value: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
    { label: "Location", value: SITE_CONFIG.location, href: "" },
  ].filter((d) => d.value);

  return (
    <section id="contact" className="relative border-t border-line py-28 md:py-44">
      <div className="mx-auto grid max-w-[1600px] gap-20 px-6 md:grid-cols-12 md:gap-8 md:px-12">
        <div className="md:col-span-6">
          <SectionLabel index="06">Contact</SectionLabel>
          <Lines
            as="h2"
            className="mt-14 text-[clamp(2.4rem,4.8vw,5rem)] font-semibold uppercase leading-[0.96] tracking-[-0.045em]"
            lines={["Let’s start", "the conversation."]}
          />
          <Fade delay={0.2} className="mt-12 space-y-8">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="cta"
              className="group inline-flex items-center gap-3 border-b border-accent pb-2 text-[13px] font-semibold uppercase tracking-[0.16em] transition-colors hover:text-accent-hi"
            >
              Chat on WhatsApp
              <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            {details.length > 0 && (
              <dl className="space-y-5">
                {details.map((d) => (
                  <div key={d.label} className="border-t border-line pt-4">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.24em] text-mute">{d.label}</dt>
                    <dd className="mt-1.5 text-lg">
                      {d.href ? <a href={d.href} className="hover:text-accent-hi">{d.value}</a> : d.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </Fade>
        </div>

        <Fade delay={0.15} className="md:col-span-5 md:col-start-8 md:pt-24">
          <form onSubmit={onSubmit} noValidate className="space-y-3">
            <label className="block">
              <span className="sr-only">Name</span>
              <input name="name" type="text" autoComplete="name" placeholder="Your name" className={field} />
            </label>
            <label className="block">
              <span className="sr-only">Phone</span>
              <input name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="Phone number" className={field} />
            </label>
            <label className="block">
              <span className="sr-only">Message</span>
              <textarea name="message" rows={3} placeholder="Message (optional)" className={`${field} resize-none`} />
            </label>
            <p role="alert" className="min-h-5 text-[13px] text-accent-hi">{error}</p>
            <button
              type="submit"
              data-cursor="cta"
              className="group inline-flex w-full items-center justify-between bg-accent px-7 py-5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-[#1a66f5] sm:w-auto sm:gap-10"
            >
              Send via WhatsApp
              <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </form>
        </Fade>
      </div>
    </section>
  );
}
