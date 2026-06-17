import React, { useState, ReactNode, MouseEvent } from 'react';
import { ShieldAlert, BookOpenCheck, Target, Users2, AlertOctagon } from 'lucide-react';
import { motion } from 'motion/react';
import { DoodleSparkle, HighlightCircle, BackgroundGlowBlob } from './DoodleWidgets';

interface BentoCardProps {
  id: string;
  title: string;
  metric: string;
  description: string;
  subText: string;
  icon: ReactNode;
  colSpan: string;
}

export default function BentoGrid() {
  const painPoints: BentoCardProps[] = [
    {
      id: 'point-1',
      title: 'The Strategy-Execution Silo',
      metric: '67% Failure Rate',
      description: 'Strategic plans sit neatly formatted on executive Drives, while bottom-of-the-pyramid execution operates in daily silos.',
      subText: 'Firms suffer from strategy leakage where board vision never materializes into team work loops.',
      icon: <Target className="w-6 h-6 text-[#C5A059]" />,
      colSpan: 'md:col-span-2'
    },
    {
      id: 'point-2',
      title: 'Managerial Escalation Trap',
      metric: '59% Got Zero Training',
      description: 'Individual contributors are rapidly promoted into leadership roles with zero operational and delegation framework support.',
      subText: 'This creates micromanagement loops and extreme scaling friction.',
      icon: <BookOpenCheck className="w-6 h-6 text-[#C5A059]" />,
      colSpan: 'md:col-span-1'
    },
    {
      id: 'point-3',
      title: 'Priority Blindness',
      metric: '70% Alignment Gap',
      description: 'Departments are misaligned on core objectives, leading teams to work at competing cross-purposes, wasting hours and human capital.',
      subText: 'Only a minor fraction of players understand the actual tactical priorities of their enterprise.',
      icon: <ShieldAlert className="w-6 h-6 text-[#C5A059]" />,
      colSpan: 'md:col-span-1'
    },
    {
      id: 'point-4',
      title: 'Top-Performer Flight Risk',
      metric: '82% Attrition Drivers',
      description: 'Enterprise star-players do not abandon bad companies; they flee structural ambiguity, chaotic workflows, and metrics voids.',
      subText: 'Friction-less performance frameworks are required to preserve high-value headcount.',
      icon: <Users2 className="w-6 h-6 text-[#C5A059]" />,
      colSpan: 'md:col-span-2'
    }
  ];

  return (
    <section id="bottlenecks" className="relative py-20 bg-[#F5F6F8] border-t border-slate-200 overflow-hidden md:py-28">
      {/* Subtle background items */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] rounded-full bg-[#C5A059]/2 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] rounded-full bg-blue-500/2 blur-[100px] pointer-events-none" />

      {/* Floating fluid glow elements for elegant layers */}
      <BackgroundGlowBlob className="top-1/5 right-10 w-[400px] h-[400px]" color="bg-[#C5A059]/3" delay={1} />
      <BackgroundGlowBlob className="bottom-1/5 left-10 w-[500px] h-[500px]" color="bg-blue-300/3" delay={4} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <div className="flex items-center gap-2 mb-4">
            <AlertOctagon className="w-4 h-4 text-[#C5A059]" />
            <span className="text-[10px] text-[#C5A059] font-mono tracking-widest font-bold uppercase">
              Corporate Friction Analysis
            </span>
          </div>
          <h2 className="font-display font-medium text-3xl sm:text-5xl md:text-6xl text-[#0A192F] tracking-tight leading-[1.05] mb-6">
            Sound <span className="font-serif italic font-light text-[#C5A059]">Familiar</span>?
          </h2>
          <p className="text-slate-500 font-sans text-base sm:text-lg font-light leading-relaxed max-w-2xl">
            Most operational failure is not a workforce performance issue — it is an <span className="font-serif italic text-[#C5A059] font-medium">organizational architecture</span> defect. These bottlenecks prevent execution.
          </p>
        </div>

        {/* Bento Grid Layer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 gsap-stagger-container">
          {painPoints.map((point, index) => (
            <BentoCard key={point.id} point={point} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}

function BentoCard({ point, index }: { point: BentoCardProps; index: number; key?: string }) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const rectRef = React.useRef<DOMRect | null>(null);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rectRef.current && cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
    if (rectRef.current && cardRef.current) {
      const x = e.clientX - rectRef.current.left;
      const y = e.clientY - rectRef.current.top;
      cardRef.current.style.setProperty('--mouse-x', `${x}px`);
      cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    }
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
      className={`gsap-stagger-card group relative rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-8 overflow-hidden shadow-[0_4px_24px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_48px_rgba(15,23,42,0.08)] transition-all duration-500 hover:border-[#C5A059]/50 ${point.colSpan} flex flex-col justify-between min-h-[300px] hover:scale-[1.01]`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      id={`bento-card-${point.id}`}
    >
      {/* Interactive Cursor Spotlight Backplate overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-0"
        style={{
          background: `radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(197, 160, 89, 0.05), transparent 80%)`
        }}
      />

      {/* Decorative Top Line Glow highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

      {/* Card Content Header */}
      <div className="relative z-10 flex items-start justify-between">
        <div className="relative">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 shadow-sm relative z-10">
            {point.icon}
          </div>
          {index === 0 && (
            <DoodleSparkle className="-top-3 -left-3 text-[#C5A059]/80" delay={0.5} />
          )}
        </div>
        
        <div className="relative">
          <div className="bg-[#C5A059]/10 text-[#0A192F] border border-[#C5A059]/20 font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider relative z-10">
            {point.metric}
          </div>
          {index % 2 === 0 && (
            <HighlightCircle className="w-20 sm:w-24 h-11 -top-3.5 -right-3 text-[#C5A059]/70" duration={1.6} delay={0.4 + index * 0.1} />
          )}
        </div>
      </div>

      {/* Card Main Body */}
      <div className="relative z-10 mt-8">
        <h3 className="font-display font-bold text-lg sm:text-xl text-[#0A192F] tracking-tight mb-2 group-hover:text-[#C5A059] transition-colors duration-300">
          {point.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed font-light mb-4">
          {point.description}
        </p>
        <p className="text-slate-400 text-xs sm:text-sm font-mono uppercase tracking-wider mt-2 border-t border-slate-100 pt-3">
          {point.subText}
        </p>
      </div>

      {/* Tiny Accent Vector Corner element */}
      <div className="absolute bottom-3 right-3 w-4 h-4 opacity-5 pointer-events-none group-hover:opacity-30 transition-opacity text-[#C5A059]">
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path d="M5 21h14a2 2 0 0 0 2-2V5" />
        </svg>
      </div>

    </motion.div>
  );
}
