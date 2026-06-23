import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BackgroundGlowBlob } from './DoodleWidgets';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    {
      question: 'What makes AVYSTRA different from traditional consulting firms?',
      answer: 'Unlike traditional consulting firms that deliver high-level strategy slides and leave execution to your teams, AVYSTRA works as an embedded operational architect. We design, pilot, and institutionalize repeatable delegation and SOP frameworks. We are process mechanics who build sustainable execution pipelines, not just advisors.'
    },
    {
      question: 'How long does a typical engagement last?',
      answer: 'Engagement length depends on enterprise scale and structural complexity, typically ranging from 90 to 180 days. Every project begins with a granular, 14-day operational audit (the Strategic Alignment diagnostic), followed by immediate priority-mapping, SOP design, and tailored middle-management training.'
    },
    {
      question: 'Do you work with companies of all sizes?',
      answer: 'Our sweet spot is high-growth mid-market enterprises and well-funded startups ($10M to $100M ARR) experiencing painful scaling friction. At this stage, coordination costs exponentially balloon, and structural ambiguity threatens founder velocity. We also advise selective Fortune 500 business units.'
    },
    {
      question: 'What does the initial diagnostic involve?',
      answer: 'The initial diagnostic is a deep critical-path audit of your current delegation, alignment, and strategy networks. Over two weeks, we conduct brief executive interviews, perform strategy-leakage diagnostics, and trace communication workflows to pinpoint precise friction centers before detailing a bespoke architectural playbook.'
    },
    {
      question: 'How do you measure success?',
      answer: 'We measure success through three tangible operational indices: Strategic Velocity (how quickly priorities translate to frontline outputs), Middle-Management Autonomy (the percentage of daily decisions resolved without executive escalation), and the Talent Retention Index (reduction of friction-based key staff attrition).'
    }
  ];

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 md:mb-12"
        >
          
          {/* Aesthetic Badge */}
          <div className="border border-[#C5A059]/20 liquid-glass px-4 py-1.5 rounded-full inline-flex items-center gap-2 mb-6 shadow-sm">
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
          className="liquid-glass rounded-[2.5rem] p-6 sm:p-10 divide-y divide-slate-300/20"
        >
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`py-5 first:pt-2 last:pb-2 transition-all duration-300 ${
                  isOpen ? 'bg-slate-50/20 px-3 -mx-3 rounded-xl border border-transparent' : 'border-transparent'
                }`}
              >
                {/* Accordion Toggle Header */}
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full flex items-center justify-between text-left gap-6 group cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className={`font-sans font-medium text-base sm:text-[17px] leading-snug transition-colors duration-300 ${
                    isOpen ? 'text-[#C5A059]' : 'text-[#0A192F] group-hover:text-[#C5A059]'
                  }`}>
                    {faq.question}
                  </span>
                  
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
                      <div className="pt-4 pb-2 pr-10 text-slate-500 text-sm sm:text-base leading-relaxed font-light">
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
