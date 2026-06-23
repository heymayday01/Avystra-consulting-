import React, { useState, useEffect, lazy, Suspense } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ScrollProgress from "./components/ScrollProgress";
import AmbientCanvasBackground from "./components/AmbientCanvasBackground";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { motion } from "motion/react";

// PERFORMANCE: Lazy load heavy components below the fold with Suspense to optimize interactive times (LCP & TBT)
const BentoGrid = lazy(() => import("./components/BentoGrid"));
const Flowchart = lazy(() => import("./components/Flowchart"));
const FourPillars = lazy(() => import("./components/FourPillars"));
const StatsFounder = lazy(() => import("./components/StatsFounder"));
const ProgramsSection = lazy(() => import("./components/ProgramsSection"));
const TestimonialsSection = lazy(() => import("./components/TestimonialsSection"));
const FAQSection = lazy(() => import("./components/FAQSection"));
const OGIDiagnostic = lazy(() => import("./components/OGIDiagnostic"));
const Footer = lazy(() => import("./components/Footer"));

export default function App() {
  const [leadCount, setLeadCount] = useState(0);

  // Quietly audit completed diagnostics in background to show in diagnostic counter
  useEffect(() => {
    const fetchLeadCount = async () => {
      try {
        const response = await fetch("/api/leads/list");
        if (response.ok) {
          const list = await response.json();
          setLeadCount(list.length);
        }
      } catch (e) {
        // Quietly fail, normal in development
      }
    };
    fetchLeadCount();
  }, []);

  // Set up smooth scrolling and synchronize with GSAP ScrollTrigger
  useSmoothScroll();

  return (
    <div className="relative min-h-[100dvh] bg-transparent text-[#0A192F] selection:bg-gold/20 selection:text-gold font-sans antialiased">
      {/* Global Ambient Cinematic Flow Background */}
      <AmbientCanvasBackground variant="hero" opacity={1} />
      <div className="fixed inset-0 z-[-1] grid-overlay opacity-[0.03] pointer-events-none" />

      {/* Premium custom interactions & indicators */}
      <ScrollProgress />

      {/* Premium Sticky Navigation Bar */}
      <Header />

      {/* Hero Block Container */}
      <main className="relative z-10 pb-4">
        {/* Intro Hero with gold back-glowing radial gradients */}
        <Hero />

        {/* Section Divider with thin brass gradient line */}
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 0.3, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent origin-center mt-4 mb-8" 
        />

        <Suspense fallback={<div className="min-h-[50vh] w-full" />}>
          {/* Bento Grid layout analyzing bottlenecks */}
          <BentoGrid />

          {/* Interactive systems flowchart timeline */}
          <div className="pb-8">
            <Flowchart />
          </div>

          {/* Four Pillars alignment methodology */}
          <FourPillars />

          {/* Operational Diagnostics statistics & Founder's Profile Grid */}
          <StatsFounder />

          {/* Bespoke operational capability training programs */}
          <ProgramsSection />

          {/* Client Success Stories */}
          <TestimonialsSection />

          {/* Frequently Asked Questions */}
          <div className="py-12 mt-12">
            <FAQSection />
          </div>

          {/* OGI Growth Index Diagnostic assessment portal */}
          <div className="mt-12 py-16 relative z-20">
            <OGIDiagnostic />
          </div>
        </Suspense>
      </main>

      {/* Redesigned High-End Aesthetic Footer */}
      <Suspense fallback={<div className="h-[200px] w-full bg-[#0A192F]" />}>
        <Footer leadCount={leadCount} />
      </Suspense>
    </div>
  );
}
