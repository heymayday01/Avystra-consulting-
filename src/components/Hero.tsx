import React, { useRef, useEffect, useCallback, useState } from "react";
import {
  ArrowRight,
} from "lucide-react";
import { motion, useMotionValue, useSpring } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);
import { UnderlineSquiggle } from "./DoodleWidgets";
import LiquidHeading from "./LiquidHeading";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Buttery spring variables for cursor tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 45, stiffness: 120, mass: 0.6 };
  const spotlightX = useSpring(mouseX, springConfig);
  const spotlightY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    // Register the custom curve representing the advanced immersive cubic-bezier ease
    CustomEase.create("customExpo", "0.22, 1, 0.36, 1");

    if (reducedMotion) {
      // Fallback instantly if reduced-motion is requested
      const validTargets = [
        ".gsap-badge-pop",
        ".gsap-headline-word",
        ".gsap-subheadline-fade",
        ".gsap-cta-fade",
        ".gsap-hero-fade",
      ].filter(selector => document.querySelector(selector) !== null);

      if (validTargets.length > 0) {
        gsap.set(validTargets, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "none",
          rotateX: 0,
        });
      }
      return;
    }

    const ctx = gsap.context(() => {
      // Background glow is static for performance, but we keep the entry animations
      // for the visual impact of the brand reveal.
      
      // Reveal animations for UI elements
      gsap.from(".gsap-hero-fade", {
        opacity: 0,
        y: 40,
        duration: 1.2,
        stagger: 0.2,
        ease: "expo.out",
        delay: 0.6,
        clearProps: "all"
      });

      // Special handling for the trust indicators at the bottom
      gsap.from(".gsap-trust-item", {
        opacity: 0,
        scale: 0.9,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 1.2,
        clearProps: "all"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Magnetic Spring-loaded CTA physics hook
  useEffect(() => {
    if (reducedMotion) return;
    const cta = ctaRef.current;
    if (!cta) return;

    // Use fast elastic spring to follow the cursor coordinates beautifully
    const xTo = gsap.quickTo(cta, "x", {
      duration: 0.55,
      ease: "elastic.out(1, 0.42)",
    });
    const yTo = gsap.quickTo(cta, "y", {
      duration: 0.55,
      ease: "elastic.out(1, 0.42)",
    });

    const handleMouseMoveCTA = (e: MouseEvent) => {
      const rect = cta.getBoundingClientRect();
      const ctaX = rect.left + rect.width / 2;
      const ctaY = rect.top + rect.height / 2;

      const dx = e.clientX - ctaX;
      const dy = e.clientY - ctaY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Boundary radius triggers within ~65px of the button boundary:
      const triggerRadius = Math.max(rect.width, rect.height) / 2 + 65;

      if (distance < triggerRadius) {
        const ratio = (triggerRadius - distance) / triggerRadius; // 0 to 1
        const targetX = (dx / distance) * 10 * ratio;
        const targetY = (dy / distance) * 10 * ratio;
        xTo(targetX);
        yTo(targetY);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    const handleMouseLeaveCTA = () => {
      xTo(0);
      yTo(0);
    };

    const handleMouseDownCTA = () => {
      gsap.to(cta, { scale: 0.96, duration: 0.1, ease: "customExpo" });
    };

    const handleMouseUpCTA = () => {
      gsap.to(cta, {
        scale: 1,
        duration: 0.4,
        ease: "elastic.out(1.1, 0.35)",
      });
    };

    window.addEventListener("mousemove", handleMouseMoveCTA);
    cta.addEventListener("mouseleave", handleMouseLeaveCTA);
    cta.addEventListener("mousedown", handleMouseDownCTA);
    cta.addEventListener("mouseup", handleMouseUpCTA);

    return () => {
      window.removeEventListener("mousemove", handleMouseMoveCTA);
      cta.removeEventListener("mouseleave", handleMouseLeaveCTA);
      cta.removeEventListener("mousedown", handleMouseDownCTA);
      cta.removeEventListener("mouseup", handleMouseUpCTA);
    };
  }, [reducedMotion]);



  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;

    const container = sectionRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Direct motion update loops (no GSAP/centering conflicts)
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const handleScrollToForm = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById("consult");
    if (element) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(element, { offset: -90, duration: 1.25 });
      } else {
        const offset = 80;
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }
  }, []);

  const handleScrollToBento = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById("bottlenecks");
    if (element) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(element, { offset: -90, duration: 1.25 });
      } else {
        const offset = 80;
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }
  }, []);

  return (
    <section
      id="hero-section"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full pt-24 sm:pt-28 pb-6 overflow-hidden bg-transparent"
    >
      {/* GSAP Ambient Parallax and Breath Glow Backdrop */}
      <div className="gsap-ambient-glow absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] sm:w-[1200px] sm:h-[1200px] rounded-full pointer-events-none z-0 opacity-40 mix-blend-color-dodge bg-gradient-to-b from-[#C5A059]/15 to-transparent select-none blur-3xl" />

      {/* Buttery smooth Spring Cursor Spotlight (Perfect Alignment, Zero Jitter) */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[800px] h-[800px] pointer-events-none z-0 hidden md:block mix-blend-color-dodge bg-radial from-[#C5A059]/06 to-transparent select-none"
        style={{
          x: spotlightX,
          y: spotlightY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full select-none transform-gpu">
        <div className="flex flex-col items-center justify-center max-w-6xl mx-auto text-center w-full relative z-20 origin-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 md:mb-6 flex flex-col items-center relative z-20"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A059]/25 bg-white/50 backdrop-blur-md px-4 py-1.5 shadow-[0_12px_24px_rgba(197, 160, 89, 0.05)] ring-1 ring-white/20 hover:bg-white/70 transition-all duration-500">
              <span className="relative flex h-1.5 w-1.5">
                {!reducedMotion && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A059] opacity-75"></span>
                )}
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#C5A059]"></span>
              </span>
              <span className="text-[8px] sm:text-[9.5px] text-[#0A192F] font-mono tracking-[0.25em] font-bold uppercase whitespace-nowrap">
                LEADERSHIP &amp; PERFORMANCE CONSULTING
              </span>
            </div>
          </motion.div>

          <div className="mb-4 md:mb-6 transform-gpu relative z-20 max-w-[95vw] lg:max-w-none">
            <h1
              ref={headlineRef}
              className="font-display font-bold text-[clamp(1.9rem,6.8vw,5.5rem)] leading-[1.08] sm:leading-[1.1] tracking-[-0.04em] text-[#0A192F] select-none text-center flex flex-wrap justify-center items-center gap-y-1"
            >
              <span className="inline-flex flex-wrap justify-center gap-x-[0.22em] mr-[0.22em]">
                {["You", "Built", "A", "Team."].map((word, i) => (
                  <motion.span
                    key={`w1-${i}`}
                    initial={{ opacity: 0, y: 30, rotateX: 20, z: -50, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, rotateX: 0, z: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1.0, delay: 0.15 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block transform-gpu will-change-[transform,opacity,filter] origin-bottom-left"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              <span className="inline-flex flex-wrap justify-center gap-x-[0.22em] mr-[0.22em]">
                {[
                  "So",
                  "Why",
                  "Does",
                  "Everything",
                  "Still",
                ].map((word, i) => (
                  <motion.span
                    key={`w2-${i}`}
                    initial={{ opacity: 0, y: 30, rotateX: 20, z: -50, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, rotateX: 0, z: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1.0, delay: 0.4 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block transform-gpu will-change-[transform,opacity,filter] origin-bottom-left"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              <LiquidHeading className="relative inline-flex overflow-visible pb-1.5 -mb-1.5 items-baseline text-[#C5A059] font-serif italic font-medium whitespace-nowrap pl-[0.1em] align-baseline">
                <motion.span 
                  initial={{ opacity: 0, y: 30, rotateX: 20, z: -50, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, rotateX: 0, z: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1.0, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block transform-gpu will-change-[transform,opacity,filter] origin-bottom-right"
                >
                  Depend On You?
                </motion.span>
                <UnderlineSquiggle
                  className="absolute -bottom-1 left-0 w-full h-[6px] text-gold/60"
                  delay={1.1}
                  duration={1.0}
                />
              </LiquidHeading>
            </h1>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 md:mb-8 relative z-20 w-full max-w-4xl mx-auto animate-fade-in"
          >
            <div className="absolute -inset-10 bg-white/40 blur-3xl rounded-[100%] pointer-events-none z-[-1]"></div>
            
            {/* The 5 bullets straight from PDF Page 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 text-left mb-6 max-w-4xl mx-auto px-4 select-none">
              {[
                "You hired experienced people",
                "You promoted managers",
                "You created departments",
                "You increased salaries",
                "You held meetings and set targets"
              ].map((bullet, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-2 p-2.5 rounded-xl border border-slate-100 bg-white/40 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:border-[#C5A059]/35 transition-all duration-300"
                >
                  <span className="text-[#C5A059] font-black leading-none shrink-0 text-sm mt-0.5">—</span>
                  <span className="text-slate-700 font-sans text-[11px] sm:text-xs font-semibold leading-snug">
                    {bullet}
                  </span>
                </div>
              ))}
            </div>

            {/* Powerful bridging text block straight from PDF Page 1 */}
            <div className="text-center max-w-3xl mx-auto bg-slate-950/[0.01] border border-[#C5A059]/15 rounded-[1.5rem] p-5 sm:p-6 backdrop-blur-lg shadow-sm">
              <p className="text-[#0A192F] font-sans text-sm sm:text-base font-semibold leading-relaxed mb-3">
                So why does it still feel like the company slows down whenever you step away?
              </p>
              
              <div className="space-y-2 border-t border-slate-200/50 pt-3 text-left sm:text-center">
                <p className="text-slate-500 font-sans text-xs sm:text-[13px] leading-relaxed font-light">
                  <span className="font-semibold text-slate-800">Most organizations don't struggle because people don't know what to do.</span> <br />
                  They struggle because knowing and doing are two very different things.
                </p>
                
                <p className="text-[#0A192F] font-sans text-xs sm:text-xs font-semibold tracking-wide uppercase pt-0.5">
                  That's the gap <span className="text-[#C5A059] font-black">AVYSTRA</span> helps organizations close.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center w-full relative z-30 mt-4"
          >
            {/* Double CTAs with premium magnetic tracking and high luxury aesthetics */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 relative z-40">
              {/* Talk To Us (CTA 1) */}
              <button
                ref={ctaRef}
                onClick={handleScrollToForm}
                className="group relative cursor-pointer overflow-visible p-[1px] rounded-full bg-[#0A192F] transition-all duration-500 hover:scale-[1.03] block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                {/* Backglow element expands and brightens smoothly on hover */}
                <div className="absolute inset-[-4px] rounded-full bg-gradient-to-r from-[#C5A059] via-amber-400 to-[#C5A059] opacity-30 group-hover:opacity-75 blur-[10px] group-hover:blur-[16px] transition-all duration-700 pointer-events-none" />
                
                {/* Inner button container */}
                <div className="relative rounded-full bg-[#0A192F] hover:bg-slate-900 px-8 py-3 flex items-center justify-center gap-2.5 transition-all duration-300">
                  <span className="text-white font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase">
                    Talk To Us
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#C5A059] transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </button>

              {/* See The Problem (CTA 2) */}
              <button
                onClick={handleScrollToBento}
                className="group relative cursor-pointer overflow-hidden rounded-full border border-slate-300/80 bg-white/40 px-8 py-3 backdrop-blur-md transition-all duration-500 hover:bg-white/80 hover:border-[#C5A059]/40 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] shadow-sm flex items-center justify-center gap-2"
              >
                <span className="text-[#0A192F] font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase">
                  See The Problem
                </span>
              </button>
            </div>

            {/* Scroll Indicator */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="mt-6 flex flex-col items-center gap-2 hover:opacity-100 transition-opacity cursor-ns-resize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded-xl p-1.5 outline-none"
              onClick={handleScrollToBento}
              aria-label="Scroll to discover bottlenecks"
            >
              <span
                className="text-[9px] font-mono text-slate-500 font-bold uppercase tracking-[0.3em]"
                style={{ writingMode: "vertical-rl" }}
              >
                Scroll to Explore
              </span>
              <div className="w-[1px] h-8 bg-gradient-to-b from-slate-400 to-transparent relative overflow-hidden">
                <motion.div
                  className="w-full h-1/2 bg-[#0A192F] absolute top-0"
                  animate={reducedMotion ? { y: 0 } : { y: ["-100%", "200%"] }}
                  transition={
                    reducedMotion
                      ? { duration: 0 }
                      : { duration: 1.5, repeat: Infinity, ease: "linear" }
                  }
                />
              </div>
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom Trust Indicators */}
        <div className="mt-12 pt-6 border-t border-[#0A192F]/5 flex flex-wrap justify-center gap-6 sm:gap-12 gsap-hero-fade">
          {[
            "Leadership Alignment",
            "Operational Excellence",
            "Execution Blueprints",
            "Founder Autonomy",
          ].map((label, i) => (
            <div
              key={i}
              className="flex items-center gap-2 sm:gap-3 group mix-blend-multiply gsap-trust-item"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] group-hover:scale-150 transition-transform duration-500" />
              <span className="font-mono text-[9px] sm:text-[10px] font-black text-[#0A192F]/40 uppercase tracking-[0.2em] group-hover:text-[#0A192F] transition-colors duration-500">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Ticker */}
      <div className="mt-10 w-full border-y border-slate-200 bg-white py-6 flex items-center relative z-10 overflow-hidden gsap-hero-fade">
        <div 
          className="animate-marquee-slow flex whitespace-nowrap gap-x-24 select-none"
          style={{ animationPlayState: (isVisible && !reducedMotion) ? 'running' : 'paused' }}
        >
          {[1, 2, 3, 4].map((loopIdx) => (
            <React.Fragment key={loopIdx}>
              <span className="font-display font-black text-[10px] tracking-[0.45em] text-[#0A192F] uppercase flex items-center gap-4">
                THINK <span className="text-[#C5A059]">CLEARLY</span>
              </span>
              <span className="text-slate-250 font-light mx-4">•</span>
              <span className="font-serif italic font-light text-[10px] tracking-[0.25em] text-[#C5A059] uppercase flex items-center gap-4">
                ACT DECISIVELY
              </span>
              <span className="text-slate-250 font-light mx-4">•</span>
              <span className="font-display font-black text-[10px] tracking-[0.45em] text-[#0A192F] uppercase flex items-center gap-4">
                ELIMINATE <span className="text-[#C5A059]">FRICTION</span>
              </span>
              <span className="text-slate-250 font-light mx-4">•</span>
              <span className="font-serif italic font-light text-[10px] tracking-[0.25em] text-slate-400 uppercase flex items-center gap-4">
                STREAMLINED SUCCESS
              </span>
              <span className="text-slate-250 font-light mx-4">•</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes marquee-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-slow {
          animation: marquee-slow 40s linear infinite;
        }
        #hero-section {
          --mouse-percent-x: 0;
          --mouse-percent-y: 0;
          --mouse-coords-x: 50%;
          --mouse-coords-y: 50%;
        }
      `,
        }}
      />
    </section>
  );
}
