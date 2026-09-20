"use client";

import { motion } from "framer-motion";
import { features } from "@/data/features";
import { EASE } from "./Experience";
import { Lines, SectionLabel } from "./Reveal";

/** Thin, architectural line icons — one per feature. */
const icons: Record<string, React.ReactNode> = {
  faculty: (
    <>
      <circle cx="20" cy="14" r="6" />
      <path d="M8 34c0-7 5-11 12-11s12 4 12 11" />
    </>
  ),
  structure: (
    <>
      <path d="M6 8h28M6 20h20M6 32h12" />
      <circle cx="32" cy="20" r="2" />
      <circle cx="24" cy="32" r="2" />
    </>
  ),
  mentorship: (
    <>
      <circle cx="14" cy="20" r="8" />
      <circle cx="26" cy="20" r="8" />
    </>
  ),
  assessment: (
    <>
      <path d="M6 32 14 22l7 5 13-15" />
      <path d="M28 12h6v6" />
    </>
  ),
};

const spans = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];

export function Features() {
  return (
    <section id="features" className="relative border-t border-line bg-surface py-28 md:py-44">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <SectionLabel index="02">Why AXORA GALAXY</SectionLabel>
        <Lines
          as="h2"
          className="mt-14 max-w-5xl text-[clamp(2.4rem,6.2vw,6.4rem)] font-semibold uppercase leading-[0.96] tracking-[-0.045em]"
          lines={["Preparation built", "around your goal."]}
        />

        <div className="mt-20 grid gap-4 md:grid-cols-12 md:gap-5">
          {features.map((f, i) => (
            <motion.article
              key={f.id}
              data-cursor="card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 1, ease: EASE, delay: (i % 2) * 0.12 }}
              className={`group relative flex min-h-[300px] flex-col justify-between border border-line bg-bg p-7 transition-[transform,border-color,background-color] duration-500 ease-out hover:-translate-y-1.5 hover:border-accent hover:bg-[#0d0d0e] md:min-h-[360px] md:p-10 ${spans[i]}`}
            >
              <div className="flex items-start justify-between">
                <span className="text-[11px] font-semibold tracking-[0.24em] text-mute">
                  0{i + 1}
                </span>
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 40 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  className="text-fg/60 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent-hi"
                  aria-hidden="true"
                >
                  {icons[f.id]}
                </svg>
              </div>
              <div>
                <h3 className="text-[clamp(1.6rem,2.8vw,2.6rem)] font-semibold uppercase leading-[1] tracking-[-0.035em]">
                  {f.title}
                </h3>
                <p className="mt-5 max-w-md leading-[1.7] text-mute">{f.body}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
