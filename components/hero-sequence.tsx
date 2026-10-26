"use client";

import * as React from "react";
import { Archivo } from "next/font/google";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { markHeroIntroComplete } from "@/lib/hero-intro-store";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

// Heavy display face for the masked headline only — the rest of the site
// stays on General Sans (see app/layout.tsx). Archivo's variable width axis
// lets the heading run at its heaviest weight (900) and narrowest width
// (62%): at a fixed line width that makes the letters as tall — and thick —
// as possible, so they show the most artwork.
const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"] });

// Hero: "BLOCKCHAIN / COLOMBO" set in a heavy condensed face on a flat
// #796753 field, with hero-2.png showing only *through* the letterforms
// (background-clip: text). The image is applied once to the whole two-line
// heading block — not per line — so the artwork reads as one continuous
// picture across both words. On scroll the headline recedes slightly,
// scoped to this section's own scroll range.
export function HeroSequence() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const titleOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

  React.useEffect(() => {
    // No staged load sequence — the hero (and the header that waits on it,
    // see lib/hero-intro-store.ts) reveals immediately.
    markHeroIntroComplete();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[#796753] px-4 pt-32 pb-16 sm:pt-36"
    >
      {/* Small mono-type tagline row, just below the fixed site header. */}
      <div className="absolute inset-x-0 top-20 z-10 grid grid-cols-[1fr_auto_1fr] items-center px-6 font-mono text-xs tracking-widest text-[#f5efe6] uppercase sm:px-10 lg:px-12">
        <span className="col-start-2 hidden sm:block">Art &ndash; Culture &ndash; Community</span>
        <a href="#contact-us" className="col-start-3 justify-self-end transition-opacity hover:opacity-70">
          Connect
        </a>
      </div>

      <RevealGroup className="flex w-full flex-col items-center gap-6 @container">
        <RevealItem className="w-full">
          <motion.h1
            style={shouldReduceMotion ? undefined : { scale: titleScale, opacity: titleOpacity }}
            // Font size is derived from the container width (cqw) so
            // "BLOCKCHAIN" (measured at 4.59em wide at the narrowest width axis; 4.68 leaves a
            // little margin) spans it edge to edge — capped by screen height
            // (two lines at 0.86 leading = 1.72em, plus ~18rem of header,
            // tagline and padding) so the whole hero always fits one screen.
            // will-change keeps the scroll scale on the compositor instead
            // of repainting the image-clipped text every frame.
            className={`${archivo.className} block w-full text-center text-[min(calc(100cqw/4.68),calc((100svh-18rem)/1.72))] leading-[0.86] font-black tracking-[-0.02em] text-transparent uppercase will-change-transform [font-stretch:62%]`}
          >
            <span
              // Image shown at 92% of the heading width (slightly smaller than
              // `cover`); repeat-x fills the few pixels left at each edge so
              // the outermost letters never go flat.
              className="block bg-[length:92%_auto] bg-center bg-repeat-x bg-clip-text [-webkit-background-clip:text]"
              // A transparent text stroke fattens every letterform by 0.02em
              // without changing the font size, line length or the image
              // behind it — background-clip: text fills the stroke too, so
              // more of the artwork shows through each letter.
              style={{
                backgroundImage: "url('/images/hero/hero-2.png')",
                WebkitTextStroke: "0.02em transparent",
              }}
            >
              Blockchain
              <br />
              Colombo
            </span>
          </motion.h1>
        </RevealItem>
        <RevealItem>
          <p className="text-center text-lg font-medium tracking-[0.2em] text-white/80 uppercase sm:text-xl">
            Unveiling the future
          </p>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
