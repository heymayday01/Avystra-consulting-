import React, { useState, useEffect, useRef } from 'react';
import { User, Quote, FlameKindling } from 'lucide-react';
import { motion } from 'motion/react';
import founderPortrait from '../assets/images/founder_portrait_1781697991107.jpg';
import { DoodleSparkle, HighlightCircle, BackgroundGlowBlob, UnderlineSquiggle, HandDrawnArrow } from './DoodleWidgets';
import { gsap } from 'gsap';

interface StatRingProps {
  id: string;
  percentage: number;
  label: string;
  context: string;
}

export default function StatsFounder() {
  const [photoFailed, setPhotoFailed] = useState(false);

  const stats: StatRingProps[] = [
    {
      id: 'stat-managers',
      percentage: 59,
      label: 'Untrained Leaders',
      context: 'of middle managers receive zero formal delegation or team building education before scaling.'
    },
    {
      id: 'stat-alignment',
      percentage: 70,
      label: 'Alignment Blindspots',
      context: 'of team players cannot name their enterprise’s core operational or strategy priorities.'
    },
    {
      id: 'stat-failure',
      percentage: 67,
      label: 'Strategy Leakage',
      context: 'of executive corporate strategies fall flat due to a severe blueprint-to-SOP translation gap.'
    },
    {
      id: 'stat-retention',
      percentage: 82,
      label: 'Attrition Hazard',
      context: 'of elite players say frustrating organizational processes are the prime reason they flee.'
    }
  ];

  return (
    <section id="team" className="relative py-20 bg-white border-t border-slate-200 overflow-hidden md:py-28">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-blue-500/1 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#C5A059]/1 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="mb-16 md:mb-24 text-left">
          <div className="flex items-center gap-2 mb-4">
            <FlameKindling className="w-4 h-4 text-[#C5A059]" />
            <span className="text-[10px] text-[#C5A059] font-mono tracking-widest font-bold uppercase">
              Corporate Diagnostics & Team
            </span>
          </div>
          <h2 className="font-display font-medium text-3xl sm:text-5xl text-[#0A192F] tracking-tight leading-none mb-6">
            The Metric Truth of <span className="font-serif italic font-light text-[#C5A059]">Leadership</span>
          </h2>
          <p className="text-slate-500 font-sans text-base sm:text-lg max-w-3xl font-light leading-relaxed">
            Data gathered in the field from corporate environments validates the critical structural friction organizations suffer from today.
          </p>
        </div>

        {/* 4 Glowing SVG Progress Rings Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-24 md:mb-32">
          {stats.map((stat, idx) => (
            <StatProgressRing key={stat.id} stat={stat} index={idx} />
          ))}
        </div>

        {/* Founder Row Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Founder Photo Portrait Column */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[340px]"
            >
              {/* Clean, Unshaded Frame bordered by a thin Slate rule (no back-glow/outer shadows) */}
              <div className="relative rounded-2xl bg-white p-3 border border-slate-200">
                <div className="relative overflow-hidden rounded-xl aspect-[4/5] bg-slate-50 flex items-center justify-center border border-slate-100 p-0.5 group">
                  {!photoFailed ? (
                    <img
                      src={founderPortrait}
                      alt="Kirankumar Pandey"
                      referrerPolicy="no-referrer"
                      onError={() => setPhotoFailed(true)}
                      className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      id="founder-portrait"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center p-6 text-slate-400" id="founder-portrait-fallback">
                      <div className="w-20 h-20 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[#C5A059] mb-4">
                        <User className="w-10 h-10" />
                      </div>
                      <span className="text-sm font-mono text-[#0A192F] font-bold uppercase">Kirankumar Pandey</span>
                      <span className="text-xs text-slate-500 mt-1 font-mono">Founder & Director</span>
                    </div>
                  )}

                  {/* Elegant floating badge */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                    <span className="text-[10px] text-[#0A192F] font-mono tracking-widest font-bold uppercase">
                      FOUNDER & DIRECTOR
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Founder Philosophy Statements Column */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="space-y-6"
            >
              {/* Quote bubble decor */}
              <div className="inline-flex p-3 rounded-xl bg-slate-50 border border-slate-200 text-[#C5A059] shadow-sm">
                <Quote className="w-5 h-5" />
              </div>

              {/* Core Quote Accent paragraph */}
              <blockquote className="text-xl sm:text-2xl text-[#0A192F] font-serif italic font-light tracking-tight leading-relaxed text-slate-800">
                "Many outstanding businesses fail to scale, not due to market conditions, but because of <span className="font-sans font-semibold text-[#C5A059] not-italic text-lg sm:text-xl relative inline-block mx-1">internal strategic friction<UnderlineSquiggle className="text-[#C5A059]" duration={1.6} delay={0.4} /></span>. We work directly with directors to convert boardroom ambiguity into precise daily operations."
              </blockquote>

              <p className="text-slate-500 text-sm sm:text-base font-sans font-light leading-relaxed">
                Kirankumar Pandey brings decades of corporate consulting prestige to the helm of AVYSTRA. Under his direction, the firm focuses strictly on operational mechanics — building clean delegation systems, middle management capability maps, and accountability tracks that drive long-term value.
              </p>

              {/* Sub quote highlights */}
              <div className="border-l-[3px] border-[#C5A059] pl-4 py-2 bg-slate-50 border-y border-r border-slate-100/50 rounded-r-lg">
                <p className="text-slate-600 font-mono text-xs sm:text-sm leading-relaxed font-semibold">
                  "The vital role of a leader is clear prioritization. When everything is deemed a priority, absolutely nothing functions as one."
                </p>
              </div>

              {/* Signature Info */}
              <div className="pt-4 border-t border-slate-200">
                <h4 className="text-base font-display font-bold text-[#0A192F]">Kirankumar Pandey</h4>
                <p className="text-slate-400 font-mono text-xs uppercase mt-0.5 tracking-wider">
                  Founder & Director, AVYSTRA Consulting Private Limited
                </p>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}

function StatProgressRing({ stat, index }: { stat: StatRingProps; index: number; key?: string }) {
  const [displayVal, setDisplayVal] = useState(0);
  const elementRef = React.useRef<HTMLDivElement>(null);

  const radius = 45;
  const stroke = 5;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (stat.percentage / 100) * circumference;

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const countObj = { value: 0 };
    const tween = gsap.to(countObj, {
      value: stat.percentage,
      duration: 1.6,
      ease: 'power2.out',
      delay: index * 0.15,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        setDisplayVal(Math.floor(countObj.value));
      },
    });

    return () => {
      tween.kill();
    };
  }, [stat.percentage, index]);

  return (
    <motion.div
      ref={elementRef}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-gradient-to-b from-slate-50/80 to-white/95 border border-slate-200/95 rounded-2xl p-5 sm:p-6 flex flex-col items-center text-center shadow-[0_4px_24px_rgba(15,23,42,0.02)] hover:shadow-[0_20px_48px_rgba(15,23,42,0.08)] hover:border-[#C5A059]/50 transition-all duration-500 hover:scale-[1.03] relative overflow-hidden"
      id={`stat-ring-${stat.id}`}
    >
      {index === 0 && (
        <DoodleSparkle className="-top-1 -right-1 text-[#C5A059]/40 scale-75" delay={0.4} />
      )}
      <div className="relative flex items-center justify-center w-28 h-28 mb-4">
        {index % 2 === 1 && (
          <HighlightCircle className="w-28 h-20 text-[#C5A059]/20 absolute z-0" duration={1.6} delay={0.5} />
        )}
        
        {/* Solid Navy background circle, sharp Gold progress indicator circle */}
        <svg height="100%" width="100%" viewBox="0 0 100 100" className="transform -rotate-90">
          {/* Solid Navy Background circle (from #0A192F) */}
          <circle
            stroke="#0A192F"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius + stroke}
            cy={radius + stroke}
            className="opacity-15"
          />
          {/* Sharp Gold progress active line indicator (from #C5A059) */}
          <motion.circle
            stroke="#C5A059"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: 'easeOut', delay: index * 0.15 }}
            r={normalizedRadius}
            cx={radius + stroke}
            cy={radius + stroke}
            style={{ strokeLinecap: 'round' }}
            className="relative"
          />
        </svg>
 
        {/* Center Percentage Display text - Navy Blue */}
        <div className="absolute font-display font-bold text-2xl text-[#0A192F]">
          {displayVal}%
        </div>
      </div>
 
      <h3 className="font-display font-bold text-sm sm:text-base text-[#0A192F] mb-1">
        {stat.label}
      </h3>
      <p className="text-slate-500 text-xs leading-relaxed font-light mt-1">
        {stat.context}
      </p>
    </motion.div>
  );
}
