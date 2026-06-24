import { useState, useMemo } from 'react';
import { BookOpen, Calendar, Users, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import TextReveal from './TextReveal';

interface Program {
  id: string;
  category: 'TEAM EFFECTIVENESS' | 'MANAGER EFFECTIVENESS' | 'ORGANIZATIONAL PERFORMANCE' | 'LEADERSHIP DEVELOPMENT';
  title: string;
  description: string;
  audience: string;
  duration: string;
}

export default function ProgramsSection() {
  const [activeTab, setActiveTab] = useState<string>('ALL');

  const categories = [
    { key: 'ALL', label: 'All Catalog' },
    { key: 'TEAM EFFECTIVENESS', label: 'Team Effectiveness' },
    { key: 'MANAGER EFFECTIVENESS', label: 'Manager Effectiveness' },
    { key: 'ORGANIZATIONAL PERFORMANCE', label: 'Organizational Performance' },
    { key: 'LEADERSHIP DEVELOPMENT', label: 'Leadership' }
  ];

  const programs: Program[] = [
    {
      id: 'prog-accountability',
      category: 'TEAM EFFECTIVENESS',
      title: 'Accountability & Ownership',
      description: 'The foundation of everything. When nobody takes real ownership, everything else breaks down.',
      audience: 'All employees',
      duration: 'Half day'
    },
    {
      id: 'prog-communication',
      category: 'TEAM EFFECTIVENESS',
      title: 'Communication Excellence',
      description: 'Not generic skills. The specific patterns causing the most friction in your teams right now.',
      audience: 'All employees',
      duration: 'Half day'
    },
    {
      id: 'prog-first-time',
      category: 'MANAGER EFFECTIVENESS',
      title: 'First-Time Manager Excellence',
      description: 'Most companies promote their best performer — without preparing them to lead. This closes that gap.',
      audience: 'New managers',
      duration: 'Half day'
    },
    {
      id: 'prog-feedback',
      category: 'MANAGER EFFECTIVENESS',
      title: 'Feedback & Difficult Conversations',
      description: 'The conversations managers avoid are costing the organization more than they realize.',
      audience: 'All managers',
      duration: 'Half day'
    },
    {
      id: 'prog-workplace',
      category: 'ORGANIZATIONAL PERFORMANCE',
      title: 'Workplace Effectiveness & Execution',
      description: 'Busy but not productive. This builds the discipline that turns effort into actual results.',
      audience: 'All employees',
      duration: 'Half day'
    },
    {
      id: 'prog-decision',
      category: 'LEADERSHIP DEVELOPMENT',
      title: 'Decision-Making Under Uncertainty',
      description: 'Slow decisions cost more than wrong ones. This builds the confidence to decide and move.',
      audience: 'Leaders & managers',
      duration: 'Half day'
    }
  ];

  const filteredPrograms = useMemo(() => activeTab === 'ALL' 
    ? programs 
    : programs.filter(p => p.category === activeTab), [activeTab]);

  return (
    <section id="programs" className="relative py-8 bg-transparent border-none overflow-hidden md:py-12">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 select-none">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-6 md:mb-8"
        >
          <div className="border border-[#C5A059]/20 bg-gradient-to-br from-white to-slate-50 border border-slate-100 px-4 py-1.5 rounded-full inline-flex items-center gap-2 mb-3 shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-[10px] text-[#C5A059] font-mono tracking-[0.18em] font-medium uppercase">
              Operational Portfolios
            </span>
          </div>
          <h2 className="font-display font-medium text-4xl sm:text-5xl md:text-6xl text-[#0A192F] tracking-tight leading-[1.1] mb-6 inline-flex flex-wrap justify-center gap-x-2">
            <TextReveal text="Where Most " delay={0.2} blur={true} wordClassName="inline-block" />
            <span className="font-serif italic font-light text-[#C5A059] relative inline-block">
              <TextReveal text="Organizations Start" delay={0.4} blur={true} wordClassName="inline-block" />
              <motion.div 
                className="absolute -bottom-2 left-0 h-[3px] bg-[#C5A059]/40"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              />
            </span>
          </h2>
          <TextReveal 
            text="Syllabi engineered strictly for execution — bypassing the usual motivation traps and generic trainer scripts."
            as="p"
            className="text-slate-500 font-sans text-base sm:text-lg font-light leading-relaxed max-w-2xl"
            delay={0.6}
            blur={true}
          />
        </motion.div>

        {/* Categories Tab Navigation */}
        <div className="flex flex-nowrap overflow-x-auto scrollbar-none pb-4 lg:pb-0 lg:flex-wrap justify-start lg:justify-center gap-3 mb-6 select-none max-w-4xl mx-auto px-4 -mx-4 md:px-0 md:mx-auto">
          {categories.map((cat) => {
            const isActive = activeTab === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
                className={`px-6 py-3 rounded-2xl font-mono text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] border transition-all duration-500 cursor-pointer relative overflow-hidden group shrink-0 ${
                  isActive 
                    ? 'bg-slate-900 text-[#C5A059] border-slate-900 shadow-xl scale-105' 
                    : 'bg-gradient-to-br from-white to-slate-50 border border-slate-100 text-slate-500 hover:text-[#0A192F] hover:border-slate-300 shadow-sm'
                }`}
              >
                <span className="relative z-10">{cat.label}</span>
                {isActive && (
                  <>
                    <motion.div 
                      layoutId="activeTabGlow"
                      className="absolute inset-0 bg-gradient-to-br from-[#C5A059]/10 to-transparent pointer-events-none"
                    />
                    <motion.div 
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#C5A059] rounded-t-full shadow-[0_0_8px_rgba(197,160,89,0.5)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  </>
                )}
              </button>
            );
          })}
        </div>

        {/* Programs Display Stage */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredPrograms.map((prog, index) => (
              <motion.div
                key={prog.id}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={typeof window !== 'undefined' && window.innerWidth > 768 ? { scale: 1.01, y: -4 } : {}}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  ease: [0.23, 1, 0.32, 1], 
                  delay: index * 0.05,
                }}
                className="group relative bg-gradient-to-br from-white to-slate-50 border border-slate-100 rounded-3xl p-8 sm:p-10 flex flex-col justify-between hover:shadow-[0_30px_60px_-15px_rgba(10,25,47,0.08)] hover:border-[#C5A059]/30 transition-shadow duration-500 h-full overflow-hidden"
              >
                {/* Subtle Glow Reflection Layer */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C5A059]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                {/* Active Light Line - Top */}
                <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative z-10">
                  {/* Category Pill Tag */}
                  <div className="inline-flex px-3 py-1 rounded-md border border-slate-200/50 bg-white/50 text-[#64748b] text-[8px] font-mono font-bold tracking-[0.2em] uppercase mb-6 group-hover:border-[#C5A059]/30 group-hover:text-[#A68444] transition-all duration-500">
                    {prog.category}
                  </div>

                  {/* Program Title */}
                  <h3 className="font-display font-bold text-lg sm:text-xl text-[#0A192F] tracking-tight leading-snug mb-3 uppercase group-hover:text-[#C5A059] transition-colors duration-500">
                    {prog.title}
                  </h3>

                  {/* Program Description */}
                  <p className="text-slate-600 text-sm font-medium leading-relaxed mb-8 opacity-100 transition-opacity duration-700">
                    {prog.description}
                  </p>
                </div>

                {/* Info Block */}
                <div className="relative z-10 space-y-5 pt-6 mt-auto">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-slate-100 via-slate-200/50 to-transparent" />
                  
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center gap-3 text-slate-400">
                      <Users className="w-3.5 h-3.5 text-[#C5A059]/60" />
                      <span className="font-mono text-[9px] uppercase tracking-wider">Audience: <strong className="text-slate-900 font-bold">{prog.audience}</strong></span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-[#C5A059]/60" />
                      <span className="font-mono text-[9px] uppercase tracking-wider">Duration: <strong className="text-slate-900 font-bold">{prog.duration}</strong></span>
                    </div>
                  </div>

                  {/* Action Link Row */}
                  <a
                    href={`https://wa.me/918596059607?text=${encodeURIComponent(`Hi AVYSTRA, I would like to enquire about the "${prog.title}" program.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border border-slate-200 bg-white text-[#0A192F] hover:bg-[#0A192F] hover:text-[#C5A059] hover:border-[#0A192F] transition-all duration-300 cursor-pointer text-[9px] font-mono font-black uppercase tracking-[0.2em] group/btn shadow-sm hover:shadow-lg"
                  >
                    <span>Enquire Now</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A059] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom Banner as in Page 9 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-14 p-5 bg-[#0A192F] border border-slate-800 rounded-3xl text-center max-w-4xl mx-auto shadow-lg relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
          <p className="text-slate-200 font-sans text-xs sm:text-[13px] font-medium leading-relaxed">
            Every program connects to <span className="text-white font-bold underline decoration-[#C5A059]">real business outcomes</span> — because clarity, accountability, and execution drive performance.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
