"use client";

import { motion } from "framer-motion";
import { results, type Result } from "@/data/results";
import { EASE } from "./Experience";
import { Lines, SectionLabel } from "./Reveal";

function Portrait({ r }: { r: Result }) {
  if (r.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={r.image} alt={`${r.student}, NEET ${r.year}`} className="absolute inset-0 h-full w-full object-cover grayscale transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0" />;
  }
  // neutral silhouette placeholder until a real student photo is supplied
  return (
    <svg viewBox="0 0 400 500" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="ph" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#15161a" />
          <stop offset="1" stopColor="#0a0a0a" />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill="url(#ph)" />
      <circle cx="200" cy="190" r="62" fill="#1d1e23" />
      <path d="M60 500c0-100 60-160 140-160s140 60 140 160z" fill="#1d1e23" />
    </svg>
  );
}

const layout = ["md:col-span-6 md:row-span-2", "md:col-span-6 md:col-start-7", "md:col-span-6 md:col-start-7"];

export function Results() {
  return (
    <section id="results" className="relative border-t border-line py-28 md:py-44">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <SectionLabel index="04">Results</SectionLabel>
        <div className="mt-14 flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <Lines
            as="h2"
            className="text-[clamp(2.4rem,6.2vw,6.4rem)] font-semibold uppercase leading-[0.96] tracking-[-0.045em]"
            lines={["Dreams", "into medical careers."]}
          />
          <p className="max-w-xs text-sm leading-relaxed text-mute">
            Verified student achievements will be featured here as they are shared by AXORA GALAXY.
          </p>
        </div>

        <div className="mt-20 grid gap-4 md:auto-rows-[minmax(280px,1fr)] md:grid-cols-12 md:gap-5">
          {results.map((r, i) => (
            <motion.article
              key={i}
              data-cursor="card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 1, ease: EASE, delay: i * 0.1 }}
              className={`group relative min-h-[420px] overflow-hidden border border-line bg-card transition-colors duration-500 hover:border-accent ${layout[i] ?? "md:col-span-4"}`}
            >
              <Portrait r={r} />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent-hi">{r.year}</p>
                <h3 className="mt-3 text-[clamp(1.6rem,2.6vw,2.6rem)] font-semibold uppercase leading-none tracking-[-0.035em]">
                  {r.student}
                </h3>
                <div className="mt-5 flex items-center justify-between gap-4 border-t border-line pt-4 text-[12px] uppercase tracking-[0.16em] text-mute">
                  <span>{r.score}</span>
                  <span className="text-right">{r.college}</span>
                </div>
              </div>
              {r.placeholder && (
                <span className="absolute left-5 top-5 border border-line bg-bg/70 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.24em] text-mute backdrop-blur">
                  Result to be added
                </span>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
