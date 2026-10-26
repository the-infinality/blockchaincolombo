import { LinkedinIcon, XIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { GridLine, LineGrid } from "@/components/motion/grid-lines";

export type BoardMember = {
  name: string;
  position: string;
  linkedin?: string;
  twitter?: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

const XL_PLACEMENT = [
  "xl:col-span-2",
  "xl:col-span-2",
  "xl:col-span-2",
  "xl:col-span-2 xl:col-start-2",
  "xl:col-span-2",
];

export function BoardGrid({ members }: { members: BoardMember[] }) {
  return (
    <LineGrid className="grid text-[#796753] sm:grid-cols-2 xl:grid-cols-6">
      {members.map((member, i) => {
        const isLastOdd = i === members.length - 1 && members.length % 2 === 1;
        const lineDelay = 0.15 + i * 0.14;
        return (
          <Reveal
            key={member.name}
            delay={i * 0.1}
            className={`relative flex min-h-56 flex-col p-4 sm:min-h-64 sm:p-5 ${isLastOdd ? "sm:col-span-2" : ""} ${XL_PLACEMENT[i] ?? "xl:col-span-2"}`}
          >
            <GridLine axis="x" delay={lineDelay} className="top-0 bg-[#796753]" />
            <GridLine axis="y" delay={lineDelay} className="left-0 bg-[#796753]" />
            <GridLine axis="y" delay={lineDelay + 0.1} className="right-0 bg-[#796753]" />
            <GridLine axis="x" delay={lineDelay + 0.1} className="bottom-0 bg-[#796753]" />
            <span className="font-mono text-[11px]">{pad(i + 1)}</span>
            <h3 className="mt-10 font-heading text-2xl leading-tight sm:mt-14 sm:text-[1.6rem]">
              {member.name}
            </h3>
            <div className="mt-auto flex items-end justify-between gap-4 pt-6">
              <p className="text-sm leading-snug sm:text-base">{member.position}</p>
              <div className="flex shrink-0 gap-3">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} on LinkedIn`}
                    className="transition-opacity hover:opacity-70"
                  >
                    <LinkedinIcon className="size-4" />
                  </a>
                )}
                {member.twitter && (
                  <a
                    href={member.twitter}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} on X`}
                    className="transition-opacity hover:opacity-70"
                  >
                    <XIcon className="size-4" />
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        );
      })}
    </LineGrid>
  );
}
