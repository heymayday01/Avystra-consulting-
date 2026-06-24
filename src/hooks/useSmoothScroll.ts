import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getPrefersReducedMotion } from "../lib/animations";

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

    // Initialize Lenis with autoRaf disabled to delegate frame loop perfectly to GSAP
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false, // Keep touch input native for perfect mobile interaction
      infinite: false,
      autoRaf: false, // Bypasses internal rendering loop to avoid dual-tick stuttering
    });

    (window as any).lenis = lenis;

    // Intercept clicks on links that target hashes and handle them smoothly via Lenis
    const handleHashClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href.startsWith("#")) {
          e.preventDefault();
          const targetId = href.substring(1);
          const element = document.getElementById(targetId);
          if (element) {
            lenis.scrollTo(element, { offset: -90, duration: 1.25 });
          } else if (href === "#") {
            lenis.scrollTo(0, { duration: 1.25 });
          }
        }
      }
    };
    document.addEventListener("click", handleHashClick);

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

    // Debounced window resize event listener to prevent layout thrashing and keep calculations perfectly aligned
    let resizeTimeout: any = null;
    const handleResize = () => {
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }
      resizeTimeout = window.setTimeout(() => {
        ScrollTrigger.refresh();
        lenis.resize();
      }, 200);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("click", handleHashClick);
      lenis.destroy();
      window.removeEventListener("resize", handleResize);
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }
      gsap.ticker.remove(tickerCallback);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
}
