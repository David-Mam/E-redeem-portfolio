import { useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CORAL, LIME } from "../lib/site-data";

interface HeroBackgroundProps {
  opacity?: number;
  className?: string;
  videoSrc?: string;
  showVideo?: boolean;
  videoOpacity?: number;
  showOverlay?: boolean;
}

export function HeroBackground({
  opacity = 1,
  className = "",
  videoSrc = "/assets/videos/No_readable_text.mp4",
  showVideo = true,
  videoOpacity = 1,
  showOverlay = true,
}: HeroBackgroundProps) {
  const prefersReducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && showVideo && !prefersReducedMotion) {
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted in some environments; handled gracefully
      });
    }
  }, [showVideo, prefersReducedMotion]);

  return (
    <div
      id="hero-background-container"
      className={`absolute inset-0 overflow-hidden pointer-events-none z-0 select-none ${className}`}
      style={{ opacity }}
    >
      {/* 1. Deep Midnight Base Canvas */}
      <div className="absolute inset-0 bg-[#160420]" />

      {/* 2. Primary Video Layer */}
      {showVideo && !prefersReducedMotion && (
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ opacity: videoOpacity }}
        >
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="h-full w-full object-cover object-center filter contrast-[1.1] saturate-[1.15]"
          />
        </div>
      )}

      {/* 3. Rich Tech-Purple / Indigo Gradient Overlay */}
      {showOverlay && (
        <>
          {/* Primary Purple & Indigo Multi-Stop Blend Overlay */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-multiply transition-opacity"
            style={{
              background: `linear-gradient(135deg, rgba(35, 4, 42, 0.88) 0%, rgba(54, 9, 64, 0.78) 35%, rgba(20, 10, 45, 0.82) 70%, rgba(10, 15, 38, 0.90) 100%)`,
            }}
          />

          {/* Secondary Atmospheric Violet / Indigo Color Wash */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-color"
            style={{
              background: `linear-gradient(120deg, #3B0748 0%, #4A0E63 40%, #1E1045 75%, #0B1736 100%)`,
              opacity: 0.65,
            }}
          />

          {/* Luminous Brand Flares (Electric Violet, Coral & Lime Ambient Glow) */}
          <div className="absolute inset-0 filter blur-[80px] sm:blur-[100px] transform-gpu overflow-hidden opacity-45 pointer-events-none">
            {/* Top-Left Violet Accent */}
            <motion.div
              className="absolute -top-[10%] -left-[10%] h-[500px] w-[500px] rounded-full"
              style={{ background: "#7C3AED" }}
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      scale: [1, 1.15, 1],
                      opacity: [0.35, 0.5, 0.35],
                    }
              }
              transition={{
                duration: 12,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            />

            {/* Center-Right Magenta / Deep Purple Accent */}
            <motion.div
              className="absolute top-[20%] right-[5%] h-[450px] w-[450px] rounded-full"
              style={{ background: "#5B116A" }}
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      scale: [1, 1.1, 0.95, 1],
                      opacity: [0.4, 0.6, 0.4],
                    }
              }
              transition={{
                duration: 16,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            />

            {/* Bottom Coral Highlight */}
            <div
              className="absolute -bottom-[15%] left-[20%] h-[350px] w-[350px] rounded-full opacity-25"
              style={{ background: CORAL }}
            />
          </div>

          {/* Micro Digital Dot / Cyber Grid Matrix */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)`,
              backgroundSize: "28px 28px",
            }}
          />

          {/* Editorial Readability Scrim (Ensures Crisp High-Contrast Text) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#180324]/80 via-[#180324]/40 to-[#10041B]/60 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#180324]/50 via-transparent to-[#180324]/85 pointer-events-none" />
        </>
      )}
    </div>
  );
}
