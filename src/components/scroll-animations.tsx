import {
  motion,
  useScroll,
  useSpring,
  useInView,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUp } from "lucide-react";
import { CORAL } from "../lib/site-data";
import { MOTION_DURATIONS, MOTION_EASINGS, whileTapButton } from "../lib/motion-tokens";

/**
 * Top Micro-Scroll Progress Bar
 * Pins an ultra-sleek, non-intrusive 2.5px progress indicator to the top of the window.
 */
export function ScrollProgressBar({
  color = CORAL,
  height = 2.5,
}: {
  color?: string;
  height?: number;
}) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      id="site-scroll-progress-bar"
      className="fixed top-0 left-0 right-0 z-[100] origin-left pointer-events-none"
      style={{
        scaleX,
        height: `${height}px`,
        background: color,
      }}
    />
  );
}

/**
 * ScrollReveal Component
 * Smoothly reveals elements as they enter the viewport using standard motion tokens.
 * Triggers once per section with subtle translate (12px - 16px) and decelerating ease-out.
 */
export interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  delay?: number;
  className?: string;
  id?: string;
  once?: boolean;
  amount?: number | "some" | "all";
}

export function ScrollReveal({
  children,
  direction = "up",
  distance = 14,
  duration = MOTION_DURATIONS.standard,
  delay = 0,
  className = "",
  id,
  once = true,
  amount = 0.15,
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  const getOffset = () => {
    if (prefersReducedMotion || direction === "none") {
      return { x: 0, y: 0 };
    }
    switch (direction) {
      case "up":
        return { x: 0, y: distance };
      case "down":
        return { x: 0, y: -distance };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const offset = getOffset();

  return (
    <motion.div
      id={id}
      className={className}
      initial={{
        opacity: 0,
        x: offset.x,
        y: offset.y,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once, amount }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : duration,
        delay: prefersReducedMotion ? 0 : delay,
        ease: MOTION_EASINGS.entrance,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Major Section Scroll Wrapper (Homepage / Landing sections)
 * Uses standard duration, ease-out decelerating curve, and 14px upward translate.
 */
export function ScrollSection({
  children,
  className = "",
  id,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={className}
      initial={{
        opacity: 0,
        y: prefersReducedMotion ? 0 : 14,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : MOTION_DURATIONS.standard,
        delay: prefersReducedMotion ? 0 : delay,
        ease: MOTION_EASINGS.entrance,
      }}
    >
      {children}
    </motion.section>
  );
}

/**
 * Stagger Container & Item
 * Cascading reveals with standard motion tokens.
 */
export function ScrollStaggerContainer({
  children,
  staggerDelay = 0.06,
  initialDelay = 0.02,
  className = "",
  id,
  once = true,
  amount = 0.15,
}: {
  children: ReactNode;
  staggerDelay?: number;
  initialDelay?: number;
  className?: string;
  id?: string;
  once?: boolean;
  amount?: number | "some" | "all";
}) {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
        delayChildren: prefersReducedMotion ? 0 : initialDelay,
      },
    },
  };

  return (
    <motion.div
      id={id}
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

export function ScrollStaggerItem({
  children,
  className = "",
  distance = 12,
  duration = MOTION_DURATIONS.standard,
  id,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
  duration?: number;
  id?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : distance,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : duration,
        ease: MOTION_EASINGS.entrance,
      },
    },
  };

  return (
    <motion.div id={id} className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

/**
 * ScrollScale Component
 * Subtle scale and fade reveal for dashboard mockups and featured cards.
 */
export function ScrollScale({
  children,
  fromScale = 0.96,
  duration = MOTION_DURATIONS.standard,
  delay = 0,
  className = "",
  id,
  once = true,
  amount = 0.15,
}: {
  children: ReactNode;
  fromScale?: number;
  duration?: number;
  delay?: number;
  className?: string;
  id?: string;
  once?: boolean;
  amount?: number | "some" | "all";
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      id={id}
      className={className}
      initial={{
        opacity: 0,
        scale: prefersReducedMotion ? 1 : fromScale,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      viewport={{ once, amount }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : duration,
        delay: prefersReducedMotion ? 0 : delay,
        ease: MOTION_EASINGS.entrance,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScrollCounter Component
 * Animates numerical statistics smoothly when scrolled into view.
 * Kept strictly under 800ms (0.7s) to ensure snappy, responsive feel.
 */
export function ScrollCounter({
  target,
  prefix = "",
  suffix = "",
  duration = 0.7,
  className = "",
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion) {
      setCount(target);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrameId);
  }, [inView, target, duration, prefersReducedMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/**
 * Floating Back To Top Button
 * Unobtrusively appears after scrolling down 350px with whileTap micro-interaction.
 */
export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 350);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          id="back-to-top-button"
          type="button"
          onClick={scrollToTop}
          whileTap={whileTapButton}
          initial={{ opacity: 0, scale: 0.9, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 8 }}
          transition={{ duration: MOTION_DURATIONS.fast, ease: MOTION_EASINGS.entrance }}
          className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-md transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FF5E3A]"
          aria-label="Scroll back to top"
          title="Back to top"
        >
          <ArrowUp className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
