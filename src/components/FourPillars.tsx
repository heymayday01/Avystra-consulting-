import React, { useRef } from 'react';
import { Compass, Target, Users, Landmark, Award, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { DoodleSparkle, UnderlineSquiggle } from './DoodleWidgets';
import TextReveal from './TextReveal';


interface Pillar {
  id: string;
  num: string;
  title: string;
  category: string;
  description: string;
  icon: React.ReactNode;
}

export default function FourPillars() {
  const sectionRef = useRef<HTMLElement>(null);

  const pillars: Pillar[] = [
    {
      id: 'pillar-direction',
      num: '01',
      category: 'DIRECTION',
      title: 'Leadership Development',
      description: 'Leaders who give their teams a clear direction to execute toward — and hold them accountable to it.',
      icon: <Compass className="w-5 h-5 text-[#C5A059]" />
    },
    {
      id: 'pillar-translation',
      num: '02',
      category: 'TRANSLATION',
      title: 'Manager Effectiveness',
      description: 'Managers who translate direction into what actually happens day to day — not bottlenecks who bring every problem back up.',
      icon: <Target className="w-5 h-5 text-[#C5A059]" />
    },
    {
      id: 'pillar-coordination',
      num: '03',
      category: 'COORDINATION',
      title: 'Team Effectiveness',
      description: 'Teams that own their outcomes, communicate clearly, and follow through — without constant supervision.',
      icon: <Users className="w-5 h-5 text-[#C5A059]" />
    },
    {
      id: 'pillar-sustainability',
      num: '04',
      category: 'SUSTAINABILITY',
      title: 'Organizational Performance',
      description: 'Systems that sustain improvement — so gains don\'t disappear three weeks after the program ends.',
      icon: <Landmark className="w-5 h-5 text-[#C5A059]" />
    }
  ];

  return (
    <section 
      id="pillars" 
      ref={sectionRef}
      className="relative py-8 md:py-12 bg-transparent overflow-hidden select-none"
    >
      {/* Removed local atmospheric orbs to favor global cinematic flow */}

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-6 md:mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-br from-white to-slate-50 border border-slate-100 px-4 py-2 rounded-full mb-3">
            <Award className="w-4 h-4 text-[#C5A059]" />
            <span className="text-[10px] text-slate-600 font-mono tracking-[0.2em] font-black uppercase">
              The Framework for Autonomy
            </span>
          </div>

          <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-[#0A192F] tracking-tight leading-[1.1] mb-4 uppercase">
            The Four Pillars of <span className="font-serif italic font-light text-[#C5A059] relative inline-block px-1">Organizational Excellence<UnderlineSquiggle className="text-[#C5A059]" duration={1.5} delay={0.4} /></span>
          </h2>
          
          <TextReveal 
            text="Sustainable performance isn't accidental. It's built on four pillars that strengthen your organization from the inside out."
            as="p"
            className="text-slate-500 font-sans text-lg md:text-xl font-light leading-relaxed max-w-2xl"
            delay={0.8}
            blur={true}
          />
        </motion.div>

        {/* Pillars Grid (Targeted Area) */}
        <div className="pillar-card-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              className="pillar-card group relative h-full flex flex-col"
            >
              <div className="relative h-full bg-gradient-to-br from-white to-slate-50 border border-slate-100 transition-all duration-700 rounded-[2.5rem] p-8 md:p-10 group-hover:shadow-[0_40px_80px_-20px_rgba(15,23,42,0.12)] group-hover:border-[#C5A059]/40 flex flex-col justify-between overflow-hidden will-change-transform">
                
                {/* Background Number Accent */}
                <span className="absolute top-6 right-8 text-7xl font-serif font-black text-slate-200/30 group-hover:text-slate-300/40 transition-colors duration-700 select-none z-0">
                  {pillar.num}
                </span>

                <div className="relative z-10">
                  {/* Icon Slot */}
                  <div className="mb-10 inline-flex p-4 rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-slate-100 text-[#C5A059] group-hover:bg-[#C5A059]/10 group-hover:scale-110 transition-all duration-500">
                    {pillar.icon}
                  </div>

                  {/* Category */}
                  <span className="block text-[9px] font-mono font-black text-[#C5A059] uppercase tracking-[0.2em] mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
                    {pillar.category}
                  </span>

                  {/* Main Title */}
                  <h3 className="font-display font-bold text-xl md:text-2xl text-[#0A192F] tracking-tight leading-snug mb-5">
                    {pillar.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-slate-500 text-sm md:text-[15px] font-light leading-relaxed transition-colors duration-500 group-hover:text-slate-700 break-words">
                    {pillar.description}
                  </p>
                </div>

                {/* Micro-interaction Footer */}
                <div className="relative z-10 mt-10 pt-6 border-t border-slate-100 flex items-center justify-between group-hover:border-[#C5A059]/10 transition-colors">
                  <span className="text-[10px] font-mono font-bold text-slate-400 group-hover:text-[#0A192F] transition-colors uppercase tracking-widest">
                    Phase {pillar.num}
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#C5A059] transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500" />
                </div>

                {/* Subtle Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-transparent to-[#C5A059]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </div>

              {idx === 0 && (
                <DoodleSparkle className="absolute -top-4 -right-4 text-[#C5A059]/20 group-hover:text-[#C5A059]/60 group-hover:scale-125 transition-all duration-700 pointer-events-none" delay={0.2} />
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
