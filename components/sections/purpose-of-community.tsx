"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { StatCounter } from "@/components/stat-counter";
import { fadeUp, revealTransition, staggerContainer } from "@/components/motion/reveal";

const stats = [
  { value: 32, suffix: "K", label: "Active Users", bobDelay: 0 },
  { value: 20, suffix: "+", label: "Events", bobDelay: 0.3 },
  { value: 14, suffix: "", label: "Cities", bobDelay: 0.6 },
];

// `once: false` on the viewport below means this section replays its
// entrance every time it scrolls into view AND reverses back out when it
// scrolls out — an explicit entrance *and* leaving animation, not just a
// one-shot reveal.
const REPLAY_VIEWPORT = { once: false, amount: 0.4 } as const;

// Full-bleed background artwork with everything — heading, copy, stats —
// centered directly on top of it.
export function PurposeOfCommunity() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden">
      {/* Blurred, scaled-up copy fills the frame with ambient color/texture
          so there's no flat letterbox bars... */}
      <Image
        src="/images/home/p2.jpg"
        alt=""
        fill
        aria-hidden="true"
        className="scale-125 object-cover opacity-60 blur-2xl"
      />
      {/* ...while the real image sits on top at `contain`, so the whole
          portrait artwork is visible rather than cropped by `cover`. */}
      <Image src="/images/home/p2.jpg" alt="" fill className="object-contain" />
      <div className="absolute inset-0 bg-[#050b1c]/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050b1c] via-transparent to-[#050b1c]/40" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={REPLAY_VIEWPORT}
        variants={staggerContainer}
        className="relative mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8"
      >
        <motion.h2 variants={fadeUp} transition={revealTransition}>
          <span className="font-script block text-4xl text-primary sm:text-6xl">
            Building Blockchain
          </span>
          <span className="font-heading text-3xl font-bold sm:text-5xl">
            Capability
          </span>
        </motion.h2>
        <motion.span
          variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
          transition={{ ...revealTransition, delay: 0.2 }}
          className="mx-auto mt-4 block h-px w-24 origin-center bg-accent"
        />
        <motion.p
          variants={fadeUp}
          transition={revealTransition}
          className="mt-6 text-lg font-medium"
        >
          We envision a world transformed by blockchain technology
        </motion.p>
        <motion.p
          variants={fadeUp}
          transition={revealTransition}
          className="mx-auto mt-4 max-w-xl text-white/75"
        >
          We are bringing together the best in Blockchain. Fostering
          collaborations and advocating for adoption with the aim of
          advancing, developing and delivering on the promise of Blockchain
          technology. Supported by Government, Industry and the Startup
          community. We recognise the need to re-write business rules
          collaboratively. To work with business processes and regulatory
          frameworks to deliver better systems and better outcomes.
        </motion.p>

        <motion.div
          variants={fadeUp}
          transition={revealTransition}
          className="mx-auto mt-10 grid max-w-md grid-cols-3 gap-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: stat.bobDelay,
              }}
              className="text-center"
            >
              <div className="font-heading text-3xl font-bold text-primary drop-shadow-[0_0_16px_rgba(255,255,255,0.25)] sm:text-4xl">
                <StatCounter value={stat.value} />
                {stat.suffix}
              </div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} transition={revealTransition} className="mt-10">
          <a
            href="#contact-us"
            className="inline-flex items-center gap-2 font-medium text-primary hover:underline"
          >
            Let&rsquo;s talk
            <ArrowRight className="size-4" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
