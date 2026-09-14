/**
 * Generates an increasing sequence of start offsets (0–1, relative to a
 * parent scroll-progress or stagger range) so each successive item's
 * reveal lags noticeably more than the one before it — used by the hero
 * sequence's typed-on nav and by section reveals, per the "every reveal
 * should lag more than the previous one" requirement.
 */
export function progressiveOffsets(count: number, baseGap = 0.02, growth = 0.012) {
  const offsets: number[] = [];
  let cursor = 0;
  for (let i = 0; i < count; i++) {
    offsets.push(cursor);
    cursor += baseGap + growth * i;
  }
  return offsets;
}

/** Same idea, expressed directly as seconds for use in transition.delay. */
export function progressiveDelay(index: number, base = 0.12, growth = 0.07) {
  return base + index * growth + index * index * 0.015;
}