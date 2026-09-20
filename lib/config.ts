/**
 * Single source of truth for all client contact information.
 * Leave a field empty ("") until the client supplies the real value —
 * empty fields are hidden from the UI automatically.
 *
 * whatsappNumber: digits only, with country code, e.g. "919876543210".
 * While empty, WhatsApp buttons open WhatsApp with the message pre-filled
 * so the visitor can pick the chat.
 */
export const SITE_CONFIG = {
  name: "AXORA GALAXY",
  tagline: "LEARN TODAY. HEAL TOMORROW.",
  whatsappNumber: "",
  whatsappMessage:
    "Hi AXORA GALAXY, I would like to know more about your NEET coaching programs.",
  phone: "",
  email: "",
  location: "",
  instagram: "",
  youtube: "",
  facebook: "",
};

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Approach", href: "#approach" },
  { label: "Results", href: "#results" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];
