import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturesSection } from "@/components/home/features-section";
import { CoursesSection } from "@/components/home/courses-section";
import { AboutSection } from "@/components/home/about-section";
import { AdmissionsSection } from "@/components/home/admissions-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Suspense fallback={<div className="flex items-center justify-center w-full h-16"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
        <Header />
      </Suspense>
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <CoursesSection />
        <AboutSection />
        <AdmissionsSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}
