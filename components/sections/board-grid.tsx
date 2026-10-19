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

// Minimal 2x2 directory of board members: thin #796753 hairline grid (no
// portraits), each cell carrying a small mono index top-left, the name
// mid-cell, and the role bottom-left with social links bottom-right.
// Single column on small screens. The hairlines draw themselves in as the
// grid scrolls into view (outer frame first, then each cell in turn).
export function BoardGrid({ members }: { members: BoardMember[] }) {
  return (
    <LineGrid className="grid text-[#796753] sm:grid-cols-2">
      <GridLine axis="x" className="top-0 bg-[#796753]" />
      <GridLine axis="y" className="left-0 bg-[#796753]" />
      {members.map((member, i) => (
        <Reveal
          key={member.name}
          delay={i * 0.1}
          className="relative flex min-h-56 flex-col p-4 sm:min-h-64 sm:p-5"
        >
          <GridLine axis="y" delay={0.2 + i * 0.12} className="right-0 bg-[#796753]" />
          <GridLine axis="x" delay={0.2 + i * 0.12} className="bottom-0 bg-[#796753]" />
          <span className="font-mono text-[11px]">{pad(i + 1)}</span>
          <h3 className="mt-auto pt-10 font-heading text-2xl sm:text-[1.75rem]">
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
      ))}
    </LineGrid>
  );
}
