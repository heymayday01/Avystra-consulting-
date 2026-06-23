import React, { useState, FormEvent } from 'react';
import { 
  Send, 
  FileCheck, 
  HelpCircle, 
  Loader2, 
  Landmark, 
  Users, 
  Layers, 
  Flame, 
  TrendingUp, 
  Network, 
  RefreshCw,
  Sparkles,
  ShieldCheck,
  Zap,
  Building2,
  ArrowRight,
  ArrowLeft,
  Check,
  Gauge,
  Activity,
  User,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DoodleSparkle } from './DoodleWidgets';
import AmbientCanvasBackground from './AmbientCanvasBackground';
import Magnetic from './Magnetic';

interface OrgSizeOption {
  id: string;
  name: string;
  desc: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface OperationalStageOption {
  id: string;
  name: string;
  desc: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}

const orgSizes: OrgSizeOption[] = [
  { id: 'micro', name: 'Micro Scale', desc: '1 - 10 builders', value: 'Micro (1 - 10 players)', icon: User },
  { id: 'mid', name: 'Mid-Market', desc: '11 - 100 players', value: 'Mid-market (11 - 100 players)', icon: Users },
  { id: 'scaleup', name: 'Scale-Up', desc: '101 - 500 players', value: 'Scale-up (101 - 500 players)', icon: Layers },
  { id: 'enterprise', name: 'Global Enterprise', desc: '500+ professionals', value: 'Enterprise (500+ professionals)', icon: Landmark },
];

const operationalStages: OperationalStageOption[] = [
  { 
    id: 'chaos', 
    name: 'Founder\'s Chaos', 
    desc: 'Unstructured speed', 
    value: 'Founders-led Chaos (Seed-funded, pre-systemization)',
    icon: Flame,
  },
  { 
    id: 'growth', 
    name: 'Rapid Scaling', 
    desc: 'Forming management silos', 
    value: 'Middle Management Growth (Scaling operations, forming departments)',
    icon: TrendingUp,
  },
  { 
    id: 'silo', 
    name: 'Complex Structure', 
    desc: 'Cross-functional bottlenecks', 
    value: 'Complex Corporate Structure (Silo-troubles, coordination bottlenecks)',
    icon: Network,
  },
  { 
    id: 'turnaround', 
    name: 'Strategic Pivot', 
    desc: 'Restructuring system loops', 
    value: 'Strategic Turnaround (Reprioritizing projects, restructure needed)',
    icon: RefreshCw,
  }
];

export default function ConsultForm() {
  // Wizard step state
  const [activeStep, setActiveStep] = useState(1);

  // Input fields state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  
  // Segmented choice states
  const [selectedSizeId, setSelectedSizeId] = useState('mid');
  const [selectedStageId, setSelectedStageId] = useState('chaos');
  const [whatsNotWorking, setWhatsNotWorking] = useState('');

  // Status flags
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Auto-calculated interactive indicators
  const getDiagnosticMetrics = (sizeId: string, stageId: string) => {
    let frictionRating = 'Moderate';
    let riskIndex = '45%';
    let riskIndexNumber = 45;
    let primaryLeak = 'System bottlenecks';
    let focusArea = 'Process automation';
    let ratingColor = 'text-emerald-500';
    let barColor = 'bg-emerald-500 animate-pulse';

    if (stageId === 'chaos') {
      if (sizeId === 'micro') {
        frictionRating = 'Moderate Friction';
        riskIndex = '55%';
        riskIndexNumber = 55;
        primaryLeak = 'Ad-hoc execution channels';
        focusArea = 'Initial operation playbooks';
        ratingColor = 'text-amber-500';
        barColor = 'bg-amber-500';
      } else if (sizeId === 'mid') {
        frictionRating = 'High Entropy Overload';
        riskIndex = '78%';
        riskIndexNumber = 78;
        primaryLeak = 'Founder-decision saturation';
        focusArea = 'Immediate delegation matrices';
        ratingColor = 'text-[#C5A059]';
        barColor = 'bg-[#C5A059]';
      } else {
        frictionRating = 'Critical Core Crisis';
        riskIndex = '94%';
        riskIndexNumber = 94;
        primaryLeak = 'Tribal system decay';
        focusArea = 'Complete architecture mapping';
        ratingColor = 'text-red-500';
        barColor = 'bg-red-500';
      }
    } else if (stageId === 'growth') {
      if (sizeId === 'micro') {
        frictionRating = 'Optimized Grid';
        riskIndex = '32%';
        riskIndexNumber = 32;
        primaryLeak = 'Premature structural overhead';
        focusArea = 'Keep processes fluid';
        ratingColor = 'text-emerald-500';
        barColor = 'bg-emerald-500';
      } else if (sizeId === 'mid') {
        frictionRating = 'Incipient Friction';
        riskIndex = '58%';
        riskIndexNumber = 58;
        primaryLeak = 'Departmental blind spots';
        focusArea = 'Unified metric boards';
        ratingColor = 'text-amber-500';
        barColor = 'bg-amber-500';
      } else {
        frictionRating = 'Structural Headwind';
        riskIndex = '82%';
        riskIndexNumber = 82;
        primaryLeak = 'Management alignment drag';
        focusArea = 'Executive process audits';
        ratingColor = 'text-red-500';
        barColor = 'bg-red-500';
      }
    } else if (stageId === 'silo') {
      if (sizeId === 'micro' || sizeId === 'mid') {
        frictionRating = 'Excessive Complexity';
        riskIndex = '68%';
        riskIndexNumber = 68;
        primaryLeak = 'Over-engineered pipelines';
        focusArea = 'Silo disruption loops';
        ratingColor = 'text-amber-500';
        barColor = 'bg-amber-500';
      } else {
        frictionRating = 'Severe System Sclerosis';
        riskIndex = '91%';
        riskIndexNumber = 91;
        primaryLeak = 'Stagnant cross-unit handoffs';
        focusArea = 'Cross-organizational sync';
        ratingColor = 'text-red-500';
        barColor = 'bg-red-500';
      }
    } else if (stageId === 'turnaround') {
      frictionRating = 'Pivot Instability';
      riskIndex = '84%';
      riskIndexNumber = 84;
      primaryLeak = 'Strategic priority dispersion';
      focusArea = 'Rigorous roadmap trim';
      ratingColor = 'text-[#C5A059]';
      barColor = 'bg-[#C5A059]';
    }

    return { frictionRating, riskIndex, riskIndexNumber, primaryLeak, focusArea, ratingColor, barColor };
  };

  const metrics = getDiagnosticMetrics(selectedSizeId, selectedStageId);

  // Step 1 Validation
  const isStep1Valid = () => {
    return name.trim() !== '' && company.trim() !== '' && email.trim() !== '' && email.includes('@');
  };

  // Step 2 Validation
  const isStep2Valid = () => {
    return selectedSizeId !== '';
  };

  // Step 3 Validation
  const isStep3Valid = () => {
    return selectedStageId !== '';
  };

  // Step 4 Validation
  const isStep4Valid = () => {
    return whatsNotWorking.trim() !== '';
  };

  // Click jump validation
  const canJumpToStep = (targetStep: number) => {
    if (targetStep === 1) return true;
    if (targetStep === 2) return isStep1Valid();
    if (targetStep === 3) return isStep1Valid() && isStep2Valid();
    if (targetStep === 4) return isStep1Valid() && isStep2Valid() && isStep3Valid();
    return false;
  };

  const navigateToStep = (step: number) => {
    if (canJumpToStep(step)) {
      setActiveStep(step);
    }
  };

  const handleNextStep = () => {
    if (activeStep === 1 && !isStep1Valid()) {
      setErrorMsg('Please enter a valid corporate identity and email address.');
      return;
    }
    setErrorMsg('');
    setActiveStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrevStep = () => {
    setErrorMsg('');
    setActiveStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    // Final checks
    if (!isStep1Valid() || !isStep4Valid()) {
      setErrorMsg('All contact parameters and structural information are required.');
      setIsLoading(false);
      return;
    }

    const orgValue = orgSizes.find(o => o.id === selectedSizeId)?.value || orgSizes[1].value;
    const stageValue = operationalStages.find(s => s.id === selectedStageId)?.value || operationalStages[0].value;

    try {
      const response = await fetch('/api/leads/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company,
          orgSize: orgValue,
          stage: stageValue,
          whatsNotWorking
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSuccess(true);
      } else {
        setErrorMsg(data.error || 'The system rejected this diagnostic profile. Verify parameter limits.');
      }
    } catch (err) {
      console.error('[Diagnostic submit error]:', err);
      setErrorMsg('Operational link failure. Failed to connect to AVYSTRA Consulting endpoint.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setCompany('');
    setSelectedSizeId('mid');
    setSelectedStageId('chaos');
    setWhatsNotWorking('');
    setIsSuccess(false);
    setErrorMsg('');
    setActiveStep(1);
  };

  // SVGCircle metrics
  const radius = 38;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius; // ~238.76
  const strokeOffset = circumference - (circumference * metrics.riskIndexNumber) / 100;

  return (
    <section id="consult" className="relative py-24 bg-transparent border-t border-slate-200/50 overflow-hidden md:py-32">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 liquid-glass rounded-full border border-slate-200/80 mb-5 shadow-sm relative">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            <span className="text-[9px] text-[#A68449] font-mono tracking-widest font-bold uppercase">System Diagnosis Hub</span>
            <DoodleSparkle className="-top-3 -right-3 text-[#C5A059] w-4 h-4 animate-pulse" delay={0.3} />
          </div>
          <h2 className="font-display font-medium text-3xl sm:text-5xl text-[#0A192F] tracking-tight leading-none mb-5">
            Architectural <span className="font-serif italic font-light text-[#C5A059]">Intake Portal</span>
          </h2>
          <p className="text-slate-500 font-sans text-sm sm:text-base font-light leading-relaxed">
            AVOID SALES PITCHES. Map your core organizational bottlenecks. Our Directors review the operational diagnostic metrics and draft tailored solutions before our brief.
          </p>
        </motion.div>

        {/* Dynamic Split Screen Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* LEFT PANEL: Real-time Diagnostic Meter Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-4 flex flex-col justify-between text-slate-100 rounded-3xl p-6 sm:p-8 liquid-glass-dark relative overflow-hidden will-change-transform group/card"
          >
            {/* Architectural Blueprint Background Grid */}
            <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(rgba(197,160,89,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(197,160,89,0.3)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-[#C5A059]/5 blur-[60px] pointer-events-none" />
            
            {/* Precise Corner Marks */}
            <div className="absolute top-3 left-3 w-3 h-3 border-l border-t border-slate-700/80 pointer-events-none" />
            <div className="absolute top-3 right-3 w-3 h-3 border-r border-t border-slate-700/80 pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-slate-700/80 pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-slate-700/80 pointer-events-none" />
            
            <div className="relative z-10 space-y-6">
              {/* Header Status Bar */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#C5A059]/10 border border-[#C5A059]/20 flex items-center justify-center text-[#C5A059]">
                    <Gauge className="w-4 h-4 animate-pulse" />
                  </div>
                  <div>
                    <div className="font-mono text-[9px] tracking-widest font-bold uppercase text-slate-400">
                      INTEGRITY MONITOR
                    </div>
                    <div className="text-[10px] font-mono text-[#C5A059] flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>REAL-TIME ANALYSIS ACTIVE</span>
                    </div>
                  </div>
                </div>
                <div className="font-mono text-[9px] text-slate-500 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                  SYS.V8
                </div>
              </div>

              {/* Dynamic Radial Scorecard */}
              <div className="py-4 border-b border-slate-800/60 flex flex-col items-center relative">
                {/* Concentric grid rings container */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                  <div className="w-36 h-36 rounded-full border border-dashed border-[#C5A059]/30" />
                  <div className="w-24 h-24 absolute rounded-full border border-slate-800" />
                </div>

                {/* Vector circular radar percentage */}
                <div className="relative w-36 h-36 flex items-center justify-center mb-5 hover:scale-105 transition-transform duration-500">
                  <svg className="w-full h-full transform -rotate-90 filter drop-shadow-[0_0_12px_rgba(197,160,89,0.15)]" viewBox="0 0 100 100">
                    {/* Ring background */}
                    <circle
                      cx="50"
                      cy="50"
                      r={radius}
                      stroke="rgba(255, 255, 255, 0.03)"
                      strokeWidth={strokeWidth + 1}
                      fill="transparent"
                    />
                    {/* Glowing gold indicator ring */}
                    <motion.circle
                      cx="50"
                      cy="50"
                      r={radius}
                      stroke="#C5A059"
                      strokeWidth={strokeWidth}
                      strokeDasharray={circumference}
                      initial={{ strokeDashoffset: circumference }}
                      animate={{ strokeDashoffset: strokeOffset }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-300"
                    />
                  </svg>
                  
                  {/* Absolute Center Readout */}
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-[8px] font-mono tracking-widest text-slate-500 uppercase leading-none mb-1">STRESS DRAG</span>
                    <span className="text-3xl font-mono font-bold text-white tracking-tighter">
                      {metrics.riskIndex}
                    </span>
                    <span className="text-[8px] font-mono text-[#C5A059] tracking-wider mt-0.5 font-semibold">
                      CALCULATED
                    </span>
                  </div>
                </div>

                <div className="w-full space-y-3 pt-2">
                  <div className="flex items-baseline justify-between font-mono text-[10px]">
                    <span className="text-slate-400 tracking-wider">SYSTEM FRICTION INDEX</span>
                    <span className={`font-semibold tracking-tight uppercase ${metrics.ratingColor}`}>
                      {metrics.frictionRating}
                    </span>
                  </div>

                  {/* Progressive indicator bar */}
                  <div className="w-full h-1.5 bg-slate-900 border border-slate-800 rounded-full overflow-hidden p-[1px]">
                    <motion.div 
                      className={`h-full rounded-full ${metrics.barColor}`}
                      initial={{ width: '0%' }}
                      animate={{ width: metrics.riskIndex }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic parameter readout ledger */}
              <div className="space-y-4 pt-1">
                <div className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase font-bold flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <span>[ DYNAMIC FEEDBACK VECTOR ]</span>
                  <span className="text-slate-500 font-normal">SYS-FEED_v9.1</span>
                </div>

                {/* Step values logged output */}
                <div className="space-y-2.5 font-mono text-[11px] leading-relaxed">
                  <div className="flex justify-between items-start gap-4 p-2 bg-slate-900/40 border border-slate-800/50 rounded-xl">
                    <span className="text-slate-500 shrink-0">1. CORPORATE IDENTITY:</span>
                    <span className="text-[#C5A059] text-right truncate max-w-[140px] font-bold">
                      {company ? company.toUpperCase() : 'AWAITING INPUT'}
                    </span>
                  </div>
                  <div className="flex justify-between items-start gap-4 p-2 bg-slate-900/40 border border-slate-800/50 rounded-xl">
                    <span className="text-slate-500 shrink-0">2. OPERATING RANGE:</span>
                    <span className="text-slate-300 text-right">
                      {orgSizes.find(o => o.id === selectedSizeId)?.name.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between items-start gap-4 p-2 bg-slate-900/40 border border-slate-800/50 rounded-xl">
                    <span className="text-slate-500 shrink-0">3. DIAGNOSED PROFILE:</span>
                    <span className="text-slate-300 text-right truncate max-w-[140px]">
                      {operationalStages.find(s => s.id === selectedStageId)?.name.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between items-start gap-4 p-2 bg-slate-900/40 border border-slate-800/50 rounded-xl">
                    <span className="text-slate-500 shrink-0">4. ANALYSIS DRAFT:</span>
                    <span className="text-slate-400 text-right">
                      {whatsNotWorking.trim() ? `${whatsNotWorking.trim().slice(0, 16)}...` : 'AWAITING LOGS'}
                    </span>
                  </div>
                </div>

                {/* Dynamic Architectural Solutions Preview */}
                <div className="space-y-3.5 pt-4 border-t border-slate-800/50">
                  <div className="space-y-1">
                    <div className="text-[9px] font-mono tracking-wider font-bold text-slate-500 uppercase flex items-center gap-1.5">
                      <Activity className="w-3 h-3 text-[#C5A059]" />
                      <span>IDENTIFIED CRITICAL PATHWAY</span>
                    </div>
                    <p className="text-xs text-slate-350 font-sans leading-relaxed font-light pl-4 border-l border-[#C5A059]/30">
                      {metrics.primaryLeak}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[9px] font-mono tracking-wider font-bold text-slate-500 uppercase flex items-center gap-1.5">
                      <Zap className="w-3 h-3 text-[#C5A059]" />
                      <span>DIRECTOR ALIGNMENT STRATEGY</span>
                    </div>
                    <p className="text-xs text-slate-355 font-sans leading-relaxed font-light pl-4 border-l border-slate-700">
                      {metrics.focusArea}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Protocols */}
            <div className="relative z-10 pt-6 mt-6 border-t border-slate-800/80 space-y-2.5">
              <div className="flex items-center gap-2.5 text-[11px] text-slate-400 font-light">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                <span>Non-Disclosure Protocol Active</span>
              </div>
              <div className="flex items-center gap-2.5 text-[11px] text-slate-400 font-light">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                <span>Reviewed Directly by Managing Directors</span>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-500">
                <span className="font-mono">SECURITY: SECURE LINK SSL</span>
                <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">AES-250</span>
              </div>
            </div>
          </motion.div>


          {/* RIGHT PANEL: Progressive Form Stepper Wizard */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-8 rounded-3xl p-6 sm:p-10 shadow-[0_12px_45px_rgba(15,23,42,0.02)] relative liquid-glass will-change-transform"
          >
            <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/30 to-transparent" />

            {/* Premium Header Stepper Tracker */}
            {!isSuccess && (
              <div className="mb-10 pt-2 pb-6 border-b border-slate-200/60">
                <div className="grid grid-cols-4 gap-2 sm:gap-4">
                  {[
                    { nr: 1, label: 'Corporate', active: activeStep >= 1, valid: isStep1Valid() },
                    { nr: 2, label: 'Headcount', active: activeStep >= 2, valid: isStep2Valid() },
                    { nr: 3, label: 'Context', active: activeStep >= 3, valid: isStep3Valid() },
                    { nr: 4, label: 'Diagnostic', active: activeStep >= 4, valid: isStep4Valid() }
                  ].map((step, idx) => {
                    const isPassed = activeStep > step.nr;
                    const isActive = activeStep === step.nr;
                    const isSelectable = canJumpToStep(step.nr);
                    return (
                      <button
                        key={step.nr}
                        type="button"
                        onClick={() => isSelectable && navigateToStep(step.nr)}
                        disabled={!isSelectable}
                        className={`text-left group transition-all outline-none duration-300 relative pb-1 border-b-2 ${
                          isActive 
                            ? 'border-[#C5A059] text-[#0A192F]' 
                            : isPassed
                              ? 'border-[#0A192F] text-[#C5A059]' 
                              : 'border-slate-200 text-slate-400'
                        } ${isSelectable ? 'cursor-pointer hover:border-slate-400/80' : 'cursor-not-allowed opacity-50'}`}
                      >
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                          <span className={`w-5 h-5 text-[10px] font-mono font-bold rounded-full flex items-center justify-center transition-colors ${
                            isActive 
                              ? 'bg-[#C5A059] text-white' 
                              : isPassed 
                                ? 'bg-[#0A192F] text-white' 
                                : 'bg-slate-100 text-slate-400'
                          }`}>
                            {isPassed ? <Check className="w-3 h-3" /> : step.nr}
                          </span>
                          <span className="hidden sm:inline text-[9px] font-mono tracking-wider font-bold uppercase transition-colors">
                            STEP {step.nr}
                          </span>
                        </div>
                        <div className={`text-[11px] sm:text-xs font-display font-semibold truncate ${
                          isActive ? 'text-[#0A192F]' : isPassed ? 'text-slate-600' : 'text-slate-400'
                        }`}>
                          {step.label}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-8"
                  id="consultation-intake-form"
                  key={`wizard-form-step-${activeStep}`}
                >
                  {/* Diagnostic warnings */}
                  {errorMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-xs font-medium flex items-center gap-3 mb-2"
                    >
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
                      <span>{errorMsg}</span>
                    </motion.div>
                  )}

                  {/* ACTIVE VIEW WRAPPER WITH MOTION SLIDE */}
                  <motion.div
                    key={`step-wrapper-${activeStep}`}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    
                    {/* STEP 1: Corporate Profile coordinates */}
                    {activeStep === 1 && (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <h3 className="text-xl font-display font-bold text-[#0A192F] tracking-tight">
                            Corporate Identity & Coordinates
                          </h3>
                          <p className="text-slate-500 text-xs sm:text-sm font-light">
                            AVYSTRA secures all strategic analysis files. Please supply your valid corporate information below.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                          {/* Name input */}
                          <div className="space-y-1.5 group">
                            <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 transition-colors group-focus-within:text-[#C5A059]">
                              Your Name
                            </label>
                            <input
                              type="text"
                              required
                              value={name}
                              onChange={(e) => {
                                setName(e.target.value);
                                if (errorMsg) setErrorMsg('');
                              }}
                              placeholder="e.g. Kirankumar P."
                              className="w-full bg-[#FAF9F5]/40 hover:bg-[#FAF9F5]/60 text-[#0A192F] border border-slate-200 focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/20 rounded-xl px-4 py-3 placeholder-slate-400 transition-all text-sm outline-none font-sans"
                              id="form-input-name"
                            />
                          </div>

                          {/* Company input */}
                          <div className="space-y-1.5 group">
                            <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 transition-colors group-focus-within:text-[#C5A059]">
                              Company Name
                            </label>
                            <input
                              type="text"
                              required
                              value={company}
                              onChange={(e) => {
                                setCompany(e.target.value);
                                if (errorMsg) setErrorMsg('');
                              }}
                              placeholder="AVYSTRA Private Ltd."
                              className="w-full bg-[#FAF9F5]/40 hover:bg-[#FAF9F5]/60 text-[#0A192F] border border-slate-200 focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/20 rounded-xl px-4 py-3 placeholder-slate-400 transition-all text-sm outline-none font-sans"
                              id="form-input-company"
                            />
                          </div>
                        </div>

                        {/* Email input */}
                        <div className="space-y-1.5 group pt-1">
                          <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 transition-colors group-focus-within:text-[#C5A059]">
                            Corporate Email Address
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (errorMsg) setErrorMsg('');
                            }}
                            placeholder="kiran@company.com"
                            className="w-full bg-[#FAF9F5]/40 hover:bg-[#FAF9F5]/60 text-[#0A192F] border border-slate-200 focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/20 rounded-xl px-4 py-3 placeholder-slate-400 transition-all text-sm outline-none font-sans"
                            id="form-input-email"
                          />
                        </div>

                        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                          <ShieldCheck className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                          <p className="text-[11px] text-slate-500 leading-normal font-sans font-light">
                            <strong>AES-256 Non-Disclosure Protocol Active.</strong> We do not distribute database logs to lists or telemetry services. This initiates zero automated marketing campaigns.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* STEP 2: Headcount Scale cards */}
                    {activeStep === 2 && (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <h3 className="text-xl font-display font-bold text-[#0A192F] tracking-tight">
                            Operational Headcount Scale
                          </h3>
                          <p className="text-slate-500 text-xs sm:text-sm font-light">
                            Headcount ranges dictate typical process bottleneck archetypes. Choose the model closest to your current board.
                          </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4.5 pt-2">
                          {orgSizes.map((size) => {
                            const SizeIcon = size.icon;
                            const isSelected = selectedSizeId === size.id;
                            return (
                              <button
                                type="button"
                                key={size.id}
                                onClick={() => setSelectedSizeId(size.id)}
                                className={`p-4 rounded-xl border text-center transition-all cursor-pointer relative flex flex-col justify-between items-center h-32 focus:outline-none focus:ring-1 focus:ring-[#C5A059]/20 ${
                                  isSelected 
                                    ? 'bg-[#0A192F] text-white border-[#0A192F] shadow-md hover:opacity-95' 
                                    : 'bg-slate-50 hover:bg-slate-100/50 text-slate-600 border-slate-200/80 hover:border-slate-300'
                                }`}
                              >
                                <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-white/10' : 'bg-slate-100'}`}>
                                  <SizeIcon className={`w-5 h-5 ${isSelected ? 'text-[#C5A059]' : 'text-slate-400'}`} />
                                </div>
                                <div className="space-y-1">
                                  <div className="text-[11px] font-bold tracking-tight font-display">{size.name}</div>
                                  <div className={`text-[9px] font-mono ${isSelected ? 'text-slate-400' : 'text-slate-500'}`}>{size.desc}</div>
                                </div>
                                
                                {/* Accent Dot */}
                                {isSelected && (
                                  <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* STEP 3: Operational Stage with detailed context cards */}
                    {activeStep === 3 && (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <h3 className="text-xl font-display font-bold text-[#0A192F] tracking-tight">
                            Primary Structural Context & Drag Profile
                          </h3>
                          <p className="text-slate-500 text-xs sm:text-sm font-light">
                            Which operational description characterizes your system friction dynamics right now?
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                          {operationalStages.map((stageItem) => {
                            const StageIcon = stageItem.icon;
                            const isSelected = selectedStageId === stageItem.id;
                            return (
                              <button
                                type="button"
                                key={stageItem.id}
                                onClick={() => setSelectedStageId(stageItem.id)}
                                className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative flex gap-3.5 items-start focus:outline-none focus:ring-1 focus:ring-[#C5A059]/20 w-full ${
                                  isSelected 
                                    ? 'bg-[#0A192F]/[0.02] border-[#C5A059] shadow-sm' 
                                    : 'bg-[#FAF9F5]/40 hover:bg-slate-100/50 text-slate-600 border-slate-200/80 hover:border-slate-300'
                                }`}
                              >
                                <div className={`p-2.5 rounded-lg shrink-0 ${
                                  isSelected ? 'bg-[#0A192F] text-[#C5A059]' : 'bg-slate-100 text-slate-400'
                                }`}>
                                  <StageIcon className="w-4 h-4" />
                                </div>
                                <div className="pr-4">
                                  <div className="text-xs font-semibold text-[#0A192F] transition-colors font-display">
                                    {stageItem.name}
                                  </div>
                                  <div className="text-[10px] text-slate-400 font-sans font-light mt-0.5 leading-relaxed">
                                    {stageItem.desc}
                                  </div>
                                </div>

                                {/* Active Radio Indicator overlay */}
                                <div className="absolute top-4 right-4 w-4 h-4 rounded-full border border-slate-350 flex items-center justify-center bg-white shrink-0">
                                  {isSelected && (
                                    <div className="w-2 h-2 rounded-full bg-[#C5A059]" />
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* STEP 4: Core Diagnostic open narrative */}
                    {activeStep === 4 && (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="text-xl font-display font-bold text-[#0A192F] tracking-tight">
                              Friction Leak Diagnosis Log
                            </h3>
                            <span className="text-[9px] text-[#C5A059] font-mono tracking-widest font-bold uppercase">Critical Entry Field</span>
                          </div>
                          <p className="text-slate-500 text-xs sm:text-sm font-light">
                            Define the system blockages, strategic delays, or communications bottlenecks slowing overall corporate velocity.
                          </p>
                        </div>

                        <div className="pt-2">
                          <textarea
                            required
                            rows={5}
                            value={whatsNotWorking}
                            onChange={(e) => {
                              setWhatsNotWorking(e.target.value);
                              if (errorMsg) setErrorMsg('');
                            }}
                            placeholder="What is leaking efficiency, strategy, or clarity in your current operations? (e.g. silos, delegation saturation, bottlenecks, unclear accountability grids...)"
                            className="w-full bg-[#FAF9F5]/40 hover:bg-[#FAF9F5]/60 text-[#0A192F] border border-slate-200 focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/20 rounded-xl px-4 py-3 placeholder-slate-450 transition-all text-sm leading-relaxed outline-none font-sans"
                            id="form-textarea-diagnostic"
                          />
                        </div>
                        <p className="text-[11px] text-slate-400 leading-normal font-sans font-light">
                          Our Managing Directors review this dossier statement manually to compile your bespoke process flow models. Raw details on corporate friction yield maximum value.
                        </p>
                      </div>
                    )}

                  </motion.div>

                  {/* NAVIGATION CONTROL FOOTER */}
                  <div className="flex items-center justify-between pt-4 mt-8 border-t border-slate-200/60">
                    
                    {/* BACK CONTROL */}
                    <div>
                      {activeStep > 1 && (
                        <Magnetic range={12}>
                          <button
                            type="button"
                            onClick={handlePrevStep}
                            className="px-5 py-3 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-[#0A192F] hover:border-slate-350 shadow-sm text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all"
                          >
                            <ArrowLeft className="w-3.5 h-3.5 text-[#C5A059]" />
                            <span>Previous Step</span>
                          </button>
                        </Magnetic>
                      )}
                    </div>

                    {/* CONTINUE / COMPLETE CONTROL */}
                    <div>
                      {activeStep < 4 ? (
                        <Magnetic range={12}>
                          <button
                            type="button"
                            onClick={handleNextStep}
                            className="px-6 py-3 bg-[#0A192F] hover:bg-[#172A45] text-white rounded-xl text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2 cursor-pointer border border-[#C5A059]/30 transition-all shadow-md"
                          >
                            <span>Save & Continue</span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
                          </button>
                        </Magnetic>
                      ) : (
                        <Magnetic range={15}>
                          <button
                            type="submit"
                            disabled={isLoading}
                            className="px-8 py-3.5 bg-[#0a192f] hover:bg-[#172a45] text-white text-xs font-mono font-bold uppercase tracking-widest rounded-xl transition-all border border-[#C5A059]/30 disabled:opacity-50 flex items-center gap-2 shadow-md cursor-pointer"
                            id="submit-diagnostic-button"
                          >
                            {isLoading ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C5A059]" />
                                <span>COMPILING PROFILE...</span>
                              </>
                            ) : (
                              <>
                                <span>FINALIZE DOSSIER</span>
                                <Send className="w-3.5 h-3.5 text-[#C5A059]" />
                              </>
                            )}
                          </button>
                        </Magnetic>
                      )}
                    </div>

                  </div>

                </form>
              ) : (
                <motion.div
                  key="success-container"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="text-center py-10 px-4 flex flex-col items-center"
                >
                  <div className="w-14 h-14 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] mb-5 shadow-inner">
                    <FileCheck className="w-7 h-7" />
                  </div>
                  
                  <h3 className="font-display font-medium text-2xl sm:text-3xl text-[#0A192F] tracking-tight mb-2">
                    System Diagnostic Saved
                  </h3>
                  <p className="text-[#C5A059] font-mono text-[10px] font-bold uppercase tracking-widest mb-6 bg-[#C5A059]/5 px-3 py-1 rounded-full border border-[#C5A059]/15">
                    ID: AVY-{email.split('@')[0].toUpperCase().slice(0, 8)}-{Date.now().toString().slice(-4)}
                  </p>
                  
                  <div className="bg-[#FAF9F5] p-6 rounded-2xl border border-slate-200/80 tracking-wide text-left max-w-lg mb-8 space-y-4">
                    <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="text-xs font-mono font-bold text-[#0A192F]">VERIFICATION STATUS: QUEUED</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed font-light">
                      <span className="font-bold text-[#0A192F]">Thank you, {name}.</span> Your structural diagnostics profile for <span className="text-[#0A192F] font-bold">{company}</span> was received securely. Our Directors will review these metrics.
                    </p>
                    
                    <p className="text-xs text-slate-400 font-light leading-relaxed">
                      Given your estimated <span className="text-[#C5A059] font-medium">{metrics.frictionRating}</span> and system score of <span className="font-bold text-[#0A192F]">{metrics.riskIndex}</span>, we have assigned priority vector routing. We will email tracking links to <span className="text-[#0A192F]/80 font-bold">{email}</span> within 24 business hours.
                    </p>
                  </div>

                  <Magnetic range={12}>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-6 py-3 rounded-xl border border-slate-200 text-slate-550 hover:text-[#0A192F] hover:border-[#C5A059]/40 bg-white shadow-sm transition-all text-xs font-mono font-bold uppercase tracking-wider cursor-pointer"
                      id="reset-form-button"
                    >
                      Process Alternative Parameters
                    </button>
                  </Magnetic>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
