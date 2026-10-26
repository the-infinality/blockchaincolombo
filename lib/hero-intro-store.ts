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

export function getHeroIntroServerSnapshot() {
  return false;
}
