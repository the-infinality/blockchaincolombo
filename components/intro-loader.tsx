"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const WORD = "BLOCKCHAIN COLOMBO";

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

  const letters = React.useMemo(() => WORD.split(""), []);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="intro-loader"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-1000 flex items-center justify-center bg-[#0f1d30]"
        >
          <div className="flex flex-wrap items-center justify-center gap-x-1 px-6 text-center">
            {letters.map((letter, i) => (
              <motion.span
                key={`${letter}-${i}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.03, ease: [0.22, 1, 0.36, 1] }}
                className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-4xl"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-[38%] h-px w-40 origin-left bg-primary sm:w-56"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}