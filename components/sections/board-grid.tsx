import Image from "next/image";

import { cn } from "@/lib/utils";
import { LinkedinIcon, TwitterIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";

export type BoardMember = {
  name: string;
  position: string;
  image: string;
  linkedin?: string;
  twitter?: string;
};

// Ported from `.team-members` markup shared by who-we-are.php's two board
// sections (`.meet-our-team` and `.meet-our-team-2`). All four portraits
// sit in a single evenly-aligned row (2x2 on mobile), separated by a thin
// vertical divider between adjacent columns rather than a card border
// around each member.
export function BoardGrid({ members }: { members: BoardMember[] }) {
  return (
    <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-4 sm:gap-y-0">
      {members.map((member, i) => (
        <Reveal
          key={member.name}
          delay={i * 0.1}
          direction="left"
          className={cn(
            "flex flex-col items-center px-4 text-center sm:px-6",
            i > 0 && "sm:border-l sm:border-white/15"
          )}
        >
          <div className="relative size-28 overflow-hidden rounded-full border-2 border-white/25 sm:size-32">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
            />
          </div>
          <h3 className="mt-4 font-heading text-lg font-semibold">
            {member.name}
          </h3>
          <p className="text-sm text-muted-foreground">{member.position}</p>
          {(member.linkedin || member.twitter) && (
            <div className="mt-3 flex justify-center gap-3">
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${member.name} on LinkedIn`}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  <LinkedinIcon className="size-4" />
                </a>
              )}
              {member.twitter && (
                <a
                  href={member.twitter}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${member.name} on Twitter`}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  <TwitterIcon className="size-4" />
                </a>
              )}
            </div>
          )}
        </Reveal>
      ))}
    </div>
  );
}
