import { useState, useEffect, lazy, Suspense } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ScrollProgress from "./components/ScrollProgress";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import LoadingScreen from "./components/LoadingScreen";

// Realistic WhatsApp Icon Component
const WhatsAppIcon = ({ size = 56 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    style={{ display: "block" }}
  >
    <circle cx="12" cy="12" r="12" fill="#3ECA59" />
    <g transform="translate(2.4, 2.4) scale(0.8)">
      <path fill="none" stroke="#FFF" strokeWidth="2" strokeLinejoin="round" d="M12.012 2C6.483 2 2 6.483 2 12.012c0 1.76.452 3.42 1.258 4.88L2.12 21.88l5.12-1.34c1.41.748 3.003 1.168 4.693 1.168 5.529 0 10.012-4.483 10.012-10.012S17.541 2 12.012 2z"/>
      <path fill="#FFF" d="M17.433 14.882c-.274-.137-1.623-.8-1.874-.891-.251-.091-.434-.137-.617.137-.183.274-.708.891-.868 1.074-.16.183-.32.206-.594.068-.274-.137-1.157-.426-2.203-1.36-.814-.727-1.365-1.625-1.525-1.899-.16-.274-.017-.423.12-.56.124-.124.274-.32.411-.48.137-.16.183-.274.274-.457.091-.183.046-.343-.023-.48-.069-.137-.617-1.486-.845-2.034-.223-.537-.449-.464-.617-.472-.16-.009-.343-.009-.526-.009s-.48.069-.731.343c-.251.274-.96 .938-.96 2.287 0 1.349.983 2.654 1.12 2.837.137.183 1.934 2.952 4.681 4.137 2.062.89 2.748.96 3.753.801 1.005-.16 3.245-1.326 3.692-2.607.447-1.281.447-2.38.31-2.607-.137-.229-.503-.366-.777-.503z"/>
    </g>
  </svg>
);

// High-End Realistic WhatsApp Float Component
const WhatsAppFloat = ({ number = "918596059607" }: { number?: string }) => (
  <a
    href={`https://wa.me/${number}`}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      position: "fixed",
      bottom: "32px",
      right: "32px",
      zIndex: 9999,
      width: "56px",
      height: "56px",
      borderRadius: "50%",
      // no backgroundColor — icon has its own green circle
      boxShadow: "0 4px 24px rgba(37,211,102,0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "transform 0.2s ease",
      cursor: "pointer",
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; }}
    onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
    aria-label="Contact us on WhatsApp"
  >
    <WhatsAppIcon size={40} /> {/* 40px icon inside 56px container = 8px padding all around */}
  </a>
);

// PERFORMANCE: Lazy load heavy components below the fold with Suspense to optimize interactive times (LCP & TBT)
const FounderFrictionSimulator = lazy(() => import("./components/FounderFrictionSimulator"));
const CostSection = lazy(() => import("./components/CostSection"));
const WorkshopVsSystem = lazy(() => import("./components/WorkshopVsSystem"));
const Flowchart = lazy(() => import("./components/Flowchart"));
const FourPillars = lazy(() => import("./components/FourPillars"));
const StatsFounder = lazy(() => import("./components/StatsFounder"));
const ProgramsSection = lazy(() => import("./components/ProgramsSection"));
const TestimonialsSection = lazy(() => import("./components/TestimonialsSection"));
const FAQSection = lazy(() => import("./components/FAQSection"));
const OGIDiagnostic = lazy(() => import("./components/OGIDiagnostic"));
const Footer = lazy(() => import("./components/Footer"));

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Quietly audit completed diagnostics in background to show in diagnostic counter
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

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

  const handleScrollToConsult = () => {
    const element = document.getElementById("consult");
    if (element) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(element, { offset: -90, duration: 1.2 });
      } else {
        const offset = 90;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className="relative min-h-[100dvh] bg-cream-bg text-navy-deep selection:bg-gold/20 selection:text-gold font-sans antialiased">
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Global Ambient Cinematic Flow Background */}

          {/* Top Banner (Page 1) */}
          <div 
            onClick={handleScrollToConsult}
            className="relative z-50 bg-navy-deep hover:bg-slate-900 border-b border-gold/20 text-center py-2.5 px-4 cursor-pointer transition-colors duration-300"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1 bg-gold text-navy-deep text-[9px] font-mono font-black px-2 py-0.5 rounded uppercase tracking-wider">
                Take Free
              </span>
              <span className="text-slate-100 font-sans text-[11px] sm:text-xs font-medium tracking-wide">
                Check Your Company's OGI Score for <span className="font-bold underline text-gold">FREE</span> — Organizational Growth Index
              </span>
            </div>
          </div>

          {/* Premium custom interactions & indicators */}
          <ScrollProgress />

          {/* Premium Sticky Navigation Bar */}
          <Header />

          {/* Hero Block Container */}
          <main className="relative z-10 pb-4">
            {/* Intro Hero with gold back-glowing radial gradients */}
            <Hero />

            <Suspense fallback={<div className="min-h-[50vh] w-full" />}>
              {/* Redesigned Founder Dependency / AVYSTRA Sovereign System Section */}
              <FounderFrictionSimulator />

              {/* Section Divider with thin brass gradient line */}
              <motion.div 
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 0.3, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent origin-center mt-4 mb-8" 
              />

              {/* Cost section analyzing bottlenecks */}
              <CostSection />

              {/* Comparison of Workshop VS Performance System */}
              <WorkshopVsSystem />

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
              <div className="py-6 mt-6">
                <FAQSection />
              </div>

              {/* OGI Growth Index Diagnostic assessment portal */}
              <div className="mt-6 py-8 relative z-20">
                <OGIDiagnostic />
              </div>
            </Suspense>
          </main>

          {/* Redesigned High-End Aesthetic Footer */}
          <Suspense fallback={<div className="h-[200px] w-full bg-[#0A192F]" />}>
            <Footer leadCount={leadCount} />
          </Suspense>

          {/* Floating Action Buttons */}
          {/* Consult Now Button - Floating elegantly above the WhatsApp button */}
          <motion.a
            href="https://wa.me/918596059607"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#0A192F]/95 hover:bg-[#0A192F] text-[#C5A059] border border-[#C5A059]/30 backdrop-blur-md px-4 py-2 md:px-5 md:py-2.5 rounded-full font-mono text-[9px] md:text-[10px] font-black uppercase tracking-[0.18em] shadow-[0_12px_32px_rgba(10,25,47,0.18)] flex items-center gap-2 cursor-pointer transition-all duration-300 group"
            style={{
              position: "fixed",
              bottom: "100px",
              right: "32px",
              zIndex: 9999,
            }}
            id="floating-consult-btn"
          >
            <span>Consult Now</span>
            <ArrowUpRight className="w-3 h-3 md:w-3.5 md:h-3.5 group-hover:rotate-45 transition-transform duration-300" />
          </motion.a>

          {/* Realistic WhatsApp Float Button */}
          <WhatsAppFloat number="918596059607" />
        </motion.div>
      )}
    </div>
  );
}
