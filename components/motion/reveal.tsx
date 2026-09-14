"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

/**
 * Shared "hidden layer" → "visible layer" variants used across section
 * entrances. Keep this the single source of truth so every reveal in the
 * site feels like the same choreography rather than one-off effects.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

export const revealViewport = { once: true, amount: 0.25 } as const;
export const revealTransition = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1],
} as const;

type RevealProps = React.ComponentProps<typeof motion.div> & {
  delay?: number;
};

/** Drop-in wrapper for a single block that should fade/slide in on scroll. */
export function Reveal({ delay = 0, transition, className, children, ...props }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={shouldReduceMotion ? undefined : fadeUp}
      transition={{ ...revealTransition, delay, ...transition }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Wrapper for a group of children that should stagger in together. */
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

/** A single staggered item, used inside <RevealGroup>. */
export function RevealItem({ className, children, ...props }: React.ComponentProps<typeof motion.div>) {
  return (
    <motion.div variants={fadeUp} transition={revealTransition} className={cn(className)} {...props}>
      {children}
    </motion.div>
  );
}