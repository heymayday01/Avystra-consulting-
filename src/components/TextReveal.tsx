import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

interface TextRevealProps {
  text: string;
  as?: React.ElementType;
  className?: string;
  wordClassName?: string;
  delay?: number;
  duration?: number;
  blur?: boolean;
}

export default function TextReveal({
  text,
  as: Component = "p",
  className = "",
  wordClassName = "",
  delay = 0,
  duration = 0.8,
  blur = true,
}: TextRevealProps) {
  const ref = useRef<any>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay * 0.1 },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: blur ? "blur(0px)" : "none",
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
        duration: duration,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: blur ? "blur(10px)" : "none",
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const DynamicComponent = Component as any;

  return (
    <DynamicComponent ref={ref} className={`${className} m-0 p-0`}>
      <motion.span
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-wrap"
      >
        {words.map((word, index) => (
          <motion.span
            variants={child}
            className={`mr-[0.25em] ${wordClassName}`}
            key={index}
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </DynamicComponent>
  );
}
