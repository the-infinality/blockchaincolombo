import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

const story = {
  heading: ["Message", "from the Chairman"],
  content: [
    "Sri Lanka is facing the most challenging time in modern history, and the world economy is also at a precarious juncture with persistent inflation and monetary authorities across the world tightening policy as a countermeasure. It is more important than ever to have access to accurate information and experts that can help you secure your financial future.",
    "Blockchain Colombo was born out of necessity to educate people on global macroeconomics and technology that help shape our future. We help nurture and grow new and innovative solutions to unlock hidden value in the digital economy. Facilitate the creation of new rails for the future financial systems and international trading.",
    "We encourage government and private sector companies, businesses and individuals to join us and help shape a brighter future by adopting more efficient economic and financial infrastructure.",
  ],
  member: "Daks Gunaratne — Chairman",
};

// A static pull-quote treatment — an oversized quote mark, the chairman's
// message set at heading weight (not body-paragraph size) split across a
// two-column layout on desktop, and an accent rule down the side. Heading,
// each paragraph, and the attribution all reveal on their own beat.
export function MemberStories() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
      <Reveal
        direction="right"
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-14"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-6 left-8 font-heading text-[10rem] leading-none font-bold text-accent/10 select-none"
        >
          &ldquo;
        </span>

        <RevealGroup className="relative">
          <RevealItem direction="right">
            <div className="font-heading text-sm font-semibold tracking-wide text-primary uppercase">
              {story.heading.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
          </RevealItem>

          <RevealGroup className="mt-8 grid gap-8 border-l-2 border-accent/40 pl-8 lg:grid-cols-2 lg:gap-12">
            {story.content.map((paragraph, i) => (
              <RevealItem key={i}>
                <p className="font-heading text-xl leading-snug font-medium text-white/90 sm:text-2xl">
                  {paragraph}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>

          <RevealItem direction="right">
            <p className="mt-10 text-right font-heading text-lg font-semibold text-accent">
              {story.member}
            </p>
          </RevealItem>
        </RevealGroup>
      </Reveal>
    </section>
  );
}
