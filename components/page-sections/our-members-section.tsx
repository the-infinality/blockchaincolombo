"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { revealTransition, revealViewport } from "@/components/motion/reveal";

// Ported from our-members.php `.team-members` (all `href="#"` placeholders
// in source — no real member URLs existed to carry over). Rather than
// individual logo cards, these now sit as floating labels over the five
// panels in gr1.png, positioned roughly where each panel sits (percent of
// the image's own box, so it holds up across viewport widths).
const members = [
  { company: "VC Group Holdings", href: "#", top: "38%", left: "16%" },
  { company: "Adderbree", href: "#", top: "38%", left: "50%" },
  { company: "Accession Capital", href: "#", top: "38%", left: "84%" },
  { company: "ReMAtics", href: "#", top: "78%", left: "28%" },
  { company: "PinnacleEXIM", href: "#", top: "78%", left: "72%" },
];

const membershipTypeBlurb = {
  title: "Industry Professional",
  desc: "An industry professional who wishes to take advantage of the membership network, promotions, news, education and events.",
};

export function OurMembersSection() {
  return (
    <section id="our-members" className="scroll-mt-24">
      {/* Intro + member panel merged into one visual panel with a single
          entrance animation, rather than two separately-revealed blocks. */}
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={revealViewport}
        transition={revealTransition}
        className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] px-4 py-16 sm:px-6 lg:px-10"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-4xl font-bold">Our Members</h2>
          <p className="mt-2 text-lg font-medium">
            Building the Sri Lankan blockchain ecosystem.
          </p>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>
              Blockchain Colombo is Sri Lanka&rsquo;s premier industry member
              network for businesses implementing or evaluating blockchain or
              distributed ledger technology. We work collectively to advance
              the adoption of blockchain technology in Sri Lanka and in
              advocating for regulatory and policy settings.
            </p>
            <p>
              Blockchain Colombo is a member led body. The ethos of the
              organisation is anchored in the view that we are greater as one
              voice. Industry led initiatives, industry led consultation and
              industry led activations.
            </p>
            <p>
              We are grateful to all those who commit resources in order for
              the industry to move forward.
            </p>
          </div>
          <p className="mt-8 text-xs font-semibold tracking-[0.3em] text-accent uppercase">
            Our Members
          </p>
        </div>

        {/* gr1.png's five architectural panels, with each company name
            floating on top of its own panel. */}
        <div className="relative mx-auto mt-8 aspect-[16/9] w-full max-w-5xl">
          <Image src="/images/our-members/gr1.png" alt="" fill className="object-contain" />
          {members.map((member) => (
            <a
              key={member.company}
              href={member.href}
              style={{ top: member.top, left: member.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#050b1c]/80 px-4 py-1.5 text-center font-heading text-sm font-bold tracking-wide text-white shadow-[0_4px_16px_rgba(0,0,0,0.5)] ring-1 ring-white/20 backdrop-blur-sm transition-transform hover:scale-110 sm:px-5 sm:py-2 sm:text-base"
            >
              {member.company}
            </a>
          ))}
        </div>
      </motion.div>

      {/* Membership Types teaser: blurb.png as a full-bleed background,
          the copy on the left, one floating card on the right (the source
          repeated this same card 6 times — there was only ever one real
          tier's worth of content here). */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={revealViewport}
        transition={revealTransition}
        className="relative mt-16 min-h-[70vh] overflow-hidden"
      >
        <Image src="/images/members/blurb.png" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-[#050b1c]/55" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-24 sm:px-6 md:grid-cols-2 md:items-center lg:px-8">
          <div>
            <h3 className="font-heading text-3xl font-bold text-white">Membership Types</h3>
            <p className="mt-3 max-w-md text-white/80">
              Blockchain Sri Lanka is Sri Lanka&rsquo;s premier industry
              member network for businesses implementing or evaluating
              blockchain or distributed ledger technology. We work
              collectively to advance the adoption of blockchain technology
              in Sri Lanka and in advocating for regulatory and policy
              settings.
            </p>
          </div>

          <div className="justify-self-center rounded-2xl border border-white/20 bg-white/10 p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl md:justify-self-end">
            <h4 className="font-heading font-semibold text-white">
              {membershipTypeBlurb.title}
            </h4>
            <p className="mt-2 max-w-xs text-sm text-white/75">
              {membershipTypeBlurb.desc}
            </p>
            <a
              href="#membership-types"
              className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
            >
              More Details
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
