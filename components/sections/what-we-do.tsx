"use client";

import Image from "next/image";
import { ArrowRight, BookOpen, Hammer, Users } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { revealTransition, revealViewport } from "@/components/motion/reveal";
import { progressiveDelay } from "@/lib/scroll-stagger";

const pillars = [
  {
    number: "01",
    title: "Learn",
    icon: BookOpen,
    content:
      "Learn from experts both local and international. Learn about the latest in DeFi, NFTs, the metaverse and gaming trends from people with real-life experience.",
  },
  {
    number: "02",
    title: "Network",
    icon: Users,
    content:
      "Network with the best by joining our exclusive online and in-real-life events — launches, roundtables, live panels, fireside chats, a makers day, and more.",
  },
  {
    number: "03",
    title: "Build",
    icon: Hammer,
    content:
      "Build better businesses, create the next big idea, and drive innovation forward — with people you love doing it with.",
  },
];

// Restructured around one shared piece of artwork instead of one image per
// pillar: the group floats above a HUD-style grid, and each pillar below
// it reads as a callout — a thin glowing tick line connecting up toward
// the artwork — for a more futuristic, dashboard-like feel than plain
// stacked cards.
export function WhatWeDo() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 left-0 select-none font-script text-7xl text-white/[0.06] sm:text-9xl"
      >
        Build
      </span>

      <motion.div
        initial={{ opacity: 0, y: 56, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.6, margin: "0px 0px -30% 0px" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-2xl text-center"
      >
        <p className="font-script text-2xl text-white/70 sm:text-3xl">
          Peak body for blockchain
        </p>
        <h2 className="mt-2 font-heading text-3xl font-bold sm:text-5xl">
          in Sri Lanka
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
          Blockchain Colombo is Sri Lanka&rsquo;s peak industry network for
          businesses implementing blockchain or distributed ledger
          technology. Collectively, our members and the industries they
          serve advance adoption across the country.
        </p>
      </motion.div>

      {/* Shared artwork, simple outline — no grid pattern */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={revealViewport}
        transition={{ ...revealTransition, delay: 0.15 }}
        className="relative mt-16 overflow-hidden rounded-2xl border border-white/15"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050b1c]" />
        <div className="relative aspect-[21/9] w-full">
          <Image
            src="/images/home/p1.png"
            alt=""
            fill
            className="object-contain object-bottom"
          />
        </div>
      </motion.div>

      <div className="relative mt-4 grid gap-6 md:grid-cols-3">
        {pillars.map((pillar, i) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={revealViewport}
            transition={{ ...revealTransition, delay: progressiveDelay(i) }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 pt-8 transition-colors hover:border-accent/40"
          >
            {/* Glowing tick, suggesting a callout up to the artwork above */}
            <span
              aria-hidden="true"
              className="absolute top-0 left-6 h-6 w-px bg-gradient-to-b from-accent to-transparent"
            />
            <span
              aria-hidden="true"
              className="absolute top-0 left-[26px] size-1.5 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_10px_2px] shadow-accent/60"
            />
            {/* Oversized ghost number, watermark-style */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-2 right-3 font-heading text-7xl font-bold text-white/[0.05] select-none"
            >
              {pillar.number}
            </span>

            <div className="relative flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent transition-transform group-hover:scale-110">
                <pillar.icon className="size-5" />
              </div>
              <h3 className="font-heading text-2xl font-semibold">{pillar.title}</h3>
            </div>
            <p className="relative mt-4 text-sm text-muted-foreground">{pillar.content}</p>
            <span className="relative mt-4 block h-px w-10 bg-accent/50 transition-all duration-300 group-hover:w-full" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={revealViewport}
        transition={{ ...revealTransition, delay: progressiveDelay(pillars.length) }}
      >
        <Button asChild className="mt-14">
          <a href="#contact-us">
            Learn More
            <ArrowRight className="size-4" />
          </a>
        </Button>
      </motion.div>
    </section>
  );
}
