import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ParticleField } from "@/components/particle-field";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { progressiveDelay } from "@/lib/scroll-stagger";

const pillars = [
  {
    number: "01",
    title: "Learn",
    content:
      "Learn from experts both local and international. Learn about the latest in DeFi, NFTs, the metaverse and gaming trends from people with real-life experience.",
  },
  {
    number: "02",
    title: "Network",
    content:
      "Network with the best by joining our exclusive online and in-real-life events — launches, roundtables, live panels, fireside chats, a makers day, and more.",
  },
  {
    number: "03",
    title: "Build",
    content:
      "Build better businesses, create the next big idea, and drive innovation forward — with people you love doing it with.",
  },
];

// Substantial, viewport-proportion cards on the section's own ambient
// particle backdrop, rather than stacked around a shared piece of artwork.
export function WhatWeDo() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
      <ParticleField className="absolute inset-0" />

      <RevealGroup className="relative mx-auto max-w-2xl text-center">
        <RevealItem>
          <p className="text-xs font-semibold tracking-[0.3em] text-accent uppercase">
            Peak body for blockchain
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold sm:text-5xl">
            in Sri Lanka
          </h2>
        </RevealItem>
        <RevealItem>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Blockchain Colombo is Sri Lanka&rsquo;s peak industry network for
            businesses implementing blockchain or distributed ledger
            technology. Collectively, our members and the industries they
            serve advance adoption across the country.
          </p>
        </RevealItem>
      </RevealGroup>

      <Reveal className="relative mt-16 flex items-end justify-between gap-6">
        <h3 className="font-heading text-2xl font-semibold sm:text-3xl">What we do</h3>
        <a
          href="#contact-us"
          aria-label="Learn more about what we do"
          className="flex size-12 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-accent hover:text-accent"
        >
          <ArrowUpRight className="size-5" />
        </a>
      </Reveal>

      <div className="relative mt-8 grid gap-6 md:grid-cols-3">
        {pillars.map((pillar, i) => (
          <Reveal
            key={pillar.title}
            delay={progressiveDelay(i)}
            className="flex min-h-[28rem] flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-accent/50"
          >
            <div>
              <span className="text-xs font-semibold tracking-[0.3em] text-accent uppercase">
                {pillar.number}
              </span>
              <h4 className="mt-6 font-heading text-4xl font-bold">{pillar.title}</h4>
            </div>
            <p className="mt-8 text-muted-foreground">{pillar.content}</p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={progressiveDelay(pillars.length)} className="relative">
        <Button asChild className="mt-14">
          <a href="#contact-us">
            Learn More
            <ArrowRight className="size-4" />
          </a>
        </Button>
      </Reveal>
    </section>
  );
}
