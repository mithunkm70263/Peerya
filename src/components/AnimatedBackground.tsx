"use client";

import { useEffect, useState } from "react";

export function AnimatedBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#0a0f1c]">
      {/* Base animated gradient mesh */}
      <div className="absolute inset-0 opacity-60">
        <div 
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#2e1065] rounded-full mix-blend-screen filter blur-[120px] animate-blob"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        />
        <div 
          className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#1e3a8a] rounded-full mix-blend-screen filter blur-[150px] animate-blob animation-delay-2000"
          style={{ transform: `translateY(${scrollY * 0.08}px)` }}
        />
        <div 
          className="absolute bottom-[-20%] left-[20%] w-[70%] h-[70%] bg-[#4c1d95] rounded-full mix-blend-screen filter blur-[130px] animate-blob animation-delay-4000"
          style={{ transform: `translateY(${-scrollY * 0.1}px)` }}
        />
      </div>

      {/* SVG Noise Overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}
