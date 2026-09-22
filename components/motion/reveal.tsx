"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

/**
 * Shared "hidden layer" → "visible layer" variants — the site's one
 * signature entrance, used everywhere: a slow slide-and-brighten
 * (opacity 0.2 → 1, translate 20% → 0), never a plain fade-from-zero and
 * never a section-specific bespoke effect. Four directional flavors share
 * the exact same duration/easing/opacity math (see `revealTransition`) —
 * only the axis and sign of the translate differ — so every section still
 * reads as one coherent motion language, just with a per-section identity.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0.2, y: "20%" },
  visible: { opacity: 1, y: "0%" },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0.2, y: "-20%" },
  visible: { opacity: 1, y: "0%" },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0.2, x: "20%" },
  visible: { opacity: 1, x: "0%" },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0.2, x: "-20%" },
  visible: { opacity: 1, x: "0%" },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0.2 },
  visible: { opacity: 1 },
};

export type RevealDirection = "up" | "down" | "left" | "right";

const directionVariants: Record<RevealDirection, Variants> = {
  up: fadeUp,
  down: fadeDown,
  left: fadeLeft,
  right: fadeRight,
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.1 },
  },
};

// Fires once per element as it scrolls into view — never reverses or
// replays on scroll-out. No `once: false` anywhere on the site.
export const revealViewport = { once: true, amount: 0.25 } as const;

// The one signature duration/curve for every entrance on the site — slow
// and deliberate on purpose, not a snappy UI micro-interaction.
export const revealTransition = {
  duration: 1.8,
  ease: [0.16, 1, 0.3, 1],
} as const;

type RevealProps = React.ComponentProps<typeof motion.div> & {
  delay?: number;
  direction?: RevealDirection;
};

/** Drop-in wrapper for a single block that should slide and brighten into
 * place on scroll — the site's one shared entrance pattern. `direction`
 * (default "up") picks which side it travels in from. */
export function Reveal({
  delay = 0,
  direction = "up",
  transition,
  className,
  children,
  ...props
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={shouldReduceMotion ? undefined : directionVariants[direction]}
      transition={{ ...revealTransition, delay, ...transition }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Wrapper for a group of children that should stagger in together, each
 * playing the same slide-and-brighten entrance. */
export function RevealGroup({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={shouldReduceMotion ? undefined : staggerContainer}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** A single staggered item, used inside <RevealGroup>. `delay`/`direction`/
 * `transition` let a group stagger items on a custom schedule — or travel
 * in from a different side — while still inheriting the shared
 * duration/curve. */
export function RevealItem({
  delay = 0,
  direction = "up",
  transition,
  className,
  children,
  ...props
}: RevealProps) {
  return (
    <motion.div
      variants={directionVariants[direction]}
      transition={{ ...revealTransition, delay, ...transition }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
