"use client";

import * as React from "react";
import Image from "next/image";
import { BookOpenText } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ReportScamCallout } from "@/components/sections/report-scam-callout";
import { ScamArticle } from "@/components/sections/scam-article";

// Everything (heading, intro copy, the article trigger) now sits inside
// one panel with s1.jpg as its background, the same "slide-in panel with
// a scroll-zooming background" treatment as the News section above it.
export function ScamAlertsSection() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);

  return (
    <section id="scam-alerts" className="scroll-mt-24 overflow-x-hidden">
      <div className="px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10"
      >
        <motion.div style={{ scale: bgScale }} className="absolute inset-0">
          <Image src="/images/scam-alerts/s1.jpg" alt="" fill className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-[#050b1c]/78" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050b1c] via-transparent to-[#050b1c]/40" />

        <div className="relative mx-auto max-w-xl px-4 py-20 text-center sm:px-8">
          {/* Heading rises up from behind a mask, like a curtain lifting —
              distinct from the wipe/flip/slide entrances elsewhere. */}
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              className="font-heading text-4xl font-bold text-white sm:text-5xl"
            >
              Scam Alerts
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 text-lg font-medium"
          >
            Simple steps to protect yourself. A lesson in education,
            awareness and vigilence.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 text-white/75"
          >
            Blockchain Colombo recognises the importance of education.
            Understanding of the cryptocurrency sector helps protect people
            from unscrupulous and bad actors. We work with regulators and law
            enforcement to identify and report those who seek to mislead,
            deceive and defraud consumers.
          </motion.p>

          {/* The full article opens in a dialog instead of taking up a
              huge scroll of the page itself. */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8"
          >
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
                  <BookOpenText className="size-4" />
                  Read: Cryptocurrency Scams
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="font-heading text-2xl">
                    Cryptocurrency Scams
                  </DialogTitle>
                  <DialogDescription>
                    A guide to spotting, avoiding, and reporting crypto
                    investment scams.
                  </DialogDescription>
                </DialogHeader>
                <ScamArticle />
              </DialogContent>
            </Dialog>
          </motion.div>

          {/* The report callout, in the same panel/background as the
              rest of this section's text. */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 border-t border-white/10 pt-16"
          >
            <ReportScamCallout />
          </motion.div>
        </div>
      </motion.div>
      </div>
    </section>
  );
}
