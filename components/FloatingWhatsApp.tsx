"use client";

import { motion } from "framer-motion";
import { EASE, useIntro } from "./Experience";
import { WhatsAppGlyph } from "./Icons";
import { whatsappLink } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  const { ready } = useIntro();
  return (
    <motion.a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with AXORA GALAXY on WhatsApp"
      data-cursor="cta"
      className="group fixed bottom-5 right-5 z-40 flex items-center md:bottom-8 md:right-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 16 }}
      transition={{ duration: 0.9, ease: EASE, delay: 1.6 }}
    >
      <span className="pointer-events-none mr-3 hidden translate-x-2 whitespace-nowrap border border-line bg-surface px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-fg opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block">
        Chat with us
      </span>
      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-surface/90 backdrop-blur transition-colors duration-300 group-hover:border-[#25D366]/60 md:h-14 md:w-14">
        <WhatsAppGlyph size={24} />
      </span>
    </motion.a>
  );
}
