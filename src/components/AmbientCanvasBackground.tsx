import React from 'react';

interface AmbientCanvasBackgroundProps {
  /** Variant preset to match the specific section styling */
  variant?: 'hero' | 'bento' | 'flowchart' | 'consult' | 'stats';
  /** Custom overlay opacity if needed */
  opacity?: number;
}

export default function AmbientCanvasBackground({ variant = 'hero', opacity = 0.85 }: AmbientCanvasBackgroundProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  // We render highly optimized HTML elements with CSS radial gradients as backgrounds.
  // By making them static (removing animations), we eliminate GPU compositing overhead 
  // from large blurred elements while keeping the premium visual aesthetic.
  
  let blob1Style: React.CSSProperties = {};
  let blob2Style: React.CSSProperties = {};
  let blob3Style: React.CSSProperties = {};
  let showBlob2 = false;
  let showBlob3 = false;

  if (variant === 'hero') {
    blob1Style = {
      left: '-10%',
      top: '-10%',
      width: '75vw',
      height: '75vw',
      maxWidth: '1000px',
      maxHeight: '1000px',
      background: 'radial-gradient(circle, rgba(197, 160, 89, 0.12) 0%, rgba(197, 160, 89, 0) 70%)',
      filter: 'blur(60px)',
    };
    blob2Style = {
      right: '-10%',
      bottom: '-15%',
      width: '70vw',
      height: '70vw',
      maxWidth: '900px',
      maxHeight: '900px',
      background: 'radial-gradient(circle, rgba(96, 165, 250, 0.06) 0%, rgba(96, 165, 250, 0) 70%)',
      filter: 'blur(80px)',
    };
    blob3Style = {
      left: '40%',
      top: '30%',
      width: '40vw',
      height: '40vw',
      maxWidth: '600px',
      maxHeight: '600px',
      background: 'radial-gradient(circle, rgba(197, 160, 89, 0.05) 0%, rgba(197, 160, 89, 0) 70%)',
      opacity: 0.5,
      filter: 'blur(50px)',
    };
    showBlob2 = true;
    showBlob3 = true;
  } else if (variant === 'bento') {
    blob1Style = {
      right: '-15%',
      top: '-10%',
      width: '60vw',
      height: '60vw',
      maxWidth: '800px',
      maxHeight: '800px',
      background: 'radial-gradient(circle, rgba(197, 160, 89, 0.07) 0%, rgba(197, 160, 89, 0) 70%)',
    };
    blob2Style = {
      left: '-15%',
      bottom: '-10%',
      width: '65vw',
      height: '65vw',
      maxWidth: '850px',
      maxHeight: '850px',
      background: 'radial-gradient(circle, rgba(96, 165, 250, 0.045) 0%, rgba(96, 165, 250, 0) 70%)',
    };
    showBlob2 = true;
  } else if (variant === 'flowchart') {
    blob1Style = {
      left: '-5%',
      top: '15%',
      width: '55vw',
      height: '55vw',
      maxWidth: '700px',
      maxHeight: '700px',
      background: 'radial-gradient(circle, rgba(197, 160, 89, 0.075) 0%, rgba(197, 160, 89, 0) 70%)',
    };
    blob2Style = {
      right: '-5%',
      bottom: '15%',
      width: '55vw',
      height: '55vw',
      maxWidth: '700px',
      maxHeight: '700px',
      background: 'radial-gradient(circle, rgba(96, 165, 250, 0.05) 0%, rgba(96, 165, 250, 0) 70%)',
    };
    showBlob2 = true;
  } else if (variant === 'consult') {
    blob1Style = {
      right: '-10%',
      top: '5%',
      width: '50vw',
      height: '50vw',
      maxWidth: '650px',
      maxHeight: '650px',
      background: 'radial-gradient(circle, rgba(197, 160, 89, 0.06) 0%, rgba(197, 160, 89, 0) 70%)',
    };
    blob2Style = {
      left: '-10%',
      bottom: '5%',
      width: '50vw',
      height: '50vw',
      maxWidth: '650px',
      maxHeight: '650px',
      background: 'radial-gradient(circle, rgba(96, 165, 250, 0.03) 0%, rgba(96, 165, 250, 0) 70%)',
    };
    showBlob2 = true;
  } else {
    // stats / default
    blob1Style = {
      left: '20%',
      top: '20%',
      width: '60vw',
      height: '60vw',
      maxWidth: '800px',
      maxHeight: '800px',
      background: 'radial-gradient(circle, rgba(197, 160, 89, 0.07) 0%, rgba(197, 160, 89, 0) 70%)',
    };
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none transition-opacity duration-1000"
      style={{ opacity }}
    >
      {/* Golden Blobs / Blue Blobs - Static layout */}
      <div 
        className="absolute rounded-full"
        style={blob1Style}
      />
      {showBlob2 && (
        <div 
          className="absolute rounded-full"
          style={blob2Style}
        />
      )}
      {showBlob3 && (
        <div 
          className="absolute rounded-full"
          style={blob3Style}
        />
      )}
    </div>
  );
}
