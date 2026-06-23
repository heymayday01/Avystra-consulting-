import React, { useState, useEffect, useRef } from 'react';
import { User, Quote, FlameKindling, Award, GraduationCap, Layers, ShieldCheck, ChevronRight, Compass } from 'lucide-react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import founderPortrait from '../assets/images/founder_portrait_1781697991107.jpg';
import { DoodleSparkle, HighlightCircle, UnderlineSquiggle, HandDrawnArrow } from './DoodleWidgets';
import { gsap } from 'gsap';
import { elegantEase, getPrefersReducedMotion } from '../lib/animations';
import LiquidHeading from './LiquidHeading';
import TextReveal from './TextReveal';

interface StatRingProps {
  id: string;
  percentage: number;
  label: string;
  context: string;
}

interface Partner {
  name: string;
  role: string;
  prestige: string;
  focus: string;
  bio: string;
  impact: string;
  initials: string;
  accreditations: string[];
}

const partners: Partner[] = [
  {
    name: 'Mid-Sized Companies',
    role: '25–500 employees',
    prestige: 'Unstuck Strategy',
    focus: 'Systems Scale Focus',
    bio: "You've scaled. But management systems haven't kept pace. The team is bigger but execution is harder. That's exactly where AVYSTRA works.",
    impact: 'Bridges the gap where coordination costs start to scale exponentially.',
    initials: 'MS',
    accreditations: ['Growth Friction', 'Alignment Systems']
  },
  {
    name: 'Founders & Business Owners',
    role: 'Sovereign Operations',
    prestige: 'Decisive Delegation',
    focus: 'Executive Release Focus',
    bio: "You're still doing too much. The team exists but the decision-making hasn't shifted. AVYSTRA helps you build the layer underneath you.",
    impact: 'Shift critical dependencies from yourself to repeatable structures.',
    initials: 'FO',
    accreditations: ['Founder Sanity', 'Accountability Loops']
  },
  {
    name: 'HR Heads & People Leaders',
    role: 'Strategic Engagement',
    prestige: 'Measurable Impact',
    focus: 'Talent ROI Focus',
    bio: 'You need programs that work — not just programs that look good. AVYSTRA delivers with measurable outcomes you can report upward.',
    impact: 'Installs operational discipline that preserves elite headcount.',
    initials: 'HR',
    accreditations: ['Capability Mapping', 'Attrition Control']
  }
];

