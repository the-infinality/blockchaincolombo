"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

import { ArticleCard, type Article } from "@/components/cards/article-card";

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

// Everything — the "News" intro, "News of industry" items and the "Code
// of Conduct" media releases — now lives inside one panel with n1.png as
// its background, the whole panel sliding in as a single unit, and the
// background image slowly zooming in as the user scrolls through it.
export function NewsSection() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);

  return (
    <section id="news" className="scroll-mt-24 overflow-x-hidden px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: 140 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ type: "spring", stiffness: 70, damping: 16, mass: 1 }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10"
      >
        <motion.div style={{ scale: bgScale }} className="absolute inset-0">
          <Image src="/images/news/n1.png" alt="" fill className="object-cover object-top" />
        </motion.div>
        <div className="absolute inset-0 bg-[#050b1c]/80" />

        <div className="relative px-4 py-16 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
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
          </div>

          <h3 className="mt-14 font-heading text-3xl font-bold">
            <span className="text-primary">News of </span>industry
          </h3>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {newsItems.map((item, i) => (
              <ArticleCard key={i} article={item} />
            ))}
          </div>

          <h3 className="mt-14 font-heading text-3xl font-bold">Code of Conduct</h3>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {mediaReleases.map((item, i) => (
              <div key={i} className="space-y-2 border-l-2 border-accent pl-4">
                <h4 className="font-heading font-semibold">{item.title}</h4>
                <p className="text-xs text-white/60">{item.meta}</p>
                <p className="text-sm text-white/75">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
