import { Variants } from 'framer-motion';

// ==========================================
// PREMIUM ANIMATION SYSTEM
// Consistent timing, easing, and feel
// ==========================================

// Shared easing curves
export const ease = {
  smooth: [0.22, 1, 0.36, 1] as const,
  bounce: [0.34, 1.56, 0.64, 1] as const,
  inOut: [0.4, 0, 0.2, 1] as const,
};

// Duration scale
export const duration = {
  fast: 0.2,
  base: 0.4,
  slow: 0.6,
  xslow: 0.9,
};

// ==========================================
// ENTRANCE ANIMATIONS
// ==========================================

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 32 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: ease.smooth },
  },
};

export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: ease.smooth },
  },
};

export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -40 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: ease.smooth },
  },
};

export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 40 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: ease.smooth },
  },
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: duration.slow, ease: 'easeOut' },
  },
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.88 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.xslow, ease: ease.smooth },
  },
};

// ==========================================
// CONTAINER / STAGGER
// ==========================================

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerSlow: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// ==========================================
// SCROLL REVEAL (whileInView)
// ==========================================

export const scrollReveal: Variants = {
  initial: { opacity: 0, scale: 0.96, y: 24 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: duration.xslow, ease: ease.smooth },
  },
};

export const scrollRevealLeft: Variants = {
  initial: { opacity: 0, x: -48 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: ease.smooth },
  },
};

export const scrollRevealRight: Variants = {
  initial: { opacity: 0, x: 48 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: ease.smooth },
  },
};

// ==========================================
// TEXT / LINE REVEAL
// ==========================================

export const textReveal: Variants = {
  initial: { y: '110%', opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: duration.xslow, ease: ease.smooth },
  },
};

export const textRevealContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

// ==========================================
// HOVER MICRO-INTERACTIONS (use with whileHover)
// ==========================================

export const hoverScale = {
  scale: 1.04,
  transition: { duration: duration.fast, ease: ease.inOut },
};

export const hoverLift = {
  y: -4,
  transition: { duration: duration.base, ease: ease.smooth },
};

export const tapScale = {
  scale: 0.97,
  transition: { duration: duration.fast },
};

// ==========================================
// FLOATING LOOP ANIMATION (for ambient elements)
// ==========================================

export const floatLoop = {
  animate: {
    y: [0, -14, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const floatLoopSlow = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// ==========================================
// PARALLAX HELPER (for use with useScroll / useTransform)
// ==========================================

export const parallaxConfig = {
  inputRange: [0, 1],
  outputRange: ['0%', '-12%'], // Subtle upward shift
};
