"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

import { ParticleField } from "@/components/particle-field";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { BoardGrid, type BoardMember } from "@/components/sections/board-grid";

// Real board members from who-we-are.php's `.meet-our-team` and the
// untitled `.meet-our-team-2` grid (Daks and Chas have live socials in
// source; Andrew Power entries were HTML-commented out in the original
// and are intentionally dropped here). Real per-person portraits (d1–d4)
// replace the single shared placeholder photo. All four now render in one
// row with names visible, rather than split across two separate grids.
const board: BoardMember[] = [
  {
    name: "Daks Gunaratne",
    position: "Chairman",
    image: "/images/team/d1.png",
  },
  {
    name: "Chas Gunaratne",
    position: "Board Director",
    image: "/images/team/d2.png",
    linkedin: "https://www.linkedin.com/in/chas-gunaratne/",
    twitter: "https://twitter.com/ChasGunaratne",
  },
  {
    name: "Ornella Da Costa",
    position:
      "Wealth & Investment Manager at Zerocap | Digital Asset Firm for Private Clients",
    image: "/images/team/d3.png",
    linkedin: "https://www.linkedin.com/in/odacosta/",
  },
  {
    name: "Josh Mapperson",
    position: "Head of Communications and Ecosystem Development, RockX.",
    image: "/images/team/d4.png",
    linkedin: "https://www.linkedin.com/in/joshua-m-a321b5160/",
    twitter: "https://twitter.com/Gandalf_NFT",
  },
];

export function WhoWeAreSection() {
  const introRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: introRef,
    offset: ["start end", "end start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <section id="who-we-are" className="scroll-mt-24">
      {/* Full-screen intro: a major full-viewport moment like the hero, so
          it gets the same generous top offset below the fixed header. The
          background zooms out continuously as the user scrolls through
          (not just a one-time entrance). The same ambient particle field
          that normally only shows through from behind the page
          (components/site-background.tsx) is layered again directly on
          top of this image via ParticleField. */}
      <div
        ref={introRef}
        className="relative flex min-h-[92vh] items-center justify-center overflow-hidden"
      >
        <motion.div style={{ scale: imageScale }} className="absolute inset-0">
          <Image
            src="/images/who-we-are/intro.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[#050b1c]/70" />
        <ParticleField className="absolute inset-0 z-[1]" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#050b1c] via-transparent to-[#050b1c]/40" />

        <RevealGroup className="relative z-[2] mx-auto grid max-w-6xl gap-10 px-4 pt-48 pb-20 text-left sm:px-6 sm:pt-52 sm:pb-32 lg:grid-cols-[1fr_1.1fr] lg:items-end lg:gap-16 lg:px-8">
          <RevealItem className="relative">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-16 -left-2 font-heading text-[10rem] leading-none font-bold text-white/10 select-none"
            >
              &ldquo;
            </span>
            <h2 className="relative font-heading text-4xl font-bold drop-shadow-[0_2px_24px_rgba(255,255,255,0.35)] sm:text-6xl">
              Who we are
            </h2>
            <span className="mt-4 block h-px w-20 bg-accent shadow-[0_0_12px_2px] shadow-accent/60" />
          </RevealItem>

          <RevealGroup className="flex flex-col gap-6 lg:max-w-md lg:justify-self-end">
            <RevealItem className="group rounded-xl border-l-2 border-accent/40 py-1 pl-6 transition-colors duration-300 hover:border-accent hover:bg-white/[0.03]">
              <p className="text-white/80 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] transition-colors group-hover:text-white/95">
                The blockchain ecosystem is growing rapidly in Sri Lanka and
                has the potential to revolutionize the way Sri Lankans
                interact with the country and each other. Blockchain Colombo
                is helping to ensure that the opportunities created by this
                technology are available to all Sri Lankans.
              </p>
            </RevealItem>
            <RevealItem className="group space-y-4 rounded-xl border-l-2 border-accent/40 py-1 pl-6 transition-colors duration-300 hover:border-accent hover:bg-white/[0.03]">
              <p className="text-white/80 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] transition-colors group-hover:text-white/95">
                These advantages create a network of opportunities that are
                simply unmatched—making Colombo the ideal place to bring or
                expand your business, no matter your size or sector. And you
                don&rsquo;t have to go it alone. We&rsquo;re here to help you
                establish the critical connections you need to succeed in our
                diverse business ecosystem.
              </p>
              <p className="text-white/80 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] transition-colors group-hover:text-white/95">
                Blockchain Colombo aims to be the beating heart of industry
                bringing business, academia, and government under one roof.
              </p>
            </RevealItem>
          </RevealGroup>
        </RevealGroup>
      </div>

      <div className="bg-secondary">
        <RevealGroup className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
          <RevealItem>
            <h3 className="font-heading text-3xl font-bold">
              <span className="text-primary">Our </span>Board
            </h3>
          </RevealItem>
          <RevealItem>
            <p className="mt-2 text-lg font-medium">
              Passionate and committed to the blockchain sector
            </p>
            <p className="mt-2 max-w-3xl text-muted-foreground">
              Blockchain Colombo provides a platform for trusted voices in the
              community to develop &amp; communicate considered views.
              Developing policy, delivering momentum. Blockchain Colombo
              encourages and advocates for the adoption of blockchain
              technology across industry and governments across Sri Lanka.
              Recognising that the development of blockchain and DLT
              environments is a mechanism to drive innovation across all
              sectors of the digital economy.
            </p>
          </RevealItem>

          {/* All four board members in one row, names visible — each
              portrait plays its own staggered reveal (see board-grid.tsx). */}
          <div className="mt-10">
            <BoardGrid members={board} />
          </div>
        </RevealGroup>
      </div>
    </section>
  );
}
