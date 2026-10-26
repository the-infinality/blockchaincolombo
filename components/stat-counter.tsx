"use client";

import * as React from "react";

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

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
