import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  ArrowRight,
  HelpCircle,
  Check,
  Clock,
  AlertCircle,
  RefreshCw,
  Layers,
} from "lucide-react";
import { motion, useMotionValue, useSpring } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import frustratedExecutive from "../assets/images/frustrated_executive_1781884799836.jpg";

gsap.registerPlugin(ScrollTrigger, CustomEase);
import { UnderlineSquiggle, DoodleSparkle } from "./DoodleWidgets";
import AmbientCanvasBackground from "./AmbientCanvasBackground";
import Magnetic from "./Magnetic";
import LiquidHeading from "./LiquidHeading";
import FounderFrictionSimulator from "./FounderFrictionSimulator";

import TextReveal from "./TextReveal";

const line1 = ["Your", "Business", "Has", "a", "Team."];
const line2 = ["So", "Why", "Does", "Every", "Important", "Decision"];
const line3 = ["Still"];
const specialWords = ["Need", "You?"];

const pathVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      delay: 1.25,
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export default function Hero() {
  const [imgFailed, setImgFailed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const elementsRef = useRef<HTMLDivElement[]>([]);
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

    // Use fast elastic spring to to follow the cursor coordinates beautifully
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

      // Boundary radius triggers within ~60px of the button boundary:
      const triggerRadius = Math.max(rect.width, rect.height) / 2 + 60;

      if (distance < triggerRadius) {
        const ratio = (triggerRadius - distance) / triggerRadius; // 0 to 1
        const targetX = (dx / distance) * 8 * ratio;
        const targetY = (dy / distance) * 8 * ratio;
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
      gsap.to(cta, { scale: 0.97, duration: 0.1, ease: "customExpo" });
    };

    const handleMouseUpCTA = () => {
      gsap.to(cta, {
        scale: 1,
        duration: 0.35,
        ease: "elastic.out(1.1, 0.32)",
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
      const offset = 80;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  }, []);

  const handleScrollToBento = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById("bottlenecks");
    if (element) {
      const offset = 80;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  }, []);

  return (
    <section
      id="hero-section"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full pt-28 pb-12 overflow-hidden bg-transparent"
    >
      {/* Subtle Repeating Pre-rendered Film-grain Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay z-[12] bg-repeat animate-none"
        style={{
          backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAY9FAyAAAABlBMVEUAAAD///+l2Z/dAAAAAnRSTlMAgJsrzyQAAABGSURBVGjXY2DABuioiYFmBFApBiSBLC7IEMLMgGQeAisBsmUwsxIisxBVkxCzEIsQi7oIMQvRGCCasIohW0mIWYhVHFkiEADidQQEExiR0QAAAABJRU5ErkJggg==")`,
        }}
      />

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
            className="mb-10 md:mb-14 flex flex-col items-center relative z-20"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A059]/25 bg-white/50 backdrop-blur-md px-4 py-1.5 shadow-[0_12px_24px_rgba(197, 160, 89, 0.05)] ring-1 ring-white/20 hover:bg-white/70 transition-all duration-500">
              <span className="relative flex h-1.5 w-1.5">
                {!reducedMotion && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A059] opacity-75"></span>
                )}
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#C5A059]"></span>
              </span>
              <span className="text-[8px] sm:text-[9.5px] text-[#0A192F] font-mono tracking-[0.25em] font-bold uppercase whitespace-nowrap">
                Now accepting select partners for Q4
              </span>
            </div>
          </motion.div>

          <div className="mb-10 md:mb-14 transform-gpu relative z-20 max-w-[95vw] lg:max-w-none">
            <h1
              ref={headlineRef}
              className="font-display font-bold text-[clamp(1.9rem,6.8vw,5.5rem)] leading-[1.08] sm:leading-[1.1] tracking-[-0.04em] text-[#0A192F] select-none text-center flex flex-wrap justify-center items-center gap-y-1"
            >
              <span className="inline-flex flex-wrap justify-center gap-x-[0.22em] mr-[0.22em]">
                {["Your", "Business", "Has", "a", "Team."].map((word, i) => (
                  <motion.span
                    key={`w1-${i}`}
                    initial={{ opacity: 0, y: 40, rotateX: 25, z: -100, filter: "blur(10px)" }}
                    animate={isVisible ? { opacity: 1, y: 0, rotateX: 0, z: 0, filter: "blur(0px)" } : {}}
                    transition={{ duration: 1.2, delay: 0.2 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
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
                  "Every",
                  "Important",
                  "Decision",
                  "Still",
                ].map((word, i) => (
                  <motion.span
                    key={`w2-${i}`}
                    initial={{ opacity: 0, y: 40, rotateX: 25, z: -100, filter: "blur(10px)" }}
                    animate={isVisible ? { opacity: 1, y: 0, rotateX: 0, z: 0, filter: "blur(0px)" } : {}}
                    transition={{ duration: 1.2, delay: 0.5 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block transform-gpu will-change-[transform,opacity,filter] origin-bottom-left"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              <LiquidHeading className="relative inline-flex overflow-visible pb-1.5 -mb-1.5 items-baseline text-[#C5A059] font-serif italic font-medium whitespace-nowrap pl-[0.1em] align-baseline">
                <motion.span 
                  initial={{ opacity: 0, y: 40, rotateX: 25, z: -100, filter: "blur(10px)" }}
                  animate={isVisible ? { opacity: 1, y: 0, rotateX: 0, z: 0, filter: "blur(0px)" } : {}}
                  transition={{ duration: 1.2, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block transform-gpu will-change-[transform,opacity,filter] origin-bottom-right"
                >
                  Need You?
                </motion.span>
                <UnderlineSquiggle
                  className="absolute -bottom-1 left-0 w-full h-[6px] text-gold/60"
                  delay={1.3}
                  duration={1.2}
                />
              </LiquidHeading>
            </h1>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 md:mb-18 relative z-20"
          >
            <div className="absolute -inset-10 bg-white/40 blur-3xl rounded-[100%] pointer-events-none z-[-1]"></div>
            <p className="text-slate-800/90 font-sans text-base sm:text-lg md:text-xl font-light leading-[1.65] md:leading-[1.7] max-w-2xl mx-auto">
              Execution shouldn't hinge on your daily involvement. We engineer
              autonomous systems and align leadership to scale your vision—
              <span className="group relative inline-block text-[#0A192F] font-semibold pb-0.5 whitespace-nowrap cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]">
                without your constant presence.
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-[#C5A059] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-[95%] group-focus-visible:w-[95%] origin-center pointer-events-none" />
              </span>
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center w-full sm:w-auto relative z-30"
          >
            <button
              ref={ctaRef}
              onClick={handleScrollToForm}
              className="group relative cursor-pointer overflow-visible p-[1px] rounded-full bg-[#0B0F19] transition-all duration-500 hover:scale-[1.03] block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              {/* Backglow element expands and brightens smoothly on hover/active */}
              <div className="absolute inset-0 rounded-full bg-[#C5A059]/20 blur-xl scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 -z-10 pointer-events-none" />

              <span className="relative block px-5 py-3 sm:px-6 sm:py-3.5 bg-[#0B0F19] rounded-full text-white font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 transition-all duration-500 border border-white/5 group-hover:border-[#C5A059]/40 shadow-[0_12px_32px_-8px_rgba(11,15,25,0.4)]">
                <span className="relative overflow-hidden flex h-4 items-center justify-center pointer-events-none">
                  <span className="translate-y-0 group-hover:-translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] absolute inset-0 flex items-center justify-center whitespace-nowrap">
                    Unlock Your Bottlenecks
                  </span>
                  <span className="translate-y-[120%] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] absolute inset-0 flex items-center justify-center text-[#C5A059] whitespace-nowrap">
                    Begin Diagnostic
                  </span>
                  {/* Invisible placeholder to maintain width */}
                  <span className="invisible whitespace-nowrap">
                    Unlock Your Bottlenecks
                  </span>
                </span>
                <ArrowRight className="w-4 h-4 text-[#C5A059] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[6px]" />
              </span>
            </button>

            {/* INTERACTIVE SYSTEM DIAGNOSTIC PATHOLOGY MATRIX - CLIENT HOOK */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
              className="w-full mt-16 max-w-5xl px-2 sm:px-4"
            >
              <FounderFrictionSimulator />
            </motion.div>

            {/* Scroll Indicator */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 2, duration: 1 }}
              className="mt-20 flex flex-col items-center gap-4 hover:opacity-100 transition-opacity cursor-ns-resize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded-xl p-2 outline-none"
              onClick={handleScrollToBento}
              aria-label="Scroll to discover bottlenecks"
            >
              <span
                className="text-[9px] font-mono text-slate-500 font-bold uppercase tracking-[0.3em]"
                style={{ writingMode: "vertical-rl" }}
              >
                Scroll to Explore
              </span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-slate-400 to-transparent relative overflow-hidden">
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
        <div className="mt-24 pt-8 border-t border-[#0A192F]/5 flex flex-wrap justify-center gap-6 sm:gap-12 gsap-hero-fade">
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
