/**
 * Delay (in seconds) for the i-th item in a scroll-reveal sequence, where
 * each item's gap from the previous one is larger than the last — an
 * accelerating stagger rather than a flat `i * constant` one. Used by
 * components/sections/what-we-do.tsx's pillar cards; pairs naturally with
 * the flat `staggerChildren` variant in components/motion/reveal.tsx when
 * a section wants uneven rather than even spacing between reveals.
 */
const BASE_DELAY = 0.1;
const GROWTH = 0.06;

export function progressiveDelay(index: number): number {
  return BASE_DELAY * index + GROWTH * ((index * (index - 1)) / 2);
}
