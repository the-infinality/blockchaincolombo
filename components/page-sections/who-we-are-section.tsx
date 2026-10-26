import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { BoardGrid, type BoardMember } from "@/components/sections/board-grid";

// Board members, in display order (numbered 01–05 in the grid). Social
// icons render only for links that exist — Ornella has no X account.
const board: BoardMember[] = [
  {
    name: "Daks Gunaratne",
    position: "Chairman",
    linkedin: "https://www.linkedin.com/in/daksg/",
    twitter: "https://x.com/Daks_Gunaratne?s=20",
  },
  {
    name: "Chas Gunaratne",
    position: "Board Director",
    linkedin: "https://www.linkedin.com/in/chas-gunaratne/",
    twitter: "https://x.com/ChasGunaratne?s=20",
  },
  {
    name: "Ornella Da Costa",
    position:
      "Wealth & Investment Manager at Zerocap | Digital Asset Firm for Private Clients",
    linkedin: "https://www.linkedin.com/in/odacosta/",
  },
  {
    name: "Josh Mapperson",
    position: "Head of Communications and Ecosystem Development, RockX.",
    linkedin: "https://www.linkedin.com/in/joshua-m-a321b5160/",
    twitter: "https://x.com/Gandalf_NFT",
  },
  {
    name: "Lineli Wijesinghe",
    position: "Community Lead",
    linkedin: "https://www.linkedin.com/in/lineli-w/",
    twitter: "https://x.com/andyyy_lw",
  },
];

export function WhoWeAreSection() {
  return (
    <section id="who-we-are" className="scroll-mt-16">
      {/* Board: transparent so the site's particle background shows
          through. Intro copy on the left, 3-over-2 member grid on the right. */}
      <div className="mx-auto grid max-w-[96rem] gap-12 px-4 py-20 sm:px-8 sm:py-32 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-16 lg:px-12">
        <RevealGroup>
          <RevealItem>
            <p className="font-mono text-[11px] tracking-widest text-[#796753] uppercase">
              Our Board
            </p>
            <h2 className="mt-6 font-heading text-[clamp(3rem,5.5vw,6.5rem)] leading-[0.9] font-bold tracking-tight text-[#796753] uppercase">
              Our Board
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="mt-8 max-w-xl font-heading text-3xl leading-tight text-[#796753] sm:text-[2.5rem]">
              Passionate and committed to the blockchain sector
            </p>
          </RevealItem>
          <RevealItem>
            <p className="mt-10 max-w-xl text-lg text-white sm:text-xl">
              Blockchain Colombo provides a platform for trusted voices in the
              community to develop &amp; communicate considered views.
              Developing policy, delivering momentum. Blockchain Colombo
              encourages and advocates for the adoption of blockchain
              technology across industry and governments across Sri Lanka.
              Recognising that the development of blockchain and DLT
              environments is a mechanism to drive innovation across all
              sectors of the digital economy.
            </p>
          </RevealItem>
        </RevealGroup>

        <div className="lg:pt-16">
          <BoardGrid members={board} />
        </div>
      </div>
    </section>
  );
}
