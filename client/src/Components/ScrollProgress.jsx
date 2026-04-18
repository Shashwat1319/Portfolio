import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  
  // Adding a spring physics effect so the bar feels smoother and more premium
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 origin-left z-[9998]"
      style={{ 
        scaleX,
        background: "linear-gradient(to right, #3b82f6, #8b5cf6)", // Blue to Purple gradient matching the theme
        boxShadow: "0 0 10px rgba(139, 92, 246, 0.5)"
      }}
    />
  );
};

export default ScrollProgress;
