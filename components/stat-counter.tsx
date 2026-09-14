"use client";

import * as React from "react";

/**
 * Replaces the jQuery `.count` prop-animate used in footer.php's inline
 * script (`$('.count').animate({ Counter: $(this).text() }, ...)`).
 * Counts up from 0 to `value` once the element scrolls into view.
 */
export function StatCounter({
  value,
  duration = 1500,
}: {
  value: number;
  duration?: number;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let started = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        const start = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setDisplay(Math.ceil(progress * value));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{display}</span>;
}
