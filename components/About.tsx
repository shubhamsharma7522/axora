"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Fade, Lines, SectionLabel } from "./Reveal";

/** Cropped, parallaxing wire-geometry "A" — an architectural brand mark, not an illustration. */
function AxoraGeometry() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);
  const rot = useTransform(scrollYProgress, [0, 1], [-6, 6]);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-full overflow-hidden md:w-[46%]">
      <motion.svg
        style={{ y, rotate: rot }}
        viewBox="0 0 600 700"
        fill="none"
        className="absolute -right-[28%] top-[6%] h-[120%] w-[120%] md:-right-[22%] md:w-[110%]"
      >
        <g stroke="rgba(255,255,255,0.13)" strokeWidth="1">
          <path d="M60 660 300 40l240 620" />
          <path d="M150 440h300" />
          <path d="M90 600 300 90l210 510" />
          <path d="M120 520 300 140l180 380" />
          <path d="M300 40v620M60 660h480" />
          <circle cx="300" cy="380" r="240" />
          <circle cx="300" cy="380" r="150" />
        </g>
        <ellipse cx="300" cy="400" rx="330" ry="100" transform="rotate(-24 300 400)" stroke="#1557D6" strokeOpacity="0.8" />
        <circle cx="573" cy="271" r="5" fill="#4D84F2" />
        <circle cx="300" cy="40" r="4" fill="#F5F5F5" fillOpacity="0.7" />
      </motion.svg>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative overflow-hidden border-t border-line py-28 md:py-44">
      <AxoraGeometry />
      <div className="relative mx-auto max-w-[1600px] px-6 md:px-12">
        <SectionLabel index="01">About AXORA GALAXY</SectionLabel>

        <div className="mt-14 grid gap-16 md:grid-cols-12 md:gap-8">
          <Lines
            as="h2"
            className="text-[clamp(2.4rem,6.2vw,6.4rem)] font-semibold uppercase leading-[0.96] tracking-[-0.045em] md:col-span-9"
            lines={[
              "More than coaching.",
              "We’re building",
              <span key="b" className="font-serif text-[1.08em] font-normal normal-case italic tracking-[-0.02em] text-accent-hi">
                future doctors.
              </span>,
            ]}
          />

          <div className="space-y-6 md:col-span-4 md:col-start-6 md:mt-10">
            <Fade delay={0.1}>
              <p className="text-[17px] leading-[1.7] text-fg/90 md:text-lg">
                AXORA GALAXY is a NEET preparation brand built around one belief: every aspiring doctor deserves
                clear direction and someone invested in their progress.
              </p>
            </Fade>
            <Fade delay={0.2}>
              <p className="leading-[1.8] text-mute">
                We combine focused teaching, a structured plan and personal mentorship, so preparation feels
                purposeful from the first chapter to the final exam.
              </p>
            </Fade>
            <Fade delay={0.3}>
              <p className="pt-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-mute">
                Learn today. Heal tomorrow.
              </p>
            </Fade>
          </div>
        </div>
      </div>
    </section>
  );
}
