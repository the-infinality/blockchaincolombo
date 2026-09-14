"use client";

import { motion } from "framer-motion";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { revealViewport } from "@/components/motion/reveal";

const stories = [
  {
    video: "/images/home/p4.mp4",
    heading: ["Message", "from the Chairman"],
    content: [
      "Sri Lanka is facing the most challenging time in modern history, and the world economy is also at a precarious juncture with persistent inflation and monetary authorities across the world tightening policy as a countermeasure. It is more important than ever to have access to accurate information and experts that can help you secure your financial future.",
      "Blockchain Colombo was born out of necessity to educate people on global macroeconomics and technology that help shape our future. We help nurture and grow new and innovative solutions to unlock hidden value in the digital economy. Facilitate the creation of new rails for the future financial systems and international trading.",
      "We encourage government and private sector companies, businesses and individuals to join us and help shape a brighter future by adopting more efficient economic and financial infrastructure.",
    ],
    member: "Daks Gunaratne — Chairman",
  },
];

// The chairman's message plays as a looping video, with the copy set in
// an actual comic-style speech bubble beside it — a solid card with a
// real triangular tail (not a blurred rotated square) and a big
// decorative quote mark, so it reads as warm/conversational rather than
// the glassy/futuristic treatment used for the nav card elsewhere.
export function MemberStories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Carousel>
        <CarouselContent>
          {stories.map((story) => (
            <CarouselItem key={story.member}>
              <div className="grid gap-10 md:grid-cols-[minmax(0,380px)_1fr] md:items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50, rotate: -3 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                  viewport={revealViewport}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/10"
                >
                  <video
                    src={story.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="h-full w-full object-cover"
                  />
                </motion.div>

                {/* Speech bubble: solid card + a real CSS-triangle tail
                    pointing left toward the video, a big quote mark, and
                    a gentle "pop in" + idle-breathing animation. */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={revealViewport}
                  transition={{
                    duration: 0.7,
                    delay: 0.25,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className="relative"
                >
                  <motion.div
                    animate={{ scale: [1, 1.012, 1] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="relative rounded-[2rem] border border-white/15 bg-[#0e1b32] p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] sm:p-10"
                  >
                    {/* Tail — real triangle, pointing at the video */}
                    <span
                      aria-hidden="true"
                      className="absolute top-12 -left-5 hidden h-0 w-0 border-y-[18px] border-r-[22px] border-y-transparent border-r-[#0e1b32] md:block"
                    />

                    <span
                      aria-hidden="true"
                      className="font-script pointer-events-none absolute -top-6 left-6 text-8xl text-accent/25 select-none"
                    >
                      &ldquo;
                    </span>

                    <div className="relative font-heading text-sm font-semibold tracking-wide text-primary uppercase">
                      {story.heading.map((line) => (
                        <div key={line}>{line}</div>
                      ))}
                    </div>
                    <div className="relative mt-4 space-y-4">
                      {story.content.map((paragraph, i) => (
                        <p key={i} className="text-muted-foreground">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    <p className="relative mt-6 text-right font-script text-2xl text-accent">
                      {story.member}
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
