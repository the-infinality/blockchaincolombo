import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";

export type PricingTierData = {
  name: string;
  price: string;
  benefitsLabel: string;
  benefits: string[];
  ctas: { label: string; href: string }[];
};

// Ported from membership-types.php's `.editor-content` h5/ul blocks
export function PricingTier({ tier }: { tier: PricingTierData }) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)]">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-heading text-xl font-semibold">{tier.name}</h3>
        <span className="font-heading text-lg font-semibold text-primary">
          {tier.price}
        </span>
      </div>
      <p className="mt-3 text-sm font-medium text-muted-foreground">
        {tier.benefitsLabel}
      </p>
      <ul className="mt-3 space-y-2">
        {tier.benefits.map((benefit) => (
          <li key={benefit} className="flex gap-2 text-sm">
            <Check className="mt-0.5 size-4 shrink-0 text-accent" />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap gap-3 pt-6">
        {tier.ctas.map((cta) => (
          <Button key={cta.label} asChild variant="outline">
            <a href={cta.href}>{cta.label}</a>
          </Button>
        ))}
      </div>
    </div>
  );
}
