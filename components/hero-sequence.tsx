"use client";

import * as React from "react";
import { Archivo } from "next/font/google";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { markHeroIntroComplete } from "@/lib/hero-intro-store";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"] });

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
    markHeroIntroComplete();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[#796753] px-4 pt-32 pb-16 sm:pt-36"
    >
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

            className={`${archivo.className} block w-full text-center text-[min(calc(100cqw/4.68),calc((100svh-18rem)/1.72))] leading-[0.86] font-black tracking-[-0.02em] text-transparent uppercase will-change-transform [font-stretch:62%]`}
          >
            <span

              className="block bg-[length:85%_auto] bg-center bg-repeat-x bg-clip-text [-webkit-background-clip:text]"

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
