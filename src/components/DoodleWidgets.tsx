import { motion } from 'motion/react';

interface DoodleProps {
  className?: string;
  color?: string;
  duration?: number;
  delay?: number;
}

// Squiggly underline that draws itself
export function UnderlineSquiggle({ className = '', color = '#C5A059', duration = 1.4, delay = 0.3 }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 200 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute left-0 bottom-[-6px] w-[110%] h-[12px] overflow-visible pointer-events-none ${className}`}
    >
      <motion.path
        d="M2 13C35 9 125 2 198 2C160 5.5 110 8 35 12"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{
          duration,
          delay,
          ease: 'easeInOut',
        }}
      />
    </svg>
  );
}

// Hand-drawn loop highlighting a count or text chunk
export function HighlightCircle({ className = '', color = '#C5A059', duration = 1.6, delay = 0.5 }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 160 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute pointer-events-none scale-105 z-0 ${className}`}
    >
      <motion.path
        d="M 10 35 C 10 10, 150 5, 150 35 C 150 60, 20 65, 12 40 C 8 25, 60 12, 142 16"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.85 }}
        viewport={{ once: true }}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
    </svg>
  );
}

// Dynamic organic sparkle star
export function DoodleSparkle({ className = '', color = '#C5A059', duration = 1.2, delay = 0 }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute w-8 h-8 pointer-events-none ${className}`}
    >
      <motion.path
        d="M 20 2 Q 20 18, 38 20 Q 20 22, 20 38 Q 20 22, 2 20 Q 20 18, 20 2"
        fill={color}
        initial={{ scale: 0, opacity: 0, rotate: -25 }}
        whileInView={{ scale: 1, opacity: 0.9, rotate: 0 }}
        viewport={{ once: true }}
        transition={{
          type: 'spring',
          stiffness: 80,
          damping: 10,
          duration,
          delay,
        }}
        whileHover={{
          scale: 1.2,
          rotate: 45,
          transition: { duration: 0.3 }
        }}
      />
    </svg>
  );
}

// An elegant hand-drawn pointing arrow connecting contents
export function HandDrawnArrow({ className = '', color = '#C5A059', duration = 1.2, delay = 0.2 }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 100 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute pointer-events-none ${className}`}
    >
      <motion.path
        d="M 12 12 Q 55 5, 82 42"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.8 }}
        viewport={{ once: true }}
        transition={{ duration, delay, ease: 'easeOut' }}
      />
      <motion.path
        d="M 68 34 L 84 41 L 81 23"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 0.8, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: delay + duration - 0.2 }}
      />
    </svg>
  );
}

// Floating Fluid Background Blob
interface BlobProps {
  className?: string;
  color?: string; // e.g. 'bg-[#C5A059]'
  delay?: number;
}
export function BackgroundGlowBlob({ className = '', color = 'rgba(197, 160, 89, 0.05)', delay = 0 }: BlobProps) {
  return (
    <div
      style={{
        animationDelay: `${delay}s`,
        background: `radial-gradient(circle, ${color} 0%, transparent 60%)`
      }}
      className={`absolute rounded-full pointer-events-none animate-glow-blob ${className}`}
    />
  );
}
