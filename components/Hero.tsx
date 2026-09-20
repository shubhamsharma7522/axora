"use client";

import { motion } from "framer-motion";
import { EASE, useIntro } from "./Experience";
import { Fade, Lines } from "./Reveal";
import { HeroScene } from "./HeroScene";
import { Arrow } from "./Icons";
import { whatsappLink } from "@/lib/whatsapp";

const labels = [
  { text: "Expert Guidance", pos: "right-[6%] top-[22%]", side: "right" },
  { text: "Focused Preparation", pos: "right-[2%] top-[54%]", side: "right" },
  { text: "Personal Mentorship", pos: "right-[26%] bottom-[14%]", side: "right" },
];

export function Hero() {
  const { ready } = useIntro();

  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* 3D stage — extends past the viewport edge on desktop, sits behind the type on mobile */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-4%] left-1/2 h-[58svh] w-[130vw] -translate-x-1/2 lg:bottom-auto lg:left-auto lg:right-[-14vw] lg:top-1/2 lg:h-[112svh] lg:w-[72vw] lg:-translate-y-1/2 lg:translate-x-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 2, ease: EASE, delay: 1.4 }}
      >
        <HeroScene active={ready} />
      </motion.div>

      {/* vignette to keep type legible + blend edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,#050505_0%,rgba(5,5,5,0)_22%),linear-gradient(0deg,rgba(5,5,5,0.25),rgba(5,5,5,0.25))] lg:bg-[linear-gradient(0deg,#050505_0%,rgba(5,5,5,0)_22%),linear-gradient(90deg,#050505_0%,rgba(5,5,5,0.85)_28%,rgba(5,5,5,0)_60%)]"
      />

      {/* minimal orbit labels (desktop) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
        {labels.map((l, i) => (
          <Fade key={l.text} hero delay={2 + i * 0.15} y={8} className={`absolute ${l.pos}`}>
            <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.26em] text-mute">
              <span className="h-px w-8 bg-white/25" />
              {l.text}
            </div>
          </Fade>
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-24 pt-32 md:px-12 lg:pb-20">
        <Fade hero delay={0.1} y={12}>
          <p className="mb-8 max-w-[22rem] text-[10px] font-semibold uppercase leading-relaxed tracking-[0.26em] text-mute sm:max-w-none sm:text-[11px]">
            <span className="text-accent-hi">●</span>&nbsp; NEET Preparation <span className="mx-1 text-white/30">•</span>
            <span className="block sm:inline">Future Medical Professionals</span>
          </p>
        </Fade>

        <Lines
          as="h1"
          hero
          delay={0.25}
          className="text-[clamp(3rem,8.6vw,9rem)] font-semibold uppercase leading-[0.92] tracking-[-0.05em]"
          lines={[
            "Turn your",
            <span key="d" className="text-accent-hi">
              NEET dream
            </span>,
            "into reality.",
          ]}
        />

        <Fade hero delay={0.9} className="mt-10 max-w-[30rem]">
          <p className="text-[15px] leading-relaxed text-mute md:text-base">
            Expert guidance, focused preparation, and personal mentorship for students working toward their
            medical dreams.
          </p>
        </Fade>

        <Fade hero delay={1.05} className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="cta"
            className="group inline-flex items-center gap-3 bg-accent px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-[#1a66f5]"
          >
            Chat on WhatsApp
            <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#about"
            data-cursor="cta"
            className="group inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-fg/80 transition-colors hover:text-fg"
          >
            Explore AXORA GALAXY
            <Arrow down className="transition-transform duration-300 group-hover:translate-y-1" />
          </a>
        </Fade>
      </div>
    </section>
  );
}
