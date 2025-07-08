"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const BALL_SIZE = 32;

const AnimatedCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring animation
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - BALL_SIZE / 2);
      mouseY.set(e.clientY - BALL_SIZE / 2);
    };
    const showCursor = () => setIsVisible(true);
    const hideCursor = () => setIsVisible(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseenter", showCursor);
    window.addEventListener("mouseleave", hideCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseenter", showCursor);
      window.removeEventListener("mouseleave", hideCursor);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
        opacity: isVisible ? 1 : 0,
      }}
      className={
        `fixed top-0 left-0 pointer-events-none z-[9999] ` +
        `w-8 h-8 rounded-full ` +
        `bg-gradient-to-tr from-fuchsia-500 via-cyan-400 to-emerald-400 ` +
        `shadow-[0_0_32px_8px_rgba(56,189,248,0.5),0_0_64px_16px_rgba(236,72,153,0.3)] ` +
        `mix-blend-difference ` +
        `transition-colors duration-300`
      }
      animate={{
        scale: [1, 1.15, 1],
        boxShadow: [
          "0 0 32px 8px rgba(56,189,248,0.5),0_0_64px_16px_rgba(236,72,153,0.3)",
          "0 0 48px 16px rgba(34,197,94,0.6),0_0_80px_24px_rgba(236,72,153,0.4)",
          "0 0 32px 8px rgba(56,189,248,0.5),0_0_64px_16px_rgba(236,72,153,0.3)",
        ],
        filter: ["blur(0px)", "blur(2px)", "blur(0px)"],
      }}
      transition={{
        duration: 2.2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

export default AnimatedCursor;
