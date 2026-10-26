import { StatCounter } from "@/components/stat-counter";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { GridLine, LineGrid } from "@/components/motion/grid-lines";

const stats = [
  { value: 32, suffix: "K", label: "Active Users" },
  { value: 20, suffix: "+", label: "Events" },
  { value: 14, suffix: "", label: "Cities" },
];

export function PurposeOfCommunity() {
  return (
    <section className="mx-auto max-w-[96rem] px-4 py-20 sm:px-8 sm:py-32 lg:px-12">
      <RevealGroup>
        <RevealItem>
          <h2 className="font-heading text-[clamp(3rem,8vw,7.5rem)] leading-[0.88] font-bold tracking-tight text-[#f5efe6] uppercase">
            <span className="block">Building</span>
            <span className="block">Blockchain</span>
            <span className="block">Capability</span>
          </h2>
        </RevealItem>
        <RevealItem>
          <p className="mt-8 text-lg text-white sm:text-xl">
            We envision a world transformed by blockchain technology.
          </p>
          <p className="mt-6 max-w-3xl text-white/85 sm:text-lg">
            We are bringing together the best in Blockchain. Fostering
            collaborations and advocating for adoption with the aim of
            advancing, developing and delivering on the promise of Blockchain
            technology. Supported by Government, Industry and the Startup
            community. We recognise the need to re-write business rules
            collaboratively. To work with business processes and regulatory
            frameworks to deliver better systems and better outcomes.
          </p>
        </RevealItem>

        <RevealItem className="mt-14 max-w-5xl">
          <LineGrid className="grid sm:grid-cols-3">
            <GridLine axis="x" className="top-0 bg-[#796753]/60" />
            <GridLine axis="x" delay={0.25} className="bottom-0 bg-[#796753]/60" />
            {stats.map((stat, i) => (
              <div key={stat.label} className={`relative py-6 sm:py-8 ${i > 0 ? "sm:pl-8" : ""}`}>
                {i > 0 && (
                  <>
                    <GridLine axis="y" delay={0.4 + i * 0.15} className="left-0 hidden bg-[#796753]/60 sm:block" />
                    <GridLine axis="x" delay={0.4 + i * 0.15} className="top-0 bg-[#796753]/60 sm:hidden" />
                  </>
                )}
                <div className="font-heading text-6xl leading-none font-bold text-[#796753] sm:text-7xl lg:text-8xl">
                  <StatCounter value={stat.value} />
                  {stat.suffix}
                </div>
                <div className="mt-3 text-sm tracking-wide text-white uppercase sm:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </LineGrid>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
