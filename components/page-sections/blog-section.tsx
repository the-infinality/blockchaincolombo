import Image from "next/image";

import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { GridLine, LineList } from "@/components/motion/grid-lines";

const picks = [
  { category: "Editor’s picks", headline: "Editor’s picks" },
  { category: "Artificial Intelligence", headline: "3 AI analytics to add to your KPIs today" },
  { category: "Sales Prospecting", headline: "3 AI analytics to add to your KPIs today" },
  { category: "Customer Engagement", headline: "3 AI analytics to add to your KPIs today" },
];

const post = {
  meta: "Article by Alise Doe | Mar 4, 2022",
  desc: "State of Play: Developments in Fintech, payments & digital assets. Today Blockchain Sri Lanka hosted the 'State of Play' with over 1200 registrations and speakers from some of Australia's most recognisable businesses. The conversation around Payments, Consumer Data...",
};

const pad = (n: number) => String(n).padStart(2, "0");

export function BlogSection() {
  return (
    <section id="blog" className="relative scroll-mt-16 overflow-hidden bg-[#796753] text-[#050b1c]">
      <div className="mx-auto max-w-[96rem] px-4 pt-24 sm:px-8 sm:pt-32 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-10">
          <RevealGroup>
            <RevealItem>
              <p className="font-mono text-[11px] tracking-widest uppercase">Blog</p>
              <h2 className="mt-4 font-heading text-[clamp(4rem,13vw,11rem)] leading-[0.85] font-bold tracking-tight uppercase">
                Blog
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="mt-6 max-w-xs border-t border-white pt-3 font-mono text-xs leading-relaxed">
                Editor&rsquo;s picks and the latest from the Blockchain Colombo
                community.
              </p>
            </RevealItem>
          </RevealGroup>

          <RevealGroup>
            <RevealItem>
              <LineList className="lg:mt-6">
                <GridLine axis="x" className="top-0 bg-white" />
                {picks.map((pick, i) => (
                  <li
                    key={i}
                    className="relative grid grid-cols-[2rem_minmax(0,1fr)] gap-x-4 gap-y-1 py-3 sm:grid-cols-[2rem_minmax(0,1fr)_minmax(0,1.3fr)] sm:items-baseline"
                  >
                    <GridLine axis="x" delay={0.15 + i * 0.12} className="bottom-0 bg-white" />
                    <span className="font-mono text-[11px]">{pad(i + 1)}</span>
                    <span className={i === 0 ? "" : "uppercase"}>{pick.category}</span>
                    <span className="col-start-2 sm:col-start-auto">{pick.headline}</span>
                  </li>
                ))}
              </LineList>
            </RevealItem>
          </RevealGroup>
        </div>

        <RevealGroup className="pt-20 pb-16 lg:w-[52%] lg:pt-48 lg:pb-20">
          <RevealItem>
            <p className="text-sm sm:text-base">{post.meta}</p>
            <p className="mt-3 text-lg leading-snug sm:text-xl">{post.desc}</p>
          </RevealItem>
        </RevealGroup>
      </div>

      <div className="relative ml-auto aspect-[3/2] w-full max-w-[600px] lg:absolute lg:right-0 lg:bottom-0 lg:w-[40%]">
        <Image
          src="/images/blog/b1.jpg"
          alt=""
          fill
          sizes="(min-width: 1024px) 600px, 100vw"
          className="object-cover opacity-70 brightness-[0.6]"
        />
      </div>
    </section>
  );
}
