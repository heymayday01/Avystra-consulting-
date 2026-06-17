import React, { MouseEvent, useState } from 'react';
import { ArrowRight, HelpCircle, Trophy, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import founderPortrait from '../assets/images/founder_portrait_1781697991107.jpg';
import { UnderlineSquiggle, DoodleSparkle, BackgroundGlowBlob } from './DoodleWidgets';
import Magnetic from './Magnetic';

export default function Hero() {
  const [imgFailed, setImgFailed] = useState(false);

  const handleScrollToForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById('consult');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleScrollToBento = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById('bottlenecks');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-[#FAFAFA] md:pt-40 md:pb-28">
      {/* Subtle Grid Overlay Background */}
      <div className="absolute inset-0 grid-overlay z-0 opacity-40 pointer-events-none" />

      {/* Gold Radial Illumination Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[350px] sm:w-[500px] md:w-[800px] h-[350px] sm:h-[500px] md:h-[800px] rounded-full bg-[#C5A059]/2 blur-[80px] sm:blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-1/4 left-1/3 w-[250px] md:w-[450px] h-[250px] md:h-[450px] rounded-full bg-blue-500/2 blur-[100px] pointer-events-none z-0" />

      {/* Modern Fluid Animation Background Blobs */}
      <BackgroundGlowBlob className="top-10 left-10 w-96 h-96" color="bg-[#C5A059]/4" delay={0} />
      <BackgroundGlowBlob className="bottom-20 right-20 w-[450px] h-[450px]" color="bg-blue-300/4" delay={3} />

      {/* Hero Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text Content and Priority Actions */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 flex flex-col justify-center text-center lg:text-left">
            
            {/* Subtle Linear-styled Badge */}
            <div className="relative inline-flex self-center lg:self-start">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-sm"
              >
                <Trophy className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="text-[10px] text-slate-500 font-mono tracking-widest font-semibold uppercase">
                  AVYSTRA CORPORATE ENTERPRISE PORTAL
                </span>
              </motion.div>
              <DoodleSparkle className="-top-5 -right-5 text-[#C5A059]" delay={0.6} />
            </div>

            {/* Display Heading - "Think Clearly, Act Decisively" */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 45 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="font-display font-bold text-4xl sm:text-6xl md:text-7.5xl leading-[1.05] tracking-tight text-[#0A192F]"
              >
                <span className="block">
                  <span className="text-navy-gradient">Think</span> <span className="relative inline-block font-serif italic font-medium tracking-wide text-[#A37E38] px-2 whitespace-nowrap">Clearly<UnderlineSquiggle className="text-[#C5A059]" duration={1.5} delay={0.4} /></span>,
                </span>
                <span className="text-[#0A192F] block mt-1.5">
                  Act <span className="relative inline-block font-serif italic font-medium tracking-wide text-[#A37E38] px-2 whitespace-nowrap">Decisively<UnderlineSquiggle className="text-[#C5A059]" duration={1.5} delay={0.7} /></span>.
                </span>
              </motion.h1>
            </div>

            {/* Short Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-slate-500 font-sans text-base sm:text-lg md:text-xl font-light leading-relaxed tracking-normal max-w-2xl mx-auto lg:mx-0"
            >
              AVYSTRA is an elite corporate strategy advisor closing the friction gap between boardroom vision and team execution. We translate <span className="font-serif italic text-[#C5A059] font-medium">enterprise complexity</span> into clean, repeatable operational blueprints.
            </motion.p>

            {/* Premium Call to Action Area */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center pt-2"
            >
              {/* CTA with Razor Thin Illuminated Border */}
              <Magnetic range={20}>
                <button
                  onClick={handleScrollToForm}
                  className="group relative cursor-pointer overflow-hidden p-[1px] rounded-xl bg-gradient-to-r from-slate-200 via-[#C5A059]/50 to-slate-200 hover:from-[#C5A059]/70 hover:to-[#C5A059]/70 transition-all duration-300 shadow-md shadow-slate-200/50 w-full sm:w-auto"
                >
                  <span className="relative block px-8 py-4 bg-[#0A192F] rounded-[11px] text-white font-display text-sm font-semibold tracking-wide flex items-center justify-center gap-2 group-hover:bg-[#0A192F]/95 transform active:scale-98 transition-transform">
                    <span>Initiate diagnostic review</span>
                    <ArrowRight className="w-4 h-4 text-[#C5A059] transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </button>
              </Magnetic>

              {/* Secondary Button */}
              <Magnetic range={15}>
                <button
                  onClick={handleScrollToBento}
                  className="px-6 py-4 rounded-xl text-xs text-slate-600 font-mono uppercase tracking-wider font-semibold flex items-center justify-center gap-2 border border-slate-200 hover:border-slate-300 hover:text-[#0A192F] transition-all bg-white shadow-sm w-full sm:w-auto"
                >
                  <HelpCircle className="w-4 h-4 text-[#C5A059]" />
                  <span>Discover friction points</span>
                </button>
              </Magnetic>
            </motion.div>

          </div>

          {/* Right Column: Hero Centerpiece Image */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group w-full max-w-[380px]"
            >
              {/* Frame glow backdrop */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-[#C5A059]/10 via-transparent to-blue-500/5 blur-lg opacity-70" />
              
              {/* Editorial Frame Border */}
              <div className="relative rounded-2xl bg-white p-3 border border-slate-200 shadow-xl">
                <div className="relative overflow-hidden rounded-xl aspect-[4/5] bg-slate-100">
                  {!imgFailed ? (
                    <img
                      src={founderPortrait}
                      alt="AVYSTRA Leadership - Kirankumar Pandey"
                      referrerPolicy="no-referrer"
                      onError={() => setImgFailed(true)}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 font-display text-center"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center p-6 h-full text-slate-400">
                      <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[#C5A059] mb-4">
                        <Sparkles className="w-8 h-8" />
                      </div>
                      <span className="text-sm font-mono font-semibold text-[#0A192F] uppercase">AVYSTRA Advisors</span>
                    </div>
                  )}

                  {/* Elegant Floating Glassmorphic tag */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md px-4 py-3 rounded-xl border border-slate-200/50 flex items-center justify-between shadow-lg">
                    <div>
                      <h4 className="text-[11px] font-mono tracking-widest font-bold text-[#0A192F] uppercase">Kirankumar Pandey</h4>
                      <p className="text-[9px] text-[#C5A059] font-mono font-medium mt-0.5 uppercase tracking-wider">FOUNDER & DIRECTOR</p>
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Bottom Trust Area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-20 pt-8 border-t border-slate-200/60 flex flex-wrap justify-center lg:justify-start items-center gap-x-12 gap-y-6 text-slate-400 text-xs font-mono"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            <span className="font-semibold text-slate-500 uppercase">Strategy Alignment</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            <span className="font-semibold text-slate-500 uppercase">Operational Excellence</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            <span className="font-semibold text-slate-500 uppercase">Execution Blueprints</span>
          </div>
        </motion.div>

        {/* Elegant infinite scrolling ticker line loop matching the custom Leonid style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="mt-16 w-screen relative left-[calc(-50vw+50%)] overflow-hidden border-y border-slate-200 bg-white py-5 flex items-center"
        >
          <div className="animate-marquee-slow flex whitespace-nowrap gap-x-20 select-none">
            {[1, 2, 3].map((loopIdx) => (
              <React.Fragment key={loopIdx}>
                <span className="font-display font-black text-xs tracking-[0.3em] text-[#0A192F] uppercase flex items-center gap-3">
                  THINK <span className="text-[#C5A059]">CLEARLY</span>
                </span>
                <span className="text-slate-300">•</span>
                <span className="font-serif italic font-light text-xs tracking-widest text-[#C5A059] uppercase flex items-center gap-3">
                  ACT DECISIVELY
                </span>
                <span className="text-slate-300">•</span>
                <span className="font-display font-black text-xs tracking-[0.3em] text-[#0A192F] uppercase flex items-center gap-3">
                  ELIMINATE <span className="text-[#C5A059]">FRICTION</span>
                </span>
                <span className="text-slate-300">•</span>
                <span className="font-serif italic font-light text-xs tracking-widest text-slate-600 uppercase flex items-center gap-3">
                  STREAMLINED SUCCESS
                </span>
                <span className="text-slate-300">•</span>
                <span className="font-display font-black text-xs tracking-[0.3em] text-[#0A192F] uppercase flex items-center gap-3">
                  UNIFY <span className="text-[#C5A059]">EXECUTION</span>
                </span>
                <span className="text-slate-300">•</span>
              </React.Fragment>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
