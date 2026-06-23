import React, { useState, ReactNode, MouseEvent } from 'react';
import { ShieldAlert, BookOpenCheck, Target, Users2, AlertOctagon } from 'lucide-react';
import { motion } from 'motion/react';
import { DoodleSparkle, HighlightCircle } from './DoodleWidgets';
import AmbientCanvasBackground from './AmbientCanvasBackground';
import TextReveal from './TextReveal';

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
      colSpan: 'md:col-span-7'
    },
    {
      id: 'point-2',
      title: 'Managerial Escalation Trap',
      metric: '59% Got Zero Training',
      description: 'Individual contributors are rapidly promoted into leadership roles with zero operational and delegation framework support.',
      subText: 'This creates micromanagement loops and extreme scaling friction.',
      icon: <BookOpenCheck className="w-6 h-6 text-[#C5A059]" />,
      colSpan: 'md:col-span-5'
    },
    {
      id: 'point-3',
      title: 'Priority Blindness',
      metric: '70% Alignment Gap',
      description: 'Departments are misaligned on core objectives, leading teams to work at competing cross-purposes, wasting hours and human capital.',
      subText: 'Only a minor fraction of players understand the actual tactical priorities of their enterprise.',
      icon: <ShieldAlert className="w-6 h-6 text-[#C5A059]" />,
      colSpan: 'md:col-span-4'
    },
    {
      id: 'point-4',
      title: 'Top-Performer Flight Risk',
      metric: '82% Attrition Drivers',
      description: 'Enterprise star-players do not abandon bad companies; they flee structural ambiguity, chaotic workflows, and metrics voids.',
      subText: 'Friction-less performance frameworks are required to preserve high-value headcount.',
      icon: <Users2 className="w-6 h-6 text-[#C5A059]" />,
      colSpan: 'md:col-span-8'
    }
  ];

  return (
    <section id="bottlenecks" className="relative py-8 bg-transparent border-t border-slate-100/30 overflow-hidden md:py-12">
      {/* High-performance GPU-accelerated background canvas handled globally in App.tsx */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-10 md:mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertOctagon className="w-4 h-4 text-[#C5A059]" />
            <span className="text-[10px] text-[#C5A059] font-mono tracking-widest font-bold uppercase">
              Corporate Friction Analysis
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-[#0A192F] tracking-tight leading-[1.05] mb-6 inline-flex flex-wrap gap-x-2">
            <TextReveal text="Sound " delay={0.2} blur={true} wordClassName="inline-block" />
            <TextReveal text="Familiar?" delay={0.4} blur={true} wordClassName="font-serif italic font-light text-[#C5A059] inline-block" />
          </h2>
          <TextReveal 
            text="Most operational failure is not a workforce performance issue — it is an organizational architecture defect. These bottlenecks prevent execution."
            as="p"
            className="text-slate-500 font-sans text-base sm:text-lg font-light leading-relaxed max-w-2xl"
            delay={0.6}
            blur={true}
          />
        </motion.div>

        {/* Bento Grid Layer */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative rounded-[2rem] p-10 sm:p-12 overflow-hidden transition-all duration-700 hover:border-[#C5A059]/40 hover:shadow-[0_40px_80px_-20px_rgba(15,23,42,0.12)] ${point.colSpan} flex flex-col justify-between min-h-[340px] liquid-glass`}
      whileHover={{ y: -8 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      id={`bento-card-${point.id}`}
    >
      {/* Interactive Cursor Spotlight Backplate overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100 z-0"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(197, 160, 89, 0.08), transparent 80%)`
        }}
      />

      {/* Modern Refractive Edge highlight */}
      <div className="absolute inset-[1px] rounded-[1.95rem] pointer-events-none border border-white/50 z-10" />

      {/* Card Content Header */}
      <div className="relative z-10 flex items-start justify-between">
        <div className="relative">
          <div className="p-4 liquid-glass rounded-xl shadow-sm relative z-10 text-[#C5A059] group-hover:bg-[#C5A059]/10 group-hover:scale-110 transition-all duration-500">
            {point.icon}
          </div>
          {index === 0 && (
            <DoodleSparkle className="-top-4 -left-4 text-[#C5A059]/40" delay={0.5} />
          )}
        </div>
        
        <div className="relative">
          <div className="liquid-glass text-slate-800 font-mono text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] relative z-10 group-hover:border-[#C5A059]/40 group-hover:text-[#C5A059] transition-colors duration-500">
            {point.metric}
          </div>
        </div>
      </div>

      {/* Card Main Body */}
      <div className="relative z-10 mt-10">
        <h3 className="font-display font-black text-xl sm:text-2xl text-[#0A192F] tracking-tight mb-4 group-hover:text-[#C5A059] transition-colors duration-500">
          {point.title}
        </h3>
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-light mb-6 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
          {point.description}
        </p>
        <div className="border-t border-slate-100 pt-5 mt-4">
          <p className="text-[#C5A059] text-[10px] font-mono font-black uppercase tracking-[0.2em]">
            Observation:
          </p>
          <p className="text-slate-400 text-xs sm:text-sm font-light mt-1 italic">
            {point.subText}
          </p>
        </div>
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
