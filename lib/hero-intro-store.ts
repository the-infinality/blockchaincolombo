/**
 * Tiny external store (React's `useSyncExternalStore` pattern, same spirit
 * as the plain shared `pointer` object in lib/pointer.ts) that lets
 * components/hero-sequence.tsx tell components/site-header.tsx when its
 * staged load sequence has reached the final "reveal" phase — that's the
 * cue for the fixed header/nav to fade in alongside the hero background,
 * rather than being visible from the very first frame.
 */

type Listener = () => void;

let complete = false;
const listeners = new Set<Listener>();

export function markHeroIntroComplete() {
  if (complete) return;
  complete = true;
  for (const listener of listeners) listener();
}

export function subscribeHeroIntro(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getHeroIntroSnapshot() {
  return complete;
}

// Server-rendered markup always starts in the "not yet revealed" state —
// matches the client's initial value before the load sequence (or the
// reduced-motion skip) marks it complete, avoiding a hydration mismatch.
export function getHeroIntroServerSnapshot() {
  return false;
}
