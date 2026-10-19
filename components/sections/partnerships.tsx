import Image from "next/image";

import { RevealGroup, RevealItem } from "@/components/motion/reveal";

// Split-screen editorial panel: a flat #796753 field on the left carrying
// the oversized, tightly-tracked title and body copy, and the classical
// portrait-busts artwork filling the right half. Stacks (text, then image)
// below lg.
export function Partnerships() {
  return (
    <section className="relative grid min-h-screen bg-[#796753] text-[#f5efe6] lg:grid-cols-2">
      {/* Right half: artwork, with a slate tint to keep it moody. */}
      <div className="relative order-2 min-h-[60vh] lg:order-none lg:col-start-2 lg:row-start-1 lg:min-h-0">
        <Image
          src="/images/international-partnerships/p1.png"
          alt=""
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0f1a2b]/25" />
      </div>

      {/* Left half: title + body copy. Title is allowed to run slightly
          past the split onto the artwork, as in the reference. */}
      <div className="relative z-10 flex flex-col px-6 py-24 sm:px-10 lg:col-start-1 lg:row-start-1 lg:pt-32 lg:pl-12 lg:pr-10">
        <RevealGroup>
          <RevealItem>
            <h2 className="font-heading text-[clamp(2.75rem,9.5vw,5.5rem)] leading-[0.82] font-bold tracking-[-0.065em] uppercase lg:text-[6.2vw]">
              <span className="block">International</span>
              <span className="block">Partnerships</span>
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="mt-8 max-w-[40rem] text-xl leading-[1.12] font-medium tracking-[-0.02em] sm:text-2xl lg:text-[clamp(1.25rem,2.05vw,2rem)]">
              Blockchain Colombo recognises that relationships matter, that the
              strength of the networks built across borders aid both local and
              international ecosystems alike. For that reason, we prioritise
              the development of strong ties with jurisdictions that seek to
              foster collaboration.
              <br />
              Our efforts are focused on developing
              strong regional and APAC partnerships and initiatives first and
              then expand internationally.
            </p>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
