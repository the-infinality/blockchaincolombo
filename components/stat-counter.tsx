"use client";

import * as React from "react";

// Fast start, gentle landing — reads as "counting up" rather than a linear tick.
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Replaces the jQuery `.count` prop-animate used in footer.php's inline
 * script (`$('.count').animate({ Counter: $(this).text() }, ...)`).
 *
 * Counts up from 0 to `value` each time the number scrolls fully into
 * view: it waits for the element to be on screen (and a short `delay`, so
 * the surrounding section's reveal has settled and the count is actually
 * seen), eases out over `duration`, and resets to 0 once it has left the
 * viewport so it replays on the next visit. Reduced-motion users just see
 * the final value.
 */
export function StatCounter({
  value,
  duration = 2200,
  delay = 500,
}: {
  value: number;
  duration?: number;
  delay?: number;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let rafId = 0;
    let timeoutId = 0;
    let running = false;

    const stop = () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
      running = false;
    };

    const run = () => {
      running = true;
      if (reduceMotion) {
        setDisplay(value);
        return;
      }
      timeoutId = window.setTimeout(() => {
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setDisplay(Math.round(easeOutCubic(progress) * value));
          if (progress < 1) rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);
      }, delay);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.9 && !running) {
          run();
        } else if (!entry.isIntersecting && !reduceMotion) {
          // Fully off screen: reset so it counts up again next time.
          stop();
          setDisplay(0);
        }
      },
      { threshold: [0, 0.9] }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      stop();
    };
  }, [value, duration, delay]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}
