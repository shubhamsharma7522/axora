"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { EASE } from "./Experience";
import { Lines, SectionLabel } from "./Reveal";

const steps = [
  { n: "01", title: "Understand", body: "Build conceptual foundations." },
  { n: "02", title: "Prepare", body: "Follow a structured preparation strategy." },
  { n: "03", title: "Practice", body: "Strengthen performance through consistent practice." },
  { n: "04", title: "Progress", body: "Identify gaps and improve." },
];

function Heading() {
  return (
    <>
      <SectionLabel index="03">Our Approach</SectionLabel>
      <Lines
        as="h2"
        className="mt-10 text-[clamp(2.4rem,6.2vw,6.4rem)] font-semibold uppercase leading-[0.96] tracking-[-0.045em]"
        lines={["From preparation", "to progress."]}
      />
    </>
  );
}

/** Desktop: pinned, horizontal timeline driven by scroll progress. */
function DesktopTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(useTransform(scrollYProgress, [0.05, 0.88], [0, 1]), {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(3, Math.max(0, Math.floor((v - 0.02) / 0.235)));
    setActive((p) => (p === i ? p : i));
  });
  const shift = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div ref={ref} className="relative hidden h-[340vh] md:block">
      <div className="sticky top-0 flex h-screen flex-col justify-between overflow-hidden py-28">
        <div className="mx-auto w-full max-w-[1600px] px-12">
          <Heading />
        </div>

        {/* oversized numeral, transitions with scroll */}
        <motion.div
          style={{ x: shift }}
          aria-hidden="true"
          className="pointer-events-none absolute top-[14%] right-[2%] select-none overflow-hidden text-[26vw] font-semibold leading-none tracking-[-0.06em]"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={active}
              className="stroke-text block"
              initial={{ y: "60%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-60%", opacity: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              {steps[active].n}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        <div className="relative mx-auto w-full max-w-[1600px] px-12">
          <div className="relative mb-10 h-px w-full bg-white/10">
            <motion.div style={{ scaleX: progress }} className="absolute inset-0 origin-left bg-accent" />
          </div>
          <ol className="grid grid-cols-4 gap-8">
            {steps.map((s, i) => {
              const on = i <= active;
              return (
                <li key={s.n} className="relative">
                  <span
                    className={`absolute -top-[46px] left-0 h-2.5 w-2.5 rounded-full border transition-colors duration-700 ${
                      on ? "border-accent bg-accent" : "border-white/30 bg-bg"
                    }`}
                  />
                  <p className={`text-[11px] font-semibold tracking-[0.26em] transition-colors duration-700 ${on ? "text-accent-hi" : "text-mute"}`}>
                    {s.n}
                  </p>
                  <h3
                    className={`mt-4 text-[clamp(1.8rem,3vw,3rem)] font-semibold uppercase leading-none tracking-[-0.04em] transition-all duration-700 ${
                      on ? "translate-y-0 text-fg" : "translate-y-1 text-white/25"
                    }`}
                  >
                    {s.title}
                  </h3>
                  <p className={`mt-4 max-w-[16rem] leading-[1.7] transition-colors duration-700 ${on ? "text-mute" : "text-white/20"}`}>
                    {s.body}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}

/** Mobile: vertical timeline whose line grows as it scrolls into view. */
function MobileTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <div className="px-6 py-28 md:hidden">
      <Heading />
      <ol ref={ref} className="relative mt-14 pl-8">
        <span className="absolute bottom-0 left-[3px] top-1 w-px bg-white/10" />
        <motion.span style={{ scaleY: line }} className="absolute bottom-0 left-[3px] top-1 w-px origin-top bg-accent" />
        {steps.map((s) => (
          <motion.li
            key={s.n}
            className="relative pb-14 last:pb-0"
            initial={{ opacity: 0.25 }}
            whileInView={{ opacity: 1 }}
            viewport={{ margin: "-25% 0px -35% 0px" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <span className="absolute -left-8 top-1.5 h-2 w-2 rounded-full bg-accent" />
            <p className="text-[11px] font-semibold tracking-[0.26em] text-accent-hi">{s.n}</p>
            <h3 className="mt-3 text-[2.4rem] font-semibold uppercase leading-none tracking-[-0.04em]">{s.title}</h3>
            <p className="mt-3 leading-[1.7] text-mute">{s.body}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

export function Approach() {
  return (
    <section id="approach" className="relative border-t border-line">
      <DesktopTimeline />
      <MobileTimeline />
    </section>
  );
}
