import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import AvystraLogo from './AvystraLogo';
import Magnetic from './Magnetic';

interface NavItem {
  name: string;
  href: string;
  number: string;
  desc: string;
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Active section detection using high-performance IntersectionObserver
    const observerOptions = {
      root: null,
      rootMargin: '-25% 0px -55% 0px', // focuses on upper-middle of viewport
      threshold: 0.1,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sections = ['bottlenecks', 'process', 'team', 'consult'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const navItems: NavItem[] = [
    { name: 'Bottlenecks', href: '#bottlenecks', number: '01', desc: 'Structural points of friction' },
    { name: 'How We Work', href: '#process', number: '02', desc: 'Our procedural roadmap' },
    { name: 'Consulting Team', href: '#team', number: '03', desc: 'Meet our lead partners' },
    { name: 'Diagnostic Form', href: '#consult', number: '04', desc: 'Process assessment hub' }
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        if ((window as any).lenis) {
          (window as any).lenis.scrollTo(element, { offset: -90, duration: 1.2 });
        } else {
          const offset = 90;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    }, 120);
  };

  // Custom morphing hamburger motion paths
  const Path = (props: any) => (
    <motion.path
      fill="transparent"
      strokeWidth="2"
      stroke="currentColor"
      strokeLinecap="round"
      {...props}
    />
  );

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full max-w-5xl border pointer-events-auto transition-[border-radius,background-color,border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'rounded-[28px]' : 'rounded-full'
        } ${
          scrolled
            ? 'bg-[#FAF9F5]/85 backdrop-blur-xl border-[#C5A059]/20 py-2 px-5 shadow-[0_16px_40px_rgba(10,25,47,0.08)] scale-[0.98]'
            : 'bg-white/95 backdrop-blur-md border-slate-200/80 py-3.5 px-7 shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between">
          
          {/* Logo brand frame */}
          <div className="flex items-center">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                if ((window as any).lenis) {
                  (window as any).lenis.scrollTo(0, { duration: 1.2 });
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="flex items-center gap-2 group cursor-pointer" 
              id="header-brand-logo-link"
            >
              <AvystraLogo size="sm" showTagline={false} />
            </a>
          </div>

          {/* Desktop Navigation with Dual-pill hover & active tracking */}
          <nav className="hidden lg:flex items-center gap-1.5 relative">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href.substring(1))}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`relative px-4 py-2 font-display text-[10.5px] uppercase tracking-wider font-bold transition-all duration-300 z-10 rounded-full ${
                    isActive ? 'text-[#0A192F]' : 'text-slate-500 hover:text-[#0A192F]'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-1">
                    {item.name}
                    {isActive && (
                      <span className="w-1 h-1 rounded-full bg-[#C5A059]" />
                    )}
                  </span>

                  {/* Active Highlight Pill */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 bg-[#C5A059]/12 border border-[#C5A059]/20 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Hover Pill (runs separately without blocking layoutId) */}
                  {hoveredIndex === index && !isActive && (
                    <motion.span
                      layoutId="nav-hover-pill"
                      className="absolute inset-0 bg-slate-100 rounded-full z-0"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Navigation Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Magnetic range={15}>
              <a
                href="#consult"
                onClick={(e) => handleScrollTo(e, 'consult')}
                className="relative inline-flex items-center gap-2 bg-[#0A192F] hover:bg-[#172A45] text-white font-display text-[10px] uppercase tracking-widest font-bold px-5 py-2.5 rounded-full border border-slate-300/60 hover:border-[#C5A059] transition-all duration-300 shadow-sm"
              >
                <span>Submit Diagnostics</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A059]" />
              </a>
            </Magnetic>
          </div>

          {/* Mobile Menu trigger */}
          <div className="lg:hidden flex items-center pr-1">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-10 h-10 flex items-center justify-center text-slate-500 hover:text-[#0A192F] focus:outline-none rounded-full hover:bg-slate-100/80 transition-colors"
              aria-label="Toggle Menu"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" className="w-5 h-5">
                <Path
                  variants={{
                    closed: { d: 'M 3 5 L 17 5' },
                    open: { d: 'M 4.5 15.5 L 15.5 4.5' }
                  }}
                  animate={isOpen ? 'open' : 'closed'}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
                <Path
                  d="M 3 10 L 17 10"
                  variants={{
                    closed: { opacity: 1, scaleX: 1 },
                    open: { opacity: 0, scaleX: 0 }
                  }}
                  animate={isOpen ? 'open' : 'closed'}
                  transition={{ duration: 0.25 }}
                />
                <Path
                  variants={{
                    closed: { d: 'M 3 15 L 17 15' },
                    open: { d: 'M 4.5 4.5 L 15.5 15.5' }
                  }}
                  animate={isOpen ? 'open' : 'closed'}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Drawer (Polished, Creative, Custom Content Rows) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden overflow-hidden"
            >
              <div className="pt-3 pb-5 px-1 border-t border-slate-200/60 mt-3.5 space-y-3">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.06 + 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <a
                        href={item.href}
                        onClick={(e) => handleScrollTo(e, item.href.substring(1))}
                        className={`flex items-start gap-4 p-3 rounded-2xl transition-all ${
                          isActive 
                            ? 'bg-[#C5A059]/8 border border-[#C5A059]/30' 
                            : 'hover:bg-slate-50 border border-transparent'
                        }`}
                      >
                        <span className="font-mono text-[10px] font-bold text-[#C5A059] mt-0.5">
                          {item.number}
                        </span>
                        <div className="space-y-0.5">
                          <div className={`font-display font-bold text-xs tracking-wide uppercase ${
                            isActive ? 'text-[#0A192F]' : 'text-slate-700'
                          }`}>
                            {item.name}
                          </div>
                          <div className="text-[10px] text-slate-400 font-sans font-light">
                            {item.desc}
                          </div>
                        </div>
                      </a>
                    </motion.div>
                  );
                })}
                
                {/* CTA Action within Mobile Menu */}
                <motion.div
                  className="pt-4 border-t border-slate-100/90 mt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.06 + 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href="#consult"
                    onClick={(e) => handleScrollTo(e, 'consult')}
                    className="w-full py-4 bg-[#0A192F] hover:bg-[#172A45] text-white font-bold font-display text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 rounded-2xl shadow-md transition-all active:scale-[0.98]"
                  >
                    <span>Submit Diagnostics</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A059]" />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
}
