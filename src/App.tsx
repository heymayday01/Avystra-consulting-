import { useState, useEffect } from 'react';
import { HelpCircle, ChevronRight, Scale, Briefcase, Mail, Phone, MapPin, Landmark, ArrowUp, Globe, ShieldCheck, Activity } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import Flowchart from './components/Flowchart';
import StatsFounder from './components/StatsFounder';
import ConsultForm from './components/ConsultForm';
import AvystraLogo from './components/AvystraLogo';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [leadCount, setLeadCount] = useState(0);

  // Quietly audit completed diagnostics in background to show in diagnostic counter
  useEffect(() => {
    const fetchLeadCount = async () => {
      try {
        const response = await fetch('/api/leads/list');
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

  // Set up Lenis smooth scrolling and synchronize with GSAP ScrollTrigger
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      return;
    }

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo ease-out
      smoothWheel: true,
      wheelMultiplier: 1.0,
    });

    (window as any).lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    // Frame ticker integration using modern, highly optimized requestAnimationFrame
    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Staggered reveals for cards inside grid containers
    const staggerContainers = document.querySelectorAll('.gsap-stagger-container');
    staggerContainers.forEach((container) => {
      const items = container.querySelectorAll('.gsap-stagger-card');
      if (items.length > 0) {
        gsap.fromTo(items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    });

    // Custom smooth scale animation for horizontal dividers when scrolled into view
    const dividers = document.querySelectorAll('.gsap-divider');
    dividers.forEach((divider) => {
      gsap.fromTo(divider,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: divider,
            start: 'top 92%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-obsidian text-slate-100 selection:bg-gold/20 selection:text-gold">
      
      {/* Premium Sticky Navigation Bar */}
      <Header />

      {/* Hero Block Container */}
      <main className="relative z-10">
        
        {/* Intro Hero with gold back-glowing radial gradients */}
        <Hero />

        {/* Section Divider with thin brass gradient line */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent gsap-divider origin-center" />

        {/* Bento Grid layout analyzing bottlenecks */}
        <BentoGrid />

        {/* Section Divider - Fine glow lines */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/15 to-transparent gsap-divider origin-center" />

        {/* Interactive systems flowchart timeline */}
        <Flowchart />

        {/* Section Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent gsap-divider origin-center" />

        {/* Operational Diagnostics statistics & Founder's Profile Grid */}
        <StatsFounder />

        {/* Section Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/15 to-transparent gsap-divider origin-center" />

        {/* Intake consultation form capture */}
        <ConsultForm />

      </main>

      {/* Redesigned High-End Aesthetic Footer */}
      <footer className="relative bg-[#050D1A] border-t border-slate-900/60 overflow-hidden pt-24 pb-12">
        {/* Glowing atmospheric backdrop accents */}
        <div className="absolute top-0 left-1/4 w-[350px] h-[350px] rounded-full bg-[#C5A059]/[0.02] blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-blue-900/[0.04] blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 grid-overlay z-0 opacity-5 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Main Footer Sitemap section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 pb-16 border-b border-slate-800/40">
            
            {/* Column 1 - Brand Profile */}
            <div className="md:col-span-5 space-y-6">
              <div className="flex items-center gap-2">
                <AvystraLogo size="sm" theme="dark" showTagline={false} />
              </div>
              <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed max-w-sm">
                AVYSTRA Consulting Private Limited translates corporate complexity into streamlined, scalable operational models. We advise enterprise leaders and founders worldwide on optimizing systematic pipelines.
              </p>
              {leadCount > 0 && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800/80 text-[10px] font-mono text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Verified: <strong className="text-[#C5A059] font-semibold">{leadCount} Active Diagnostics</strong> Registered</span>
                </div>
              )}
            </div>

            {/* Column 2 - Links / Dynamic Transitions */}
            <div className="md:col-span-3 space-y-5">
              <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-1.5 h-px bg-[#C5A059]/50" />
                <span>Operational Frameworks</span>
              </h4>
              <ul className="space-y-3 font-sans text-xs sm:text-sm">
                {[
                  { label: 'Strategic Alignment Gaps', href: '#bottlenecks' },
                  { label: 'Executive Team Delegation', href: '#process' },
                  { label: 'Middle Management Blueprint', href: '#team' },
                  { label: 'Diagnostic Assessment Portal', href: '#consult' }
                ].map((item) => (
                  <li key={item.label}>
                    <a 
                      href={item.href} 
                      onClick={(e) => {
                        e.preventDefault();
                        const elementId = item.href.substring(1);
                        const element = document.getElementById(elementId);
                        if (element) {
                          if ((window as any).lenis) {
                            (window as any).lenis.scrollTo(element, { offset: -95, duration: 1.2 });
                          } else {
                            window.scrollTo({
                              top: element.getBoundingClientRect().top + window.scrollY - 95,
                              behavior: 'smooth'
                            });
                          }
                        }
                      }}
                      className="text-slate-400 hover:text-[#C5A059] transition-all relative group flex items-center gap-1 cursor-pointer"
                    >
                      <ChevronRight className="w-3 h-3 text-[#C5A059] opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                      <span className="group-hover:translate-x-0.5 transition-transform duration-300">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Contact channels & office coordinates */}
            <div className="md:col-span-4 space-y-5">
              <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-1.5 h-px bg-[#C5A059]/50" />
                <span>Corporate Coordinates</span>
              </h4>
              <ul className="space-y-4 text-xs text-slate-400 font-light">
                <li className="flex items-start gap-3">
                  <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-[#C5A059] mt-0.5 shrink-0">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div className="space-y-1">
                    <span className="block font-medium text-slate-300">Bengaluru Headquarters</span>
                    <span className="text-slate-400 block font-light leading-relaxed">
                      AVYSTRA Consulting Private Limited, Level 9, Prestige Tech Park, Bengaluru, Karnataka, India
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-[#C5A059] mt-0.5 shrink-0">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <div className="space-y-1">
                    <span className="block font-medium text-slate-300">Email Inquiry Desk</span>
                    <a href="mailto:info@avystraconsulting.com" className="hover:text-[#C5A059] text-slate-400 block transition-colors mt-0.5">
                      info@avystraconsulting.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-[#C5A059] mt-0.5 shrink-0">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div className="space-y-1">
                    <span className="block font-medium text-slate-300">Executive Briefing Link</span>
                    <span className="text-slate-400 block font-light">+91 80 4000 0000 / Executive Desk</span>
                  </div>
                </li>
              </ul>
            </div>

          </div>

          {/* Large Editorial Watermark & Go To Top section */}
          <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6 relative">
            
            {/* Regulatory & Disclosure Links */}
            <div className="order-2 md:order-1 space-y-3.5 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 text-[10.5px] font-mono text-slate-500">
                <span className="hover:text-[#C5A059] cursor-pointer transition-colors">Corporate Security</span>
                <span>&middot;</span>
                <span className="hover:text-[#C5A059] cursor-pointer transition-colors">Regulatory Disclosures</span>
                <span>&middot;</span>
                <span className="hover:text-[#C5A059] cursor-pointer transition-colors">SOP Blueprint Licensure</span>
              </div>
              <p className="text-[10px] text-slate-600 font-sans font-light">
                &copy; {new Date().getFullYear()} AVYSTRA Consulting Private Limited. Designed globally. Unstructured speed to systematic precision.
              </p>
            </div>

            {/* Kinetic "To Top" Magnetic Button */}
            <div className="order-1 md:order-2">
              <button
                onClick={() => {
                  if ((window as any).lenis) {
                    (window as any).lenis.scrollTo(0, { duration: 1.4 });
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="group flex flex-col items-center justify-center w-12 h-12 rounded-full border border-slate-800 hover:border-[#C5A059] bg-slate-900/60 hover:bg-[#C5A059]/10 text-slate-400 hover:text-[#C5A059] transition-all duration-500 shadow-md cursor-pointer relative"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform duration-300 ease-out" />
                <span className="absolute -bottom-6 text-[8px] font-mono tracking-widest text-slate-500 uppercase scale-0 group-hover:scale-100 transition-all duration-300 text-center w-max">
                  TOP
                </span>
              </button>
            </div>

          </div>

          {/* Aesthetic Brand Wordmark Watermark */}
          <div className="mt-16 text-center select-none pointer-events-none overflow-hidden">
            <h5 className="text-[clamp(1.5rem,10vw,7.5rem)] font-display font-black uppercase tracking-[0.25em] text-[#0A192F]/40 leading-none bg-clip-text text-transparent bg-gradient-to-b from-[#0A192F]/60 via-[#10233D]/25 to-transparent">
              AVYSTRA
            </h5>
          </div>

        </div>
      </footer>

    </div>
  );
}
