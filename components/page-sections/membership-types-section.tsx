"use client";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  PricingTier,
  type PricingTierData,
} from "@/components/sections/pricing-tier";
import { revealTransition, revealViewport } from "@/components/motion/reveal";

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

export function MembershipTypesSection() {
  return (
    <section id="membership-types" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={revealViewport}
        transition={revealTransition}
        className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-white/[0.03] px-4 py-16 sm:px-6 lg:px-10"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-4xl font-bold">
            <span className="text-primary">Membership </span>Types
          </h2>
          <p className="mt-2 text-lg font-medium">
            A member community bonded in a common purpose.
          </p>
          <p className="mt-4 text-muted-foreground">
            The categories of Blockchain Colombo membership are defined in
            our Constitution and incorporate the following definitions:
          </p>
        </div>

        <div className="mt-12 grid items-stretch gap-6 [perspective:1200px] lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, rotateY: -75 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "left center" }}
            >
              <PricingTier tier={tier} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="mx-auto mt-16 max-w-lg px-4 text-center sm:px-6 lg:px-8">
        <h3 className="font-heading text-2xl font-bold">
          See our entire members list
        </h3>
        <Button asChild className="mt-6">
          <a href="#our-members">Current Members</a>
        </Button>
      </div>
    </section>
  );
}
