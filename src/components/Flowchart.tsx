import React, { useState } from 'react';
import { 
  Search, 
  Lightbulb, 
  Settings, 
  TrendingUp, 
  Users, 
  ClipboardCheck, 
  GraduationCap, 
  ShieldCheck, 
  ChevronDown,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DoodleSparkle, UnderlineSquiggle } from './DoodleWidgets';

interface StepData {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  iconClassName: string;
  outputIcon: React.ReactNode;
  outputLabel: string;
  outputDetails: string;
  activities: string[];
}

export default function Flowchart() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const steps: StepData[] = [
    {
      step: 1,
      title: "ASSESS",
      subtitle: "Find The Real Bottleneck",
      description: "We start by identifying exactly where and how performance is breaking down in your organization — using a structured assessment, not assumptions or guesswork.",
      icon: <Search className="w-6 h-6 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />,
      iconClassName: "group-hover:bg-[#C5A059]/10 group-hover:border-[#C5A059]/30",
      outputIcon: <Users className="w-4 h-4 text-[#C5A059]" />,
      outputLabel: "OUTPUT",
      outputDetails: "Diagnostic Report & Root Cause Insights",
      activities: [
        "Granular 14-day critical-path organizational audit",
        "Comprehensive leadership alignment review & interviews",
        "Visual mapping of operational and delegation gaps"
      ]
    },
    {
      step: 2,
      title: "DESIGN",
      subtitle: "Build The Right System",
      description: "Based on what we find, we design a focused plan built specifically for your organization's gaps — not a generic module relabeled with your company name.",
      icon: <Lightbulb className="w-6 h-6 transition-transform duration-500 group-hover:scale-110" />,
      iconClassName: "group-hover:bg-[#C5A059]/10 group-hover:border-[#C5A059]/30",
      outputIcon: <ClipboardCheck className="w-4 h-4 text-[#C5A059]" />,
      outputLabel: "OUTPUT",
      outputDetails: "Custom Action Plan & Frameworks",
      activities: [
        "Delineation of roles & decision-making matrices",
        "SOP design custom-built for company bottlenecks",
        "Middle-management delegation blueprint structures"
      ]
    },
    {
      step: 3,
      title: "DELIVER",
      subtitle: "Embed New Behaviours",
      description: "Structured, facilitated sessions with proprietary named frameworks, participant workbooks, and implementation tools your team applies the same week.",
      icon: <Settings className="w-6 h-6 transition-transform duration-1000 group-hover:rotate-90" />,
      iconClassName: "group-hover:bg-[#C5A059]/10 group-hover:border-[#C5A059]/30",
      outputIcon: <GraduationCap className="w-4 h-4 text-[#C5A059]" />,
      outputLabel: "OUTPUT",
      outputDetails: "Trained Team & Implementation Tools",
      activities: [
        "Hands-on interactive workshops with custom workbooks",
        "Accountability coaching & direct SOP roll-outs",
        "Practical application frameworks applied in same week"
      ]
    },
    {
      step: 4,
      title: "MEASURE",
      subtitle: "Verify Real Improvement",
      description: "30-day follow-up checkpoint and a written impact report — so leadership can see measurable outcomes, not just participant satisfaction scores from the day.",
      icon: <TrendingUp className="w-6 h-6 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />,
      iconClassName: "group-hover:bg-[#C5A059]/10 group-hover:border-[#C5A059]/30",
      outputIcon: <TrendingUp className="w-4 h-4 text-[#C5A059]" />,
      outputLabel: "OUTPUT",
      outputDetails: "Impact Report & Next Steps",
      activities: [
        "Post-program audit measuring operational behavioral shifts",
        "Comprehensive written impact report delivered directly to leadership",
        "Sustained accountability checks & quarterly system updates"
      ]
    }
  ];

  const toggleExpand = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <section id="process" className="relative py-10 bg-transparent border-t border-slate-100 overflow-hidden select-none">
      
      {/* Dynamic Background Spotlights */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(197, 160, 89, 0.03) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[10%] left-[-15%] w-[550px] h-[550px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(147, 197, 253, 0.02) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/60 border border-slate-200/50 rounded-full mb-3.5 relative shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
            <span className="text-[9px] text-[#0A192F] font-mono tracking-widest font-bold uppercase">Our Implementation Methodology</span>
            <DoodleSparkle className="-top-4 -right-4 text-[#C5A059]/30" />
          </div>
          
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-[#0A192F] tracking-tight leading-tight uppercase">
            Our Four-Step <span className="font-serif italic font-light text-[#C5A059] relative inline-block px-1">Performance System<UnderlineSquiggle className="text-[#C5A059]" duration={1.5} delay={0.4} /></span>
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm font-sans font-light mt-4">
            We don't run isolated motivational sessions. We design, deliver, and verify bespoke organizational systems that build true operational sovereignty.
          </p>
        </div>

        {/* The Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative items-stretch">
          
          {/* Connecting Arrows / Flowing Pulses for Desktop Screens */}
          <div className="absolute top-[90px] left-[12.5%] right-[12.5%] h-px bg-slate-200 pointer-events-none hidden lg:block z-0">
            {/* Animated Laser Pulse 1 */}
            <motion.div 
              className="absolute top-[-2px] h-[5px] w-12 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent rounded-full shadow-[0_0_10px_#C5A059]"
              animate={{ left: ["0%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            {/* Animated Laser Pulse 2 (Staggered) */}
            <motion.div 
              className="absolute top-[-2px] h-[5px] w-12 bg-gradient-to-r from-transparent via-emerald-400 to-transparent rounded-full shadow-[0_0_10px_#10b981]"
              animate={{ left: ["0%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1.5 }}
            />
          </div>

          {steps.map((step, idx) => {
            const isHovered = hoveredCard === idx;
            const isExpanded = expandedCard === idx;

            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative flex flex-col justify-between bg-gradient-to-br from-white to-slate-50 border border-slate-100 rounded-[2.5rem] p-6 hover:shadow-[0_24px_50px_rgba(10,25,47,0.04)] hover:border-[#C5A059]/40 transition-all duration-500 z-10"
              >
                
                <div>
                  {/* Step Number Bubble */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center justify-center w-7 h-7 rounded-full bg-[#0A192F] border border-[#C5A059]/30 text-[#C5A059] font-mono text-xs font-black shadow-md z-20">
                    {step.step}
                  </div>

                  {/* Main Icon Outer Badge with dual border */}
                  <div className="flex justify-center mb-6 mt-2">
                    <div className="relative p-1.5 rounded-full border border-slate-100 bg-slate-50/50">
                      <div className={`flex items-center justify-center w-14 h-14 rounded-full bg-white border border-slate-200 text-[#0A192F] shadow-sm transition-all duration-500 ${step.iconClassName}`}>
                        {step.icon}
                        
                        {/* Custom micro-animations based on active state */}
                        {idx === 0 && (
                          <motion.div 
                            className="absolute inset-0 rounded-full border border-[#C5A059]/20 pointer-events-none"
                            animate={{ scale: [1, 1.25, 1], opacity: [0.8, 0, 0.8] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                        {idx === 1 && isHovered && (
                          <motion.div 
                            className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#C5A059] rounded-full flex items-center justify-center"
                            animate={{ scale: [1, 1.4, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Headers */}
                  <div className="text-center mb-4">
                    <h3 className="font-display font-black text-lg text-[#0A192F] tracking-wide mb-1">
                      {step.title}
                    </h3>
                    <p className="text-[#C5A059] font-serif italic text-xs font-light">
                      {step.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-slate-500 font-sans text-[12.5px] leading-relaxed text-center font-light mb-5 break-words">
                    {step.description}
                  </p>

                  {/* Interactive Details Accordion */}
                  <div className="mb-5 border-t border-slate-100 pt-3">
                    <button
                      onClick={() => toggleExpand(idx)}
                      className="w-full flex items-center justify-between py-1 px-1.5 rounded-lg hover:bg-slate-50 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 hover:text-[#0A192F] transition-all duration-300"
                    >
                      <span>Key Activities</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-[#C5A059]' : ''}`} />
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden mt-2"
                        >
                          <ul className="space-y-2 py-1 pl-1">
                            {step.activities.map((activity, aIdx) => (
                              <li key={aIdx} className="flex items-start gap-1.5 text-left text-slate-600">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                                <span className="font-sans text-[11px] leading-relaxed font-light">{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Golden Output Subcard exactly like the PDF */}
                <div className="relative mt-auto pt-1">
                  <div className="bg-[#C5A059]/5 border border-[#C5A059]/15 rounded-2xl p-4 flex gap-3 items-start text-left hover:bg-[#C5A059]/10 hover:border-[#C5A059]/30 transition-all duration-300">
                    <div className="p-1.5 bg-white border border-[#C5A059]/20 rounded-lg shrink-0 shadow-sm">
                      {step.outputIcon}
                    </div>
                    <div>
                      <span className="text-[8px] font-mono font-bold tracking-widest text-[#C5A059] uppercase block leading-none mb-1">
                        {step.outputLabel}
                      </span>
                      <p className="text-[#0A192F] font-sans text-[11px] font-semibold leading-normal">
                        {step.outputDetails}
                      </p>
                    </div>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Double Banner Message exactly like page 6 at the bottom of the section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-8 bg-[#0A192F] border border-[#C5A059]/30 rounded-[2.5rem] overflow-hidden shadow-2xl relative"
        >
          {/* Subtle architectural blueprint grid overlay */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-800">
            
            {/* Left Block: capability & systems */}
            <div className="md:col-span-7 p-6 sm:p-8 flex items-start gap-4 text-left">
              <div className="p-3 bg-[#C5A059]/10 rounded-2xl border border-[#C5A059]/20 text-[#C5A059] shrink-0 shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="text-[#C5A059] font-mono text-[9px] font-bold tracking-widest uppercase">System Integration Safeguard</p>
                <p className="text-slate-100 font-sans text-xs sm:text-[13.5px] font-light leading-relaxed">
                  We don't just build capability. We build <span className="text-[#C5A059] font-semibold underline decoration-[#C5A059]">accountability, ownership</span> and performance systems that stick.
                </p>
              </div>
            </div>

            {/* Right Block: leaders, teams, business */}
            <div className="md:col-span-5 p-6 sm:p-8 flex items-start gap-4 text-left">
              <div className="p-3 bg-[#C5A059]/10 rounded-2xl border border-[#C5A059]/20 text-[#C5A059] shrink-0 shadow-md">
                <Users className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="text-[#C5A059] font-mono text-[9px] font-bold tracking-widest uppercase">The Corporate Velocity Index</p>
                <p className="text-white font-sans text-sm sm:text-base font-bold leading-relaxed tracking-tight">
                  Stronger Leaders. <br />Stronger Teams. <span className="text-[#C5A059] font-serif italic font-light">Stronger Business.</span>
                </p>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
