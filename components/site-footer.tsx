"use client";

import Image from "next/image";
import { ArrowUp } from "lucide-react";

import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@/components/icons";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { mainNav } from "@/lib/nav";

const contact = {
  email: "blockchainsrilanka@gmail.com",
  phone: "+94 11 898-855-88",
};

const socialLinks = [
  { label: "Facebook", href: "#", icon: FacebookIcon },
  { label: "Instagram", href: "#", icon: InstagramIcon },
  { label: "Twitter", href: "#", icon: TwitterIcon },
  { label: "LinkedIn", href: "#", icon: LinkedinIcon },
];

// Given a solid fill (not the translucent-over-background treatment every
// other panel on the site uses) so the footer reads as a clearly distinct,
// prominent closing section rather than disappearing into the page.
export function SiteFooter() {
  return (
    <footer
      id="site-footer"
      className="relative mt-auto overflow-hidden border-t border-white/10 bg-[#050b1c] text-white"
    >
      {/* Faint top glow line for a bit of drama at the seam */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      {/* Quiet watermark texture, not a focal image — low opacity, tucked
          in the corner, sized well below the footer's own content. */}
      <Image
        src="/images/home/p1.png"
        alt=""
        aria-hidden="true"
        width={420}
        height={420}
        className="pointer-events-none absolute -right-16 -bottom-16 w-64 opacity-[0.12] select-none sm:w-80"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <RevealGroup className="grid gap-14 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr]">
          <RevealItem className="space-y-5">
            <div className="flex items-center gap-3">
              <Image src="/logo.svg" alt="Blockchain Colombo" width={40} height={40} />
              <span className="font-heading text-xl font-semibold">Blockchain Colombo</span>
            </div>
            <p className="max-w-xs text-sm text-white/60">
              Sri Lanka&rsquo;s peak industry network for businesses
              implementing or evaluating blockchain and distributed ledger
              technology.
            </p>
            <div className="flex gap-3 pt-1">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:border-white/40 hover:bg-white/10 hover:text-white"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </RevealItem>

          <RevealItem>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-widest text-white/50">
              Navigate
            </h3>
            <ul className="mt-5 space-y-2.5">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </RevealItem>

          <RevealItem>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-widest text-white/50">
              Get in touch
            </h3>
            <div className="mt-5 space-y-3 text-sm">
              <div>
                <p className="text-white/40">Email</p>
                <a href={`mailto:${contact.email}`} className="text-white/80 hover:text-white hover:underline">
                  {contact.email}
                </a>
              </div>
              <div>
                <p className="text-white/40">Phone</p>
                <a
                  href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
                  className="text-white/80 hover:text-white hover:underline"
                >
                  {contact.phone}
                </a>
              </div>
            </div>
          </RevealItem>

          <RevealItem>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-widest text-white/50">
              Stay in the loop
            </h3>
            <div className="mt-5">
              <NewsletterForm />
            </div>
          </RevealItem>
        </RevealGroup>

        <Reveal className="mt-16 flex flex-col items-center gap-4 border-t border-white/10 pt-8 sm:flex-row sm:justify-between">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} Blockchain Colombo. All rights reserved.
          </p>
          <Button
            variant="outline"
            size="icon"
            aria-label="Back to top"
            className="border-white/20 bg-transparent text-white hover:bg-white/10"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <ArrowUp className="size-4" />
          </Button>
        </Reveal>
      </div>
    </footer>
  );
}