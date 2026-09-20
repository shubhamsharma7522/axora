"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE, useIntro } from "./Experience";
import { Logo } from "./Logo";
import { Arrow } from "./Icons";
import { NAV_LINKS } from "@/lib/config";
import { whatsappLink } from "@/lib/whatsapp";

export function Navbar() {
  const { ready } = useIntro();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open, ready]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled || open
            ? "border-line bg-bg/75 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-6 md:px-12"
        >
          <a href="#home" aria-label="AXORA GALAXY home" className="relative z-[60]" onClick={() => setOpen(false)}>
            {ready ? (
              <motion.div layoutId="brand-logo" transition={{ duration: 1.1, ease: EASE }}>
                <Logo size={26} />
              </motion.div>
            ) : (
              <span className="block h-[26px]" />
            )}
          </a>

          <motion.ul
            className="hidden items-center gap-8 lg:flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.5 }}
          >
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-[12px] font-medium uppercase tracking-[0.16em] text-mute transition-colors duration-300 hover:text-fg"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>

          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.7 }}
          >
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="cta"
              className="group hidden items-center gap-2 border border-white/15 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-fg transition-colors duration-300 hover:border-accent hover:bg-accent md:inline-flex"
            >
              Enquire on WhatsApp
              <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="relative z-[60] flex h-10 w-10 items-center justify-center lg:hidden"
            >
              <span className="relative block h-3 w-6">
                <span className={`absolute left-0 h-px w-6 bg-fg transition-all duration-500 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-px w-6 bg-fg transition-all duration-500 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </motion.div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            className="fixed inset-0 z-[55] flex flex-col justify-between bg-bg px-6 pb-10 pt-28 lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <ul className="flex flex-col">
              {NAV_LINKS.map((l, i) => (
                <li key={l.href} className="overflow-hidden border-b border-line">
                  <motion.a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-4 text-[2rem] font-semibold uppercase tracking-[-0.03em]"
                    initial={{ y: "100%" }}
                    animate={{ y: 0, transition: { duration: 0.8, ease: EASE, delay: 0.25 + i * 0.05 } }}
                    exit={{ y: "100%", transition: { duration: 0.3 } }}
                  >
                    {l.label}
                    <span className="text-[11px] tracking-[0.2em] text-mute">0{i + 1}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-accent px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.16em]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.7, duration: 0.6 } }}
              exit={{ opacity: 0 }}
            >
              Enquire on WhatsApp <Arrow />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
