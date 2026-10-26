import { ArrowRight } from "lucide-react";

import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { GridLine, LineGrid } from "@/components/motion/grid-lines";

type Tier = {
  price: string;
  name: string;
  benefitsLabel?: string;
  benefits: string[];
  cta: { label: string; href: string };
};

const tiers: Tier[] = [
  {
    price: "LKR 2,000",
    name: "Professional Membership",
    benefits: [
      "Opportunity to interview local and international guests on Blockchain Colombo YouTube channel (Selection criteria will apply)",
      "Subscription to news & bulletins",
      "Membership voting rights",
      "Event / Conference discounts",
      "Board nomination opportunities",
    ],
    cta: { label: "Application Form", href: "#contact-us" },
  },
  {
    price: "LKR 5,000",
    name: "Startup and SME Membership",
    benefitsLabel: "Benefits:",
    benefits: [
      "Opportunity to interview local and international guests on Blockchain Colombo YouTube channel with your company branding",
      "Member listing on our website, use of Blockchain Colombo logo on your website",
      "Subscription to news & bulletins",
      "Education discounts",
      "Event: Conference discounts, VIP invitations & promotion on the Blockchain Colombo website",
      "Membership voting rights",
      "Policy / submission engagement & an opportunity to join our working groups (as a member)",
    ],
    cta: { label: "Application Form", href: "#contact-us" },
  },
  {
    price: "from LKR 10,000",
    name: "Enterprise Membership",
    benefitsLabel: "Enterprise Membership Benefits:",
    benefits: [
      "On going interview series of local and international guests on Blockchain Colombo YouTube channel with your company branding",
      "Introductions and facilitated meetings to international VC, PE and Angels",
      "Member listing on our website, use of Blockchain Colombo logo on your website",
      "Subscription to news / bulletins & education discounts",
      "Events: organise events with us, speaking opportunities, conference discounts, VIP invitations & promotion of your events on the Blockchain Colombo website and social media",
      "Membership voting rights",
    ],
    cta: { label: "Contact Us", href: "#contact-us" },
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

export function MembershipTypesSection() {
  return (
    <section id="membership-types" className="scroll-mt-16 bg-brand-navy-deep text-white">
      <div className="mx-auto grid max-w-[96rem] gap-12 px-4 py-20 sm:px-8 sm:py-32 lg:px-12 xl:grid-cols-[minmax(0,1fr)_minmax(0,2.6fr)] xl:gap-10">
        <RevealGroup>
          <RevealItem>
            <p className="font-mono text-[11px] tracking-widest text-[#796753] uppercase">
              Membership Types
            </p>
            <h2 className="mt-6 font-heading text-[clamp(3rem,8vw,5rem)] leading-[0.9] font-bold tracking-tight text-[#796753] uppercase xl:text-[3.1vw]">
              <span className="block">Membership</span>
              <span className="block">Types</span>
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="mt-6 max-w-md font-heading text-2xl leading-tight font-semibold text-[#796753] sm:text-3xl">
              A member community bonded in a common purpose.
            </p>
          </RevealItem>
          <RevealItem>
            <p className="mt-6 max-w-md text-white/90">
              The categories of Blockchain Colombo membership are defined in
              our Constitution and incorporate the following definitions:
            </p>
          </RevealItem>
        </RevealGroup>

        <LineGrid className="grid md:grid-cols-3">
          <GridLine axis="x" className="top-0 bg-[#796753]" />
          <GridLine axis="y" className="left-0 bg-[#796753]" />
          {tiers.map((tier, i) => (
            <Reveal
              key={tier.name}
              delay={i * 0.1}
              className="relative flex min-h-[36rem] flex-col p-4 sm:p-5"
            >
              <GridLine axis="y" delay={0.2 + i * 0.15} className="right-0 bg-[#796753]" />
              <GridLine axis="x" delay={0.2 + i * 0.15} className="bottom-0 bg-[#796753]" />
              <div className="flex justify-between font-mono text-[11px] text-[#796753]">
                <span>{pad(i + 1)}</span>
                <span>{tier.price}</span>
              </div>

              <h3 className="mt-24 font-heading text-3xl leading-none font-bold tracking-tight text-[#796753] lg:mt-32 lg:text-[2.1rem]">
                {tier.name}
              </h3>

              <div className="mt-8 mb-10 text-sm leading-snug text-white">
                {tier.benefitsLabel && <p className="mb-2">{tier.benefitsLabel}</p>}
                <ul className="space-y-1.5">
                  {tier.benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-2">
                      <span aria-hidden="true">&ndash;</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={tier.cta.href}
                className="relative mt-auto flex items-center justify-between pt-4 font-mono text-[11px] tracking-widest text-[#796753] uppercase transition-colors hover:text-white"
              >
                <GridLine axis="x" delay={0.6 + i * 0.15} className="top-0 bg-[#796753]" />
                {tier.cta.label}
                <ArrowRight className="size-4" />
              </a>
            </Reveal>
          ))}
        </LineGrid>
      </div>
    </section>
  );
}
