"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { markHeroIntroComplete } from "@/lib/hero-intro-store";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

// Hero: hero-1-1.png as the backdrop — no dark overlay panel on top of it,
// just the image's own opacity dialed down slightly for text legibility —
// with "Blockchain Colombo" stacked above "Unveiling the future" in normal
// flow (never overlapping). Everything — background image and both
// headline lines — fades/slides in together as one entrance (RevealGroup),
// not a staged multi-second sequence. Once revealed, each layer also keeps
// its own scroll-linked transform, scoped ONLY to this section's own
// scroll range: the tagline grows and comes forward (higher scale/opacity/
// z-index) while the headline recedes — shrinks and dims, but never
// disappears or unmounts, so both remain in the DOM (settled into their
// final state) even once scrolled past.
export function HeroSequence() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.85], [0.55, 0.2]);

  // Headline: recedes — shrinks and dims, but settles rather than vanishing.
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.6]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const titleOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  // Tagline: comes forward — grows and brightens, becoming the visually
  // dominant line as the headline recedes.
  const taglineScale = useTransform(scrollYProgress, [0, 1], [1, 2.2]);
  const taglineOpacity = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  React.useEffect(() => {
    // No staged load sequence anymore — the hero (and the header that
    // waits on it, see lib/hero-intro-store.ts) reveals immediately.
    markHeroIntroComplete();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[95vh] items-center justify-center overflow-hidden"
    >
      <RevealGroup className="absolute inset-0 flex items-center justify-center">
        <motion.div
          variants={{ hidden: { opacity: 0.2, scale: 0.85 }, visible: { opacity: 1, scale: 1 } }}
          className="absolute inset-0"
        >
          <motion.div
            style={{ scale: imageScale, opacity: imageOpacity }}
            className="absolute inset-0"
          >
            <Image
              src="/images/hero/hero-1-1.png"
              alt=""
              fill
              priority
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        <div className="relative z-10 flex flex-col items-center gap-4 px-6 pt-48 text-center drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] sm:pt-52">
          <RevealItem className="relative z-10">
            <motion.h1
              style={
                shouldReduceMotion
                  ? undefined
                  : { scale: titleScale, y: titleY, opacity: titleOpacity }
              }
              className="max-w-4xl font-sans text-7xl font-semibold text-white sm:text-8xl"
            >
              Blockchain Colombo
            </motion.h1>
          </RevealItem>
          <RevealItem className="relative z-20">
            <motion.p
              style={
                shouldReduceMotion ? undefined : { scale: taglineScale, opacity: taglineOpacity }
              }
              className="text-lg font-medium tracking-[0.2em] text-white/70 uppercase sm:text-xl"
            >
              Unveiling the future
            </motion.p>
          </RevealItem>
        </div>
      </RevealGroup>
    </section>
  );
}
