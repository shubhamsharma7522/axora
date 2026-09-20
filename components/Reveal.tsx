"use client";

import { motion } from "framer-motion";
import { EASE, useIntro } from "./Experience";

type Common = { delay?: number; className?: string; hero?: boolean };

/** Masked line-by-line headline reveal. `hero` waits for the intro; otherwise triggers in view. */
export function Lines({
  lines,
  delay = 0,
  className = "",
  hero = false,
  as: Tag = "div",
}: Common & { lines: React.ReactNode[]; as?: "div" | "h1" | "h2" | "h3" }) {
  const { ready } = useIntro();
  const M = motion[Tag];
  const trigger = hero
    ? { animate: ready ? "show" : "hide" }
    : { whileInView: "show", viewport: { once: true, margin: "-12% 0px" } };
  return (
    <M className={className} initial="hide" {...trigger}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className="block will-change-transform"
            variants={{
              hide: { y: "110%" },
              show: { y: "0%", transition: { duration: 1.1, ease: EASE, delay: delay + i * 0.12 } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </M>
  );
}

/** Simple fade + rise. */
export function Fade({
  children,
  delay = 0,
  className = "",
  hero = false,
  y = 24,
}: Common & { children: React.ReactNode; y?: number }) {
  const { ready } = useIntro();
  const trigger = hero
    ? { animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y } }
    : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-10% 0px" } };
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      {...trigger}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <Fade className="flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-mute">
      <span className="text-accent-hi">{index}</span>
      <span className="h-px w-10 bg-line" style={{ background: "rgba(255,255,255,0.18)" }} />
      <span>{children}</span>
    </Fade>
  );
}
