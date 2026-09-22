import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

// Standalone card on the site's plain background — no photo. A subtle
// blurred accent glow stands in for visual interest instead. Content
// wrapper widened (max-w-6xl) so the heading isn't cramped; the paragraph
// keeps its own tighter max-w-3xl so lines stay readable even though the
// section itself is wide.
export function Partnerships() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
      <Reveal
        direction="left"
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-14"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-accent/10 blur-3xl"
        />

        <RevealGroup className="relative mx-auto max-w-6xl">
          <RevealItem direction="left">
            <span className="block h-px w-16 bg-accent" />
            <h2 className="mt-6 font-heading text-4xl font-bold sm:text-6xl">
              International Partnerships
            </h2>
          </RevealItem>
          <RevealItem direction="left">
            <p className="mt-6 max-w-3xl text-muted-foreground">
              Blockchain Colombo recognises that relationships matter, that the
              strength of the networks built across borders aid both local and
              international ecosystems alike. For that reason, we prioritise the
              development of strong ties with jurisdictions that seek to foster
              collaboration. Our efforts are focused on developing strong regional
              and APAC partnerships and initiatives first and then expand
              internationally.
            </p>
          </RevealItem>
        </RevealGroup>
      </Reveal>
    </section>
  );
}
