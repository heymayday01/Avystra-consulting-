import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  // Silky smooth spring physics parameters matching top-tier site builds
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScrollVisibility = () => {
      // Hide on top initially to keep layout pristine
      if (window.scrollY > 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScrollVisibility);
    return () => window.removeEventListener('scroll', handleScrollVisibility);
  }, []);

  return (
    <motion.div
      style={{ scaleX }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#C5A059] via-[#0A192F] to-[#C5A059] z-[9999] origin-left pointer-events-none"
    />
  );
}
