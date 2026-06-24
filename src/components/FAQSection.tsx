import { useState, useCallback } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'What does AVYSTRA actually do?',
    answer: 'AVYSTRA is a strategic performance and execution consulting firm. We help organizations identify where performance is breaking down and build the clarity, accountability, management, and execution systems required to improve how the business actually runs.'
  },
  {
    question: 'Who is AVYSTRA for?',
    answer: 'AVYSTRA is built for founders, business owners, CEOs, HR leaders, and senior leadership teams who feel that growth is slowing because too much still depends on a few people, decisions are delayed, accountability is inconsistent, or execution is not translating strategy into results.'
  },
  {
    question: 'Is AVYSTRA a training company or a consulting firm?',
    answer: 'Neither label alone is enough. AVYSTRA does not run one-off workshops and leave. It diagnoses root causes, designs the right performance system, supports implementation, and measures whether the intervention is producing visible business improvement.'
  },
  {
    question: 'What makes AVYSTRA different from a typical workshop-based intervention?',
    answer: 'Most workshop-led interventions stop at delivery. AVYSTRA is built around four stages — Assess, Design, Deliver, and Measure — so the focus is not participant satisfaction alone, but whether leadership, managers, teams, and systems actually improve after the work is done.'
  },
  {
    question: 'What is the Organizational Growth Index (OGI)?',
    answer: 'The OGI is AVYSTRA\'s structured assessment that helps organizations identify growth bottlenecks across four dimensions: Leadership Direction, Manager Effectiveness, Team Accountability, and Execution Systems. It uses 15 questions to generate a directional report based on self-reported responses.'
  },
  {
    question: 'How long does the OGI take, and what do I get at the end?',
    answer: 'The OGI takes about 3 to 4 minutes and includes 15 questions. At the end, the user receives an instant report with an overall score out of 100, a growth band, a four-dimension breakdown, pattern flags, and recommended focus areas.'
  },
  {
    question: 'Is the OGI a full organizational audit?',
    answer: 'No. The OGI is a directional diagnostic, not a full audit. It is based on self-reported responses, so it helps surface likely gaps quickly, but a deeper AVYSTRA-led assessment is needed if you want higher-confidence diagnosis and a structured intervention plan.'
  },
  {
    question: 'What kind of problems does AVYSTRA usually help solve?',
    answer: 'AVYSTRA is most relevant when organizations face founder dependency, weak management capability, poor follow-through, delayed decisions, unclear ownership, inconsistent standards, cross-functional friction, or execution gaps between plans and results.'
  },
  {
    question: 'Do you only help with leadership and training?',
    answer: 'No. Leadership capability matters, but AVYSTRA\'s work is broader than leadership development. It also addresses decision rights, accountability, manager effectiveness, communication patterns, execution discipline, and the operating systems that shape day-to-day performance.'
  },
  {
    question: 'How do we know whether we need AVYSTRA?',
    answer: 'A simple test is this: if your organization is working hard but key outcomes still depend too heavily on the founder or a few individuals, you likely do not have an effort problem — you have a structure, management, or execution problem. That is exactly where AVYSTRA fits.'
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = useCallback((index: number) => {
    setOpenIndex(prev => prev === index ? null : index);
    setTimeout(() => {
      if (typeof window !== "undefined") {
        const ScrollTrigger = (window as any).ScrollTrigger;
        if (ScrollTrigger) {
          ScrollTrigger.refresh();
        }
        const lenis = (window as any).lenis;
        if (lenis) {
          lenis.resize();
        }
      }
    }, 500);
  }, []);

  return (
    <section id="faq" className="relative py-8 bg-transparent border-none overflow-hidden md:py-12">
      
      {/* Visual Guideline Overlays */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/10 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 select-none gsap-stagger-container">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-6 md:mb-8"
        >
          
          {/* Aesthetic Badge */}
          <div className="border border-[#C5A059]/20 bg-gradient-to-br from-white to-slate-50 px-4 py-1.5 rounded-full inline-flex items-center gap-2 mb-3 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-[10px] text-[#C5A059] font-mono tracking-[0.18em] font-medium uppercase">
              Common Questions
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-display font-medium text-4xl sm:text-5xl md:text-6xl text-[#0A192F] tracking-tight leading-[1.1] mb-6">
            Frequently Asked <span className="font-serif italic font-light text-[#C5A059]">Questions</span>
          </h2>

          {/* Slogan */}
          <p className="text-slate-500 font-sans text-base sm:text-lg font-light leading-relaxed max-w-2xl">
            Clear answers to help you understand our approach, process, and what to expect from an AVYSTRA engagement.
          </p>
        </motion.div>

        {/* Accordions Containment Block */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="bg-gradient-to-br from-white to-slate-50 border border-slate-100 rounded-[2.5rem] p-6 sm:p-10 divide-y divide-slate-300/20"
        >
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            const numberStr = (index + 1).toString().padStart(2, '0');
            return (
              <div 
                key={index} 
                className={`py-5 first:pt-2 last:pb-2 transition-all duration-300 ${
                  isOpen ? 'bg-slate-50/30 px-4 -mx-4 rounded-2xl border border-[#C5A059]/10' : 'border-transparent'
                }`}
              >
                {/* Accordion Toggle Header */}
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full flex items-center justify-between text-left gap-4 sm:gap-6 group cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4 sm:gap-6 flex-1">
                    {/* Index Number Badge */}
                    <span className="font-mono text-xs sm:text-sm font-black text-[#C5A059]/80 bg-[#C5A059]/5 border border-[#C5A059]/20 w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                      {numberStr}
                    </span>
                    
                    <span className={`font-sans font-medium text-base sm:text-[17px] leading-snug transition-colors duration-300 flex-1 ${
                      isOpen ? 'text-[#C5A059]' : 'text-[#0A192F] group-hover:text-[#C5A059]'
                    }`}>
                      {faq.question}
                    </span>
                  </div>
                  
                  {/* Circle Indicator around chevrons */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                    isOpen 
                      ? 'border-[#C5A059] bg-[#C5A059] text-white' 
                      : 'border-slate-300/30 bg-white/20 text-slate-500 group-hover:border-[#C5A059]/40 group-hover:bg-[#C5A059]/10 group-hover:text-[#C5A059]'
                  }`}>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-500 ${
                      isOpen ? 'rotate-180' : 'rotate-0'
                    }`} />
                  </div>
                </button>
 
                {/* Animated Inner Answer Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: 'auto', 
                        opacity: 1,
                        transition: {
                          height: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.3, ease: 'linear', delay: 0.05 }
                        }
                      }}
                      exit={{ 
                        height: 0, 
                        opacity: 0,
                        transition: {
                          height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.15, ease: 'linear' }
                        }
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 pb-2 pl-12 pr-4 sm:pl-14 text-slate-500 text-sm sm:text-base leading-relaxed font-light">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
