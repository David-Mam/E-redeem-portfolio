import type { Transition, Variants } from "framer-motion";

/**
 * Enterprise Motion Tokens System
 * Defined in accordance with the E-Redeem brand style scape and B2B specifications:
 * - Fast (120ms): micro-interactions (press/tap, focus, hover, toggle)
 * - Standard (220ms): card reveals, step-to-step transitions, scroll reveals
 * - Slow (380ms): modal dialogs, route transitions, result reveals
 * - Entrance easing: deceleration ease-out ([0.16, 1, 0.3, 1])
 * - Exit easing: acceleration ease-in ([0.7, 0, 0.84, 0])
 */

export const MOTION_DURATIONS = {
  fast: 0.12, // 120ms
  standard: 0.22, // 220ms
  slow: 0.38, // 380ms
} as const;

export const MOTION_EASINGS = {
  entrance: [0.16, 1, 0.3, 1], // ease-out (controlled deceleration)
  exit: [0.7, 0, 0.84, 0], // ease-in
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
  scale: 0.985,
  transition: {
    duration: MOTION_DURATIONS.fast,
    ease: MOTION_EASINGS.entrance,
  },
};

export const whileHoverCard = {
  y: -2,
  transition: {
    duration: MOTION_DURATIONS.fast,
    ease: MOTION_EASINGS.entrance,
  },
};

export const whileHoverBento = {
  y: -2,
  scale: 1.004,
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
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const bentoItemVariants: Variants = {
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

// Section Scroll Reveal Variants (whileInView)
export const sectionRevealVariants: Variants = {
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

// Hero Content Load Sequence Variants (Staggered on initial mount)
export const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.03,
    },
  },
};

export const heroChildVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
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
    x: 12,
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
    x: -12,
    transition: {
      duration: MOTION_DURATIONS.fast,
      ease: MOTION_EASINGS.exit,
    },
  },
};

// Distinct Scale-and-Fade-in for Success/Failure conclusion screens (< 400ms)
export const resultRevealVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.98,
    y: 6,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATIONS.slow,
      ease: MOTION_EASINGS.entrance,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
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
