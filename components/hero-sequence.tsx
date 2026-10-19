"use client";

import * as React from "react";
import { Anton } from "next/font/google";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { markHeroIntroComplete } from "@/lib/hero-intro-store";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

// Heavy condensed display face for the masked headline only — the rest of
// the site stays on General Sans (see app/layout.tsx).
const anton = Anton({ weight: "400", subsets: ["latin"] });

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
      className="relative flex min-h-[95vh] items-center justify-center overflow-hidden bg-[#796753] px-4 pt-32 pb-16 sm:pt-36"
    >
      {/* Small mono-type tagline row, just below the fixed site header. */}
      <div className="absolute inset-x-0 top-20 z-10 grid grid-cols-[1fr_auto_1fr] items-center px-6 font-mono text-xs tracking-widest text-[#f5efe6] uppercase sm:px-10 lg:px-12">
        <span className="col-start-2 hidden sm:block">Art &ndash; Culture &ndash; Community</span>
        <a href="#contact-us" className="col-start-3 justify-self-end transition-opacity hover:opacity-70">
          Connect
        </a>
      </div>

      <RevealGroup className="flex w-full flex-col items-center gap-6">
        <RevealItem>
          <motion.h1
            style={shouldReduceMotion ? undefined : { scale: titleScale, opacity: titleOpacity }}
            className={`${anton.className} inline-block text-center text-[clamp(3rem,20vw,18rem)] leading-[0.88] tracking-[-0.01em] text-transparent uppercase`}
          >
            <span
              className="block bg-cover bg-center bg-no-repeat bg-clip-text [-webkit-background-clip:text]"
              style={{ backgroundImage: "url('/images/hero/hero-2.png')" }}
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
