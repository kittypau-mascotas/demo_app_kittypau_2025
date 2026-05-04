import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import DashboardPreview from "@/components/landing/DashboardPreview";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import PlanesSection from "@/components/landing/PlanesSection";
import Footer from "@/components/landing/Footer";
import { useEffect } from "react";

export default function LandingPage() {
  // Smooth scroll para los enlaces de anclaje
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <DashboardPreview />
        <HowItWorksSection />
        <PlanesSection />
      </main>
      <Footer />
    </div>
  );
}