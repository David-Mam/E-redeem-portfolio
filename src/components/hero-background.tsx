import { useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CORAL, LIME } from "../lib/site-data";
import defaultHeroVideo from "../assets/videos/Cinematic_slow_motion_macro_sh.mp4";

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
  videoSrc = defaultHeroVideo,
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
      {/* 1. Charcoal / Slate Neutral Base Canvas */}
      <div className="absolute inset-0 bg-[#14171A]" />

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
            className="h-full w-full object-cover object-center filter contrast-[1.05] brightness-[0.95]"
          />
        </div>
      )}

      {/* 3. Balanced Charcoal / Slate Neutral Overlays (No Purple) */}
      {showOverlay && (
        <>
          {/* Base uniform cinematic dimming layer */}
          <div className="absolute inset-0 bg-[#14171A]/50 pointer-events-none" />

          {/* Left-to-right editorial scrim: Darker behind text on left, translucent on right */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(90deg, rgba(20, 23, 26, 0.82) 0%, rgba(20, 23, 26, 0.65) 45%, rgba(20, 23, 26, 0.35) 80%, rgba(20, 23, 26, 0.50) 100%)`,
            }}
          />

          {/* Top and bottom subtle edge fades to blend with header and next section */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(180deg, rgba(20, 23, 26, 0.6) 0%, transparent 25%, transparent 75%, rgba(20, 23, 26, 0.85) 100%)`,
            }}
          />

          {/* Subtle Ambient Brand Glow (Soft Coral & Lime, very gentle) */}
          <div className="absolute inset-0 filter blur-[100px] transform-gpu overflow-hidden pointer-events-none opacity-20">
            {/* Top-Right subtle Lime aura */}
            <motion.div
              className="absolute -top-[10%] right-[10%] h-[400px] w-[400px] rounded-full"
              style={{ background: LIME }}
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      scale: [1, 1.1, 1],
                      opacity: [0.2, 0.35, 0.2],
                    }
              }
              transition={{
                duration: 14,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            />

            {/* Bottom-Left subtle Coral aura */}
            <motion.div
              className="absolute -bottom-[10%] left-[5%] h-[420px] w-[420px] rounded-full"
              style={{ background: CORAL }}
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      scale: [1, 1.08, 1],
                      opacity: [0.15, 0.28, 0.15],
                    }
              }
              transition={{
                duration: 16,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Micro Digital Dot Texture for tech feel */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)`,
              backgroundSize: "28px 28px",
            }}
          />
        </>
      )}
    </div>
  );
}
