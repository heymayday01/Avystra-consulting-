import React from 'react';
import {
  Hourglass,
  TrendingUp,
  RotateCw,
  UserX,
  PenTool,
  CalendarDays,
} from 'lucide-react';
// REMOVED: AlertOctagon — imported but never used
// REMOVED: DoodleSparkle — imported but never used
import { motion } from 'motion/react';

// ─── TYPES ───────────────────────────────────────────────────────
interface CostCardProps {
  id:          string;
  prefix:      string; // text before "has a cost"
  description: string;
  icon:        React.ReactNode;
}

// ─── CONSTANTS ───────────────────────────────────────────────────
// FIX: Magic color strings consolidated — change once, updates everywhere
const GOLD  = '#C5A059';
const NAVY  = '#0A192F';

// FIX: Removed costLabel from data — it was defined in the interface
// and passed in data but JSX always hardcoded "has a cost" anyway.
// Renamed title → prefix (just the part before "has a cost")
// so the string split hack at render time is gone entirely.
const COSTS: CostCardProps[] = [
  {
    id:          'cost-delay',
    prefix:      'Every delay',
    description: 'It slows progress, disrupts momentum, and increases execution effort.',
    icon:        <Hourglass className="w-5 h-5" style={{ color: GOLD }} />,
  },
  {
    id:          'cost-opportunity',
    prefix:      'Every lost opportunity',
    description: 'It reduces growth, revenue, and your long-term market position.',
    icon:        <TrendingUp className="w-5 h-5" style={{ color: GOLD }} />,
  },
  {
    id:          'cost-escalation',
    prefix:      'Every escalation that routes back to you',
    description: 'It creates bottlenecks, stalls decisions, and drains leadership bandwidth.',
    icon:        <RotateCw className="w-5 h-5" style={{ color: GOLD }} />,
  },
  {
    id:          'cost-role',
    prefix:      'Every unclear role',
    description: 'It leads to duplicated effort, confusion, and missed accountability.',
    icon:        <UserX className="w-5 h-5" style={{ color: GOLD }} />,
  },
  {
    id:          'cost-approval',
    prefix:      'Every approval that never needed your signature',
    description: 'It limits team empowerment and compounds your decision fatigue daily.',
    icon:        <PenTool className="w-5 h-5" style={{ color: GOLD }} />,
  },
];

// Shared motion config — defined once, reused across all cards
// FIX: whileHover scale removed from motion.div — scale triggers
// layout recalculation on every card. Replaced with CSS hover
// transform via Tailwind so it runs on the compositor only.
const CARD_MOTION = (idx: number) => ({
  initial:    { opacity: 0, y: 16 },
  whileInView:{ opacity: 1, y: 0  },
  viewport:   { once: true, margin: '-40px' },
  transition: {
    duration: 0.55,
    delay:    idx * 0.07,
    ease:     [0.16, 1, 0.3, 1] as [number, number, number, number],
  },
});

