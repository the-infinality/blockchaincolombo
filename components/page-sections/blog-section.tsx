"use client";

import { motion } from "framer-motion";

import { ParticleField } from "@/components/particle-field";
import { fadeUp, fadeDown, staggerContainer, revealTransition } from "@/components/motion/reveal";

// This section is the one deliberate exception to the site-wide "animate
// once" rule (see below), so its per-item stagger is hand-rolled with the
// same shared variants/curve rather than <RevealGroup>/<RevealItem> —
// those hardcode `once: true`.
const REPLAY_VIEWPORT = { once: false, amount: 0.3 } as const;

// blog.php repeated this same headline 3 times in "Editor's picks" and the
// same post 3 times in the listing below — placeholder/demo content in the
// source, not real distinct posts. Editor's picks kept at 3 (they were
// each genuinely different topics); the post listing trimmed to the one
// real post.
const editorsPicks = [
  { category: "ARTIFICIAL INTELLIGENCE", headline: "3 AI analytics to add to your KPIs today" },
  { category: "SALES PROSPECTING", headline: "3 AI analytics to add to your KPIs today" },
  { category: "CUSTOMER ENGAGEMENT", headline: "3 AI analytics to add to your KPIs today" },
];

const post = {
  title:
    "Scaling with CX is more important than ever. Here's how to take advantage",
  meta: "Article by Alise Doe | Mar 4, 2022",
  desc: "State of Play: Developments in Fintech, payments & digital assets. Today Blockchain Sri Lanka hosted the 'State of Play' with over 1200 registrations and speakers from some of Australia's most recognisable businesses. The conversation around Payments, Consumer Data...",
};

// On the site's own dark navy background (transparent, SiteBackground
// shows through) — the panel itself is a slightly lighter navy tint
// (#0e1b32, not black) with its own particle field, so it still reads as
// a distinct panel without breaking from the site's palette. Also the one
// deliberate exception to the site-wide "animate once" rule: this panel
// fades/slides in AND reverses back out every time it crosses the viewport
// (`once: false`), rather than the standard one-time <Reveal>.
export function BlogSection() {
  return (
    <section id="blog" className="scroll-mt-24 overflow-x-hidden bg-transparent py-20 sm:py-32">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={REPLAY_VIEWPORT}
        variants={fadeDown}
        transition={revealTransition}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#0e1b32] px-4 py-16 sm:px-10 sm:py-20 lg:px-16"
      >
        <ParticleField className="absolute inset-0" />

        <div className="relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={REPLAY_VIEWPORT}
            variants={fadeDown}
            transition={revealTransition}
            className="flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-8"
          >
            <h2 className="font-heading text-4xl font-bold text-white sm:text-5xl">
              Blog
            </h2>
            <p className="max-w-sm text-sm text-white/60">
              Editor&rsquo;s picks and the latest from the Blockchain Colombo
              community.
            </p>
          </motion.div>

          <div className="mt-10">
            <motion.h3
              initial="hidden"
              whileInView="visible"
              viewport={REPLAY_VIEWPORT}
              variants={fadeDown}
              transition={revealTransition}
              className="font-heading text-base font-semibold tracking-wide text-white uppercase"
            >
              Editor&rsquo;s picks
            </motion.h3>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={REPLAY_VIEWPORT}
              variants={staggerContainer}
              className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {editorsPicks.map((pick, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  transition={revealTransition}
                  className="w-64 shrink-0 snap-start rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <p className="text-[10px] font-bold tracking-widest text-white/50 uppercase">
                    {pick.category}
                  </p>
                  <p className="mt-2 text-sm font-medium text-white">{pick.headline}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={REPLAY_VIEWPORT}
            variants={fadeDown}
            transition={revealTransition}
            className="mt-10 border-t border-white/10 pt-8"
          >
            <h4 className="font-heading text-xl font-semibold text-white">{post.title}</h4>
            <p className="mt-2 text-xs text-white/60">{post.meta}</p>
            <p className="mt-3 text-sm text-white/70">{post.desc}</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
