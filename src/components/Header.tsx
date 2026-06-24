import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AvystraLogo from "./AvystraLogo";

interface NavItem {
  name: string;
  href: string;
  number: string;
  desc: string;
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("bottlenecks");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const activeSectionRef = useRef("bottlenecks");

  useEffect(() => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const handleScrollState = () => {
      const isScrolled = window.scrollY > 15;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };

    // Lightweight scroll listener for header active style ONLY
    window.addEventListener("scroll", handleScrollState, { passive: true });
    handleScrollState();

    const lenisInstance = (window as any).lenis;
    if (lenisInstance) {
      lenisInstance.on("scroll", handleScrollState);
    }

    // Set up ultra-smooth GSAP ScrollTriggers for high-fidelity section synchronization
    const sections = ["bottlenecks", "process", "programs", "team", "consult"];
    const triggers: ScrollTrigger[] = [];

    // Let ScrollTrigger compute exact offsets during layout phases rather than scroll loops
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const trigger = ScrollTrigger.create({
          trigger: el,
          start: "top 45%",
          end: "bottom 45%",
          onToggle: (self) => {
            if (self.isActive && activeSectionRef.current !== id) {
              activeSectionRef.current = id;
              setActiveSection(id);
            }
          },
          onEnter: () => {
            if (activeSectionRef.current !== id) {
              activeSectionRef.current = id;
              setActiveSection(id);
            }
          },
          onEnterBack: () => {
            if (activeSectionRef.current !== id) {
              activeSectionRef.current = id;
              setActiveSection(id);
            }
          },
        });
        triggers.push(trigger);
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScrollState);
      if (lenisInstance) {
        lenisInstance.off("scroll", handleScrollState);
      }
      triggers.forEach((t) => t.kill());
    };
  }, []);

  const navItems: NavItem[] = useMemo(() => [
    {
      name: "The Problem",
      href: "#bottlenecks",
      number: "01",
      desc: "Structural points of friction",
    },
    {
      name: "What We Do",
      href: "#process",
      number: "02",
      desc: "Our procedural roadmap",
    },
    {
      name: "Programs",
      href: "#programs",
      number: "03",
      desc: "Bespoke system training",
    },
    {
      name: "About",
      href: "#team",
      number: "04",
      desc: "The founder's background",
    },
    {
      name: "Contact",
      href: "#consult",
      number: "05",
      desc: "Tell us about your organization",
    }
  ], []);

  const handleScrollTo = useCallback((
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    setIsOpen(false);

    // Instant interactive scheduling for high scroll responsiveness
    const element = document.getElementById(targetId);
    if (element) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(element, {
          offset: -90,
          duration: 1.25,
        });
      } else {
        const offset = 90;
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  }, []);

  const headerTransition = useMemo(() => shouldReduceMotion
    ? { duration: 0 }
    : {
        opacity: {
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          delay: 0.1,
        },
        y: {
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          delay: 0.1,
        },
      }, [shouldReduceMotion]);

  const navActivePillTransition = useMemo(() => ({
    type: "spring" as const,
    stiffness: 380,
    damping: 30,
  }), []);

  return (
    <div className={`fixed left-0 right-0 z-[60] flex justify-center px-4 pointer-events-none transition-all duration-300 ${scrolled || isOpen ? "top-2 md:top-3" : "top-[52px] sm:top-[60px]"}`}>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          borderRadius: isOpen ? "24px" : "100px",
        }}
        transition={headerTransition}
        className={`w-full max-w-5xl pointer-events-auto shadow-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled || isOpen
            ? "py-3 px-6 lg:py-2 border border-white/20 bg-white/30 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.1)] backdrop-blur-2xl"
            : "py-5 px-6 sm:px-10 bg-transparent border border-transparent"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo brand frame */}
          <div className="flex items-center">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                if ((window as any).lenis) {
                  (window as any).lenis.scrollTo(0, { duration: 1.2 });
                } else {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="flex items-center gap-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] focus-visible:ring-offset-2 rounded-xl"
              id="header-brand-logo-link"
            >
              <AvystraLogo size="sm" showTagline={false} />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav 
            className="hidden xl:flex items-center gap-1 relative bg-white/20 backdrop-blur-md px-1 py-1 rounded-full border border-white/30 shadow-sm"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {navItems.map((item, i) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onClick={(e) => {
                    setActiveSection(item.href.substring(1));
                    handleScrollTo(e, item.href.substring(1));
                  }}
                  className={`group relative px-5 py-2.5 font-display text-[10px] uppercase tracking-[0.15em] font-bold transition-colors duration-300 rounded-full z-10 whitespace-nowrap ${
                    isActive
                      ? "text-[#0A192F]"
                      : "text-[#0A192F]/60 hover:text-[#0A192F]"
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>

                  {/* Active Indicator Slide and Spring */}
                  {isActive && !shouldReduceMotion && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 bg-white/70 shadow-sm rounded-full -z-10"
                      transition={navActivePillTransition}
                    />
                  )}

                  {/* Hover Indicator Slide and Spring */}
                  {hoveredIndex === i && !isActive && !shouldReduceMotion && (
                    <motion.span
                      layoutId="nav-hover-pill"
                      className="absolute inset-0 bg-white/40 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.03)] rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 450, damping: 28 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* CTA Action */}
          <div className="hidden xl:flex items-center">
            <a
              href="#consult"
              onClick={(e) => handleScrollTo(e, "consult")}
              className="relative inline-flex items-center gap-2 bg-[#0A192F] text-white font-display text-[9px] uppercase tracking-[0.2em] font-bold px-6 py-3 rounded-full hover:bg-[#1A2F4F] transition-all duration-500 group overflow-hidden"
            >
              <span className="relative z-10">Global Diagnostic</span>
              <ArrowUpRight className="w-3 h-3 text-[#C5A059] group-hover:rotate-45 transition-transform duration-500" />
            </a>
          </div>

          {/* Mobile Menu trigger */}
          <div className="xl:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-10 h-10 flex items-center justify-center text-[#0A192F] focus:outline-none rounded-full bg-white/50 backdrop-blur-md border border-white/30 shadow-sm transition-all"
              aria-label="Toggle Menu"
            >
              <div className="relative w-5 h-3.5 flex flex-col justify-between items-center">
                <motion.span 
                  animate={isOpen ? { rotate: 45, y: 6.25 } : { rotate: 0, y: 0 }} 
                  className="w-full h-[1.5px] bg-[#0A192F] origin-center rounded-full" 
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
                <motion.span 
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }} 
                  className="w-full h-[1.5px] bg-[#0A192F] rounded-full" 
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
                <motion.span 
                  animate={isOpen ? { rotate: -45, y: -6.25 } : { rotate: 0, y: 0 }} 
                  className="w-full h-[1.5px] bg-[#0A192F] origin-center rounded-full" 
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
            </button>
          </div>
        </div>

        {/* In-Header Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="xl:hidden overflow-hidden"
            >
              <div className="pt-4 pb-2 space-y-1">
                {navItems.map((item, i) => (
                  <motion.a
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleScrollTo(e, item.href.substring(1))}
                    className="flex flex-col px-4 py-3 rounded-2xl bg-white/20 hover:bg-white/40 active:bg-white/50 border border-transparent hover:border-white/20 transition-all font-sans group"
                  >
                    <span className="font-mono text-[9px] font-bold text-[#C5A059] tracking-widest opacity-80 mb-0.5">
                      {item.number}
                    </span>
                    <span className="font-display font-medium text-[13px] uppercase tracking-wider text-[#0A192F] group-hover:translate-x-1 transition-transform flex justify-between items-center">
                      {item.name}
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0A192F] transition-colors" />
                    </span>
                  </motion.a>
                ))}

                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.05, duration: 0.4 }}
                  href="#consult"
                  onClick={(e) => handleScrollTo(e, "consult")}
                  className="w-full mt-3 py-3.5 bg-navy-deep text-white font-bold font-display text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 rounded-2xl shadow-lg active:scale-[0.98] transition-transform"
                >
                  Begin Diagnostic
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A059]" />
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
}