const SUMMARY_MOTION = {
  initial:    { opacity: 0, y: 12 },
  whileInView:{ opacity: 1, y: 0  },
  viewport:   { once: true },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

// ─── SUBCOMPONENTS ───────────────────────────────────────────────
const SectionBadge = () => (
  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/60 border border-slate-200/50 rounded-full mb-3.5 shadow-sm">
    {/* FIX: Added explicit aria-hidden — decorative pulse dot */}
    <span
      className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"
      aria-hidden="true"
    />
    <span className="text-[9px] font-mono tracking-widest font-bold uppercase" style={{ color: NAVY }}>
      The Invisible Drain
    </span>
  </div>
);

const CostCard = ({ cost, idx }: { cost: CostCardProps; idx: number }) => (
  <motion.div
    key={cost.id}
    {...CARD_MOTION(idx)}
    // FIX: Replaced whileHover={{ scale: 1.01 }} with CSS class below.
    // Framer Motion scale on hover fires a JS animation frame on every
    // mouse movement. CSS transform: scale runs purely on compositor.
    className="
      group relative flex flex-col sm:flex-row sm:items-center justify-between
      p-5 rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-slate-100
      hover:border-[#C5A059]/40
      hover:shadow-[0_12px_30px_-8px_rgba(197,160,89,0.08)]
      hover:[transform:scale(1.008)]
      transition-all duration-300
      will-change-transform
    "
  >
    {/* Left — icon + title */}
    <div className="flex items-center gap-4">
      <div
        className="p-2.5 rounded-xl shrink-0 transition-colors duration-200 group-hover:bg-[#C5A059]/20"
        style={{ backgroundColor: `${GOLD}1A` }} // 1A = 10% opacity hex
        aria-hidden="true"
      >
        {cost.icon}
      </div>

      <h4 className="font-display font-bold text-sm sm:text-base tracking-tight leading-snug" style={{ color: NAVY }}>
        {cost.prefix}
        <span className="font-serif italic font-light ml-1.5 lowercase" style={{ color: GOLD }}>
          has a cost
        </span>
      </h4>
    </div>

    {/* Right — description */}
    {/* FIX: Added sm:max-w-[52%] to prevent description from colliding
        with long prefixes on mid-width viewports */}
    <div className="
      mt-2.5 sm:mt-0 sm:pl-6
      border-t sm:border-t-0 sm:border-l border-slate-100
      pt-2.5 sm:pt-0
      sm:w-1/2 sm:max-w-[52%]
    ">
      <p className="text-slate-500 text-[12px] sm:text-[13px] font-sans font-light leading-relaxed">
        {cost.description}
      </p>
    </div>
  </motion.div>
);

const CumulativePenaltyCard = () => (
  <motion.div
    {...SUMMARY_MOTION}
    className="
      mt-8 p-5 rounded-2xl
      flex items-center gap-4 text-left
      shadow-lg overflow-hidden relative
      border border-slate-800
    "
    style={{ backgroundColor: NAVY }}
  >
    {/* Grid texture */}
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.03]"
      style={{
        backgroundImage: 'linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)',
        backgroundSize: '16px 16px',
      }}
      aria-hidden="true"
    />

    <div
      className="p-2.5 rounded-xl shrink-0 relative z-10"
      style={{ backgroundColor: `${GOLD}1A` }}
      aria-hidden="true"
    >
      <CalendarDays className="w-5 h-5" style={{ color: GOLD }} />
    </div>

    <div className="relative z-10">
      <p className="text-[11px] sm:text-xs font-mono uppercase tracking-wider font-bold" style={{ color: GOLD }}>
        The Cumulative Penalty
      </p>
      <p className="text-slate-200 text-xs sm:text-[13px] font-sans font-light leading-relaxed mt-0.5">
        The cost is not always visible. But it compounds.{' '}
        <span
          className="font-semibold text-white underline"
          style={{ textDecorationColor: GOLD }}
        >
          Every single day.
        </span>
      </p>
    </div>
  </motion.div>
);

// ─── MAIN COMPONENT ───────────────────────────────────────────────
export default function CostSection() {
  // FIX: Renamed from BentoGrid — this is not a bento grid.
  // A bento grid has asymmetric tiling. This is a stacked list.
  // Naming it BentoGrid causes confusion when searching the codebase.
  return (
    <section
      className="relative py-12 bg-transparent border-t border-slate-100 overflow-hidden"
      aria-labelledby="cost-section-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full select-none">

        {/* Header */}
        <header className="text-center max-w-2xl mx-auto mb-10">
          <SectionBadge />

          <h2
            id="cost-section-heading"
            className="font-display font-bold text-3xl sm:text-4xl tracking-tight leading-tight"
            style={{ color: NAVY }}
          >
            The Hidden{' '}
            <span className="font-serif italic font-light" style={{ color: GOLD }}>
              Cost of Disorganization
            </span>
          </h2>

          <p className="text-slate-500 text-xs sm:text-sm font-sans font-light mt-3">
            Operational friction is not merely annoying — it is highly expensive,
            constantly leaking strategic capacity.
          </p>
        </header>

        {/* Cost cards */}
        <div className="space-y-4" role="list" aria-label="Operational cost items">
          {COSTS.map((cost, idx) => (
            <div key={cost.id} role="listitem">
              <CostCard cost={cost} idx={idx} />
            </div>
          ))}
        </div>

        {/* Summary card */}
        <CumulativePenaltyCard />

      </div>
    </section>
  );
}