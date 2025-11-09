import React from "react";
import { Navigation } from "./components/navigation";
import { FeaturesBanner } from "./components/features-banner";
import { HeroSection } from "./components/hero-section";
import { AboutSection } from "./components/about-section";
import { ProgramsSection } from "./components/programs-section";
import { WhyChooseSection } from "./components/why-choose-section";
import { TestimonialsSection } from "./components/testimonials-section";
import { CTASection } from "./components/cta-section";
import { Footer } from "./components/footer";
import { ContactPage } from "./components/contact-page";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <FeaturesBanner />
      <main>
        <HeroSection />

        <section id="about">
          <AboutSection />
        </section>

        <section id="programs">
          <ProgramsSection />
        </section>

        <section id="why-choose">
          <WhyChooseSection />
        </section>

        <section id="contactsection">
          <ContactPage />
        </section>

        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
