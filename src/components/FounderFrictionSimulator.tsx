import { useState, useEffect, useRef } from "react";

export default function FounderFrictionSimulator() {
  const [isResolved, setIsResolved] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleBookCall = () => {
    const element = document.getElementById("consult");
    if (element) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(element, { offset: -90, duration: 1.25 });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const operationsIcon = (
    <svg className="w-5 h-5 text-[#C9A84C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.99l1.005.831a1.125 1.125 0 0 1 .26 1.43l-1.297 2.247a1.125 1.125 0 0 1-1.37.491l-1.216-.456c-.356-.133-.752-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.43l1.004-.83c.292-.24.437-.613.43-.991a6.937 6.937 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.83a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );

  const marketingIcon = (
    <svg className="w-5 h-5 text-[#C9A84C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
    </svg>
  );

  const salesIcon = (
    <svg className="w-5 h-5 text-[#C9A84C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v5.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 0 1 3 18.375v-5.25ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125v-9.75ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v14.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    </svg>
  );

  const financeIcon = (
    <svg className="w-5 h-5 text-[#C9A84C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );

  const departments = [
    {
      id: "operations",
      name: "OPERATIONS",
      iconSvg: operationsIcon,
      issues: ["Waiting for your decisions", "Escalates small issues"],
      solution: "Standard Operating SOPs & autonomous decision frameworks.",
      desktopStyle: { left: "0%", top: "0%" }
    },
    {
      id: "marketing",
      name: "MARKETING",
      iconSvg: marketingIcon,
      issues: ["Needs your inputs always", "Can't move without you"],
      solution: "Creative guardrails and outcome-based priority metrics.",
      desktopStyle: { right: "0%", top: "0%" }
    },
    {
      id: "sales",
      name: "SALES",
      iconSvg: salesIcon,
      issues: ["Needs approvals for offers", "No clarity on next steps"],
      solution: "Transparent deal approval boundaries & playbook criteria.",
      desktopStyle: { left: "0%", bottom: "0%" }
    },
    {
      id: "finance",
      name: "FINANCE",
      iconSvg: financeIcon,
      issues: ["Asks for clarifications", "Decisions get delayed"],
      solution: "Autonomous financial rights & pre-approved contingency rules.",
      desktopStyle: { right: "0%", bottom: "0%" }
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="bottlenecks"
      className={`w-full bg-[#F8F7F2] text-[#1A2341] pt-12 pb-14 relative overflow-hidden select-none transition-all duration-300 ${
        isVisible ? "section-visible" : ""
      }`}
    >
      {/* Visual background lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#1A2341_1px,transparent_1px),linear-gradient(to_bottom,#1A2341_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        {/* TOP LABEL (Eyebrow Pill) */}
        <div className="scroll-animate inline-flex items-center gap-2 border border-[#C9A84C]/40 bg-[#C9A84C]/8 rounded-full px-4 py-1 mb-3.5 shadow-sm [transition-delay:0ms]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
          <span className="text-[10px] tracking-[0.16em] font-mono font-bold text-[#C9A84C] uppercase">
            INTERACTIVE STRUCTURAL DIAGNOSTIC
          </span>
        </div>

        {/* HEADING */}
        <h2 className="scroll-animate text-center font-serif font-extrabold text-[#1A2341] tracking-tight leading-tight mb-2 max-w-[700px] [transition-delay:100ms] text-[clamp(1.6rem,3.2vw,2.2rem)]">
          You Built A Team. <span className="text-[#C9A84C] italic font-light">So Why Does Everything Still Depend On You?</span>
        </h2>

        {/* SUBTEXT */}
        <p className="scroll-animate text-center text-[14px] text-[#1A2341]/65 max-w-[520px] mb-6 [transition-delay:200ms]">
          Toggle between states to see exactly what AVYSTRA engineers.
        </p>

        {/* PREMIUM SLIDING TOGGLE */}
        <div className="scroll-animate relative bg-[#1A2341]/8 hover:bg-[#1A2341]/12 rounded-full p-1 flex items-center h-11 w-full max-w-[360px] mx-auto transition-colors duration-300 mb-8 [transition-delay:300ms]">
          <div
            className="absolute top-1 bottom-1 left-1 rounded-full bg-[#1A2341] transition-transform duration-300 cubic-bezier(0.16, 1, 0.3, 1)"
            style={{
              width: "calc(50% - 4px)",
              transform: isResolved ? "translateX(100%)" : "translateX(0)",
            }}
          />
          <button
            onClick={() => setIsResolved(false)}
            className={`relative z-10 w-1/2 text-center text-[10.5px] font-mono tracking-wider font-bold h-full transition-colors duration-300 ${
              !isResolved ? "text-[#EDE8DF]" : "text-[#1A2341]/60 hover:text-[#1A2341]"
            }`}
          >
            BOTTLENECKED STATE
          </button>
          <button
            onClick={() => setIsResolved(true)}
            className={`relative z-10 w-1/2 text-center text-[10.5px] font-mono tracking-wider font-bold h-full transition-colors duration-300 ${
              isResolved ? "text-[#EDE8DF]" : "text-[#1A2341]/60 hover:text-[#1A2341]"
            }`}
          >
            AVYSTRA SYSTEM
          </button>
        </div>

        {/* DIAGRAM - DESKTOP & TABLET VIEW */}
        <div className="relative w-full max-w-4xl h-[480px] hidden md:block mt-6">
          {/* SVG Connector Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 scroll-animate-line [transition-delay:600ms]" viewBox="0 0 800 480">
            {/* Connection Paths to Center (400, 240) */}
            <path
              id="path-tl"
              d={isResolved ? "M 400 240 L 200 60" : "M 200 60 L 400 240"}
              fill="none"
              stroke="rgba(26,35,65,0.15)"
              strokeWidth="1.5"
            />
            <path
              id="path-tr"
              d={isResolved ? "M 400 240 L 600 60" : "M 600 60 L 400 240"}
              fill="none"
              stroke="rgba(26,35,65,0.15)"
              strokeWidth="1.5"
            />
            <path
              id="path-bl"
              d={isResolved ? "M 400 240 L 200 420" : "M 200 420 L 400 240"}
              fill="none"
              stroke="rgba(26,35,65,0.15)"
              strokeWidth="1.5"
            />
            <path
              id="path-br"
              d={isResolved ? "M 400 240 L 600 420" : "M 600 420 L 400 240"}
              fill="none"
              stroke="rgba(26,35,65,0.15)"
              strokeWidth="1.5"
            />

            {/* Animated Dots flowing along the paths */}
            <circle r="3" fill="#C9A84C">
              <animateMotion dur="2s" repeatCount="indefinite" begin="0s">
                <mpath href="#path-tl" />
              </animateMotion>
            </circle>

            <circle r="3" fill="#C9A84C">
              <animateMotion dur="2s" repeatCount="indefinite" begin="0.5s">
                <mpath href="#path-tr" />
              </animateMotion>
            </circle>

            <circle r="3" fill="#C9A84C">
              <animateMotion dur="2s" repeatCount="indefinite" begin="1s">
                <mpath href="#path-bl" />
              </animateMotion>
            </circle>

            <circle r="3" fill="#C9A84C">
              <animateMotion dur="2s" repeatCount="indefinite" begin="1.5s">
                <mpath href="#path-br" />
              </animateMotion>
            </circle>
          </svg>

          {/* Absolute Department Cards */}
          {departments.map((dept, index) => {
            const delayTime = 400 + index * 100;
            return (
              <div
                key={dept.id}
                className="scroll-animate-scale absolute w-[200px] bg-white rounded-[12px] p-5 border border-[#1A2341]/10 shadow-[0_2px_16px_rgba(26,35,65,0.06)] z-10 transition-all duration-400 ease-out"
                style={{
                  ...dept.desktopStyle,
                  borderLeft: isResolved ? "3px solid #1D9E75" : "3px solid #E24B4A",
                  transitionDelay: `${delayTime}ms`
                }}
              >
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#1A2341]/5">
                  <span className="shrink-0">{dept.iconSvg}</span>
                  <span className="text-[11px] font-mono font-bold text-[#1A2341] tracking-[0.12em] uppercase">
                    {dept.name}
                  </span>
                </div>

                <div className="relative min-h-[64px]">
                  {/* Bottlenecked state content */}
                  <div
                    className="absolute inset-0 transition-opacity duration-400 ease-out space-y-1.5"
                    style={{
                      opacity: isResolved ? 0 : 1,
                      pointerEvents: isResolved ? "none" : "auto"
                    }}
                  >
                    {dept.issues.map((issue, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-left">
                        <span className="text-[#E24B4A] text-xs font-bold shrink-0 mt-0.5">•</span>
                        <span className="text-[#1A2341]/60 font-sans text-xs leading-relaxed">
                          {issue}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Avystra system state content */}
                  <div
                    className="absolute inset-0 transition-opacity duration-400 ease-out"
                    style={{
                      opacity: isResolved ? 1 : 0,
                      pointerEvents: isResolved ? "auto" : "none"
                    }}
                  >
                    <div className="flex items-start gap-1.5 text-left">
                      <span className="text-[#1D9E75] text-xs font-bold shrink-0 mt-0.5">✔</span>
                      <span className="text-[#1A2341]/80 font-sans text-xs leading-relaxed font-semibold">
                        {dept.solution}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Center Hub Node */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div
              className={`scroll-animate-scale w-[140px] h-[140px] rounded-full bg-[#1A2341] border-2 border-[#C9A84C] flex flex-col items-center justify-center p-3 text-center shadow-[0_0_0_8px_rgba(201,168,76,0.12)] transition-all duration-500 ease-out [transition-delay:550ms] ${
                isResolved ? "pulse-gold" : "pulse-red"
              }`}
            >
              {isResolved ? (
                <>
                  <svg className="w-8 h-8 text-[#C9A84C] mb-1.5 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18 5.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM6 18.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM6 5.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75v5.25M12 11.25V6M11.25 12H6M12.75 12h5.25" />
                  </svg>
                  <span className="text-[10px] font-mono font-bold text-[#C9A84C] tracking-wider uppercase leading-none">
                    AVYSTRA SYSTEM
                  </span>
                  <span className="text-[9px] font-sans font-light text-[#EDE8DF]/60 leading-tight mt-1.5">
                    Autonomous operations
                  </span>
                </>
              ) : (
                <>
                  <svg className="w-8 h-8 text-[#C9A84C] mb-1.5 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                  <span className="text-[10px] font-mono font-bold text-[#C9A84C] tracking-widest uppercase leading-none">
                    FOUNDER
                  </span>
                  <span className="text-[8.5px] font-sans font-light text-[#EDE8DF]/60 leading-tight mt-1.5">
                    Single point of failure
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* DIAGRAM - MOBILE STACKED VIEW */}
        <div className="w-full md:hidden flex flex-col items-center mt-4">
          {/* Mobile Center Node */}
          <div
            className={`scroll-animate-scale w-[130px] h-[130px] rounded-full bg-[#1A2341] border-2 border-[#C9A84C] flex flex-col items-center justify-center p-3 text-center shadow-[0_0_0_8px_rgba(201,168,76,0.12)] transition-all duration-500 ease-out [transition-delay:350ms] ${
              isResolved ? "pulse-gold" : "pulse-red"
            }`}
          >
            {isResolved ? (
              <>
                <svg className="w-7 h-7 text-[#C9A84C] mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18 5.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM6 18.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM6 5.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75v5.25M12 11.25V6M11.25 12H6M12.75 12h5.25" />
                </svg>
                <span className="text-[9px] font-mono font-bold text-[#C9A84C] tracking-wider uppercase leading-none">
                  AVYSTRA SYSTEM
                </span>
                <span className="text-[8px] font-sans font-light text-[#EDE8DF]/60 leading-tight mt-1">
                  Autonomous operations
                </span>
              </>
            ) : (
              <>
                <svg className="w-7 h-7 text-[#C9A84C] mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                <span className="text-[9px] font-mono font-bold text-[#C9A84C] tracking-widest uppercase leading-none">
                  FOUNDER
                </span>
                <span className="text-[8px] font-sans font-light text-[#EDE8DF]/60 leading-tight mt-1">
                  Single point of failure
                </span>
              </>
            )}
          </div>

          {/* Stack of Cards on Mobile */}
          <div className="w-full grid grid-cols-1 gap-4 mt-8 px-2">
            {departments.map((dept, index) => {
              const delayTime = 400 + index * 100;
              return (
                <div
                  key={dept.id}
                  className="scroll-animate-scale w-full bg-white rounded-[12px] p-5 border border-[#1A2341]/10 shadow-[0_2px_16px_rgba(26,35,65,0.06)] transition-all duration-400 ease-out"
                  style={{
                    borderLeft: isResolved ? "3px solid #1D9E75" : "3px solid #E24B4A",
                    transitionDelay: `${delayTime}ms`
                  }}
                >
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#1A2341]/5">
                    <span className="shrink-0">{dept.iconSvg}</span>
                    <span className="text-[11px] font-mono font-bold text-[#1A2341] tracking-[0.12em] uppercase">
                      {dept.name}
                    </span>
                  </div>

                  <div className="relative min-h-[48px]">
                    {/* Bottlenecked state content */}
                    <div
                      className="transition-opacity duration-400 ease-out space-y-1.5"
                      style={{
                        display: isResolved ? "none" : "block"
                      }}
                    >
                      {dept.issues.map((issue, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-left">
                          <span className="text-[#E24B4A] text-xs font-bold shrink-0 mt-0.5">•</span>
                          <span className="text-[#1A2341]/60 font-sans text-xs leading-relaxed">
                            {issue}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Avystra system state content */}
                    <div
                      className="transition-opacity duration-400 ease-out"
                      style={{
                        display: isResolved ? "block" : "none"
                      }}
                    >
                      <div className="flex items-start gap-1.5 text-left">
                        <span className="text-[#1D9E75] text-xs font-bold shrink-0 mt-0.5">✔</span>
                        <span className="text-[#1A2341]/80 font-sans text-xs leading-relaxed font-semibold">
                          {dept.solution}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM CTA STRIP */}
        <div className="w-full mt-10 bg-[#1A2341]/5 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left rounded-3xl border border-[#C9A84C]/10 backdrop-blur-sm">
          <p className="font-serif italic text-[#1A2341] text-[18px] md:text-xl">
            Recognise your business in the left state?
          </p>
          <button
            onClick={handleBookCall}
            className="bg-[#1A2341] text-[#EDE8DF] font-sans font-semibold text-xs uppercase tracking-wider px-8 py-4 hover:bg-[#2A3555] transition-all duration-300 cursor-pointer w-full md:w-auto rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
          >
            Book a diagnostic call →
          </button>
        </div>
      </div>

      {/* Embedded CSS for animations and style overrides */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes redPulse {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes goldPulse {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .pulse-red {
          position: relative;
        }
        .pulse-red::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background-color: rgba(226, 75, 74, 1);
          animation: redPulse 2.5s infinite cubic-bezier(0.16, 1, 0.3, 1);
          z-index: -1;
        }
        .pulse-gold {
          position: relative;
        }
        .pulse-gold::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background-color: rgba(201, 168, 76, 1);
          animation: goldPulse 2.5s infinite cubic-bezier(0.16, 1, 0.3, 1);
          z-index: -1;
        }
        .scroll-animate {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .scroll-animate-scale {
          opacity: 0;
          transform: scale(0.96) translateY(10px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .scroll-animate-line {
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          transition: stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .section-visible .scroll-animate {
          opacity: 1;
          transform: translateY(0);
        }
        .section-visible .scroll-animate-scale {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
        .section-visible .scroll-animate-line {
          stroke-dashoffset: 0;
        }
      `,
        }}
      />
    </section>
  );
}
