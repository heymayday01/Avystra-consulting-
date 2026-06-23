import React, { useState, useEffect } from 'react';
import { 
  User, 
  Briefcase, 
  MessageSquare, 
  ChevronRight, 
  ChevronLeft, 
  ArrowRight, 
  Loader2, 
  CheckCircle, 
  Database,
  TrendingUp,
  Award,
  Zap,
  Check,
  AlertTriangle,
  RotateCcw,
  Calendar,
  PhoneCall,
  ShieldCheck,
  FileText,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DoodleSparkle } from './DoodleWidgets';

interface Question {
  id: number;
  text: string;
  dimensionCode: 'L' | 'M' | 'T' | 'E';
  dimensionName: string;
  color: string;
}

const questions: Question[] = [
  // DIMENSION 1 — Leadership & Direction (code: L, color: navy #1B2A6B)
  {
    id: 1,
    dimensionCode: 'L',
    dimensionName: 'Leadership & Direction',
    color: '#1B2A6B',
    text: 'When leadership sets a new priority — does it change how teams actually work on the ground?'
  },
  {
    id: 2,
    dimensionCode: 'L',
    dimensionName: 'Leadership & Direction',
    color: '#1B2A6B',
    text: 'Are important decisions made at the right level — without coming back to the founder every time?'
  },
  {
    id: 3,
    dimensionCode: 'L',
    dimensionName: 'Leadership & Direction',
    color: '#1B2A6B',
    text: 'Does your organization consistently recognize and reward high performers — regardless of who they are close to?'
  },
  {
    id: 4,
    dimensionCode: 'L',
    dimensionName: 'Leadership & Direction',
    color: '#1B2A6B',
    text: 'Does your organization run smoothly — even when the founder is not directly involved in day-to-day decisions?'
  },
  // DIMENSION 2 — Manager Effectiveness (code: M, color: gold #C9A84C)
  {
    id: 5,
    dimensionCode: 'M',
    dimensionName: 'Manager Effectiveness',
    color: '#C9A84C',
    text: 'When a manager gives feedback to a team member — does it lead to visible, lasting change?'
  },
  {
    id: 6,
    dimensionCode: 'M',
    dimensionName: 'Manager Effectiveness',
    color: '#C9A84C',
    text: 'Are promotions and salary decisions based on measurable performance — rather than personal relationships?'
  },
  {
    id: 7,
    dimensionCode: 'M',
    dimensionName: 'Manager Effectiveness',
    color: '#C9A84C',
    text: 'When someone underperforms consistently — does a manager address it directly and quickly?'
  },
  {
    id: 8,
    dimensionCode: 'M',
    dimensionName: 'Manager Effectiveness',
    color: '#C9A84C',
    text: 'Do employees in your organization feel safe raising concerns about their manager?'
  },
  // DIMENSION 3 — Team Accountability (code: T, color: blue #3B82F6)
  {
    id: 9,
    dimensionCode: 'T',
    dimensionName: 'Team Accountability',
    color: '#3B82F6',
    text: 'After a meeting where tasks are agreed — are they actually completed two weeks later?'
  },
  {
    id: 10,
    dimensionCode: 'T',
    dimensionName: 'Team Accountability',
    color: '#3B82F6',
    text: 'When something goes wrong — does your organization clearly identify who was responsible?'
  },
  {
    id: 11,
    dimensionCode: 'T',
    dimensionName: 'Team Accountability',
    color: '#3B82F6',
    text: 'Are the same rules and standards applied to everyone — regardless of seniority or relationships?'
  },
  {
    id: 12,
    dimensionCode: 'T',
    dimensionName: 'Team Accountability',
    color: '#3B82F6',
    text: 'When two departments need to collaborate — does it happen smoothly and without friction?'
  },
  // DIMENSION 4 — Execution Systems (code: E, color: green #10B981)
  {
    id: 13,
    dimensionCode: 'E',
    dimensionName: 'Execution Systems',
    color: '#10B981',
    text: 'By mid-year — is your annual plan still being actively tracked and acted upon?'
  },
  {
    id: 14,
    dimensionCode: 'E',
    dimensionName: 'Execution Systems',
    color: '#10B981',
    text: 'When a new process is introduced — is it still being followed three months later?'
  },
  {
    id: 15,
    dimensionCode: 'E',
    dimensionName: 'Execution Systems',
    color: '#10B981',
    text: 'Does the most deserving person get ahead — rather than the most visible or politically connected?'
  },
  {
    id: 16,
    dimensionCode: 'E',
    dimensionName: 'Execution Systems',
    color: '#10B981',
    text: 'When your organization faces pressure or tight deadlines — does the team stay focused and perform well?'
  }
];

const answerOptions = [
  { label: 'Never', value: 1 },
  { label: 'Rarely', value: 2 },
  { label: 'Sometimes', value: 3 },
  { label: 'Usually', value: 4 },
  { label: 'Always', value: 5 }
];

interface Contradiction {
  id: string;
  title: string;
  description: string;
  risk: string;
  antidote: string;
  questionsInvolved: string[];
}