export default function StatsFounder() {
  const [photoFailed, setPhotoFailed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
    <section id="team" ref={sectionRef} className="relative py-8 bg-transparent border-none overflow-hidden md:py-12 animate-fade-in">
      {/* 🧪 Refractive Glass-Backing Bubbles that organically drift to create deep glass physical refraction */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        {/* Soft Gold Refractive Bubble */}
        <div className="absolute top-[10%] right-[-10%] w-[550px] h-[550px] rounded-full transform-gpu will-change-transform animate-pulse-slow" style={{ background: 'radial-gradient(circle, rgba(197, 160, 89, 0.05) 0%, transparent 70%)', animationPlayState: isSectionVisible ? 'running' : 'paused' }} />
        {/* Soft Sky Blue Refractive Bubble */}
        <div className="absolute bottom-[20%] left-[-15%] w-[600px] h-[600px] rounded-full transform-gpu will-change-transform animate-pulse-slow" style={{ background: 'radial-gradient(circle, rgba(147, 197, 253, 0.04) 0%, transparent 70%)', animationDuration: '18s', animationPlayState: isSectionVisible ? 'running' : 'paused' }} />
        {/* Soft Amber Warm Refractive Bubble */}
        <div className="absolute top-[60%] right-[15%] w-[450px] h-[450px] rounded-full transform-gpu will-change-transform animate-pulse-slow" style={{ background: 'radial-gradient(circle, rgba(251, 191, 36, 0.03) 0%, transparent 70%)', animationDuration: '15s', animationPlayState: isSectionVisible ? 'running' : 'paused' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 md:mb-12 text-left"
        >
          <div className="flex items-center gap-2 mb-4">
            <FlameKindling className="w-4 h-4 text-[#C5A059]" />
            <span className="text-[10px] text-[#C5A059] font-mono tracking-widest font-bold uppercase">
              Corporate Diagnostics & Team
            </span>
          </div>
          <h2 className="font-display font-medium text-3xl sm:text-5xl text-[#0A192F] tracking-tight leading-none mb-6 inline-flex flex-wrap gap-x-2">
            <TextReveal text="The Metric Truth of " delay={0.2} blur={true} wordClassName="inline-block" />
            <TextReveal text="Leadership" delay={0.4} blur={true} wordClassName="font-serif italic font-light text-[#C5A059] inline-block" />
          </h2>
          <TextReveal 
            text="Data gathered in the field from corporate environments validates the critical structural friction organizations suffer from today."
            as="p"
            className="text-slate-500 font-sans text-base sm:text-lg max-w-3xl font-light leading-relaxed"
            delay={0.6}
            blur={true}
          />
        </motion.div>

        {/* 4 Glowing SVG Progress Rings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 md:mb-16">
          {stats.map((stat, idx) => (
            <motion.div 
              key={stat.id}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <StatProgressRing stat={stat} index={idx} />
            </motion.div>
          ))}
        </div>

        {/* Founder Row Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Founder Photo Portrait Column */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-[340px]">
              {/* Clean, Unshaded Frame bordered by a thin Slate rule (no back-glow/outer shadows) */}
              <div className="relative rounded-2xl p-3 shadow-lg liquid-glass will-change-transform group transition-all duration-700 hover:scale-[1.01] hover:-translate-y-1">
                <div className="relative overflow-hidden rounded-xl aspect-[4/5] bg-slate-50 flex items-center justify-center border border-white/50 p-0.5">
                  {!photoFailed ? (
                    <img
                      src={founderPortrait}
                      alt="Kirankumar Pandey"
                      referrerPolicy="no-referrer"
                      loading="lazy"
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
                  <div className="absolute bottom-4 left-4 bg-white/50 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/70 shadow-md">
                    <span className="text-[10px] text-[#0A192F] font-mono tracking-widest font-bold uppercase">
                      FOUNDER & DIRECTOR
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Founder Philosophy Statements Column */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="space-y-6">
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
            </div>
          </motion.div>

        </div>

        {/* Dynamic Transition Divider with HandDrawnArrow */}
        <div className="relative my-24 flex flex-col items-center justify-center gsap-hero-fade">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-250 to-transparent gsap-divider origin-center" />
          <div className="absolute bg-[#FAF9F6] px-5 py-1.5 text-[10px] text-slate-400 font-mono tracking-widest uppercase rounded-full border border-slate-200/80 shadow-sm flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#C5A059]" />
            Operational Practice Leadership
          </div>
        </div>

        {/* Lead consulting partners section heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center relative max-w-3xl mx-auto flex flex-col items-center"
        >
          <LiquidHeading>
            <h3 className="font-display font-medium text-3xl sm:text-4xl text-[#0A192F] tracking-tight leading-normal mb-4">
              Built For Organizations That Have <span className="font-serif italic font-light text-[#C5A059]">Grown — And Got Stuck</span>.
            </h3>
          </LiquidHeading>
          <p className="text-slate-500 font-sans text-sm sm:text-base font-light leading-relaxed mt-4">
            Every engagement is engineered specifically for corporate structures experiencing painful scaling friction and bottlenecked communication flows.
          </p>
          <DoodleSparkle className="-top-6 right-6 text-[#C5A059]/15" delay={0.2} />
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 sm:px-4">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <PartnerCard partner={partner} index={index} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

function PartnerCard({ partner, index }: { partner: Partner; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Parallax shifts to create physical three-dimensional glass depth on scroll
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const blurParallaxY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const handleMouseMoveCard = (e: React.MouseEvent<HTMLDivElement>) => {
    // Simplified hover effect
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mx', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--my', `${(y / rect.height) * 100}%`);
  };

  const handleMouseLeaveCard = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty('--mx', '50%');
    card.style.setProperty('--my', '50%');
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      onMouseMove={handleMouseMoveCard}
      onMouseLeave={handleMouseLeaveCard}
      whileHover={{ y: -5 }}
      className="group relative liquid-glass rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-[0_45px_95px_-20px_rgba(10,25,47,0.12)] hover:border-[#C5A059]/40 transition-all duration-500 h-full will-change-transform cursor-default overflow-hidden bg-white/40 backdrop-blur-sm"
    >
      <div className="relative h-full flex flex-col justify-between z-10">
        {/* Dynamic spotlight hover background overlay - subtler */}
        <div 
          className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100" 
          style={{
            background: 'radial-gradient(circle 350px at var(--mx, 50%) var(--my, 50%), rgba(197, 160, 89, 0.05) 0%, transparent 80%)',
          }}
        />

        <div className="relative z-10 flex flex-col h-full">
          <div>
            {/* Card Upper Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="w-11 h-11 rounded-xl bg-[#0A192F] flex items-center justify-center text-[#C5A059] font-display font-black text-base border border-slate-800 shadow-lg">
                {partner.initials}
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/60 backdrop-blur-sm rounded-full border border-slate-100/50 shadow-sm">
                <Compass className="w-3 h-3 text-[#C5A059]" />
                <span className="text-[8px] text-[#0A192F] font-mono tracking-widest font-black uppercase">
                  {partner.focus.split(' ')[0]} Segment
                </span>
              </div>
            </div>

            {/* Partner Identity */}
            <h4 className="font-display font-bold text-xl text-[#0A192F] tracking-tight mb-2 uppercase">
              {partner.name}
            </h4>
            <div className="text-[#A68444] font-mono text-[9px] font-bold uppercase tracking-[0.2em] mb-5 flex items-center gap-2">
              <span className="w-4 h-px bg-[#C5A059]/30" />
              {partner.role}
            </div>

            <p className="text-slate-500 font-sans text-[13px] flex items-center gap-2 mb-6 border-b border-slate-100 pb-5">
              <Award className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
              <span className="font-light tracking-tight">{partner.prestige}</span>
            </p>

            <p className="text-slate-600 font-sans text-sm font-light leading-relaxed mb-8 opacity-90 group-hover:opacity-100 transition-opacity">
              {partner.bio}
            </p>
          </div>

          <div className="mt-auto">
            <div className="flex flex-wrap gap-1.5 mb-6">
              {partner.accreditations.map((acc, key) => (
                <span key={key} className="text-[8px] font-mono font-bold text-slate-400 border border-slate-100 px-2.5 py-1 rounded-md uppercase tracking-wider bg-slate-50/20">
                  {acc}
                </span>
              ))}
            </div>

            <div className="bg-[#0A192F] p-4 sm:p-5 rounded-2xl flex items-start gap-3 border border-slate-800 shadow-xl transition-all duration-500 group-hover:border-[#C5A059]/20">
              <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
              <div>
                <p className="text-[8px] font-mono text-[#C5A059] font-bold uppercase tracking-[0.2em] mb-1">Impact Analysis</p>
                <p className="text-[12px] text-slate-300 font-sans font-light leading-snug">{partner.impact}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
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
    if (getPrefersReducedMotion()) {
      setDisplayVal(stat.percentage);
      return;
    }

    const el = elementRef.current;
    if (!el) return;

    const countObj = { value: 0 };
    const tween = gsap.to(countObj, {
      value: stat.percentage,
      duration: 1.6,
      ease: elegantEase,
      delay: index * 0.15,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
        fastScrollEnd: true,
        preventOverlaps: true,
      },
      onUpdate: () => {
        setDisplayVal(Math.floor(countObj.value));
      },
    });

    return () => {
      tween.kill();
    };
  }, [stat.percentage, index]);

  const handleMouseMoveCard = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;
    const nx = (x / rect.width) - 0.5;
    const ny = (y / rect.height) - 0.5;
    const tiltX = -ny * 7;
    const tiltY = nx * 7;
    card.style.setProperty('--mx', `${px}%`);
    card.style.setProperty('--my', `${py}%`);
    card.style.setProperty('--tilt-x', `${tiltX}deg`);
    card.style.setProperty('--tilt-y', `${tiltY}deg`);
  };

  const handleMouseLeaveCard = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty('--mx', '50%');
    card.style.setProperty('--my', '50%');
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <motion.div
      ref={elementRef}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative rounded-[2rem] p-[1.5px] overflow-hidden group cursor-default hover:shadow-[0_45px_90px_-20px_rgba(15,23,42,0.1)] transition-all duration-750"
    >
      <div 
        onMouseMove={handleMouseMoveCard}
        onMouseLeave={handleMouseLeaveCard}
        className="relative liquid-glass liquid-glass-distorted rounded-[1.95rem] p-8 sm:p-10 flex flex-col items-center text-center h-full overflow-hidden"
        style={{
          background: 'radial-gradient(circle 180px at var(--mx, 50%) var(--my, 50%), rgba(212, 178, 112, 0.4) 0%, rgba(226, 232, 240, 0.6) 100%)',
          transform: 'perspective(1000px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'transform',
        }}
      >
        {index === 0 && (
          <DoodleSparkle className="top-4 right-4 text-[#C5A059]/30 scale-75" delay={0.4} />
        )}
        <div className="relative flex items-center justify-center w-32 h-32 mb-8">
          {/* SVG Radial Progress Ring */}
          <svg height="100%" width="100%" viewBox="0 0 100 100" className="transform -rotate-90">
            <circle
              stroke="#F1F5F9"
              fill="transparent"
              strokeWidth="3"
              r={normalizedRadius}
              cx="50"
              cy="50"
            />
            <motion.circle
              stroke="#C5A059"
              fill="transparent"
              strokeWidth="3"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              whileInView={{ strokeDashoffset }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "circOut", delay: index * 0.2 }}
              r={normalizedRadius}
              cx="50"
              cy="50"
              strokeLinecap="round"
            />
          </svg>
    
          {/* Center Percentage Display text - Navy Blue */}
          <div className="absolute flex flex-col items-center">
            <span className="font-display font-black text-3xl text-[#0A192F]">
              {displayVal}%
            </span>
            <span className="text-[8px] font-mono font-black text-[#C5A059] uppercase tracking-widest mt-1">
              Impact
            </span>
          </div>
        </div>
    
        <h3 className="font-display font-black text-sm sm:text-base text-[#0A192F] mb-3 uppercase tracking-tight">
          {stat.label}
        </h3>
        <p className="text-slate-500 text-xs sm:text-[13px] leading-relaxed font-light mt-1 opacity-80 group-hover:opacity-100">
          {stat.context}
        </p>

        {/* Decorative Corner Monogram */}
        <div className="absolute top-4 left-4 text-[8px] font-mono font-black text-slate-100 uppercase tracking-widest pointer-events-none">
          DIAGNOSTIC {index + 1}
        </div>
      </div>
    </motion.div>
  );
}
