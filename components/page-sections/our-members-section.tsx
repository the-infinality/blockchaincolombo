import { ArrowUpRight } from "lucide-react";

import { RevealGroup, RevealItem } from "@/components/motion/reveal";

// Ported from our-members.php `.team-members` (all `href="#"` placeholders
// in source — no real member URLs existed to carry over; keep as "#" until
// real URLs are supplied). A plain, modern link list rather than floating
// labels over an architectural illustration — no background image, no
// heavy card borders, just typography scale, spacing and a hover detail.
const members = [
  { company: "VC Group Holdings", href: "#" },
  { company: "Adderbree", href: "#" },
  { company: "Accession Capital", href: "#" },
  { company: "ReMAtics", href: "#" },
  { company: "PinnacleEXIM", href: "#" },
];

export function OurMembersSection() {
  return (
    <section
      id="our-members"
      className="scroll-mt-24 mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-32 lg:px-8"
    >
      {/* Asymmetric intro: heading/subheading on one side, body copy on
          the other, rather than everything centered and stacked — each
          column reveals on its own beat. */}
      <RevealGroup className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start lg:gap-16">
        <RevealItem direction="down">
          <h2 className="font-heading text-4xl font-bold sm:text-5xl">Our Members</h2>
          <p className="mt-3 text-lg font-medium text-muted-foreground">
            Building the Sri Lankan blockchain ecosystem.
          </p>
        </RevealItem>
        <RevealItem direction="down" className="space-y-4 text-muted-foreground">
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
        </RevealItem>
      </RevealGroup>

      <RevealGroup className="mt-16 border-t border-white/10">
        {members.map((member) => (
          <RevealItem key={member.company}>
            <a
              href={member.href}
              className="group flex items-center justify-between border-b border-white/10 py-6 transition-colors hover:text-primary"
            >
              <span className="font-heading text-2xl font-semibold sm:text-3xl">
                {member.company}
              </span>
              <ArrowUpRight className="size-6 shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" />
            </a>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
