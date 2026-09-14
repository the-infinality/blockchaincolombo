"use client";

import Image from "next/image";
import { motion } from "framer-motion";

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

// b1.png's ornate frame is the section's border — everything (heading,
// editor's picks, the post) sits inside its oval opening rather than in
// plain rectangular blocks beside a photo.
export function BlogSection() {
  return (
    <section id="blog" className="scroll-mt-24 overflow-x-hidden py-16">
      <motion.div
        initial={{ opacity: 0, x: -80, skewX: 8 }}
        whileInView={{ opacity: 1, x: 0, skewX: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto aspect-[10/13] w-full max-w-4xl px-4 sm:px-6"
      >
        <Image
          src="/images/blog/b1.png"
          alt=""
          fill
          className="pointer-events-none object-contain select-none"
        />
        <div className="absolute inset-[16%_24%_13%_24%] flex flex-col items-center justify-center overflow-y-auto text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-5xl">Blog</h2>

          <h3 className="mt-8 font-heading text-base font-semibold tracking-wide uppercase sm:text-lg">
            Editor&rsquo;s picks
          </h3>
          <div className="mt-4 space-y-4">
            {editorsPicks.map((pick, i) => (
              <div key={i}>
                <p className="text-xs font-semibold tracking-wide text-primary uppercase sm:text-sm">
                  {pick.category}
                </p>
                <p className="text-sm font-medium sm:text-base">{pick.headline}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-white/15 pt-8">
            <h4 className="font-heading text-base font-semibold sm:text-xl">
              {post.title}
            </h4>
            <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
              {post.meta}
            </p>
            <p className="mt-3 hidden text-sm text-muted-foreground sm:block">
              {post.desc}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
