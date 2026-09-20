import { Experience } from "@/components/Experience";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Features } from "@/components/Features";
import { Approach } from "@/components/Approach";
import { Results } from "@/components/Results";
import { Testimonials } from "@/components/Testimonials";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { CustomCursor } from "@/components/CustomCursor";

export default function Page() {
  return (
    <Experience>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Features />
        <Approach />
        <Results />
        <Testimonials />
        <WhatsAppCTA />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <CustomCursor />
    </Experience>
  );
}
