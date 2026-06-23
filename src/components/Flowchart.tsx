import React, { ReactNode, useState, useEffect, useRef, Suspense, lazy } from 'react';
import { ChevronRight, ClipboardList, DraftingCompass, ServerCrash, BarChart4, ArrowDown } from 'lucide-react';
import { motion, useScroll, useSpring, useTransform, useInView } from 'motion/react';
import { DoodleSparkle, HighlightCircle, HandDrawnArrow, UnderlineSquiggle } from './DoodleWidgets';
import AmbientCanvasBackground from './AmbientCanvasBackground';

const ThreeFlowSection = lazy(() => import('./ThreeFlowSection'));

interface PhaseProps {
  id: string;
  step: string;
  title: string;
  description: string;
  activities: string[];
  icon: ReactNode;
}

export default function Flowchart() {
  const [use3D, setUse3D] = useState(false);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleResize = () => {
      // 1. Check client motion preferences
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // 2. Check mobile status & thread concurrency
      const isMobileOrLowEnd = window.innerWidth < 1024 || (navigator.hardwareConcurrency || 4) < 4;
      
      // 3. Query webgl contexts for offline GPU support
      const isWebGLAvailable = (() => {
        try {
          const canvas = document.createElement('canvas');
          return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (e) {
          return false;
        }
      })();

      setUse3D(!prefersReduced && !isMobileOrLowEnd && isWebGLAvailable);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // 4. Viewport Observer for lazy bundle imports - once visible, keep it loaded to prevent scrolling glitches
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
        }
      },
      { rootMargin: '600px' }
    );

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section 
      id="process" 
      ref={triggerRef}
      className={`relative bg-transparent border-none overflow-hidden ${use3D ? 'py-8 pb-0 sm:py-10 sm:pb-0 md:py-12 md:pb-0' : 'py-8 md:py-12'}`}
    >
      {/* Liquid Blob Backgrounds - Static layout for organic feel without GPU overhead */}
      <div 
        className="blob-container"
      >
        <div 
          className="blob w-[700px] h-[700px] -top-[15%] -left-[15%]" 
          style={{ 
            background: 'radial-gradient(circle, rgba(197, 160, 89, 0.12) 0%, rgba(197, 160, 89, 0) 70%)',
          }} 
        />
        <div 
          className="blob w-[600px] h-[600px] top-[15%] -right-[10%]" 
          style={{ 
            background: 'radial-gradient(circle, rgba(96, 165, 250, 0.08) 0%, rgba(96, 165, 250, 0) 70%)',
          }} 
        />
        <div 
          className="blob w-[500px] h-[500px] -bottom-[15%] left-[15%]" 
          style={{ 
            background: 'radial-gradient(circle, rgba(223, 206, 172, 0.10) 0%, rgba(223, 206, 172, 0) 70%)',
          }} 
        />
        <div 
          className="blob w-[350px] h-[350px] top-[40%] left-[35%]" 
          style={{ 
            background: 'radial-gradient(circle, rgba(197, 160, 89, 0.06) 0%, rgba(197, 160, 89, 0) 70%)',
          }} 
        />
      </div>

      {/* High-performance GPU-accelerated background canvas handled globally */}

      {/* Subtle overlay background */}
      {/* Intentionally removed local grid-overlay to prevent duplicate stacking with global overlay */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 select-none">
        
        {/* Section Header (Always present for SEO and consistent layout introduction) */}
        <div className={`text-center max-w-3xl mx-auto relative ${use3D ? 'mb-8 sm:mb-10' : 'mb-12 sm:mb-16 md:mb-20'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 liquid-glass-distorted rounded-full mb-4 relative">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            <span className="text-[10px] text-[#0A192F] font-mono tracking-widest font-black uppercase">Our Execution Blueprint</span>
            <DoodleSparkle className="-top-4 -right-4 text-[#C5A059]" delay={0.7} />
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-[#0A192F] tracking-tight mb-8">
            The AVYSTRA <span className="font-serif italic font-light text-[#C5A059] relative inline-block px-1">System Flow<UnderlineSquiggle className="text-[#C5A059]" duration={1.5} delay={0.4} /></span>
          </h2>
          <p className="text-slate-500 text-base sm:text-lg font-light leading-relaxed">
            We don’t just write advice. We operationalize strategy using a highly structured, repeatable four-stage lifecycle designed for high-end organizational velocity.
          </p>
        </div>
      </div>

      {use3D ? (
        <div className="w-full relative z-10">
          {isNearViewport ? (
            <Suspense 
              fallback={
                <div className="h-[320vh] w-full flex flex-col items-start justify-start pt-[30vh] bg-[#FAFAFA]/40 backdrop-blur-sm">
                  <div className="mx-auto flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full border-2 border-[#C5A059] border-t-transparent animate-spin mb-4" />
                    <p className="text-[10px] font-mono tracking-widest font-bold text-slate-400">LAUNCHING 3D SYSTEM SIMULATOR...</p>
                  </div>
                </div>
              }
            >
              <ThreeFlowSection phases={phases} />
            </Suspense>
          ) : (
            <div className="h-[320vh] w-full bg-[#FAFAFA]/10" />
          )}
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Chronological Flow Track - Desktop */}
          <div className="hidden lg:block relative mt-24 pb-24">
            {/* Connecting Vector Thread - Ultra Thin & Elegant */}
            <div className="absolute top-[60px] left-[5%] right-[5%] h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/30 to-transparent pointer-events-none" />

            <div className="grid grid-cols-4 gap-12">
              {phases.map((phase, index) => (
                <div
                  key={phase.id}
                  className="relative group h-full flex flex-col"
                  id={`flow-step-desktop-${phase.id}`}
                >
                  {/* Flow Node Bubble - Large & Impactful */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-32 h-32 rounded-full liquid-glass-distorted group-hover:border-[#C5A059]/40 flex items-center justify-center shadow-[0_12px_40px_-8px_rgba(0,0,0,0.03)] group-hover:shadow-[0_40px_80px_-20px_rgba(15,23,42,0.12)] transition-all duration-700 group-hover:scale-[1.05] z-10 relative will-change-transform">
                      <div className="group-hover:scale-110 transition-transform duration-700">
                        {phase.icon}
                      </div>
                      {/* Floating Step Badge - Premium Monogram Style */}
                      <div className="absolute -top-1 -right-1 bg-slate-900 text-[#C5A059] text-[10px] font-mono font-black w-8 h-8 rounded-full flex items-center justify-center border border-slate-800 shadow-lg group-hover:bg-[#C5A059] group-hover:text-white group-hover:border-[#C5A059] transition-all duration-700">
                        {phase.step}
                      </div>
                    </div>

                    {/* Body Details */}
                    <div className="mt-12 flex flex-col items-center">
                      <span className="block text-[10px] font-mono font-black text-[#C5A059] uppercase tracking-[0.2em] mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
                        STAGE {phase.step}
                      </span>
                      <h3 className="font-display font-black text-xl text-[#0A192F] group-hover:text-[#C5A059] transition-colors block mb-4 tracking-tight leading-none uppercase">
                        {phase.title}
                      </h3>
                      <p className="text-slate-500 text-sm font-light leading-relaxed mb-8 min-h-[50px] opacity-80 group-hover:opacity-100 transition-opacity duration-700">
                        {phase.description}
                      </p>

                      {/* Bullet Points - Refined Grid for Milestones */}
                      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-100 to-transparent mb-6 group-hover:via-[#C5A059]/20 transition-all duration-700" />
                      <ul className="text-left space-y-3.5 w-full">
                        {phase.activities.map((act, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-[11px] text-slate-400 group-hover:text-slate-600 transition-colors duration-500">
                            <ChevronRight className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                            <span className="font-sans leading-relaxed tracking-tight">{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile/Tablet Layout - Vertical Timeline with Scroll Animation */}
          <div ref={containerRef} className="lg:hidden relative ml-3 sm:ml-12 pl-8 sm:pl-10">
            {/* Dynamic Connecting Line - Background Track */}
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-slate-100 z-0" />
            
            {/* Active Progress Line */}
            <motion.div 
              style={{ scaleY, originY: 0 }}
              className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#C5A059] via-[#C5A059] to-[#C5A059]/20 shadow-[0_0_12px_rgba(197,160,89,0.4)] z-10"
            />

            <div className="space-y-12 py-4">
              {phases.map((phase, index) => (
                <MobilePhaseItem key={phase.id} phase={phase} index={index} />
              ))}
            </div>
          </div>

          {/* Connecting Timeline Arrow for Mobile */}
          <div className="lg:hidden flex justify-center pt-8">
            <div className="animate-bounce liquid-glass p-2.5 rounded-full text-[#C5A059]">
              <ArrowDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function MobilePhaseItem({ phase, index }: { phase: PhaseProps; index: number }) {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { margin: "-20%" });

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      className="relative"
    >
      {/* Timeline Indicator Node */}
      <motion.div 
        animate={{ 
          scale: isInView ? 1.1 : 0.9,
          backgroundColor: isInView ? '#ffffff' : 'rgba(255,255,255,0.4)',
          borderColor: isInView ? '#C5A059' : 'rgba(197, 160, 89, 0.2)'
        }}
        className="absolute -left-[32px] sm:-left-[42px] -translate-x-1/2 top-4 w-9 h-9 sm:w-12 sm:h-12 rounded-full border liquid-glass border-slate-200 flex items-center justify-center shadow-md z-20 transition-colors duration-500 bg-white"
      >
        <motion.div
          animate={{ color: isInView ? '#C5A059' : '#94a3b8' }}
        >
          {React.cloneElement(phase.icon as React.ReactElement<any>, {
            className: "w-4 h-4 sm:w-5 sm:h-5"
          })}
        </motion.div>
      </motion.div>

      {/* Card Content */}
      <motion.div 
        animate={{ 
          opacity: isInView ? 1 : 0.6,
          y: isInView ? 0 : 8
        }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="liquid-glass rounded-2xl p-5 sm:p-8 bg-white/30 backdrop-blur-sm border-slate-200/40 relative overflow-hidden group min-h-[280px]"
      >
          <div className="text-[#C5A059] font-mono text-[9px] font-bold mb-3 tracking-[0.2em] uppercase flex items-center gap-1.5">
            <span className={`w-1 h-1 rounded-full bg-[#C5A059] transition-transform duration-500 ${isInView ? 'scale-125 shadow-[0_0_8px_#C5A059]' : 'scale-75'}`} />
            <span>Phase {phase.step}</span>
          </div>

          <h3 className="font-display font-black text-xl text-[#0A192F] mb-3 uppercase tracking-tight">
            {phase.title}
          </h3>
          
          <p className="text-slate-600 text-[14px] font-light mb-8 leading-relaxed max-w-sm">
            {phase.description}
          </p>

          <div className="flex flex-col gap-3 mt-auto">
            {phase.activities.map((act, idx) => (
              <div key={idx} className="flex items-start gap-2 text-[12px] text-slate-600 opacity-90 leading-snug">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059]/50 mt-1.5 shrink-0" />
                <span>{act}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    );
  }
