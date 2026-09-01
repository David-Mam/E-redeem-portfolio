import type { Transition, Variants } from "framer-motion";

/**
 * Motion Tokens System
 * Defined in accordance with the brand style scape:
 * - Fast (100–150ms): micro-interactions (press/tap, focus, hover)
 * - Standard (200–300ms): card reveals, step-to-step transitions, scroll reveals
 * - Slow (400–500ms): full page/route transitions, modal opens, success/failure reveals
 * - Entrance easing: ease-out ([0.16, 1, 0.3, 1])
 * - Exit easing: ease-in ([0.7, 0, 0.84, 0])
 */

export const MOTION_DURATIONS = {
  fast: 0.15, // 150ms
  standard: 0.25, // 250ms
  slow: 0.45, // 450ms
} as const;

export const MOTION_EASINGS = {
  entrance: [0.16, 1, 0.3, 1], // ease-out (decelerate into place)
  exit: [0.7, 0, 0.84, 0], // ease-in (accelerate out of view)
  easeInOut: [0.4, 0, 0.2, 1],
} as const;

// Transition presets
export const microInteractionTransition: Transition = {
  duration: MOTION_DURATIONS.fast,
  ease: MOTION_EASINGS.entrance,
};

export const standardRevealTransition: Transition = {
  duration: MOTION_DURATIONS.standard,
  ease: MOTION_EASINGS.entrance,
};

export const slowPageTransition: Transition = {
  duration: MOTION_DURATIONS.slow,
  ease: MOTION_EASINGS.entrance,
};

// Micro-interaction presets for interactive elements
export const whileTapButton = {
  scale: 0.97,
  transition: {
    duration: MOTION_DURATIONS.fast,
    ease: MOTION_EASINGS.entrance,
  },
};

export const whileHoverCard = {
  y: -4,
  transition: {
    duration: MOTION_DURATIONS.fast,
    ease: MOTION_EASINGS.entrance,
  },
};

export const whileHoverBento = {
  y: -3,
  scale: 1.008,
  transition: {
    duration: MOTION_DURATIONS.fast,
    ease: MOTION_EASINGS.entrance,
  },
};

export const bentoContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const bentoItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATIONS.standard,
      ease: MOTION_EASINGS.entrance,
    },
  },
};

// Section Scroll Reveal Variants (whileInView)
export const sectionRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATIONS.standard,
      ease: MOTION_EASINGS.entrance,
    },
  },
};

// Hero Content Load Sequence Variants (Staggered on initial mount)
export const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const heroChildVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATIONS.standard,
      ease: MOTION_EASINGS.entrance,
    },
  },
};

// Step-to-Step Linear Route Progression (Code -> Activity -> KYC -> Requirement -> Result)
export const stepSlideVariants: Variants = {
  initial: {
    opacity: 0,
    x: 16,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: MOTION_DURATIONS.standard,
      ease: MOTION_EASINGS.entrance,
    },
  },
  exit: {
    opacity: 0,
    x: -16,
    transition: {
      duration: MOTION_DURATIONS.fast,
      ease: MOTION_EASINGS.exit,
    },
  },
};

// Distinct Scale-and-Fade-in for Success/Failure conclusion screens (< 600ms)
export const resultRevealVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    y: 8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATIONS.slow, // 450ms
      ease: MOTION_EASINGS.entrance,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: {
      duration: MOTION_DURATIONS.fast,
      ease: MOTION_EASINGS.exit,
    },
  },
};

// Reduced Motion fallbacks
export const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.01 },
  },
};
