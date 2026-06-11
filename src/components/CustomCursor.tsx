"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring config for smooth lagging effect
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16); // offset by half the cursor size (32px)
      cursorY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over clickable elements
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('glass-card') ||
        target.classList.contains('feature-card')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* The main lagging custom cursor */}
      <motion.div
        className="fixed top-0 left-0 z-[100] pointer-events-none mix-blend-difference rounded-full bg-white flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: 32,
          height: 32,
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          opacity: isHovering ? 0.8 : 1,
          backgroundColor: isHovering ? "#a78bfa" : "#ffffff", // shift to purple on hover
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      
      {/* Subtle secondary glow tracker */}
      <motion.div
        className="fixed top-0 left-0 z-[99] pointer-events-none rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          width: 32,
          height: 32,
          background: `radial-gradient(circle 100px at center, rgba(124, 58, 237, 0.15), transparent 80%)`,
        }}
      />
    </>
  );
}
