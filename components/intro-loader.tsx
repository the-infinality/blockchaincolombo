"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const WORDS = ["Blockchain", "Colombo"];
const wordOffsets = WORDS.map((_, w) => WORDS.slice(0, w).join("").length);

const LABEL = "font-mono text-[11px] tracking-widest uppercase text-white/70";

export function IntroLoader() {
  const shouldReduceMotion = useReducedMotion();
  const [phase, setPhase] = React.useState<"loading" | "exiting" | "done">(
    shouldReduceMotion ? "done" : "loading"
  );

  React.useEffect(() => {
    if (phase === "done") return;
    document.documentElement.style.overflow = "hidden";
    const exitTimer = window.setTimeout(() => setPhase("exiting"), 1100);
    return () => window.clearTimeout(exitTimer);
  }, [phase]);

  React.useEffect(() => {
    if (phase !== "exiting") return;
    const doneTimer = window.setTimeout(() => {
      setPhase("done");
      document.documentElement.style.overflow = "";
    }, 650);
    return () => window.clearTimeout(doneTimer);
  }, [phase]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="intro-loader"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-1000 flex flex-col justify-between bg-[#050b1c] px-4 py-6 text-white sm:px-8 lg:px-12"
        >
          <div className={`flex justify-between border-b border-white/80 pb-3 ${LABEL}`}>
            <span>Info</span>
            <span>Colombo, Sri Lanka</span>
          </div>

          <div className="mx-auto w-full max-w-4xl">
            <p className={LABEL}>Sri Lanka&rsquo;s peak blockchain industry network</p>
            <div className="mt-4 flex flex-wrap gap-x-[0.3em] font-heading text-[clamp(2.25rem,8vw,6rem)] leading-none font-bold">
              {WORDS.map((word, w) => (
                <span key={word} className="inline-flex whitespace-nowrap">
                  {word.split("").map((letter, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.15 + (wordOffsets[w] + i) * 0.03,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              ))}
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 h-px origin-left bg-white"
            />
            <p className="mt-4 font-mono text-sm tracking-wide uppercase">
              Membership / Partnership / Press
            </p>
          </div>

          <div className={`flex justify-between border-t border-white/80 pt-3 ${LABEL}`}>
            <span>Blockchain Colombo</span>
            <span>Loading&hellip;</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
