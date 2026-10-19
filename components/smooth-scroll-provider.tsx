"use client";

import * as React from "react";
import Lenis from "lenis";

/** Wraps the app in an eased virtual scroll so scrolling feels smooth
 * rather than the browser's stepwise native scroll — this is also what
 * makes scroll-linked parallax (see components/motion/parallax.tsx) read
 * as fluid instead of jittery.
 *
 * Also owns all in-page anchor navigation: since the site is a single page
 * (app/page.tsx) with every nav item and cross-link pointing at a
 * `href="#section-id"`, this intercepts every such click anywhere in the
 * document and routes it through Lenis's own scrollTo so anchor jumps get
 * the same eased motion as wheel/touch scrolling, instead of the browser's
 * instant native hash jump. */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      // Lenis re-measures the scroll limit whenever `content` resizes. Its
      // default (<html>) is pinned to the viewport height by the root
      // layout's `h-full`, so it never resizes as images/fonts/reveals grow
      // the page — leaving a stale limit that stops short of the footer.
      // <body> grows with the content, so observe that instead.
      content: document.body,
      // A slow, decelerating ease-out (cubic) over a longer-than-native
      // duration is what gives the scroll its "heavy, modern" feel rather
      // than the browser's stepwise native scroll.
      duration: 1.5,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    function onClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest("a[href^='#']");
      if (!anchor) return;
      const id = anchor.getAttribute("href")?.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { duration: 1.2 });
      history.pushState(null, "", `#${id}`);
    }
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
