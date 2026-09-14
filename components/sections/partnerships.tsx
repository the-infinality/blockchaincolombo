"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { revealTransition, revealViewport } from "@/components/motion/reveal";

// The text floats gently over the artwork — a slow, continuous bob rather
// than a one-shot scroll reveal — to read as "hovering" in front of the
// handshake image rather than sitting flat on it.
const float = {
  animate: { y: [0, -14, 0] },
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const },
};

export function Partnerships() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden text-white">
      <Image src="/images/home/p3.png" alt="" fill className="object-cover" />
      <div className="absolute inset-0 bg-[#050b1c]/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050b1c]/90 via-transparent to-[#050b1c]/50" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={revealViewport}
        transition={revealTransition}
        className="relative mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8"
      >
        <motion.h2
          animate={float.animate}
          transition={float.transition}
          className="font-script text-6xl sm:text-8xl"
        >
          International
          <br />
          Partnerships
        </motion.h2>
        <motion.p
          animate={{ y: [0, -9, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          className="mx-auto mt-8 max-w-xl text-white/85"
        >
          Blockchain Colombo recognises that relationships matter, that the
          strength of the networks built across borders aid both local and
          international ecosystems alike. For that reason, we prioritise the
          development of strong ties with jurisdictions that seek to foster
          collaboration. Our efforts are focused on developing strong regional
          and APAC partnerships and initiatives first and then expand
          internationally.
        </motion.p>
      </motion.div>
    </section>
  );
}
