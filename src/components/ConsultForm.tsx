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
  Gauge,
  Activity,
  User,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DoodleSparkle, BackgroundGlowBlob } from './DoodleWidgets';
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
  { id: 'enterprise', name: 'Global Enterprise', desc: '500+ professionals', value: 'Enterprise (500+ players)', icon: Landmark },
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
    let primaryLeak = 'System bottlenecks';
    let focusArea = 'Process automation';
    let ratingColor = 'text-emerald-500';
    let barColor = 'bg-emerald-500';

    if (stageId === 'chaos') {
      if (sizeId === 'micro') {
        frictionRating = 'Moderate Friction';
        riskIndex = '55%';
        primaryLeak = 'Ad-hoc execution channels';
        focusArea = 'Initial operation playbooks';
        ratingColor = 'text-amber-500';
        barColor = 'bg-amber-500';
      } else if (sizeId === 'mid') {
        frictionRating = 'High Entropy Overload';
        riskIndex = '78%';
        primaryLeak = 'Founder-decision saturation';
        focusArea = 'Immediate delegation matrices';
        ratingColor = 'text-[#C5A059]';
        barColor = 'bg-[#C5A059]';
      } else {
        frictionRating = 'Critical Core Crisis';
        riskIndex = '94%';
        primaryLeak = 'Tribal system decay';
        focusArea = 'Complete architecture mapping';
        ratingColor = 'text-red-500';
        barColor = 'bg-red-500';
      }
    } else if (stageId === 'growth') {
      if (sizeId === 'micro') {
        frictionRating = 'Optimized Grid';
        riskIndex = '32%';
        primaryLeak = 'Premature structural overhead';
        focusArea = 'Keep processes fluid';
        ratingColor = 'text-emerald-500';
        barColor = 'bg-emerald-500';
      } else if (sizeId === 'mid') {
        frictionRating = 'Incipient Friction';
        riskIndex = '58%';
        primaryLeak = 'Departmental blind spots';
        focusArea = 'Unified metric boards';
        ratingColor = 'text-amber-500';
        barColor = 'bg-amber-500';
      } else {
        frictionRating = 'Structural Headwind';
        riskIndex = '82%';
        primaryLeak = 'Management alignment drag';
        focusArea = 'Executive process audits';
        ratingColor = 'text-red-500';
        barColor = 'bg-red-500';
      }
    } else if (stageId === 'silo') {
      if (sizeId === 'micro' || sizeId === 'mid') {
        frictionRating = 'Excessive Complexity';
        riskIndex = '68%';
        primaryLeak = 'Over-engineered pipelines';
        focusArea = 'Silo disruption loops';
        ratingColor = 'text-amber-500';
        barColor = 'bg-amber-500';
      } else {
        frictionRating = 'Severe System Sclerosis';
        riskIndex = '91%';
        primaryLeak = 'Stagnant cross-unit handoffs';
        focusArea = 'Cross-organizational sync';
        ratingColor = 'text-red-500';
        barColor = 'bg-red-500';
      }
    } else if (stageId === 'turnaround') {
      frictionRating = 'Pivot Instability';
      riskIndex = '84%';
      primaryLeak = 'Strategic priority dispersion';
      focusArea = 'Rigorous roadmap trim';
      ratingColor = 'text-[#C5A059]';
      barColor = 'bg-[#C5A059]';
    }

    return { frictionRating, riskIndex, primaryLeak, focusArea, ratingColor, barColor };
  };

  const metrics = getDiagnosticMetrics(selectedSizeId, selectedStageId);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    // Quick validations
    if (!name.trim() || !email.trim() || !company.trim() || !whatsNotWorking.trim()) {
      setErrorMsg('All contact parameters and structural information are required.');
      setIsLoading(false);
      return;
    }

    if (!email.includes('@')) {
      setErrorMsg('Please specify a valid corporate email address.');
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
  };

  return (
    <section id="consult" className="relative py-24 bg-[#FAF9F5] border-t border-slate-200/80 overflow-hidden md:py-32">
      {/* Dynamic background accents */}
      <div className="absolute inset-0 grid-overlay z-0 opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] rounded-full bg-[#C5A059]/3 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-blue-100/50 blur-[100px] pointer-events-none" />

      <BackgroundGlowBlob className="top-12 right-20 w-80 h-80" color="bg-[#C5A059]/4" delay={2} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Heading */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-slate-200/80 mb-5 shadow-sm relative">
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
        </div>

        {/* Dynamic Split Screen Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* LEFT SIDEBAR: Real-time Diagnostic Meter Card */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-[#0A192F] text-white rounded-3xl border border-slate-800/80 p-6 sm:p-8 shadow-xl relative overflow-hidden">
            {/* Fine texture line background */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#172A45]/30 to-transparent pointer-events-none" />
            <div className="absolute top-[16px] left-[16px] w-12 h-12 border-l border-t border-slate-800 pointer-events-none rounded-tl-lg" />
            
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#C5A059]">
                  <Gauge className="w-4 h-4" />
                </div>
                <div className="font-mono text-[10px] tracking-widest font-bold uppercase text-slate-400">
                  Calculated Diagnostic Indicators
                </div>
              </div>

              {/* Dynamic Meter Display */}
              <div className="py-2 border-b border-white/5">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-xs text-slate-400 font-sans font-light">EST. FRICTION RATING</span>
                  <span className={`text-sm font-semibold font-display tracking-tight uppercase ${metrics.ratingColor}`}>
                    {metrics.frictionRating}
                  </span>
                </div>
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-xs text-slate-400 font-sans font-light">SYSTEM OVERLOAD RISK</span>
                  <span className="text-2xl font-mono font-bold text-[#C5A059]">
                    {metrics.riskIndex}
                  </span>
                </div>

                {/* Progress bar representing system bottleneck indicator */}
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full ${metrics.barColor}`}
                    initial={{ width: '0%' }}
                    animate={{ width: metrics.riskIndex }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* Actionable recommendations based on dynamic input */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="text-[9px] font-mono tracking-wider font-bold text-slate-500 uppercase flex items-center gap-1.5">
                    <Activity className="w-3 h-3 text-[#C5A059]" />
                    <span>Identified System Leak</span>
                  </div>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed font-light">
                    {metrics.primaryLeak}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="text-[9px] font-mono tracking-wider font-bold text-slate-500 uppercase flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-[#C5A059]" />
                    <span>Calculated Critical Focus</span>
                  </div>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed font-light">
                    {metrics.focusArea}
                  </p>
                </div>
              </div>
            </div>

            {/* Verification & Trust badges */}
            <div className="relative z-10 pt-8 mt-8 border-t border-white/5 space-y-3">
              <div className="flex items-center gap-2.5 text-xs text-slate-400 font-light">
                <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Non-Disclosure Protocol Secured</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-400 font-light">
                <Sparkles className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Reviewed Directly by Managing Directors</span>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
                <span>SECURITY PROTOCOL</span>
                <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400">AES-256</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR: Creative Form Wizard */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-[0_12px_45px_rgba(15,23,42,0.04)] relative">
            <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/30 to-transparent" />

            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="form-diagnostic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-8"
                  id="consultation-intake-form"
                >
                  
                  {/* Step 1: Client profile block */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider font-bold text-slate-400">
                      <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[#B38F46]">1</span>
                      <span>Identity & Corporate Coordinates</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Name input */}
                      <div className="space-y-1.5 group">
                        <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 transition-colors group-focus-within:text-[#C5A059]">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Kirankumar P."
                          className="w-full bg-[#FAF9F5]/40 hover:bg-[#FAF9F5]/60 text-[#0A192F] border border-slate-200 focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/20 rounded-xl px-4 py-3 placeholder-slate-400 transition-all text-sm outline-none"
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
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="AVYSTRA Private Ltd."
                          className="w-full bg-[#FAF9F5]/40 hover:bg-[#FAF9F5]/60 text-[#0A192F] border border-slate-200 focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/20 rounded-xl px-4 py-3 placeholder-slate-400 transition-all text-sm outline-none"
                          id="form-input-company"
                        />
                      </div>
                    </div>

                    {/* Email input */}
                    <div className="space-y-1.5 group">
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 transition-colors group-focus-within:text-[#C5A059]">
                        Corporate Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="kiran@company.com"
                        className="w-full bg-[#FAF9F5]/40 hover:bg-[#FAF9F5]/60 text-[#0A192F] border border-slate-200 focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/20 rounded-xl px-4 py-3 placeholder-slate-400 transition-all text-sm outline-none"
                        id="form-input-email"
                      />
                    </div>
                  </div>

                  {/* Step 2: Org scale segmented cards */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider font-bold text-slate-400">
                      <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[#B38F46]">2</span>
                      <span>Operational Headcount Scale</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {orgSizes.map((size) => {
                        const SizeIcon = size.icon;
                        const isSelected = selectedSizeId === size.id;
                        return (
                          <div
                            key={size.id}
                            onClick={() => setSelectedSizeId(size.id)}
                            className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer relative flex flex-col justify-between items-center h-28 ${
                              isSelected 
                                ? 'bg-[#0A192F] text-white border-[#0A192F] shadow-sm' 
                                : 'bg-slate-50 hover:bg-slate-100/50 text-slate-600 border-slate-200/80 hover:border-slate-300'
                            }`}
                          >
                            <SizeIcon className={`w-5 h-5 mb-2 ${isSelected ? 'text-[#C5A059]' : 'text-slate-400'}`} />
                            <div className="space-y-1">
                              <div className="text-[11px] font-bold tracking-tight font-display">{size.name}</div>
                              <div className={`text-[9px] font-mono ${isSelected ? 'text-slate-400' : 'text-slate-500'}`}>{size.desc}</div>
                            </div>
                            
                            {/* Accent Dot */}
                            {isSelected && (
                              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 3: Operational Stage with rich cards */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider font-bold text-slate-400">
                      <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[#B38F46]">3</span>
                      <span>Primary Structural Context</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {operationalStages.map((stageItem) => {
                        const StageIcon = stageItem.icon;
                        const isSelected = selectedStageId === stageItem.id;
                        return (
                          <div
                            key={stageItem.id}
                            onClick={() => setSelectedStageId(stageItem.id)}
                            className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative flex gap-3.5 items-start ${
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
                            <div>
                              <div className="text-xs font-semibold text-[#0A192F] transition-colors font-display">
                                {stageItem.name}
                              </div>
                              <div className="text-[10px] text-slate-400 font-sans font-light mt-0.5 leading-relaxed">
                                {stageItem.desc}
                              </div>
                            </div>

                            {/* Active Radio Indicator */}
                            <div className="absolute top-4 right-4 w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center bg-white">
                              {isSelected && (
                                <div className="w-2 h-2 rounded-full bg-[#C5A059]" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 4: Core Diagnostic input */}
                  <div className="space-y-3.5 relative">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider font-bold text-slate-400">
                        <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[#B38F46]">4</span>
                        <span>Friction Leak Diagnostics</span>
                      </div>
                      <span className="text-[8px] text-[#C5A059] font-mono tracking-widest font-bold uppercase">Critical Field</span>
                    </div>

                    <textarea
                      required
                      rows={4}
                      value={whatsNotWorking}
                      onChange={(e) => setWhatsNotWorking(e.target.value)}
                      placeholder="What is leaking efficiency, strategy, or clarity in your current operations? (e.g. Silos, delegation saturation, project bottlenecking)"
                      className="w-full bg-[#FAF9F5]/40 hover:bg-[#FAF9F5]/60 text-[#0A192F] border border-slate-200 focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/20 rounded-xl px-4 py-3 placeholder-slate-400 transition-all text-sm leading-relaxed outline-none"
                      id="form-textarea-diagnostic"
                    />
                    <p className="text-[11px] text-slate-400 leading-normal font-light">
                      Feel free to be highly candid. This information forms the core briefing material our executive team analyzes before compiling your custom setup diagram.
                    </p>
                  </div>

                  {/* Display Error Message Tag if active */}
                  {errorMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-xs font-medium flex items-center gap-3"
                    >
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
                      <span>{errorMsg}</span>
                    </motion.div>
                  )}

                  {/* Submit actions */}
                  <div className="flex items-center justify-end pt-2 border-t border-slate-100">
                    <Magnetic range={15}>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full sm:w-auto px-8 py-4 bg-[#0A192F] hover:bg-[#172A45] disabled:opacity-50 text-white font-semibold font-display text-sm tracking-wide rounded-xl shadow-md flex items-center justify-center gap-3.5 cursor-pointer border border-[#C5A059]/30 transition-all"
                        id="submit-diagnostic-button"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-[#C5A059]" />
                            <span>Compiling Diagnostic Profile...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Profile</span>
                            <ArrowRight className="w-4 h-4 text-[#C5A059]" />
                          </>
                        )}
                      </button>
                    </Magnetic>
                  </div>

                </motion.form>
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
                      className="px-6 py-3 rounded-xl border border-slate-200 text-slate-500 hover:text-[#0A192F] hover:border-[#C5A059]/40 bg-white shadow-sm transition-all text-xs font-mono font-bold uppercase tracking-wider"
                      id="reset-form-button"
                    >
                      Process Alternative Parameters
                    </button>
                  </Magnetic>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
