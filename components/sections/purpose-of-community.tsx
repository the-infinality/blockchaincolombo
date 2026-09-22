"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { StatCounter } from "@/components/stat-counter";
import { RevealGroup, RevealItem, revealTransition } from "@/components/motion/reveal";

const stats = [
  { value: 32, suffix: "K", label: "Active Users" },
  { value: 20, suffix: "+", label: "Events" },
  { value: 14, suffix: "", label: "Cities" },
];

// Full-bleed background artwork with everything — heading, copy, stats —
// centered directly on top of it. A "major full-viewport moment" like the
// hero, so it gets the same generous top offset below the fixed header.
export function PurposeOfCommunity() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden">
      {/* Blurred, scaled-up copy fills the frame with ambient color/texture
          so there's no flat letterbox bars... */}
      <Image
        src="/images/home/p2.jpg"
        alt=""
        fill
        aria-hidden="true"
        className="scale-125 object-cover opacity-60 blur-2xl"
      />
      {/* ...while the real image sits on top at `contain`, so the whole
          portrait artwork is visible rather than cropped by `cover`. */}
      <Image src="/images/home/p2.jpg" alt="" fill className="object-contain" />
      <div className="absolute inset-0 bg-[#050b1c]/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050b1c] via-transparent to-[#050b1c]/40" />

      <RevealGroup className="relative mx-auto max-w-3xl px-4 pt-48 pb-20 text-center sm:px-6 sm:pt-52 sm:pb-32 lg:px-8">
        <RevealItem direction="down">
          <span className="font-heading block text-3xl font-medium text-primary sm:text-5xl">
            Building Blockchain
          </span>
        </RevealItem>
        <RevealItem direction="down">
          <span className="font-heading text-3xl font-bold sm:text-5xl">
            Capability
          </span>
        </RevealItem>
        <motion.span
          variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
          transition={{ ...revealTransition, delay: 0.2 }}
          className="mx-auto mt-4 block h-px w-24 origin-center bg-accent"
        />
        <RevealItem direction="down">
          <p className="mt-6 text-lg font-medium">
            We envision a world transformed by blockchain technology
          </p>
        </RevealItem>
        <RevealItem direction="down">
          <p className="mx-auto mt-4 max-w-xl text-white/75">
            We are bringing together the best in Blockchain. Fostering
            collaborations and advocating for adoption with the aim of
            advancing, developing and delivering on the promise of Blockchain
            technology. Supported by Government, Industry and the Startup
            community. We recognise the need to re-write business rules
            collaboratively. To work with business processes and regulatory
            frameworks to deliver better systems and better outcomes.
          </p>
        </RevealItem>

        <RevealItem direction="down" className="mx-auto mt-10 grid max-w-md grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading text-3xl font-bold text-primary drop-shadow-[0_0_16px_rgba(255,255,255,0.25)] sm:text-4xl">
                <StatCounter value={stat.value} />
                {stat.suffix}
              </div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </div>
          ))}
        </RevealItem>

        <RevealItem direction="down" className="mt-10">
          <a
            href="#contact-us"
            className="inline-flex items-center gap-2 font-medium text-primary hover:underline"
          >
            Let&rsquo;s talk
            <ArrowRight className="size-4" />
          </a>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