export default function OGIDiagnostic() {
  // Screens state: 'INTRO', 'INFO_CAPTURE', 'QUESTIONS', 'NUDGE', 'LOADING', 'RESULTS'
  const [screen, setScreen] = useState<'INTRO' | 'INFO_CAPTURE' | 'QUESTIONS' | 'NUDGE' | 'LOADING' | 'RESULTS'>('INTRO');
  
  // User info
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [contact, setContact] = useState(''); // Email or WhatsApp

  // Question tracking
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [selectedOptionTemp, setSelectedOptionTemp] = useState<number | null>(null);

  // Validation state
  const [infoError, setInfoError] = useState('');

  // Results interactive states
  const [activeDimension, setActiveDimension] = useState<'L' | 'M' | 'T' | 'E'>('L');
  const [selectedTopic, setSelectedTopic] = useState('De-bottleneck Founder Dependency');
  const [isBooked, setIsBooked] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Auto-advance delay handler
  const handleAnswerSelect = (score: number) => {
    setSelectedOptionTemp(score);
    // Persist answer
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestionIndex].id]: score
    }));

    // Auto-advance with 300ms visual delay
    setTimeout(() => {
      setSelectedOptionTemp(null);
      const nextIndex = currentQuestionIndex + 1;
      
      if (currentQuestionIndex === 7) {
        // Just answered Q8 (index 7), trigger nudge before Q9 (index 8)
        setScreen('NUDGE');
      } else if (nextIndex < 16) {
        setCurrentQuestionIndex(nextIndex);
      } else {
        // Finished all 16 questions
        setScreen('LOADING');
      }
    }, 300);
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      setScreen('INFO_CAPTURE');
    }
  };

  const validateAndNextInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setInfoError('Please enter your name.');
      return;
    }
    if (!role.trim()) {
      setInfoError('Please enter your professional role.');
      return;
    }
    if (!contact.trim()) {
      setInfoError('Please enter a WhatsApp number or email address.');
      return;
    }
    
    // Simple validation match
    const cleanContact = contact.trim();
    const isEmail = cleanContact.includes('@');
    const isPhone = cleanContact.replace(/[^0-9]/g, '').length >= 7;

    if (!isEmail && !isPhone) {
      setInfoError('Please provide a valid email address or WhatsApp number.');
      return;
    }

    setInfoError('');
    setScreen('QUESTIONS');
  };

  // Nudge auto-timer
  useEffect(() => {
    if (screen === 'NUDGE') {
      const timer = setTimeout(() => {
        setScreen('QUESTIONS');
        setCurrentQuestionIndex(8); // Start Q9
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  // Loading auto-timer & lead API synchronization
  useEffect(() => {
    if (screen === 'LOADING') {
      // Background save lead for statistical tracking
      const syncRecord = async () => {
        try {
          const detailValue = Object.entries(answers)
            .map(([qId, score]) => `Q${qId}:${score}`)
            .join(', ');

          await fetch('/api/leads/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: name,
              email: contact.includes('@') ? contact : `${contact.replace(/\s+/g, '')}@whatsapp.com`,
              company: `${role} - OGI Self Audit`,
              orgSize: '16-Question Growth Index Indicator',
              stage: 'Completed OGI diagnostic run',
              whatsNotWorking: `Calculated answer profile: [${detailValue}]`
            })
          });
        } catch (e) {
          console.error('[OGI lead sync error]:', e);
        }
      };

      syncRecord();

      const timer = setTimeout(() => {
        setScreen('RESULTS');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [screen, answers, name, role, contact]);

  // Restart diagnostic
  const handleRestart = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setName('');
    setRole('');
    setContact('');
    setIsBooked(false);
    setScreen('INTRO');
  };

  // Booking submit simulations
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingLoading(true);
    // Simulate real database locking
    try {
      await fetch('/api/leads/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name,
          email: contact.includes('@') ? contact : `${contact.replace(/\s+/g, '')}@whatsapp.com`,
          company: `${role} - OGI Audit Session Locked`,
          orgSize: 'Locked OGI Premium Debrief Session',
          stage: `Interactive theme selected: ${selectedTopic}`,
          whatsNotWorking: `Requires custom advisory run based on current OGI scores.`
        })
      });
    } catch (err) {
      console.error(err);
    }
    setTimeout(() => {
      setBookingLoading(false);
      setIsBooked(true);
    }, 1200);
  };

  // Mapped Score Computations
  const getDimensionScore = (code: 'L' | 'M' | 'T' | 'E'): { score: number, pct: number, label: string, color: string } => {
    const qIds = questions
      .filter(q => q.dimensionCode === code)
      .map(q => q.id);
    
    let sum = 0;
    let count = 0;
    qIds.forEach(id => {
      if (answers[id]) {
        sum += answers[id];
        count++;
      }
    });

    const avg = count > 0 ? sum / count : 1; // 1 to 5
    // Display percentages on intuitive corporate level mapping (avg / 5 * 100)
    const pct = Math.round((avg / 5) * 100);
    
    let label = 'Under Review';
    let color = '';
    if (code === 'L') { label = 'Leadership & Direction'; color = '#1B2A6B'; }
    if (code === 'M') { label = 'Manager Effectiveness'; color = '#C9A84C'; }
    if (code === 'T') { label = 'Team Accountability'; color = '#3B82F6'; }
    if (code === 'E') { label = 'Execution Systems'; color = '#10B981'; }

    return { score: Number(avg.toFixed(1)), pct, label, color };
  };

  const lData = getDimensionScore('L');
  const mData = getDimensionScore('M');
  const tData = getDimensionScore('T');
  const eData = getDimensionScore('E');

  const overallScorePct = Math.round((lData.pct + mData.pct + tData.pct + eData.pct) / 4);

  // Diagnostic Tier Allocation
  let tierName = 'Siloed Execution';
  let tierDesc = '';
  let tierBadgeColor = '';
  let tierTxtColor = '';
  let tierBorderColor = '';

  if (overallScorePct >= 85) {
    tierName = 'Elite Scaling (Optimized)';
    tierDesc = 'Your organization runs on strong strategic clarity, empowered managers, high accountability, and robust execution systems. Ready for heavy structural scaling with minimal friction.';
    tierBadgeColor = 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    tierTxtColor = 'text-emerald-700';
    tierBorderColor = 'border-emerald-300';
  } else if (overallScorePct >= 65) {
    tierName = 'Operational Growth (Aligned)';
    tierDesc = 'Core systems and strategies are mostly aligned, but execution remains variable or dependent on specific key players. Scaling is feasible but will create strain without standardizing manager authority.';
    tierBadgeColor = 'bg-blue-50 text-blue-700 border border-blue-200';
    tierTxtColor = 'text-blue-700';
    tierBorderColor = 'border-blue-300';
  } else if (overallScorePct >= 45) {
    tierName = 'Siloed Execution (Reactive)';
    tierDesc = 'Communication blocks and department silos are slowing execution. Action depends heavily on crisis control, pressure, or key managers tracking things manually. Accountability is tribal rather than systematic.';
    tierBadgeColor = 'bg-amber-50 text-amber-700 border border-amber-200';
    tierTxtColor = 'text-amber-700';
    tierBorderColor = 'border-amber-300';
  } else {
    tierName = 'Founder Bound (Critical)';
    tierDesc = 'Extreme key-person dependency. Decisions must route through the founder to stay active. Underperformance lags, accountability loops are weak, and long-term plans are lost under reactive fire-fighting.';
    tierBadgeColor = 'bg-rose-50 text-rose-700 border border-rose-200';
    tierTxtColor = 'text-rose-700';
    tierBorderColor = 'border-rose-300';
  }

  // Contradictions evaluation
  const getContradictions = (): Contradiction[] => {
    const list: Contradiction[] = [];
    
    // Contradiction 1: Priority vs. Ground Reality Strategy Mismatch
    const q1 = answers[1] || 3;
    const q13 = answers[13] || 3;
    if (q1 <= 2 && q13 >= 4) {
      list.push({
        id: 'priority-execution-gap',
        title: 'Executive Isolation Mismatch',
        description: 'Your annual plan is being actively tracked at the executive tier, yet setting new strategic priorities does not change on-the-ground, day-to-day work routines.',
        risk: 'Indicates "Ivory Tower Syndrome"—management tracks compliance reports and strategic slides, but lacks an operational bridge to enforce realignments on the ground. Teams are running blind.',
        antidote: 'Bridge alignment gaps through brief bi-weekly reviews with frontline leaders, matching big objectives directly with weekly sprint schedules to prevent plan drift.',
        questionsInvolved: ['Q1', 'Q13']
      });
    }

    // Contradiction 2: Autonomy Paradox (Verbal vs. Actual Delegation)
    const q2 = answers[2] || 3;
    const q4 = answers[4] || 3;
    if (q2 >= 4 && q4 <= 2) {
      list.push({
        id: 'autonomy-paradox',
        title: 'The Autonomy Paradox',
        description: 'You indicated that operational decisions are delegated correctly down without coming back to the founder, but standard operations stall when the founder is absent.',
        risk: 'Reveals a "Shadow Bottleneck." While decision authority exists formally on paper, the lack of robust accountability frameworks and documented processes forces team reliance on founder intervention to function.',
        antidote: 'Formalize Standard Operating Procedures (SOPs) for high-impact routines and build objective risk-tier models defining clear exception guidelines for founder escalation.',
        questionsInvolved: ['Q2', 'Q4']
      });
    }

    // Contradiction 3: Reward / Meritocracy Illusion
    const q6 = answers[6] || 3;
    const q15 = answers[15] || 3;
    if (q6 >= 4 && q15 <= 2) {
      list.push({
        id: 'reward-merit-mismatch',
        title: 'Promotional Meritocracy Mismatch',
        description: 'Salary and promotional updates are formally mapped to measurable metrics, yet the team observes that politically connected or highly visible individuals get ahead over objective work.',
        risk: 'Breeds critical cultural cynicism. Formal evaluation routines appear performative, leading to high-performer disengagement and tribal behavior styled to capture leadership visibility.',
        antidote: 'Calibrate objective metrics by aligning peer-review feedback, standardizing rubric grading parameters, and publicizing promotion criteria to restore executive credibility.',
        questionsInvolved: ['Q6', 'Q15']
      });
    }

    // Contradiction 4: Feedback without Consequence (Friction Leakage)
    const q5 = answers[5] || 3;
    const q7 = answers[7] || 3;
    if (q5 >= 4 && q7 <= 2) {
      list.push({
        id: 'feedback-consequence-gap',
        title: 'Performative Feedback Gap',
        description: 'Managers frequently provide feedback that drives lasting action, but consistently fail to address systematic, chronic underperformance quickly and directly.',
        risk: 'High alignment efforts are compromised by a complete lack of consequences. High performers carry the load for underperforming peers, generating structural fatigue and performance slide.',
        antidote: 'Train managers on clear Corrective Action Protocols (CAPs) and standard Performance Improvement Plans (PIPs) to build operational boundaries and handle performance drag.',
        questionsInvolved: ['Q5', 'Q7']
      });
    }

    return list;
  };

  const contradictions = getContradictions();

  // Dynamic feedback provider depending on score tier
  const getPillarFeedbackText = (code: 'L' | 'M' | 'T' | 'E') => {
    const data = getDimensionScore(code);
    if (code === 'L') {
      if (data.pct < 60) return 'Strategic clarity bottleneck. Your leadership goals are detached from frontline daily task assignments, leading to decision exhaustion and founder bottleneck dependencies.';
      if (data.pct < 80) return 'Objectives are mostly understood, but heavy manual manager interventions and frequent alignment calls are needed to sustain focus. Moderate dependency exists.';
      return 'Elite-tier strategic alignment. Priorities propagate dynamically downstream, decisions are taken at the right level, and workflows run independently of individual founder oversight.';
    }
    if (code === 'M') {
      if (data.pct < 60) return 'Performance friction point. Managers operate primarily as high-level individual contributors rather than systems coaches. Underperformance is bypassed and trust parameters are volatile.';
      if (data.pct < 80) return 'Managers deliver constructive feedback, but struggle to implement standardized consequences for structural performance drift or peer-relationship biases.';
      return 'Leveraged manager network. Managers command high engagement, manage underperformance swiftly, and handle feedback with systemic objectivity.';
    }
    if (code === 'T') {
      if (data.pct < 60) return 'Severe accountability gap. Meeting agreements dissipate rapidly within 2 weeks. Inter-departmental handoffs are highly friction-bound, and mistakes lack clear owners.';
      if (data.pct < 80) return 'Action items are tracked, but ownership gets blurred when systems fail. Collaborations are operational but reactive rather than naturally fluid.';
      return 'Self-governing operational teams. High integrity on agreed milestones, clear systematic accountability for setbacks, and robust cross-departmental alignment.';
    }
    // Execution Systems
    if (data.pct < 60) return 'Highly reactive execution workflow. Strategic plans are sidelined by daily crises. Integrity and discipline for new processes degrade completely within 3 months.';
    if (data.pct < 80) return 'Processes and targets are actively updated, but adherence to new procedural inputs tends to weaken unless constant pressure/scrutiny from leadership is applied.';
    return 'Resilient execution systems. Year-round plans stay consistently active, standard procedures remain disciplined and followed long-term, and teams stay hyper-focused under tight constraints.';
  };

  const getPillarStatusText = (pct: number) => {
    if (pct >= 80) return 'Optimized';
    if (pct >= 60) return 'Stable';
    return 'At Risk';
  };

  const getPillarStatusStyle = (pct: number) => {
    if (pct >= 80) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (pct >= 60) return 'bg-blue-50 text-blue-700 border-blue-200';
    return 'bg-rose-50 text-rose-700 border-rose-200';
  };

  const currentQ = questions[currentQuestionIndex];
  const progressPercent = ((currentQuestionIndex + 1) / 16) * 100;

  return (
    <section id="consult" className="relative py-8 bg-transparent border-none overflow-hidden md:py-12 scroll-mt-24">
      {/* Decorative overlays */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#C5A059]/[0.02] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/[0.01] blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 gsap-stagger-container">
        
        {/* Content Box */}
        <div className="liquid-glass rounded-3xl overflow-hidden min-h-[500px] flex flex-col justify-between gsap-stagger-card">
          
          <AnimatePresence mode="wait">
            
            {/* INTRO SCREEN */}
            {screen === 'INTRO' && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="p-8 sm:p-12 md:p-20 flex flex-col justify-center items-center h-full flex-grow text-center"
                id="ogi-screen-intro"
              >
                <div className="max-w-3xl">
                  <div className="flex justify-center mb-8">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#C5A059]/5 rounded-full border border-[#C5A059]/10 text-[11px] text-[#A68449] font-mono tracking-widest font-bold uppercase relative">
                      <Zap className="w-3.5 h-3.5 text-[#C5A059]" />
                      Organizational Diagnostic
                      <DoodleSparkle className="-top-3 -right-4 text-[#C5A059] w-5 h-5 animate-pulse" delay={0.1} />
                    </span>
                  </div>

                  <h2 className="font-display font-medium text-4xl sm:text-6xl text-[#0A192F] tracking-tighter leading-[0.95] mb-8">
                    OGI — <span className="font-serif italic text-[#C5A059]">Organizational Growth Index</span>
                  </h2>

                  <p className="text-slate-600 font-sans text-lg sm:text-xl max-w-xl mx-auto leading-relaxed font-light mb-12">
                    A clinical self-assessment measuring execution gaps across 4 core growth pillars. It takes 3 minutes to complete and instantly generates your personalized strategic report.
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
                    {[
                      { name: 'Leadership', code: 'L', color: 'bg-[#1B2A6B]' },
                      { name: 'Managers', code: 'M', color: 'bg-[#C9A84C]' },
                      { name: 'Accountability', code: 'T', color: 'bg-[#3B82F6]' },
                      { name: 'Execution', code: 'E', color: 'bg-[#10B981]' }
                    ].map((item) => (
                      <div key={item.code} className="p-4 rounded-xl bg-white/50 border border-slate-200/50 flex flex-col items-center group">
                        <span className={`w-6 h-6 rounded-full ${item.color} mb-3 flex items-center justify-center text-[10px] text-white font-mono font-bold`}>
                          {item.code}
                        </span>
                        <h4 className="text-[10px] font-display font-bold text-[#0A192F] leading-tight">{item.name}</h4>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => setScreen('INFO_CAPTURE')}
                    className="group inline-flex items-center gap-3 bg-[#0A192F] hover:bg-[#C5A059] text-white font-display text-sm font-semibold tracking-wider uppercase px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                    id="ogi-btn-start"
                  >
                    <span>Begin Diagnostic</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* INFO CAPTURE SCREEN */}
            {screen === 'INFO_CAPTURE' && (
              <motion.div
                key="info_capture"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="p-8 sm:p-12 md:p-16 flex flex-col justify-between h-full flex-grow"
                id="ogi-screen-info"
              >
                <div>
                  <button 
                    onClick={() => setScreen('INTRO')}
                    className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-[#C5A059] font-mono tracking-wide mb-8 group cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" />
                    Back to intro
                  </button>

                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#0A192F] tracking-tight mb-2">
                    Let's index your identity
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm font-sans font-light leading-relaxed mb-8 max-w-xl">
                    Who is operating the blueprint? Provide brief parameters so we customize your index evaluation correctly.
                  </p>

                  <form onSubmit={validateAndNextInfo} className="space-y-6 max-w-xl">
                    {/* Name Entry */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Your Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-3.5 w-4 h-4 text-[#C5A059] pointer-events-none" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            if (infoError) setInfoError('');
                          }}
                          placeholder="e.g. Kirankumar Pandey"
                          className="w-full bg-slate-50 border border-slate-200 focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/20 rounded-xl py-3.5 pl-11 pr-4 text-slate-800 placeholder-slate-400/80 font-sans text-sm focus:outline-none transition-all"
                          id="ogi-input-name"
                        />
                      </div>
                    </div>

                    {/* Role Entry */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Professional Designation / Role</label>
                      <div className="relative">
                        <Briefcase className="absolute left-4 top-3.5 w-4 h-4 text-[#C5A059] pointer-events-none" />
                        <input
                          type="text"
                          required
                          value={role}
                          onChange={(e) => {
                            setRole(e.target.value);
                            if (infoError) setInfoError('');
                          }}
                          placeholder="e.g. Founder, CEO, VP of Operations"
                          className="w-full bg-slate-50 border border-slate-200 focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/20 rounded-xl py-3.5 pl-11 pr-4 text-slate-800 placeholder-slate-400/80 font-sans text-sm focus:outline-none transition-all"
                          id="ogi-input-role"
                        />
                      </div>
                    </div>

                    {/* Contact Entry */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">WhatsApp Number or Business Email</label>
                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-3.5 w-4 h-4 text-[#C5A059] pointer-events-none" />
                        <input
                          type="text"
                          required
                          value={contact}
                          onChange={(e) => {
                            setContact(e.target.value);
                            if (infoError) setInfoError('');
                          }}
                          placeholder="e.g. contact@firm.com or +91 91234 56789"
                          className="w-full bg-slate-50 border border-slate-200 focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/20 rounded-xl py-3.5 pl-11 pr-4 text-slate-800 placeholder-slate-400/80 font-sans text-sm focus:outline-none transition-all"
                          id="ogi-input-contact"
                        />
                      </div>
                    </div>

                    {infoError && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-500 font-mono"
                      >
                        {infoError}
                      </motion.p>
                    )}
                  </form>
                </div>

                <div className="flex justify-end pt-8 mt-6 border-t border-slate-100">
                  <button
                    onClick={validateAndNextInfo}
                    className="group inline-flex items-center gap-2.5 bg-[#0A192F] hover:bg-[#C5A059] text-white font-display text-xs font-bold tracking-wider uppercase px-7 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                    id="ogi-btn-info-continue"
                  >
                    <span>Continue to Questions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* QUESTION SCREENS */}
            {screen === 'QUESTIONS' && (
              <motion.div
                key={`question-${currentQuestionIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="p-8 sm:p-12 flex flex-col justify-between h-full flex-grow"
                id={`ogi-screen-q-${currentQuestionIndex + 1}`}
              >
                <div>
                  {/* Top Header: Pillar indicator dot + pillar name, back button */}
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span 
                        className="w-2.5 h-2.5 rounded-full" 
                        style={{ backgroundColor: currentQ.color }}
                      />
                      <span className="text-[10px] font-mono tracking-widest text-[#0A192F] uppercase font-bold">
                        {currentQ.dimensionName}
                      </span>
                    </div>
                    
                    <button
                      onClick={handleBack}
                      className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#C5A059] font-mono transition-colors group cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-0.5 transition-transform" />
                      Back
                    </button>
                  </div>

                  {/* Progress Indicators */}
                  <div className="mb-10">
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2">
                      <span>Index Integrity Question</span>
                      <strong className="text-slate-700">{currentQuestionIndex + 1} of 16</strong>
                    </div>
                    {/* Minimal elegant progress trail */}
                    <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-300"
                        style={{ 
                          width: `${progressPercent}%`,
                          backgroundColor: currentQ.color
                        }}
                      />
                    </div>
                  </div>

                  {/* Question Text: Large, Centered */}
                  <div className="text-center py-8 px-2 max-w-2xl mx-auto my-6">
                    <h3 className="font-display font-medium text-xl sm:text-2xl text-[#0A192F] leading-snug tracking-tight">
                      "{currentQ.text}"
                    </h3>
                  </div>
                </div>

                {/* 5 Answer Options pills */}
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 max-w-3xl mx-auto">
                    {answerOptions.map((opt) => {
                      const isSelected = selectedOptionTemp === opt.value || answers[currentQ.id] === opt.value;
                      return (
                        <button
                          key={opt.label}
                          onClick={() => handleAnswerSelect(opt.value)}
                          className={`relative py-4 px-3 text-xs sm:text-sm text-center rounded-xl font-display font-semibold transition-all duration-300 transform active:scale-95 border cursor-pointer select-none ${
                            isSelected 
                              ? 'bg-[#0A192F] border-[#0A192F] text-white shadow-md shadow-slate-900/10' 
                              : 'bg-slate-50 border-slate-200/80 hover:border-[#C5A059] hover:bg-white text-slate-600 hover:text-[#0A192F] hover:shadow-sm'
                          }`}
                          id={`ogi-q-${currentQ.id}-opt-${opt.label}`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                  
                  {/* Informational help note */}
                  <p className="text-center text-[10px] font-mono text-slate-400 mt-8 tracking-wider uppercase">
                    Selecting auto-advances to the next milestone
                  </p>
                </div>
              </motion.div>
            )}

            {/* HALFWAY NUDGE SCREEN */}
            {screen === 'NUDGE' && (
              <motion.div
                key="nudge"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35 }}
                onClick={() => {
                  setScreen('QUESTIONS');
                  setCurrentQuestionIndex(8);
                }}
                className="p-10 sm:p-16 flex flex-col items-center justify-center h-full flex-grow text-center bg-slate-50 relative cursor-pointer group"
                id="ogi-screen-nudge"
              >
                <div className="absolute top-4 right-4 text-[9px] font-mono text-slate-300 uppercase tracking-widest">
                  Tap to skip countdown
                </div>

                <div className="w-16 h-16 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/20 flex items-center justify-center text-[#C5A059] mb-6">
                  <TrendingUp className="w-8 h-8 animate-pulse" />
                </div>

                <h3 className="font-display font-medium text-2xl text-[#0A192F] tracking-tight mb-3">
                  Halfway There
                </h3>
                
                <p className="text-slate-500 font-sans text-sm max-w-sm leading-relaxed font-light mb-4 text-center">
                  Outstanding consistency! Diagnosing execution friction is the single most vital step towards systemic scaling. You are doing fantastic.
                </p>

                <div className="w-24 h-[1px] bg-slate-200 my-4" />

                <p className="text-[#A68449] font-mono text-[10px] tracking-widest uppercase font-bold flex items-center gap-1.5 animate-bounce">
                  Next Dimension: Team Accountability
                  <ChevronRight className="w-3.5 h-3.5" />
                </p>
              </motion.div>
            )}

            {/* LOADING SCREEN */}
            {screen === 'LOADING' && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="p-12 sm:p-20 flex flex-col items-center justify-center h-full flex-grow text-center bg-[#0D1640] text-white relative min-h-[500px]"
                id="ogi-screen-loading"
              >
                {/* Micro tech grid background overlay */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:20px_20px]" />
                
                <div className="relative flex flex-col items-center z-10">
                  <div className="relative mb-8">
                    <Loader2 className="w-12 h-12 text-[#C5A059] animate-spin" />
                    <div className="absolute inset-0 rounded-full border-2 border-white/5 opacity-25 animate-ping" />
                  </div>

                  <h3 className="font-display font-medium text-2xl sm:text-3xl text-white tracking-tight mb-3">
                    Analyzing {name}'s Results...
                  </h3>

                  <p className="text-slate-300 font-sans text-sm max-w-sm font-light mt-1 mb-8 leading-relaxed">
                    Calculating organizational growth dimensions, resolving execution dependencies, and scanning critical alignments.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-[10px] font-mono text-slate-300 uppercase tracking-widest animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Executing strategic scoring matrices</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* HIGH-FIDELITY RESULTS SCREEN */}
            {screen === 'RESULTS' && (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="p-6 sm:p-10 md:p-12 flex flex-col justify-between h-full flex-grow text-[#0A192F]"
                id="ogi-screen-results"
              >
                <div>
                  {/* Results Header block */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-slate-100 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span className="text-[10px] font-mono tracking-widest text-[#0A192F] uppercase font-bold">
                          Assessment Successfully Indexed
                        </span>
                      </div>
                      <h3 className="font-display font-semibold text-2xl text-[#0A192F] tracking-tight">
                        Your OGI Audit Summary
                      </h3>
                    </div>

                    <div className="bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-2 text-left sm:text-right">
                      <span className="block text-[8px] font-mono text-slate-400 uppercase tracking-widest leading-none mb-1">Reference Code</span>
                      <strong className="text-[11px] font-mono text-[#0A192F] block leading-none">
                        OGI-{contact.slice(0,2).toUpperCase()}-{Date.now().toString().slice(-4)}
                      </strong>
                    </div>
                  </div>

                  {/* Main Results Split: Circular Meter + Tier explanation */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10 items-center">
                    
                    {/* SVG Radial Progress Ring */}
                    <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-slate-50 border border-slate-200/40 rounded-2xl relative overflow-hidden">
                      <div className="absolute inset-0 bg-[#C5A059]/[0.01]" />
                      <div className="relative w-36 h-36 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                          {/* Background Ring */}
                          <circle
                            cx="72"
                            cy="72"
                            r="62"
                            className="stroke-slate-100 stroke-[8px] fill-transparent"
                          />
                          {/* Progress Ring */}
                          <motion.circle
                            cx="72"
                            cy="72"
                            r="62"
                            className="stroke-[8px] fill-transparent stroke-[#C5A059]"
                            strokeDasharray={2 * Math.PI * 62}
                            initial={{ strokeDashoffset: 2 * Math.PI * 62 }}
                            animate={{ strokeDashoffset: 2 * Math.PI * 62 * (1 - overallScorePct / 100) }}
                            transition={{ duration: 1.5, ease: 'easeOut' }}
                            strokeLinecap="round"
                          />
                        </svg>

                        {/* Internal Score Text */}
                        <div className="absolute text-center">
                          <motion.span 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="block font-display font-semibold text-3xl text-[#0A192F] leading-none"
                          >
                            {overallScorePct}%
                          </motion.span>
                          <span className="block text-[9px] font-mono uppercase text-slate-400 tracking-wider mt-1.5 leading-none">
                            Growth Index
                          </span>
                        </div>
                      </div>

                      {/* Display Tier Name */}
                      <span className="mt-4 inline-block text-[10px] font-mono uppercase tracking-widest font-bold px-3 py-1 bg-white border border-slate-200 rounded-full shadow-2xs text-[#0A192F]">
                        Score Weight
                      </span>
                    </div>

                    {/* Performance Tier Explanation Block */}
                    <div className="md:col-span-8 space-y-3">
                      <div>
                        <span className={`inline-flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1.5 rounded-full ${tierBadgeColor}`}>
                          <Award className="w-3.5 h-3.5" />
                          {tierName}
                        </span>
                      </div>

                      <h4 className="font-display font-bold text-lg text-[#0A192F]">
                        Assessment Context for {name}
                      </h4>

                      <p className="text-slate-500 font-sans text-sm sm:text-[14px] leading-relaxed font-light">
                        {tierDesc} Since your current designation is listed as <span className="font-mono bg-slate-50 text-[#0A192F] px-1.5 py-0.5 rounded border text-xs">{role}</span>, this score implies you are carrying the core execution burden yourself instead of letting organizational systems work automatically.
                      </p>
                    </div>

                  </div>

                  {/* 4 Dimension horizontal meters + interactive accordion detail info */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
                    
                    {/* Dimension selectors (Horizontal meters) */}
                    <div className="lg:col-span-6 space-y-3">
                      <h4 className="text-[10px] font-mono tracking-widest font-bold text-slate-400 uppercase mb-4">
                        Organizational Dimension Indexes
                      </h4>

                      {[lData, mData, tData, eData].map((dim, idx) => {
                        const code = ['L', 'M', 'T', 'E'][idx] as 'L' | 'M' | 'T' | 'E';
                        const isActive = activeDimension === code;
                        const statStyle = getPillarStatusStyle(dim.pct);
                        const statText = getPillarStatusText(dim.pct);

                        return (
                          <div 
                            key={code}
                            onClick={() => setActiveDimension(code)}
                            className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                              isActive 
                                ? 'bg-[#0A192F]/[0.02] border-[#C5A059] shadow-xs' 
                                : 'bg-slate-50/50 border-slate-200/80 hover:border-[#C5A059]/40 hover:bg-white'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] text-white font-mono font-bold" style={{ backgroundColor: dim.color }}>
                                  {code}
                                </span>
                                <span className="text-[12px] font-display font-bold text-[#0A192F]">{dim.label}</span>
                              </div>
                              <span className={`text-[9px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border ${statStyle}`}>
                                {statText}
                              </span>
                            </div>

                            {/* Meter Bar */}
                            <div className="flex items-center gap-3">
                              <div className="h-1.5 flex-grow bg-slate-100 rounded-full overflow-hidden">
                                <motion.div 
                                  className="h-full rounded-full"
                                  style={{ backgroundColor: dim.color }}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${dim.pct}%` }}
                                  transition={{ duration: 1, delay: 0.1 }}
                                />
                              </div>
                              <span className="text-xs font-mono font-bold text-slate-700 min-w-[28px] text-right">
                                {dim.pct}%
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Dimension Interactive Feedback Box */}
                    <div className="lg:col-span-6 flex flex-col justify-between">
                      <div className="p-6 rounded-2xl border border-[#C5A059]/20 bg-[#C5A059]/[0.02] h-full flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <span 
                              className="w-2.5 h-2.5 rounded-full" 
                              style={{ 
                                backgroundColor: activeDimension === 'L' ? '#1B2A6B' : 
                                                 activeDimension === 'M' ? '#C9A84C' : 
                                                 activeDimension === 'T' ? '#3B82F6' : '#10B981' 
                              }}
                            />
                            <h5 className="text-[11px] font-mono uppercase tracking-wider font-bold text-slate-400">
                              Detailed Dimension Analysis
                            </h5>
                          </div>

                          <h4 className="font-display font-bold text-lg text-[#0A192F] mb-3">
                            {
                              activeDimension === 'L' ? 'Leadership & Direction Insights' : 
                              activeDimension === 'M' ? 'Manager Effectiveness Insights' : 
                              activeDimension === 'T' ? 'Team Accountability Insights' : 'Execution Systems Insights'
                            }
                          </h4>

                          <p className="text-slate-600 font-sans text-sm leading-relaxed font-light">
                            {getPillarFeedbackText(activeDimension)}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-[#C5A059]/10 mt-6 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                          Click any other dimension to inspect strategic recommendations
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Contradiction Detections Alert block */}
                  <div className="mb-10">
                    <h4 className="text-[10px] font-mono tracking-widest font-bold text-slate-400 uppercase mb-4">
                      Execution Safeguards & Contradiction Audit
                    </h4>

                    {contradictions.length > 0 ? (
                      <div className="space-y-4">
                        {contradictions.map((contra) => (
                          <div key={contra.id} className="p-5 sm:p-6 bg-rose-50/70 border border-rose-100 rounded-2xl">
                            <div className="flex items-start gap-4">
                              <div className="p-2 bg-rose-100 text-rose-700 rounded-xl mt-0.5">
                                <AlertTriangle className="w-5 h-5" />
                              </div>

                              <div className="space-y-2 flex-grow">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <h5 className="font-display font-bold text-sm sm:text-base text-rose-900">
                                    {contra.title}
                                  </h5>
                                  <div className="flex items-center gap-1">
                                    {contra.questionsInvolved.map(q => (
                                      <span key={q} className="text-[8px] font-mono bg-rose-100 text-rose-700 font-bold px-1.5 py-0.5 rounded">
                                        {q}
                                      </span>
                                    ))}
                                    <span className="text-[9px] font-mono text-rose-500 uppercase font-bold tracking-wider ml-1.5">
                                      Conflict Triggered
                                    </span>
                                  </div>
                                </div>

                                <p className="text-rose-900/80 text-xs sm:text-sm font-sans leading-relaxed">
                                  {contra.description}
                                </p>

                                <div className="p-3 bg-white/60 border border-rose-200/50 rounded-xl mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <strong className="block text-[9px] font-mono uppercase tracking-wider text-rose-700">Strategic Risk</strong>
                                    <p className="text-[11px] sm:text-xs text-rose-900/90 leading-relaxed font-light">{contra.risk}</p>
                                  </div>
                                  <div>
                                    <strong className="block text-[9px] font-mono uppercase tracking-wider text-emerald-700">Structural Antidote</strong>
                                    <p className="text-[11px] sm:text-xs text-emerald-900/90 leading-relaxed font-light">{contra.antidote}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-5 sm:p-6 bg-emerald-50/50 border border-emerald-100 rounded-2xl flex items-center gap-4">
                        <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-full">
                          <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                          <h5 className="font-display font-bold text-sm sm:text-base text-emerald-900 mb-0.5">
                            Sovereign Alignment Seal
                          </h5>
                          <p className="text-emerald-800 text-xs sm:text-sm font-sans font-light leading-relaxed">
                            Excellent operational consistency. No logical or strategic contradictions were detected between your alignment answers and executive workflow responses.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* HIGHLY PERSONALIST LEAD CAPTURE BOOKING FORM */}
                  <div className="p-6 sm:p-8 bg-[#0D1640] rounded-2xl border border-blue-900/40 relative overflow-hidden text-white shadow-xl">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-[#C5A059]/[0.03] blur-[80px] pointer-events-none" />

                    <div className="relative z-10 max-w-3xl">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#C5A059]/10 rounded-full border border-[#C5A059]/20 text-[9px] text-[#C5A059] font-mono tracking-widest font-bold uppercase">
                          <Lock className="w-3 h-3" />
                          Pre-Reserved Executive Allocation
                        </span>
                      </div>

                      {!isBooked ? (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                          <div className="lg:col-span-7 space-y-4">
                            <h4 className="font-display font-medium text-xl sm:text-2xl text-white leading-tight">
                              Claim your <span className="font-serif italic text-[#C5A059]">25-Page CEO Growth Strategy Blueprint</span> & diagnostic call
                            </h4>
                            <p className="text-slate-300 font-sans text-xs sm:text-sm leading-relaxed font-light">
                              {name}, based on your overall rating of <strong className="text-white font-semibold">{overallScorePct}% ({tierName})</strong>, an Avystra Scaling Partner is pre-reserved to spend 25 minutes debriefing your tactical contradictions and modeling execution fixes.
                            </p>

                            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 font-mono">
                              <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                                <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                                Duration: 25 Min
                              </span>
                              <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                                <FileText className="w-3.5 h-3.5 text-[#C5A059]" />
                                Premium Blueprint Included
                              </span>
                            </div>
                          </div>

                          {/* Interactive Subject option submission form */}
                          <div className="lg:col-span-5 bg-white/5 border border-white/10 p-5 rounded-xl text-left">
                            <form onSubmit={handleBookingSubmit} className="space-y-4">
                              <label className="block text-[9px] font-mono uppercase tracking-wider text-slate-300 font-bold">
                                Select Primary Focus Theme
                              </label>

                              <div className="space-y-2">
                                {[
                                  'De-bottleneck Founder Dependency',
                                  'Standardize Manager Feedback Loops',
                                  'Build Frictionless Accountability SOPs',
                                  'Deploy Resilient Execution Plans'
                                ].map((topic) => (
                                  <button
                                    key={topic}
                                    type="button"
                                    onClick={() => setSelectedTopic(topic)}
                                    className={`w-full text-left p-2.5 rounded-lg text-xs font-sans transition-all border ${
                                      selectedTopic === topic
                                        ? 'bg-[#C5A059]/20 border-[#C5A059] text-white font-medium'
                                        : 'bg-white/0 border-white/5 hover:bg-white/5 text-slate-300'
                                    }`}
                                  >
                                    {topic}
                                  </button>
                                ))}
                              </div>

                              <button
                                type="submit"
                                disabled={bookingLoading}
                                className="w-full flex items-center justify-center gap-2 py-3 bg-[#C5A059] hover:bg-[#A68449] disabled:bg-slate-700 text-[#091133] font-display font-semibold text-xs uppercase tracking-wider rounded-lg border border-[#C5A059] cursor-pointer transition-all active:scale-98"
                              >
                                {bookingLoading ? (
                                  <>
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                    <span>Securing Session...</span>
                                  </>
                                ) : (
                                  <>
                                    <PhoneCall className="w-3.5 h-3.5" />
                                    <span>Lock Audit Debrief</span>
                                  </>
                                )}
                              </button>
                            </form>
                          </div>
                        </div>
                      ) : (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-center py-6"
                        >
                          <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                            <Check className="w-6 h-6" />
                          </div>

                          <h4 className="font-display font-semibold text-xl text-white mb-2">
                            Audit Debrief Successfully Locked
                          </h4>

                          <p className="text-slate-300 font-sans text-xs sm:text-sm max-w-lg mx-auto leading-relaxed mb-6 font-light">
                            Thank you, {name}! Your preference for <strong className="text-white font-medium">"{selectedTopic}"</strong> has been prioritised. Our coordinating partner is preparing your custom CEO Growth Blueprint and will reach out at <span className="text-emerald-400 font-mono">{contact}</span> directly within 12 business hours.
                          </p>

                          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[9px] px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                            Pre-Audit Briefing Scheduled
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>

                </div>

                {/* Footer restart and navigation hooks */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-8 mt-10 border-t border-slate-100">
                  <button
                    onClick={handleRestart}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-mono font-bold text-slate-400 hover:text-[#C5A059] uppercase tracking-wider bg-slate-50 hover:bg-slate-100 border border-slate-200 px-6 py-3.5 rounded-xl cursor-pointer transition-all active:scale-95"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Restart Assessment
                  </button>
                  <a 
                    href="#team"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById('team');
                      if (el && (window as any).lenis) {
                        (window as any).lenis.scrollTo(el, { offset: -95, duration: 1.2 });
                      }
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-display font-bold text-slate-500 hover:text-[#0A192F] uppercase tracking-wider px-6 py-3.5 rounded-xl cursor-pointer transition-all"
                  >
                    Meet our Partners
                  </a>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
