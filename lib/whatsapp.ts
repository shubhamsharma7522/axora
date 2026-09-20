import { SITE_CONFIG } from "./config";

export function whatsappLink(message: string = SITE_CONFIG.whatsappMessage) {
  const number = SITE_CONFIG.whatsappNumber.replace(/\D/g, "");
  const text = encodeURIComponent(message);
  return number
    ? `https://wa.me/${number}?text=${text}`
    : `https://wa.me/?text=${text}`;
}

export function enquiryMessage(name: string, phone: string, message: string) {
  const lines = [
    "Hi AXORA GALAXY,",
    `My name is ${name.trim()}.`,
    `My phone number is ${phone.trim()}.`,
    message.trim() || "I would like to know more about NEET coaching.",
  ];
  return lines.join("\n");
}
