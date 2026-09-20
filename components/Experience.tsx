"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, MotionConfig, motion } from "framer-motion";
import { Logo } from "./Logo";
import { SITE_CONFIG } from "@/lib/config";

const IntroContext = createContext({ ready: false });
export const useIntro = () => useContext(IntroContext);

export const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Orchestrates the cinematic opening: black screen → logo → tagline →
 * logo travels into the navbar → hero reveals. Skipped for reduced motion.
 */
export function Experience({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setReady(true);
      return;
    }
    const t = setTimeout(() => setReady(true), 2700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = ready ? "" : "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [ready]);

  return (
    <MotionConfig reducedMotion="user">
      <IntroContext.Provider value={{ ready }}>
        <LayoutGroup>
          {children}
          <AnimatePresence>
            {!ready && (
              <motion.div
                key="intro"
                className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
                exit={{ opacity: 0, transition: { duration: 0.9, ease: EASE, delay: 0.15 } }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
                >
                  <motion.div layoutId="brand-logo" transition={{ duration: 1.1, ease: EASE }}>
                    <Logo size={44} />
                  </motion.div>
                </motion.div>
                <motion.p
                  className="mt-7 text-[10px] font-medium uppercase tracking-[0.42em] text-mute sm:text-[11px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.4 } }}
                  transition={{ duration: 1, ease: EASE, delay: 1.2 }}
                >
                  {SITE_CONFIG.tagline}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </IntroContext.Provider>
    </MotionConfig>
  );
}
