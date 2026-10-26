import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
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

const whatWeDoIntro = [
  "The blockchain ecosystem is growing rapidly in Sri Lanka and has the potential to revolutionize the way Sri Lankans interact with the country and each other. Blockchain Colombo is helping to ensure that the opportunities created by this technology are available to all Sri Lankans.",
  "These advantages create a network of opportunities that are simply unmatched—making Colombo the ideal place to bring or expand your business, no matter your size or sector. And you don’t have to go it alone. We’re here to help you establish the critical connections you need to succeed in our diverse business ecosystem.",
  "Blockchain Colombo aims to be the beating heart of industry bringing business, academia, and government under one roof.",
];

const DISPLAY = "font-heading text-[clamp(2.5rem,5.5vw,5.25rem)] leading-[0.92] font-bold tracking-tight uppercase";

export function WhatWeDo() {
  return (
    <section className="relative mx-auto max-w-[96rem] px-4 py-20 sm:px-8 sm:py-32 lg:px-12">
      <RevealGroup className="relative grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-x-6">
        <RevealItem>
          <h2 className={DISPLAY}>
            <span className="lg:block">Peak body for </span>
            <span className="text-[#796753] lg:block">blockchain </span>
            <span className="text-[#796753] lg:block">in Sri Lanka</span>
          </h2>
        </RevealItem>
        <RevealItem>
          <p className="max-w-xl text-lg text-muted-foreground sm:text-xl lg:text-2xl">
            Blockchain Colombo is Sri Lanka&rsquo;s peak industry network for
            businesses implementing blockchain or distributed ledger
            technology. Collectively, our members and the industries they
            serve advance adoption across the country.
          </p>
        </RevealItem>
      </RevealGroup>

      <div className="relative mt-20 sm:mt-28">
        <RevealGroup className="mx-auto max-w-4xl text-center">
          <RevealItem>
            <h3 className={DISPLAY}>What we do</h3>
          </RevealItem>
          {whatWeDoIntro.map((paragraph) => (
            <RevealItem key={paragraph.slice(0, 24)}>
              <p className="mt-8 text-lg text-muted-foreground sm:text-xl lg:text-2xl">
                {paragraph}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-20 grid gap-10 sm:grid-cols-3 sm:gap-8 lg:gap-12">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={progressiveDelay(i)}>
              <span className="block text-2xl text-foreground/80">{pillar.number}</span>
              <h4 className="mt-4 font-heading text-2xl font-medium text-[#796753]">{pillar.title}</h4>
              <p className="mt-3 max-w-sm text-muted-foreground">{pillar.content}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={progressiveDelay(pillars.length)} className="mt-12 flex sm:justify-end">
          <Button asChild>
            <a href="#contact-us">
              Learn More
              <ArrowRight className="size-4" />
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
