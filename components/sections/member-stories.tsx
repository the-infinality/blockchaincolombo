import { RevealGroup, RevealItem } from "@/components/motion/reveal";

const story = {
  content: [
    "Sri Lanka is facing the most challenging time in modern history, and the world economy is also at a precarious juncture with persistent inflation and monetary authorities across the world tightening policy as a countermeasure. It is more important than ever to have access to accurate information and experts that can help you secure your financial future.",
    "Blockchain Colombo was born out of necessity to educate people on global macroeconomics and technology that help shape our future. We help nurture and grow new and innovative solutions to unlock hidden value in the digital economy. Facilitate the creation of new rails for the future financial systems and international trading.",
    "We encourage government and private sector companies, businesses and individuals to join us and help shape a brighter future by adopting more efficient economic and financial infrastructure.",
  ],
  member: "Daks Gunaratne - Chairman",
};

// Split layout on the site's own background: an oversized three-line
// heading on the left (first line white, the rest in the brand brown) and
// the chairman's message with signature on the right. Stacks below lg.
export function MemberStories() {
  return (
    <section className="relative mx-auto max-w-[96rem] px-4 py-20 sm:px-8 sm:py-32 lg:px-12">
      <RevealGroup className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <RevealItem>
          <h2 className="font-heading text-[clamp(3rem,7vw,6.5rem)] leading-[0.9] font-bold tracking-tight uppercase">
            <span className="block text-white">Message</span>
            <span className="block text-[#796753]">From the</span>
            <span className="block text-[#796753]">Chairman</span>
          </h2>
        </RevealItem>

        <RevealItem className="space-y-6 text-lg text-white/90 lg:pt-2">
          {story.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
          <p className="pt-4 font-heading text-lg font-semibold text-[#796753]">
            {story.member}
          </p>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
