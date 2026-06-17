import React from 'react';

interface AvystraLogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  theme?: 'light' | 'dark';
}

export default function AvystraLogo({
  className = '',
  iconOnly = false,
  size = 'md',
  showTagline = true,
  theme = 'light',
}: AvystraLogoProps) {
  // Sizing definitions to fit various contexts elegantly
  const dimensions = {
    sm: { iconWidth: 26, iconHeight: 30, fontSize: 'text-xs sm:text-sm', taglineSize: 'text-[6px] sm:text-[7px]' },
    md: { iconWidth: 38, iconHeight: 44, fontSize: 'text-sm sm:text-base md:text-lg', taglineSize: 'text-[7px] sm:text-[8px]' },
    lg: { iconWidth: 60, iconHeight: 69, fontSize: 'text-xl sm:text-2xl', taglineSize: 'text-[9px] sm:text-[10px]' },
    xl: { iconWidth: 120, iconHeight: 138, fontSize: 'text-4xl sm:text-5xl', taglineSize: 'text-xs sm:text-sm' },
  };

  const current = dimensions[size];
  const isLight = theme === 'light';

  // Theme-specific colors
  const primaryColor = isLight ? '#0A192F' : '#FFFFFF';
  const textColorClass = isLight ? 'text-[#0A192F]' : 'text-white';
  const taglineColorClass = isLight ? 'text-[#0A192F] opacity-80' : 'text-slate-300 opacity-90';
  const ruleColorClass = isLight ? 'bg-[#0A192F]/20' : 'bg-white/20';

  return (
    <div className={`flex ${iconOnly ? 'items-center justify-center' : 'items-center gap-3'} ${className}`} id="avystra-logo-root">
      {/* Crisp scalable SVG vector for the stylized 'A' with gold star */}
      <svg
        width={current.iconWidth}
        height={current.iconHeight}
        viewBox="0 0 120 138"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 group-hover:scale-105"
        id="avystra-logo-svg"
      >
        {/* Elegant Four-Point Star in Gold (#C5A059) */}
        <path
          d="M60 2Q60 18 51 18Q60 18 60 34Q60 18 69 18Q60 18 60 2Z"
          fill="#C5A059"
          id="logo-star"
        />
        
        {/* Core Stylized "A" */}
        {/* Left thin elegant leg with flourish */}
        <path
          d="M58 35C57 35 55 37 54 39L24 118C23 121 21 123 17 123H15V125H36V123H32C29 123 28 121 29 118L49 65L58 35Z"
          fill={primaryColor}
          id="logo-left-leg"
        />
        
        {/* Right thick executive leg that overlaps */}
        <path
          d="M60 35H62L96 118C97 121 99 123 103 123H105V125H77V123H81C84 123 85 121 84 118L60 60V35Z"
          fill={primaryColor}
          id="logo-right-leg"
        />

        {/* Floating crossbar segment rising parallel, styled with gap */}
        <path
          d="M48 68L70 100L73 98L51 66L48 68Z"
          fill={primaryColor}
          id="logo-crossbar"
        />
      </svg>

      {!iconOnly && (
        <div className="flex flex-col items-start leading-none" id="avystra-logo-text-group">
          {/* Logo brand wordmark with specific character coloring */}
          <div className={`${current.fontSize} font-bold tracking-[0.25em] font-display flex items-center select-none`} id="logo-wordmark">
            <span className="text-[#C5A059]">Λ</span>
            <span className={textColorClass}>V</span>
            <span className="text-[#C5A059]">Y</span>
            <span className={textColorClass}>STRΛ</span>
          </div>

          {/* Subtitle / Tagline under a thin rule */}
          {showTagline && (
            <div className="flex items-center gap-1.5 w-full mt-1.5" id="logo-tagline-container">
              <div className={`h-[0.5px] ${ruleColorClass} grow`} />
              <span className={`${current.taglineSize} font-mono tracking-widest ${taglineColorClass} uppercase select-none font-semibold whitespace-nowrap`}>
                Think Clearly, Act Decisively
              </span>
              <div className={`h-[0.5px] ${ruleColorClass} grow`} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
