import type { Metadata, Viewport } from "next";
import { Manrope, Instrument_Serif } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
  variable: "--font-instrument",
  display: "swap",
});

const title = "AXORA GALAXY | NEET Coaching & Preparation";
const description =
  "AXORA GALAXY provides focused NEET preparation with structured learning, expert guidance and personal mentorship.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title,
  description,
  applicationName: "AXORA GALAXY",
  keywords: ["NEET coaching", "NEET preparation", "medical entrance", "AXORA GALAXY"],
  openGraph: {
    title,
    description,
    siteName: "AXORA GALAXY",
    type: "website",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
