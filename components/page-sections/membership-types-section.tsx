"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  PricingTier,
  type PricingTierData,
} from "@/components/sections/pricing-tier";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

// Ported from membership-types.php. Note: the source literally read
// "Blockchain Australia" in the intro paragraph — an uncorrected leftover
// from the template this theme was cloned from (see PROJECT-README.md
// §3.2). Corrected to "Blockchain Colombo" here; flag with the client.
const tiers: PricingTierData[] = [
  {
    name: "Professional Membership",
    price: "LKR 2,000",
    benefitsLabel: "Professional Membership Benefits",
    benefits: [
      "Opportunity to interview local and international guests on Blockchain Colombo YouTube channel (Selection criteria will apply)",
      "Subscription to news & bulletins",
      "Membership voting rights",
      "Event / Conference discounts",
      "Board nomination opportunities",
    ],
    ctas: [
      { label: "Application Form", href: "#contact-us" },
      { label: "Submit Form", href: "#contact-us" },
    ],
  },
  {
    name: "Startup and SME Membership",
    price: "LKR 5,000",
    benefitsLabel: "Benefits",
    benefits: [
      "Opportunity to interview local and international guests on Blockchain Colombo YouTube channel with your company branding",
      "Member listing on our website, use of Blockchain Colombo logo on your website",
      "Subscription to news & bulletins",
      "Education discounts",
      "Event: Conference discounts, VIP invitations & promotion on the Blockchain Colombo website",
      "Membership voting rights",
      "Policy / submission engagement & an opportunity to join our working groups (as a member)",
    ],
    ctas: [
      { label: "Application Form", href: "#contact-us" },
      { label: "Submit Form", href: "#contact-us" },
    ],
  },
  {
    name: "Enterprise Membership",
    price: "from LKR 10,000",
    benefitsLabel: "Enterprise Membership Benefits",
    benefits: [
      "On going interview series of local and international guests on Blockchain Colombo YouTube channel with your company branding",
      "Introductions and facilitated meetings to international VC, PE and Angels",
      "Member listing on our website, use of Blockchain Colombo logo on your website",
      "Subscription to news / bulletins & education discounts",
      "Events: organise events with us, speaking opportunities, conference discounts, VIP invitations & promotion of your events on the Blockchain Colombo website and social media",
      "Membership voting rights",
    ],
    ctas: [{ label: "Contact Us", href: "#contact-us" }],
  },
];

// Full-bleed band (no max-width gutter) that recedes — scales/dims down
// slightly — as the user scrolls past it, scoped to this section's own
// scroll range only.
export function MembershipTypesSection() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const panelScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const panelOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  return (
    <section id="membership-types" ref={sectionRef} className="w-full scroll-mt-24">
      <motion.div style={{ scale: panelScale, opacity: panelOpacity }}>
        <Reveal
          direction="right"
          className="w-full border-y border-white/10 bg-white/[0.03] px-4 py-20 sm:px-8 sm:py-32 lg:px-16"
        >
          <RevealGroup className="mx-auto max-w-2xl text-center">
            <RevealItem direction="right">
              <h2 className="font-heading text-4xl font-bold">
                <span className="text-primary">Membership </span>Types
              </h2>
            </RevealItem>
            <RevealItem direction="right">
              <p className="mt-2 text-lg font-medium">
                A member community bonded in a common purpose.
              </p>
              <p className="mt-4 text-muted-foreground">
                The categories of Blockchain Colombo membership are defined in
                our Constitution and incorporate the following definitions:
              </p>
            </RevealItem>
          </RevealGroup>

          <RevealGroup className="mx-auto mt-12 grid max-w-7xl items-stretch gap-6 lg:grid-cols-3">
            {tiers.map((tier) => (
              <RevealItem key={tier.name}>
                <PricingTier tier={tier} />
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal
            direction="right"
            className="mx-auto mt-16 max-w-lg border-t border-white/10 pt-10 text-center"
          >
            <h3 className="font-heading text-2xl font-bold">
              See our entire members list
            </h3>
            <Button asChild className="mt-6">
              <a href="#our-members">Current Members</a>
            </Button>
          </Reveal>
        </Reveal>
      </motion.div>
    </section>
  );
}
