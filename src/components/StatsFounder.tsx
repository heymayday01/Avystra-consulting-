import React, { useState, useRef } from 'react';
import { 
  User, 
  BarChart4, 
  Users2, 
  TrendingUp, 
  Briefcase 
} from 'lucide-react';
import { motion } from 'motion/react';
import founderPortrait from '../assets/images/founder_portrait_1781697991107.jpg';
import { UnderlineSquiggle } from './DoodleWidgets';

interface StatItemProps {
  id: string;
  value: string;
  percentage: number;
  label: string;
  context: string;
  icon: React.ReactNode;
}

export default function StatsFounder() {
  const [photoFailed, setPhotoFailed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Exact stats from PDF Page 4
  const stats: StatItemProps[] = [
    {
      id: 'stat-lost',
      value: '₹32.7T',
      percentage: 95,
      label: 'Financial Drain',
      context: 'lost to disengagement every year in India',
      icon: <TrendingUp className="w-5 h-5 text-[#C5A059]" />
    },
    {
      id: 'stat-managers',
      value: '82%',
      percentage: 82,
      label: 'Manager Selection',
      context: 'of companies choose the wrong managers',
      icon: <Users2 className="w-5 h-5 text-[#C5A059]" />
    },
    {
      id: 'stat-engaged',
      value: '23%',
      percentage: 23,
      label: 'Employee Engagement',
      context: 'of India employees are engaged at work',
      icon: <Briefcase className="w-5 h-5 text-[#C5A059]" />
    },
    {
      id: 'stat-responsibility',
      value: '69%',
      percentage: 69,
      label: 'Latent Ownership',
      context: 'of India employees willing to take extra responsibility',
      icon: <BarChart4 className="w-5 h-5 text-[#C5A059]" />
    }
  ];

  // Exact credentials from PDF Page 10 (A DECADE OF BUILDING WHAT WORKS)
  const credentials = [
    {
      title: "10+ YEARS",
      subtitle: "EXECUTIVE ADVISOR",
      desc: "Experience in advisory, consulting, and leadership development."
    },
    {
      title: "LEADERS & MANAGERS",
      subtitle: "ACCOUNTABILITY BLUEPRINTS",
      desc: "Supporting decision-makers in building accountability, ownership, and execution."
    },
    {
      title: "ACROSS ORGANIZATIONS",
      subtitle: "DIVERSE EXPERIENCE",
      desc: "Professional experience across diverse organizational environments."
    },
    {
      title: "MEASURABLE IMPACT",
      subtitle: "REAL OUTCOMES",
      desc: "Every engagement designed to drive implementation, improvement, and outcomes."
    }
  ];

  return (
    <section id="team" ref={sectionRef} className="relative py-12 bg-transparent border-none overflow-hidden animate-fade-in">
      
      {/* Background radial spotlights */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(197, 160, 89, 0.04) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[20%] left-[-15%] w-[550px] h-[550px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(147, 197, 253, 0.03) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION 1: PDF PAGE 4 STATS */}
        <div className="mb-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/60 border border-slate-200/50 rounded-full mb-3 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
              <span className="text-[9px] text-[#0A192F] font-mono tracking-widest font-bold uppercase">The Numbers Don't Lie</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4.5xl text-[#0A192F] tracking-tight mb-3">
              The Cost of <span className="font-serif italic font-light text-[#C5A059] relative inline-block">Disengagement is Real<UnderlineSquiggle className="text-[#C5A059]" duration={1.5} delay={0.3} /></span>
            </h2>
            <p className="text-slate-600 font-sans text-xs sm:text-sm max-w-lg mx-auto font-medium leading-relaxed">
              Research-backed insights that every enterprise leader must confront regarding workforce alignment and manager performance.
            </p>
          </motion.div>

          {/* Page 4 Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, idx) => (
              <motion.div 
                key={stat.id}
                initial={{ opacity: 0, scale: 0.95, y: 25 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <StatCard stat={stat} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* SECTION 2: PDF PAGE 10 - ABOUT THE FOUNDER */}
        <div className="border-t border-slate-100 pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Founder Portrait Column */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative w-full max-w-[320px]">
                <div className="relative rounded-2xl p-2.5 shadow-md bg-gradient-to-br from-white to-slate-50 border border-slate-100 transition-all duration-500 hover:scale-[1.01]">
                  <div className="relative overflow-hidden rounded-xl aspect-[4/5] bg-slate-50/40 flex items-center justify-center border border-white/40 p-0.5">
                    {!photoFailed ? (
                      <img
                        src={founderPortrait}
                        alt="Kirankumar Pandey"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        onError={() => setPhotoFailed(true)}
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center p-6 text-slate-400">
                        <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[#C5A059] mb-3">
                          <User className="w-8 h-8" />
                        </div>
                        <span className="text-xs font-mono text-[#0A192F] font-bold uppercase">Kirankumar Pandey</span>
                        <span className="text-[10px] text-slate-500 mt-1 font-mono">Founder & Director</span>
                      </div>
                    )}

                    {/* Floating badge */}
                    <div className="absolute bottom-4 left-4 bg-[#0A192F] px-3 py-1 rounded-md border border-slate-800 shadow-md">
                      <span className="text-[8px] text-[#C5A059] font-mono tracking-widest font-bold uppercase">
                        FOUNDER &amp; DIRECTOR
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Founder Philosophy Column */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7"
            >
              <div className="space-y-5 text-left">
                <span className="text-[9px] font-mono tracking-[0.25em] font-extrabold uppercase text-[#C5A059] block">
                  ABOUT // The Person Behind AVYSTRA.
                </span>
                
                <h3 className="font-display font-bold text-3xl text-[#0A192F] tracking-tight">
                  Kirankumar Pandey
                </h3>

                <p className="text-slate-600 text-[13px] sm:text-sm font-sans font-normal leading-relaxed">
                  Most organizations don't struggle with knowing what to do. They struggle with consistently doing it. Kirankumar Pandey has spent over a decade in that room — and what he kept seeing wasn't a knowledge problem. It was a doing problem.
                </p>

                <p className="text-slate-500 text-[12.5px] sm:text-[13px] font-sans font-light leading-relaxed">
                  Postgraduate and MBA, Kirankumar built his career on one demanding skill — holding a room of skeptical, distracted people and making something complex land so clearly that they couldn't ignore it. That ability to translate structure into immediate action became the engine behind AVYSTRA.
                </p>

                {/* Exact blockquote Quote from Page 10 */}
                <div className="border-l-2 border-[#C5A059] pl-4 py-3 my-4 bg-gradient-to-br from-white to-slate-50 border border-slate-100 rounded-r-2xl">
                  <p className="text-[#0A192F] font-serif italic text-sm sm:text-[15px] leading-relaxed font-semibold">
                    “Great companies aren’t built by knowing more. They are built by executing better.”
                  </p>
                </div>

                <p className="text-slate-500 text-[12px] sm:text-[12.5px] font-sans font-light leading-relaxed">
                  Across advisory, consulting, and director-level roles, he built AVYSTRA on that conviction — every program research-backed, organization-specific, and measured for outcomes.
                </p>
              </div>
            </motion.div>

          </div>

          {/* Credentials Block (A DECADE OF BUILDING WHAT WORKS) */}
          <div className="mt-14 pt-8 border-t border-slate-100 text-left">
            <h4 className="text-[10px] font-mono font-bold text-[#C5A059] uppercase tracking-widest text-center mb-8">
              — A DECADE OF BUILDING WHAT WORKS —
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {credentials.map((cred, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className="p-5 rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-slate-100 hover:border-[#C5A059]/30 transition-all duration-300 shadow-sm"
                >
                  <span className="text-base font-display font-black text-[#0A192F] tracking-tight uppercase leading-none block">
                    {cred.title}
                  </span>
                  <span className="text-[8px] font-mono text-[#C5A059] uppercase tracking-widest font-black block mt-1 leading-none mb-3">
                    {cred.subtitle}
                  </span>
                  <p className="text-slate-500 font-sans text-[11px] leading-relaxed font-light">
                    {cred.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

const StatCard = React.memo(function StatCard({ stat }: { stat: StatItemProps }) {
  return (
    <div
      className="relative rounded-2xl p-5 bg-gradient-to-br from-white to-slate-50 border border-slate-100 flex flex-col items-center text-center group transition-all duration-300 hover:border-[#C5A059]/35 hover:-translate-y-1"
    >
      <div className="p-3 bg-[#C5A059]/10 rounded-full text-[#C5A059] mb-4 shrink-0">
        {stat.icon}
      </div>

      <span className="font-display font-black text-3xl text-[#0A192F] tracking-tight block">
        {stat.value}
      </span>

      <span className="text-[8px] font-mono font-bold text-[#C5A059] uppercase tracking-widest mt-1 mb-2">
        {stat.label}
      </span>

      <p className="text-slate-500 text-xs font-sans font-light leading-normal leading-relaxed">
        {stat.context}
      </p>
    </div>
  );
});
