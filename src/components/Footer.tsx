import React from "react";

interface FooterProps {
  leadCount: number;
}

export default function Footer({ leadCount }: FooterProps) {
  const scrollTo = (href: string) => {
    const elementId = href.substring(1);
    const element = document.getElementById(elementId);
    if (element) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(element, { offset: -95, duration: 1.2 });
      } else {
        window.scrollTo({
          top: element.getBoundingClientRect().top + window.scrollY - 95,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <footer className="relative bg-[#050D1A] text-slate-100 overflow-hidden pt-24 sm:pt-32">
      {/* Immersive background transition from connecting page */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-[#050D1A] pointer-events-none z-0" />
      
      {/* Glowing atmospheric backdrop accents */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-[#C5A059]/[0.02] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-blue-900/[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 grid-overlay z-0 opacity-[0.02] pointer-events-none" />

      <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 relative z-10 w-full mb-8 lg:mb-12">
        
        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-6 gap-6 w-full text-sm font-sans text-slate-200">
          {/* Top Row */}
          {[
            { label: "Frameworks", href: "#bottlenecks" },
            { label: "Process", href: "#process" },
            { label: "Team", href: "#team" },
            { label: "Clients", href: "#testimonials" },
            { label: "FAQ", href: "#faq" },
            { label: "Diagnostic", href: "#consult" },
          ].map((item, idx) => (
            <div key={item.label} className={idx === 5 ? "text-right" : "text-left"}>
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(item.href);
                }}
                className="hover:text-[#C5A059] transition-colors cursor-pointer block"
              >
                {item.label}
              </a>
            </div>
          ))}

          {/* Spacer Row */}
          <div className="col-span-6 h-6 lg:h-10"></div>

          {/* Bottom Row */}
          <div className="col-span-1 text-left text-xs font-mono text-slate-500 whitespace-nowrap">
            &copy; {new Date().getFullYear()} AVYSTRA
          </div>
          <div className="col-span-1 text-left text-xs font-mono text-slate-500">
            <a href="mailto:info@avystra.co.in" className="hover:text-[#C5A059] transition-colors">info@avystra.co.in</a>
          </div>
          <div className="col-span-2 text-left text-xs font-mono text-slate-500 pl-4 lg:pl-0">
            <a href="tel:+918596059607" className="hover:text-[#C5A059] transition-colors">+91 85960 59607</a>
          </div>
          <div className="col-span-1 text-left text-xs font-mono text-slate-500">
             <span className="cursor-pointer hover:text-[#C5A059] transition-colors">Privacy Policy</span>
          </div>
          <div className="col-span-1 text-right text-xs font-mono text-slate-500 flex justify-end">
             {leadCount > 0 && (
               <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-[#C5A059]/20 bg-[#C5A059]/5 text-[9px] text-[#C5A059] whitespace-nowrap">
                 <span className="w-1 h-1 rounded-full bg-[#C5A059] animate-pulse" />
                 {leadCount} Diagnostics
               </span>
             )}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col gap-10 w-full pb-4">
           <div className="grid grid-cols-2 gap-y-6 gap-x-4 text-sm font-sans text-slate-200">
              {[
                { label: "Frameworks", href: "#bottlenecks" },
                { label: "Process", href: "#process" },
                { label: "Team", href: "#team" },
                { label: "Clients", href: "#testimonials" },
                { label: "FAQ", href: "#faq" },
                { label: "Diagnostic", href: "#consult" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(item.href);
                  }}
                  className="hover:text-[#C5A059] transition-colors cursor-pointer"
                >
                  {item.label}
                </a>
              ))}
           </div>
           
           <div className="flex flex-col gap-4 text-xs font-mono text-slate-500 pt-6 border-t border-slate-800/40">
             <span>&copy; {new Date().getFullYear()} AVYSTRA Consulting</span>
             <a href="mailto:info@avystra.co.in" className="hover:text-[#C5A059] transition-colors">info@avystra.co.in</a>
             <a href="tel:+918596059607" className="hover:text-[#C5A059] transition-colors">+91 85960 59607</a>
             <span className="hover:text-[#C5A059] transition-colors cursor-pointer">Privacy Policy</span>
             {leadCount > 0 && (
               <div className="mt-2 text-left">
                 <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full border border-[#C5A059]/20 bg-[#C5A059]/5 text-[10px] text-[#C5A059]">
                   <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
                   {leadCount} Diagnostics Registered
                 </span>
               </div>
             )}
           </div>
        </div>

      </div>

      {/* Massive Brand Name - Tightly cropped at bottom */}
      <div className="w-full overflow-hidden flex justify-center items-end -mb-[1%] lg:-mb-[2%] select-none pointer-events-none pt-8 md:pt-4 relative">
        <h1 className="text-[25vw] leading-[0.70] font-display font-black tracking-tighter text-[#0A1526] uppercase text-center whitespace-nowrap relative z-0">
          AVYSTRA
        </h1>
      </div>
    </footer>
  );
}
