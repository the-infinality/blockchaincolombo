import Image from "next/image";

import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { GridLine, LineList } from "@/components/motion/grid-lines";

// Ported from our-members.php `.team-members` (all `href="#"` placeholders
// in source — no real member URLs existed to carry over; keep as "#" until
// real URLs are supplied).
const members = [
  { company: "VC Group Holdings", href: "#" },
  { company: "Adderbree", href: "#" },
  { company: "Accession Capital", href: "#" },
  { company: "ReMAtics", href: "#" },
  { company: "PinnacleEXIM", href: "#" },
];

const paragraphs = [
  "Blockchain Colombo is Sri Lanka’s premier industry member network for businesses implementing or evaluating blockchain or distributed ledger technology. We work collectively to advance the adoption of blockchain technology in Sri Lanka and in advocating for regulatory and policy settings.",
  "Blockchain Colombo is a member led body. The ethos of the organisation is anchored in the view that we are greater as one voice. Industry led initiatives, industry led consultation and industry led activations.",
  "We are grateful to all those who commit resources in order for the industry to move forward.",
];

const pad = (n: number) => String(n).padStart(2, "0");

// Flat #796753 panel with all type in the site's deep navy: tag, oversized
// heading and subheading up top, then the body copy beside a numbered,
// hairline-divided member list (top-aligned, filling the remaining width).
// The cut-out members artwork (transparent PNG, darkened and faded) sits
// anchored to the section's bottom-right corner.
export function OurMembersSection() {
  return (
    <section
      id="our-members"
      className="relative scroll-mt-16 overflow-hidden bg-[#796753] text-[#050b1c]"
    >
      <div className="relative z-10 mx-auto max-w-[96rem] px-4 pt-24 pb-16 sm:px-8 sm:pt-32 lg:px-12 lg:pb-[28vw]">
        <RevealGroup>
          <RevealItem>
            <p className="font-mono text-[11px] tracking-widest uppercase">Our Members</p>
            <h2 className="mt-6 font-heading text-[clamp(3rem,8vw,7.5rem)] leading-[0.9] font-bold tracking-tight uppercase">
              Our Members
            </h2>
            <p className="mt-6 text-2xl sm:text-3xl lg:text-4xl">
              Building the Sri Lankan blockchain ecosystem.
            </p>
          </RevealItem>
        </RevealGroup>

        <RevealGroup className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:items-start lg:gap-12 lg:pl-[12%]">
          <RevealItem className="space-y-5 text-lg leading-snug">
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </RevealItem>

          <RevealItem>
            <LineList className="text-white">
              <GridLine axis="x" className="top-0 bg-white" />
              {members.map((member, i) => (
                <li key={member.company} className="relative">
                  <GridLine axis="x" delay={0.15 + i * 0.12} className="bottom-0 bg-white" />
                  <a
                    href={member.href}
                    className="group flex items-baseline gap-8 py-5 transition-opacity hover:opacity-70"
                  >
                    <span className="w-6 shrink-0 font-mono text-xs">{pad(i + 1)}</span>
                    <span className="font-heading text-2xl sm:text-3xl">{member.company}</span>
                  </a>
                </li>
              ))}
            </LineList>
          </RevealItem>
        </RevealGroup>
      </div>

      {/* Cut-out artwork, pinned bottom-right. In normal flow below lg so
          it never overlaps the copy on narrow screens. */}
      <div className="relative aspect-[1344/576] w-full lg:absolute lg:right-0 lg:bottom-0 lg:w-[66%]">
        <Image
          src="/images/members/p1.png"
          alt=""
          fill
          sizes="(min-width: 1024px) 66vw, 100vw"
          className="object-contain object-right-bottom opacity-70 brightness-[0.6]"
        />
      </div>
    </section>
  );
}
