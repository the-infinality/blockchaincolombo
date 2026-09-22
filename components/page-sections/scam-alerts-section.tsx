import { BookOpenText, ShieldAlert } from "lucide-react";

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
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

// On the site's plain background — a subtle warning-accent tint around the
// icon rather than a full-bleed photo, and a two-column layout (icon +
// heading on one side, body copy + CTAs on the other).
export function ScamAlertsSection() {
  return (
    <section
      id="scam-alerts"
      className="scroll-mt-24 mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-32 lg:px-8"
    >
      <Reveal direction="left" className="overflow-hidden rounded-3xl border border-amber-400/20 bg-amber-400/[0.03] p-8 sm:p-14">
        <RevealGroup className="grid gap-10 lg:grid-cols-[auto_1fr] lg:items-start lg:gap-16">
          <RevealItem direction="left" className="flex flex-col items-start gap-5">
            <div className="flex size-16 items-center justify-center rounded-full border border-amber-400/30 bg-amber-400/10">
              <ShieldAlert className="size-7 text-amber-400" />
            </div>
            <h2 className="font-heading text-4xl font-bold sm:text-5xl">Scam Alerts</h2>
          </RevealItem>

          <div className="space-y-8">
            <RevealItem direction="left">
              <p className="text-lg font-medium">
                Simple steps to protect yourself. A lesson in education,
                awareness and vigilence.
              </p>
              <p className="mt-4 text-muted-foreground">
                Blockchain Colombo recognises the importance of education.
                Understanding of the cryptocurrency sector helps protect people
                from unscrupulous and bad actors. We work with regulators and law
                enforcement to identify and report those who seek to mislead,
                deceive and defraud consumers.
              </p>
            </RevealItem>

            {/* The full article opens in a dialog instead of taking up a
                huge scroll of the page itself. */}
            <RevealItem direction="left">
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
            </RevealItem>

            <RevealItem direction="left" className="border-t border-white/10 pt-8">
              <ReportScamCallout />
            </RevealItem>
          </div>
        </RevealGroup>
      </Reveal>
    </section>
  );
}
