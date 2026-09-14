"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { ParticleField } from "@/components/particle-field";
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
  return (
    <section id="who-we-are" className="scroll-mt-24">
      {/* Full-screen intro: the image slides in first, then the heading +
          paragraphs settle in on top of it with a deliberate lag — and
          the same ambient particle field that normally only shows through
          from behind the page (components/site-background.tsx) is layered
          again directly on top of this image via ParticleField. */}
      <div className="relative flex min-h-[92vh] items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -90, scale: 1.06 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
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

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-[2] mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 lg:px-8"
        >
          <h2 className="font-heading text-4xl font-bold drop-shadow-[0_2px_24px_rgba(255,255,255,0.35)] sm:text-6xl">
            Who we are
          </h2>
          <span className="mx-auto mt-4 block h-px w-20 bg-accent shadow-[0_0_12px_2px] shadow-accent/60" />

          <div className="mt-10 grid gap-8 text-left sm:grid-cols-2">
            <div className="group rounded-xl border-l-2 border-accent/40 py-1 pl-6 transition-colors duration-300 hover:border-accent hover:bg-white/[0.03]">
              <p className="text-white/80 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] transition-colors group-hover:text-white/95">
                The blockchain ecosystem is growing rapidly in Sri Lanka and
                has the potential to revolutionize the way Sri Lankans
                interact with the country and each other. Blockchain Colombo
                is helping to ensure that the opportunities created by this
                technology are available to all Sri Lankans.
              </p>
            </div>
            <div className="group space-y-4 rounded-xl border-l-2 border-accent/40 py-1 pl-6 transition-colors duration-300 hover:border-accent hover:bg-white/[0.03]">
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
            </div>
          </div>
        </motion.div>
      </div>

      <div className="bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h3 className="font-heading text-3xl font-bold">
            <span className="text-primary">Our </span>Board
          </h3>
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

          {/* All four board members in one row, names visible. */}
          <div className="mt-10">
            <BoardGrid members={board} />
          </div>
        </div>
      </div>
    </section>
  );
}
