import React, { ReactNode } from 'react';
import { ChevronRight, ClipboardList, DraftingCompass, ServerCrash, BarChart4, ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';
import { DoodleSparkle, HighlightCircle, HandDrawnArrow, BackgroundGlowBlob, UnderlineSquiggle } from './DoodleWidgets';

interface PhaseProps {
  id: string;
  step: string;
  title: string;
  description: string;
  activities: string[];
  icon: ReactNode;
}

export default function Flowchart() {
  const phases: PhaseProps[] = [
    {
      id: 'phase-assess',
      step: '01',
      title: 'Assess',
      description: 'Audit existing structural networks and organizational alignments.',
      activities: [
        'Critical leadership interviews',
        'Strategy leakage diagnostics',
        'Workflow & communication audit'
      ],
      icon: <ClipboardList className="w-5 h-5 text-[#C5A059]" />
    },
    {
      id: 'phase-design',
      step: '02',
      title: 'Design',
      description: 'Architect custom blueprints and priority synchronization playbooks.',
      activities: [
        'Top-three priorities mapping',
        'Role-accountability frameworks',
        'KPI & tracking dashboards design'
      ],
      icon: <DraftingCompass className="w-5 h-5 text-[#C5A059]" />
    },
    {
      id: 'phase-deliver',
      step: '03',
      title: 'Deliver',
      description: 'Hands-on training, playbook launch and tactical delegation rollout.',
      activities: [
        'Middle management training',
        'Standard operating procedures (SOPs)',
        'Silo breakdown workshops'
      ],
      icon: <ServerCrash className="w-5 h-5 text-[#C5A059]" />
    },
    {
      id: 'phase-measure',
      step: '04',
      title: 'Measure',
      description: 'Verify operational alignment speed and audit talent retention index.',
      activities: [
        'Operational speed velocity checks',
        'Strategic priority pulse survey',
        'Alignment dashboard validation'
      ],
      icon: <BarChart4 className="w-5 h-5 text-[#C5A059]" />
    }
  ];

  return (
    <section id="process" className="relative py-20 bg-[#F5F6F8] border-t border-slate-200 overflow-hidden md:py-28">
      {/* Subtle overlay background */}
      <div className="absolute inset-0 grid-overlay z-0 opacity-40 pointer-events-none" />

      {/* Floating fluid glow elements */}
      <BackgroundGlowBlob className="top-10 left-10 w-[380px] h-[380px]" color="bg-[#C5A059]/4" delay={2} />
      <BackgroundGlowBlob className="bottom-12 right-12 w-[420px] h-[420px]" color="bg-blue-300/3" delay={5} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-slate-200 mb-4 shadow-sm relative">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            <span className="text-[10px] text-slate-500 font-mono tracking-wider font-bold uppercase">Our Execution Blueprint</span>
            <DoodleSparkle className="-top-4 -right-4 text-[#C5A059]" delay={0.7} />
          </div>
          <h2 className="font-display font-medium text-3xl sm:text-5xl text-[#0A192F] tracking-tight mb-8">
            The AVYSTRA <span className="font-serif italic font-light text-[#C5A059] relative inline-block px-1">System Flow<UnderlineSquiggle className="text-[#C5A059]" duration={1.5} delay={0.4} /></span>
          </h2>
          <p className="text-slate-500 text-base sm:text-lg font-light leading-relaxed">
            We don’t just write advice. We operationalize strategy using a highly structured, repeatable four-stage lifecycle designed for high-end organizational velocity.
          </p>
        </div>

        {/* Chronological Flow Track */}
        {/* Desktop Layout - Horizontal Connectors */}
        <div className="hidden lg:block relative mt-12 pb-12">
          {/* Connecting Vector Thread */}
          <div className="absolute top-[52px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-slate-200 via-[#C5A059]/40 to-slate-200 pointer-events-none" />

          <div className="grid grid-cols-4 gap-8">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
                className="relative group"
                id={`flow-step-desktop-${phase.id}`}
              >
                {/* Flow Node Bubble */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-white border-2 border-slate-200 group-hover:border-[#C5A059] flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110 z-10 relative">
                    {phase.icon}
                    {/* Floating Step Badge */}
                    <div className="absolute -top-1 -right-1 bg-[#C5A059] text-white text-xs font-mono font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-md">
                      {phase.step}
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="mt-8">
                    <h3 className="font-display font-bold text-lg text-[#0A192F] group-hover:text-[#C5A059] transition-colors block mb-2">
                      {phase.title}
                    </h3>
                    <p className="text-slate-500 text-sm font-light leading-relaxed mb-4 min-h-[50px]">
                      {phase.description}
                    </p>

                    {/* Bullet Points */}
                    <ul className="text-left space-y-2.5 mx-auto max-w-[220px]">
                      {phase.activities.map((act, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-500">
                          <ChevronRight className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Layout - Vertical Timeline */}
        <div className="lg:hidden relative space-y-12 ml-8 sm:ml-12 pl-6 sm:pl-8 border-l-2 border-slate-200">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
              id={`flow-step-mobile-${phase.id}`}
            >
              {/* Timeline Indicator Node - Centered perfectly on the line with no clipping */}
              <div className="absolute -left-[19px] sm:-left-[23px] top-0 w-[36px] sm:w-[44px] h-[36px] sm:h-[44px] rounded-full bg-white border-2 border-[#C5A059] flex items-center justify-center shadow-md z-10 text-[#C5A059]">
                {phase.icon}
              </div>

              {/* Step indicator */}
              <div className="text-[#C5A059] font-mono text-xs font-bold mb-1">
                PHASE {phase.step} — {phase.title.toUpperCase()}
              </div>
              <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(15,23,42,0.03)] hover:shadow-[0_16px_32px_rgba(15,23,42,0.06)] transition-all duration-300">
                <h3 className="font-display font-bold text-xl text-[#0A192F] mb-2">
                  {phase.title}
                </h3>
                <p className="text-slate-500 text-sm sm:text-base font-light mb-4 leading-relaxed">
                  {phase.description}
                </p>

                {/* Sub-Activities Bulletpoints */}
                <div className="border-t border-slate-100 pt-4">
                  <h4 className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest mb-3">Key Milestones:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {phase.activities.map((act, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-500">
                        <ChevronRight className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Connecting Timeline Arrow for Mobile */}
        <div className="lg:hidden flex justify-center pt-8">
          <div className="animate-bounce bg-white border border-slate-200 p-2.5 rounded-full text-[#C5A059] shadow-md">
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>

      </div>
    </section>
  );
}
