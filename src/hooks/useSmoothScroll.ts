import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { elegantEase, getPrefersReducedMotion } from "../lib/animations";

export function useSmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = getPrefersReducedMotion();

    if (prefersReducedMotion) {
      // Instantly make elements visible to bypass animation safely and maintain flawless layout
      gsap.set(
        ".gsap-stagger-card, .gsap-divider, .pillar-fade-up, .pillar-card, .gsap-hero-fade, h2, p",
        {
          opacity: 1,
          y: 0,
          scaleX: 1,
          scale: 1,
          filter: "none",
        },
      );
      return;
    }

    // Initialize Lenis
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: false, // Keep touch input native for perfect mobile interaction
      infinite: false,
    });

    (window as any).lenis = lenis;

    // Sync Lenis with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Frame ticker integration using modern, highly optimized requestAnimationFrame
    // Connect Lenis to GSAP ticker for perfectly synced animations
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000); // 1.3.23 needs * 1000
    };
    gsap.ticker.add(tickerCallback);

    gsap.ticker.lagSmoothing(0);

    // Important: Tell ScrollTrigger to use Lenis as the scroll scroller
    // ScrollTrigger.scrollerProxy(document.body, {
    //   scrollTop(value) {
    //     return arguments.length ? lenis.scrollTo(value, { immediate: true }) : lenis.scroll;
    //   },
    //   getBoundingClientRect() {
    //     return {
    //       top: 0,
    //       left: 0,
    //       width: window.innerWidth,
    //       height: window.innerHeight,
    //     };
    //   },
    // });

    // Dynamic Height recalculation with ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
      lenis.resize();
    });
    resizeObserver.observe(document.body);

    return () => {
      lenis.destroy();
      resizeObserver.disconnect();
      gsap.ticker.remove(tickerCallback);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
}
