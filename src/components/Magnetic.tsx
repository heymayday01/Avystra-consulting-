import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface MagneticProps {
  children: React.ReactElement;
  range?: number;
}

export default function Magnetic({ children, range = 24 }: MagneticProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Direct performance check: Only apply on devices supporting hover/fine-pointers
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (isCoarse) return;

    const child = container.querySelector('.magnetic-target') || container.firstElementChild;
    if (!child) return;

    // Speed up standard GSAP default settings for responsive UI feedback
    const xTo = gsap.quickTo(child, 'x', { duration: 0.35, ease: 'power2.out' });
    const yTo = gsap.quickTo(child, 'y', { duration: 0.35, ease: 'power2.out' });

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      // Compute coordinates relative to the center of the bounding rectangle
      const centerX = rect.left + width / 2;
      const centerY = rect.top + height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      // Animate using high-performance quickTo
      xTo((distanceX / width) * range);
      yTo((distanceY / height) * range);
    };

    const handleMouseLeave = () => {
      // Spring back gracefully
      gsap.to(child, {
        x: 0,
        y: 0,
        duration: 0.55,
        ease: 'elastic.out(1.1, 0.45)',
      });
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [range]);

  return (
    <div ref={containerRef} className="inline-block w-full sm:w-auto">
      {React.cloneElement(children as React.ReactElement<any>, {
        className: `${((children as React.ReactElement<any>).props.className || '')} magnetic-target`.trim(),
      })}
    </div>
  );
}
