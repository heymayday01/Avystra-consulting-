import React, { useEffect, useRef, useState } from 'react';
import { getPrefersReducedMotion } from '../lib/animations';

interface LiquidHeadingProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

/**
 * An ultra-premium, high-fidelity liquid distortion component that applies
 * a realistic refraction and warping SVG feDisplacementMap lens filter to text or elements
 * on hover. Performance is optimized for 120Hz displays with direct DOM mutation loops.
 */
export default function LiquidHeading({ children, className = '', id }: LiquidHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  
  // Create a unique filter id for each instance to prevent colliding filters
  const filterId = useRef(`liquid-glass-distortion-filter-${Math.random().toString(36).substring(2, 11)}`);

  // Track rendering variables directly in a ref to keep animation rate locked to screen refresh (60Hz to 120Hz+)
  const animState = useRef({
    currentScale: 0,
    targetScale: 0,
    baseFrequencyX: 0.015,
    baseFrequencyY: 0.048,
    time: 0,
    lastTime: performance.now(),
  });

  useEffect(() => {
    setReducedMotion(getPrefersReducedMotion());
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    let animId: number;
    let isActive = true;

    const animate = (now: number) => {
      if (!isActive) return;

      const state = animState.current;
      const dt = Math.min((now - state.lastTime) / 16.666, 3); // delta scaling
      state.lastTime = now;

      // Target scale peaks on hover, use a more responsive curve
      state.targetScale = isHovered ? 14 : 0;
      
      const lerpSpeed = isHovered ? 0.08 : 0.12;
      const lerpFactor = 1 - Math.pow(1 - lerpSpeed, dt);
      state.currentScale += (state.targetScale - state.currentScale) * lerpFactor;

      // Threshold check
      const isAtRest = !isHovered && state.currentScale < 0.005;

      if (dispRef.current) {
        dispRef.current.setAttribute('scale', state.currentScale.toFixed(3));
      }

      if (state.currentScale > 0.02) {
        state.time += 0.008 * dt;
        // Multi-layered wobble for a more "viscous" feel
        const xWobble = Math.sin(state.time * 2.1) * 0.002 + Math.cos(state.time * 0.8) * 0.001;
        const yWobble = Math.cos(state.time * 1.8) * 0.005 + Math.sin(state.time * 1.1) * 0.002;
        const currentFreqX = state.baseFrequencyX + xWobble;
        const currentFreqY = state.baseFrequencyY + yWobble;

        if (turbRef.current) {
          turbRef.current.setAttribute('baseFrequency', `${currentFreqX.toFixed(6)} ${currentFreqY.toFixed(6)}`);
        }
      }

      if (!isAtRest) {
        animId = requestAnimationFrame(animate);
      }
    };

    animId = requestAnimationFrame(animate);

    return () => {
      isActive = false;
      cancelAnimationFrame(animId);
    };
  }, [isHovered, reducedMotion]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-block select-none ${className}`}
      id={id}
      style={{
        filter: !reducedMotion && (isHovered || animState.current.currentScale > 0.05) && (typeof window !== 'undefined' && window.innerWidth > 768)
          ? `url(#${filterId.current})`
          : 'none',
        willChange: (isHovered || animState.current.currentScale > 0.05) ? 'filter' : 'auto',
      }}
    >
      {children}

      {!reducedMotion && (
        <svg className="absolute w-0 h-0 pointer-events-none select-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id={filterId.current} x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence
                ref={turbRef}
                type="fractalNoise"
                baseFrequency="0.012 0.045"
                numOctaves="2"
                result="noise"
                seed="3"
              />
              <feDisplacementMap
                ref={dispRef}
                in="SourceGraphic"
                in2="noise"
                scale="0"
                xChannelSelector="R"
                yChannelSelector="G"
                result="distort"
              />
            </filter>
          </defs>
        </svg>
      )}
    </div>
  );
}
