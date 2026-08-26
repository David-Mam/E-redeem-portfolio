import { useState, useRef, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

interface HeroBackgroundProps {
  videoUrl?: string;
  posterUrl?: string;
  opacity?: number;
}

export function HeroBackground({
  videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  posterUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=2000&q=80",
  opacity = 0.5,
}: HeroBackgroundProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted without user interaction
      });
    }
  }, [prefersReducedMotion]);

  return (
    <div
      id="hero-background-container"
      className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none"
    >
      {/* 1. Video / Poster Media Layer */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-out"
        style={{ opacity: opacity }}
      >
        <div className="relative h-full w-full bg-slate-950">
          {(!videoLoaded || hasError || prefersReducedMotion) && posterUrl && (
            <img
              src={posterUrl}
              alt="Hero background backdrop"
              referrerPolicy="no-referrer"
              className="absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500"
            />
          )}
          {!hasError && !prefersReducedMotion && (
            <video
              ref={videoRef}
              src={videoUrl}
              autoPlay
              loop
              muted
              playsInline
              crossOrigin="anonymous"
              onCanPlay={() => setVideoLoaded(true)}
              onLoadedData={() => setVideoLoaded(true)}
              onError={() => setHasError(true)}
              className={`h-full w-full object-cover object-center transition-opacity duration-700 ${
                videoLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </div>
      </div>

      {/* 2. Crisp Grid Texture (Structured, flat neutral grid) */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #0F172A 1px, transparent 0)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* 3. High-Contrast Editorial Gradient Scrim */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/50 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/95 pointer-events-none" />
    </div>
  );
}
