"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

const fadeUp: Variants = {
  hidden: { opacity: 0.2, y: "20%" },
  visible: { opacity: 1, y: "0%" },
};

const fadeDown: Variants = {
  hidden: { opacity: 0.2, y: "-20%" },
  visible: { opacity: 1, y: "0%" },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0.2, x: "20%" },
  visible: { opacity: 1, x: "0%" },
};

const fadeRight: Variants = {
  hidden: { opacity: 0.2, x: "-20%" },
  visible: { opacity: 1, x: "0%" },
};

type RevealDirection = "up" | "down" | "left" | "right";

const directionVariants: Record<RevealDirection, Variants> = {
  up: fadeUp,
  down: fadeDown,
  left: fadeLeft,
  right: fadeRight,
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.1 },
  },
};

const revealViewport = { once: true, amount: 0.25 } as const;

const revealTransition = {
  duration: 1.8,
  ease: [0.16, 1, 0.3, 1],
} as const;

type RevealProps = React.ComponentProps<typeof motion.div> & {
  delay?: number;
  direction?: RevealDirection;
};

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
