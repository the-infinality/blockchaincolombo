import Image from "next/image";

import { RevealGroup, RevealItem } from "@/components/motion/reveal";

type Article = {
  title: string;
  meta: string;
  desc: string;
};

// The source (news.php) repeated this exact same item 5 times via
// copy-paste — there was never 5 distinct news posts, just one block
// duplicated. Kept as data arrays so swapping in real articles later is a
// one-line change, not a template rewrite.
const newsItems: Article[] = Array.from({ length: 2 }, () => ({
  title: "Blockchain Presents: State of Play",
  meta: "By admin | Mar 4, 2022",
  desc: "State of Play: Developments in Fintech, payments & digital assets. Today Blockchain Sri Lanka hosted the 'State of Play' with over 1200 registrations and speakers from some of Australia's most recognisable businesses. The conversation around Payments, Consumer Data...",
}));

const mediaReleases: Article[] = [
  {
    title: "Code of Conduct 2nd Edition Release",
    meta: "By admin | Jan 17, 2022 | Media Releases",
    desc: "FTX announced as the Naming Rights Sponsor for Sri Lanka Blockchain Week 2022. Blockchain Sri Lanka, the organisers of Sri Lanka Blockchain Week 2022, today announced that leading global...",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

function ArticleItem({ article, index }: { article: Article; index?: number }) {
  return (
    <RevealItem className="border-t border-current pt-3">
      <h4 className="flex gap-2 font-heading text-lg leading-snug">
        {index !== undefined && <span>{pad(index)}</span>}
        <span>{article.title}</span>
      </h4>
      <p className={`mt-1 text-xs ${index !== undefined ? "pl-7" : ""}`}>{article.meta}</p>
      <p className="mt-4 text-sm leading-snug">{article.desc}</p>
    </RevealItem>
  );
}

// Full-width flat #796753 panel with all type in deep navy — tag,
// oversized heading, subheading, intro, then the "News of industry" (in
// white) and "Code of Conduct" groups divided by hairlines. The cut-out figure
// (transparent PNG, slightly faded) sits pinned to the bottom-right corner,
// behind the copy.
export function NewsSection() {
  return (
    <section id="news" className="relative flex scroll-mt-16 flex-col overflow-hidden bg-[#796753] text-[#050b1c] lg:block">
      {/* Shown whole (`contain`) and capped so the 1280px source is never
          upscaled. In normal flow below lg so it never overlaps the copy. */}
      <div className="pointer-events-none order-last aspect-video w-full lg:absolute lg:-right-[8%] lg:bottom-0 lg:w-[62%] lg:max-w-[1280px]">
        <div className="relative size-full">
          <Image
            src="/images/news/n1.png"
            alt=""
            fill
            sizes="(min-width: 1024px) 62vw, 100vw"
            className="object-contain object-right-bottom opacity-70"
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[96rem] px-4 py-16 sm:px-8 sm:py-24 lg:px-12">
        <RevealGroup className="max-w-4xl lg:max-w-[50%]">
          <RevealItem>
            <p className="font-mono text-[11px] tracking-widest uppercase">News</p>
            <h2 className="mt-4 font-heading text-[clamp(3rem,7vw,6rem)] leading-[0.9] font-bold tracking-tight uppercase">
              News
            </h2>
            <p className="mt-4 max-w-2xl font-heading text-2xl leading-tight sm:text-3xl">
              All News &amp; Information within the Sri Lankan Blockchain
              Community
            </p>
          </RevealItem>
          <RevealItem>
            <p className="mt-4 max-w-2xl text-base sm:text-lg">
              Blockchain Sri Lanka is the industry body that represents Sri
              Lankan businesses and business professionals participating in the
              digital economy through blockchain technology.
            </p>
            <span className="mt-6 block h-px w-8 bg-[#050b1c]" />
          </RevealItem>
        </RevealGroup>

        <RevealGroup className="mt-6 max-w-4xl text-white lg:max-w-[50%]">
          <RevealItem>
            <h3 className="font-heading text-2xl font-semibold sm:text-3xl">News of industry</h3>
          </RevealItem>
          <div className="mt-3 grid gap-8 sm:grid-cols-2 sm:gap-6">
            {newsItems.map((item, i) => (
              <ArticleItem key={i} article={item} index={i + 1} />
            ))}
          </div>
        </RevealGroup>

        <RevealGroup className="mt-12 max-w-4xl lg:max-w-[50%]">
          <RevealItem>
            <h3 className="font-heading text-2xl font-semibold sm:text-3xl">Code of Conduct</h3>
          </RevealItem>
          <div className="mt-3 grid gap-8">
            {mediaReleases.map((item, i) => (
              <ArticleItem key={i} article={item} />
            ))}
          </div>
        </RevealGroup>
      </div>
    </section>
  );
}
