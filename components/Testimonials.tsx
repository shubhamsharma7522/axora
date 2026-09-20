"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/data/testimonials";
import { EASE } from "./Experience";
import { Lines, SectionLabel } from "./Reveal";

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-1 text-fg/50" role="img" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="m12 2 3 7 7 .6-5.3 4.7 1.7 7.2L12 17.8 5.6 21.5l1.7-7.2L2 9.6 9 9z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="relative border-t border-line bg-surface py-28 md:py-44">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <SectionLabel index="05">Student Stories</SectionLabel>
        <Lines
          as="h2"
          className="mt-14 text-[clamp(2.4rem,6.2vw,6.4rem)] font-semibold uppercase leading-[0.96] tracking-[-0.045em]"
          lines={["The journey", "that matters."]}
        />

        <div className="mt-20 grid items-start gap-4 md:grid-cols-3 md:gap-5">
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              data-cursor="card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 1, ease: EASE, delay: i * 0.12 }}
              className={`group flex min-h-[380px] flex-col justify-between border border-line bg-bg p-8 transition-[border-color,transform] duration-500 hover:-translate-y-1.5 hover:border-accent md:p-10 ${
                i === 1 ? "md:mt-16" : i === 2 ? "md:mt-32" : ""
              }`}
            >
              <div>
                <span className="block font-serif text-7xl leading-none text-accent-hi" aria-hidden="true">
                  &ldquo;
                </span>
                <blockquote className={`mt-2 font-serif text-[1.7rem] leading-[1.25] ${t.placeholder ? "text-fg/50" : "text-fg"}`}>
                  {t.quote}
                </blockquote>
              </div>
              <figcaption className="mt-10 flex items-end justify-between gap-4 border-t border-line pt-5">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.12em]">{t.name}</p>
                  <p className="mt-1 text-[12px] uppercase tracking-[0.16em] text-mute">{t.meta}</p>
                </div>
                {t.rating ? <Stars n={t.rating} /> : null}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
