import React, { useState } from "react";
import { Navigation } from "./components/navigation";
import { FeaturesBanner } from "./components/features-banner.tsx";
import { HeroSection } from "./components/hero-section";
import { AboutSection } from "./components/about-section";
import { ProgramsSection } from "./components/programs-section";
import { WhyChooseSection } from "./components/why-choose-section";
import { TestimonialsSection } from "./components/testimonials-section";
import { ContactSection } from "./components/contact-section";
import { CTASection } from "./components/cta-section";
import { Footer } from "./components/footer";
import { CodingProgramPage } from "./components/coding-program-page";
import { MathProgramPage } from "./components/math-program-page";
import { AbacusProgramPage } from "./components/abacus-program-page";
import { UXUIDesignProgramPage } from "./components/uxui-program-page";
import { ContactPage } from "./components/contact-page";
import { Button } from "./components/ui/button";
import { ArrowLeft } from "lucide-react";

type Page = "home" | "coding" | "math" | "abacus" | "uxui" | "contact";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToPage = (page: Page) => {
    setCurrentPage(page);
    scrollToTop();
  };

  if (currentPage === "coding") {
    return (
      <div className="min-h-screen bg-white">
        <Navigation onNavigate={navigateToPage} />
        <div className="pt-20">
          <div className="container mx-auto px-4 py-4">
            <Button
              variant="ghost"
              onClick={() => navigateToPage("home")}
              className="flex items-center gap-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </div>
          <CodingProgramPage onNavigate={navigateToPage} />
        </div>
        <Footer />
      </div>
    );
  }

  if (currentPage === "math") {
    return (
      <div className="min-h-screen bg-white">
        <Navigation onNavigate={navigateToPage} />
        <div className="pt-20">
          <div className="container mx-auto px-4 py-4">
            <Button
              variant="ghost"
              onClick={() => navigateToPage("home")}
              className="flex items-center gap-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </div>
          <MathProgramPage onNavigate={navigateToPage} />
        </div>
        <Footer />
      </div>
    );
  }

  if (currentPage === "abacus") {
    return (
      <div className="min-h-screen bg-white">
        <Navigation onNavigate={navigateToPage} />
        <div className="pt-20">
          <div className="container mx-auto px-4 py-4">
            <Button
              variant="ghost"
              onClick={() => navigateToPage("home")}
              className="flex items-center gap-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </div>
          <AbacusProgramPage onNavigate={navigateToPage} />
        </div>
        <Footer />
      </div>
    );
  }

  if (currentPage === "uxui") {
    return (
      <div className="min-h-screen bg-white">
        <Navigation onNavigate={navigateToPage} />
        <div className="pt-20">
          <div className="container mx-auto px-4 py-4">
            <Button
              variant="ghost"
              onClick={() => navigateToPage("home")}
              className="flex items-center gap-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </div>
          <UXUIDesignProgramPage onNavigate={navigateToPage} />
        </div>
        <Footer />
      </div>
    );
  }

  if (currentPage === "contact") {
    return (
      <div className="min-h-screen bg-white">
        <Navigation onNavigate={navigateToPage} />
        <ContactPage />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation onNavigate={navigateToPage} />
      <FeaturesBanner />
      <main className="space-y-16">
        <HeroSection onNavigate={navigateToPage} />
        <section id="about">
          <AboutSection onNavigate={navigateToPage} />
        </section>
        <section id="programs">
          <ProgramsSection onNavigate={navigateToPage} />
        </section>
        <section id="why-choose">
          <WhyChooseSection />
        </section>
        <TestimonialsSection />
        <CTASection onNavigate={navigateToPage} />
      </main>
      <Footer />
    </div>
  );
}
