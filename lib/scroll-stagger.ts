const BASE_DELAY = 0.1;
const GROWTH = 0.06;

export function progressiveDelay(index: number): number {
  return BASE_DELAY * index + GROWTH * ((index * (index - 1)) / 2);
}
