"use client";

import { Fade, Lines } from "./Reveal";
import { Arrow } from "./Icons";
import { whatsappLink } from "@/lib/whatsapp";

export function WhatsAppCTA() {
  return (
    <section className="relative overflow-hidden bg-accent py-28 md:py-44">
      <svg aria-hidden="true" viewBox="0 0 1200 600" fill="none" className="pointer-events-none absolute -right-[10%] top-1/2 w-[110%] -translate-y-1/2 opacity-40 md:w-[70%]">
        <g stroke="#050505" strokeOpacity="0.35">
          <circle cx="600" cy="300" r="120" />
          <circle cx="600" cy="300" r="210" />
          <circle cx="600" cy="300" r="300" />
          <ellipse cx="600" cy="300" rx="560" ry="150" transform="rotate(-18 600 300)" />
        </g>
      </svg>

      <div className="relative mx-auto max-w-[1600px] px-6 md:px-12">
        <Lines
          as="h2"
          className="text-[clamp(2.6rem,7.4vw,7.6rem)] font-semibold uppercase leading-[0.94] tracking-[-0.05em] text-white"
          lines={["Ready to begin", "your NEET journey?"]}
        />
        <div className="mt-14 flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <Fade delay={0.2}>
            <p className="max-w-md text-lg leading-relaxed text-white/80">
              Talk directly with AXORA GALAXY and take the first step toward your medical goals.
            </p>
          </Fade>
          <Fade delay={0.3}>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="cta"
              className="group inline-flex items-center gap-4 bg-bg px-9 py-5 text-[13px] font-semibold uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-white hover:text-bg"
            >
              WhatsApp us
              <Arrow className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>
          </Fade>
        </div>
      </div>
    </section>
  );
}
