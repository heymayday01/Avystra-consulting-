import React from "react";
import { motion } from "motion/react";
import {
  Users,
  TrendingUp,
  Settings,
  Shield,
  ClipboardList,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

import stressedFounderImage from "../assets/images/stressed_founder_1782130060794.jpg";
import peacefulFounderImage from "../assets/images/peaceful_founder_1782130079426.jpg";

export default function FounderFrictionSimulator() {
  return (
    <div className="w-full relative z-20 select-none transform-gpu flex flex-col items-center">
      
      {/* Simulation Wrapper Frame */}
      <div className="w-full max-w-5xl bg-white/90 rounded-[2.5rem] p-6 sm:p-8 md:p-10 border border-[#C5A059]/20 relative overflow-hidden backdrop-blur-xl shadow-[0_32px_64px_rgba(10,25,47,0.08)]">
        
        {/* Subtle decorative grid backing lines */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#C5A059_1px,transparent_1px),linear-gradient(to_bottom,#C5A059_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        {/* Gorgeous atmospheric blurs */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <div className="absolute -top-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-[#C5A059]/10 blur-[100px]" />
          <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-slate-300/10 blur-[100px]" />
        </div>

        {/* SECTION HEADER - INFOGRAPHIC DISPLAY STYLE */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto pb-6 mb-8 border-b border-slate-100/80">
          <span className="text-[10px] font-mono tracking-[0.25em] sm:tracking-[0.35em] font-extrabold uppercase text-[#C5A059] mb-4 inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
            SYSTEM DEPENDENCY DIAGNOSTIC
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-[#0A192F] tracking-tight leading-[1.1]">
            You Built A Team. <br className="sm:hidden" /><span className="text-[#C5A059] italic font-serif">So Why Does Everything Still Depend On You?</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-light mt-4 max-w-xl leading-relaxed">
            Compare the operational drain of a founder-centric bottleneck against the high-leverage growth of a decoupled sovereign system.
          </p>
        </div>

        {/* CONTAINER FOR HIGH FIDELITY COMPARISON ART */}
        <div className="relative z-10 w-full min-h-fit pb-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative flex flex-col items-center gap-6"
          >
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              
              {/* BEFORE: THE CRIPPLING PROBLEM */}
              <div className="flex flex-col bg-rose-50/20 rounded-[2rem] border border-red-100/60 p-5 sm:p-6 shadow-[0_12px_30px_rgba(239,68,68,0.01)] transition-all duration-300 hover:border-red-200/50">
                <div className="flex items-center justify-between border-b border-red-100/40 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <span className="text-[10px] font-mono tracking-widest font-black uppercase text-red-600">
                      THE BOTTLENECK DIAGNOSTIC
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 uppercase px-2 py-0.5 rounded bg-red-50/50 border border-red-100/40">
                    STATUS: DRAINING
                  </span>
                </div>

                <div className="flex flex-col items-center text-center my-4">
                  {/* Premium Circle Frame for Stressed Founder Illustration */}
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-3 border-red-150 bg-white shadow-md mb-4 flex items-center justify-center group">
                    <img
                      src={stressedFounderImage}
                      alt="Stressed Founder Illustration"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-red-950/40 to-transparent py-1.5 flex justify-center text-[8px] text-white tracking-widest font-mono font-bold uppercase">
                      FOUNDER IN CENTRAL TRAP
                    </div>
                  </div>

                  <h4 className="text-xl font-display font-medium text-[#0A192F] tracking-tight">
                    The Founder-Centric Trap
                  </h4>
                  <p className="text-xs text-slate-500 font-light mt-1 max-w-sm leading-relaxed">
                    Every single operation, playbook, and daily micro-decision loops back to the founder's mental RAM.
                  </p>
                </div>

                {/* Critical Vulnerabilities */}
                <div className="mt-2 space-y-2.5 bg-white/60 p-4 rounded-xl border border-red-50/60 flex-grow">
                  <div className="flex items-start gap-2.5 text-xs">
                    <span className="text-red-500 font-bold mt-0.5 shrink-0">✕</span>
                    <div className="space-y-0.5 text-left">
                      <p className="font-semibold text-slate-800">Operational Burnout</p>
                      <p className="text-slate-500 font-light text-[11px]">Founder logs 80+ hour workweeks fighting repeating, low-level platform fires.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs border-t border-slate-100 pt-2.5 mt-2.5">
                    <span className="text-red-500 font-bold mt-0.5 shrink-0">✕</span>
                    <div className="space-y-0.5 text-left">
                      <p className="font-semibold text-slate-800">Linear Escalations</p>
                      <p className="text-slate-500 font-light text-[11px]">Unclear SOP rules translate to zero autonomous decision-making from team nodes.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* AFTER: THE SOVEREIGN ALIGNMENT */}
              <div className="flex flex-col bg-amber-50/[0.08] rounded-[2rem] border border-[#C5A059]/20 p-5 sm:p-6 shadow-[0_12px_30px_rgba(197,160,89,0.02)] transition-all duration-300 hover:border-[#C5A059]/40">
                <div className="flex items-center justify-between border-b border-[#C5A059]/15 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
                    <span className="text-[10px] font-mono tracking-widest font-black uppercase text-[#C5A059]">
                      THE DECOUPLED ARCHITECTURE
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-emerald-700 uppercase px-2 py-0.5 rounded bg-emerald-50/60 border border-emerald-100/40 font-bold">
                    STATUS: AUTOMATED
                  </span>
                </div>

                <div className="flex flex-col items-center text-center my-4">
                  {/* Premium Circle Frame for Peaceful Founder Illustration */}
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-3 border-[#C5A059]/30 bg-white shadow-lg mb-4 flex items-center justify-center group">
                    <img
                      src={peacefulFounderImage}
                      alt="Peaceful Founder Illustration"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#C5A059]/25 to-transparent py-1.5 flex justify-center text-[8px] text-[#C5A059] tracking-widest font-mono font-bold uppercase">
                      SOVEREIGN ALIGNMENT ACTIVE
                    </div>
                  </div>

                  <h4 className="text-xl font-display font-medium text-[#0A192F] tracking-tight">
                    The Sovereign Platform
                  </h4>
                  <p className="text-xs text-slate-500 font-light mt-1 max-w-sm leading-relaxed">
                    Clear decision guardrails, automated playbooks, and structural systems of trust operating independently.
                  </p>
                </div>

                {/* Integrated Capabilities */}
                <div className="mt-2 space-y-2.5 bg-white/60 p-4 rounded-xl border border-[#C5A059]/10 flex-grow">
                  <div className="flex items-start gap-2.5 text-xs">
                    <span className="text-emerald-600 font-bold mt-0.5 shrink-0">✓</span>
                    <div className="space-y-0.5 text-left">
                      <p className="font-semibold text-slate-800">Decoupled Leadership</p>
                      <p className="text-slate-500 font-light text-[11px]">System of transparent guardrails allows personnel to execute without authorization waits.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs border-t border-slate-100 pt-2.5 mt-2.5">
                    <span className="text-emerald-600 font-bold mt-0.5 shrink-0">✓</span>
                    <div className="space-y-0.5 text-left">
                      <p className="font-semibold text-slate-800">Playbook Automation</p>
                      <p className="text-slate-500 font-light text-[11px]">Common operational edge-cases completely automated and handled by clear SOP grids.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            
            <div className="w-full text-center pt-2">
              <span className="text-[10px] font-mono tracking-widest text-[#C5A059]/80 uppercase">
                DIAGNOSTIC ARCHITECTURE comparison • AVYSTRA CONSULTING
              </span>
            </div>
          </motion.div>
        </div>

        {/* ROOT CAUSE DIAGNOSIS ALWAYS VISIBLE AS COMPREHENSIVE TEXT */}
        <div className="relative z-10 mt-6 pt-6 border-t border-slate-100">
          <div className="bg-red-50/40 border border-red-200/50 p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5 text-left">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-red-700 font-mono text-[9.5px] font-extrabold uppercase tracking-widest">
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                ROOT CAUSE DIAGNOSIS
              </div>
              <p className="text-[#0A192F] text-xs font-light leading-relaxed">
                <span className="font-bold text-red-600">A Bug In System Design:</span> Lack of Ownership • Unclear Roles • No Decision Rights • Weak Systems = Everything loops back to the founder. Until systematically decoupled, expanding the company scaling overhead simply aggregates structural friction.
              </p>
            </div>
          </div>
        </div>

        {/* STEP-BY-STEP TRANSITION PROTOCOL ALWAYS VISIBLE BELOW DIAGNOSIS */}
        <div className="relative z-10 mt-8 pt-6 border-t border-slate-200/60 text-left space-y-5">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-[#C5A059]/15 text-[#C5A059]">
              <Lightbulb className="w-4 h-4 text-[#C5A059]" />
            </span>
            <p className="text-[10px] font-mono font-black uppercase text-[#C5A059] tracking-wider">
              THE TRANSITION SYSTEM: STEP-BY-STEP TRANSITION PROTOCOL
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {[
              {
                label: "1. Define Roles",
                desc: "Define unambiguous role scopes and eliminate overlap handoff gaps.",
                icon: ClipboardList,
              },
              {
                label: "2. Decision Rights",
                desc: "Set explicit thresholds on who handles what minor client questions.",
                icon: Shield,
              },
              {
                label: "3. Build Ownership",
                desc: "Equip your core senior team to own targets rather than escalate logs.",
                icon: Users,
              },
              {
                label: "4. Create Systems",
                desc: "Write lightweight playbook routines to handle repeating team snags.",
                icon: Settings,
              },
              {
                label: "5. Track & Review",
                desc: "Introduce lean async checkpoints to supervise quality without micromanagement.",
                icon: TrendingUp,
              },
            ].map((step, index) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={`step-${index}`}
                  className="bg-white border border-slate-200/50 p-4 rounded-xl space-y-2.5 transition-all duration-500 hover:scale-[1.02] flex flex-col justify-between shadow-sm relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="space-y-2">
                    <span className="p-1.5 rounded-lg bg-[#C5A059]/5 border border-[#C5A059]/10 inline-block text-[#C5A059]">
                      <StepIcon className="w-4 h-4" />
                    </span>
                    <h4 className="text-xs font-display font-bold text-[#0A192F] leading-tight">
                      {step.label}
                    </h4>
                    <p className="text-[10px] text-slate-500 leading-relaxed font-light">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* FOOTER SIGNATURE PROSE */}
      <div className="mt-8 text-center max-w-xl">
        <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#0A192F]/60 leading-relaxed">
          EMPOWER YOUR TEAM. BUILD A SELF-RELIANT BUSINESS.
        </p>
        <p className="font-serif italic text-sm text-[#C5A059] mt-1.5">
          Step back from the daily. Focus on the strategic growth.
        </p>
      </div>

    </div>
  );
}
