"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

import { ArticleCard, type Article } from "@/components/cards/article-card";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

// The source (news.php) repeated this exact same item 5 times via
// copy-paste — there was never 5 distinct news posts, just one block
// duplicated. Trimmed to 2 here (still ported as a data array so swapping
// in real articles later is a one-line change, not a template rewrite).
const newsItems: Article[] = Array.from({ length: 2 }, () => ({
  title: "Blockchain Presents: State of Play",
  meta: "By admin | Mar 4, 2022",
  desc: "State of Play: Developments in Fintech, payments & digital assets. Today Blockchain Sri Lanka hosted the 'State of Play' with over 1200 registrations and speakers from some of Australia's most recognisable businesses. The conversation around Payments, Consumer Data...",
}));

const mediaReleases: Article[] = Array.from({ length: 3 }, () => ({
  title: "Code of Conduct 2nd Edition Release",
  meta: "By admin | Jan 17, 2022 | Media Releases",
  desc: "FTX announced as the Naming Rights Sponsor for Sri Lanka Blockchain Week 2022. Blockchain Sri Lanka, the organisers of Sri Lanka Blockchain Week 2022, today announced that leading global...",
}));

// A full-bleed panel (no max-width gutter) with n1.png as its background,
// deliberately zooming in as the user scrolls through. The intro copy sits
// in its own tinted panel offset to one side, rather than plain centered
// text floating on the photo.
export function NewsSection() {
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);

  return (
    <section id="news" ref={ref} className="scroll-mt-24 w-full overflow-x-hidden">
      <Reveal className="relative w-full overflow-hidden border-y border-white/10">
        <motion.div style={{ scale: bgScale }} className="absolute inset-0">
          <Image src="/images/news/n1.png" alt="" fill className="object-cover object-top" />
        </motion.div>
        <div className="absolute inset-0 bg-[#050b1c]/80" />

        <div className="relative px-4 py-20 sm:px-8 sm:py-28 lg:px-16">
          <Reveal className="max-w-md rounded-2xl border border-white/15 bg-[#050b1c]/70 p-8 backdrop-blur-sm">
            <h2 className="font-heading text-4xl font-bold">News</h2>
            <p className="mt-2 text-lg font-medium">
              All News &amp; Information within the Sri Lankan Blockchain
              Community
            </p>
            <p className="mt-4 text-white/75">
              Blockchain Sri Lanka is the industry body that represents Sri
              Lankan businesses and business professionals participating in
              the digital economy through blockchain technology.
            </p>
          </Reveal>

          <Reveal>
            <h3 className="mt-16 font-heading text-3xl font-bold">
              <span className="text-primary">News of </span>industry
            </h3>
          </Reveal>
          <RevealGroup className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {newsItems.map((item, i) => (
              <RevealItem key={i}>
                <ArticleCard article={item} />
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal>
            <h3 className="mt-16 font-heading text-3xl font-bold">Code of Conduct</h3>
          </Reveal>
          <RevealGroup className="mt-8 grid gap-6 sm:grid-cols-3">
            {mediaReleases.map((item, i) => (
              <RevealItem key={i} className="space-y-2 border-l-2 border-accent pl-4">
                <h4 className="font-heading font-semibold">{item.title}</h4>
                <p className="text-xs text-white/60">{item.meta}</p>
                <p className="text-sm text-white/75">{item.desc}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Reveal>
    </section>
  );
}
