"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

/**
 * Self-drawing grid rules. A <LineGrid> container starts the drawing once
 * it scrolls into view (once); each <GridLine> inside it — a 1px absolutely
 * positioned bar standing in for a CSS border — then grows from 0 to full
 * length: horizontal rules sweep left→right, vertical rules drop top→down.
 * Pass a `delay` per line to choreograph the sequence.
 *
 * Variant names match components/motion/reveal.tsx ("hidden"/"visible"),
 * so any RevealItem nested inside a LineGrid still animates normally.
 * Only `transform: scale` animates (compositor-only, no layout shift).
 */

const DRAW = { duration: 1.1, ease: [0.65, 0, 0.35, 1] } as const;

export function LineGrid({ className, ...props }: React.ComponentProps<typeof motion.div>) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className={cn("relative", className)}
      {...props}
    />
  );
}

/** Same as LineGrid but renders an <ol> (for numbered, ruled lists). */
export function LineList({ className, ...props }: React.ComponentProps<typeof motion.ol>) {
  return (
    <motion.ol
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className={cn("relative", className)}
      {...props}
    />
  );
}

export function GridLine({
  axis = "x",
  delay = 0,
  className,
}: {
  /** "x" = horizontal rule, "y" = vertical rule. */
  axis?: "x" | "y";
  delay?: number;
  /** Position (e.g. "top-0", "right-0") and color (e.g. "bg-white"). */
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const variants: Variants =
    axis === "x"
      ? { hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { ...DRAW, delay } } }
      : { hidden: { scaleY: 0 }, visible: { scaleY: 1, transition: { ...DRAW, delay } } };

  return (
    <motion.span
      aria-hidden="true"
      variants={shouldReduceMotion ? undefined : variants}
      className={cn(
        "pointer-events-none absolute block",
        axis === "x" ? "inset-x-0 h-px origin-left" : "inset-y-0 w-px origin-top",
        className
      )}
    />
  );
}
