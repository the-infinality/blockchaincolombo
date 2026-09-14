"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { LinkedinIcon, TwitterIcon } from "@/components/icons";

export type BoardMember = {
  name: string;
  position: string;
  image: string;
  linkedin?: string;
  twitter?: string;
};

// Ported from `.team-members` markup shared by who-we-are.php's two board
// sections (`.meet-our-team` and `.meet-our-team-2`). Portraits sit in a
// simple ringed circle and bob gently as if floating, each on its own
// out-of-phase timing so the group doesn't move in unison.
export function BoardGrid({ members }: { members: BoardMember[] }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {members.map((member, i) => (
        <div key={member.name} className="text-center">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i % 4) * 0.4,
            }}
            className="relative mx-auto size-32 overflow-hidden rounded-full border-2 border-white/25"
          >
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
            />
          </motion.div>
          <h3 className="mt-4 font-heading text-lg font-semibold">
            {member.name}
          </h3>
          <p className="text-sm text-muted-foreground">{member.position}</p>
          {(member.linkedin || member.twitter) && (
            <div className="mt-2 flex justify-center gap-3">
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
        </div>
      ))}
    </div>
  );
}
