import { ArrowRight } from "lucide-react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScamArticle } from "@/components/sections/scam-article";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

const CREAM = "text-[#f5efe6]";

// Split layout on the site's own particle background: oversized title,
// subheading and a ruled label on the left; on the right, a member notice
// (with an exclamation box), intro copy, and the two report blocks
// separated by hairlines, ending in the report CTA.
//
// The report content was ported from scam-alerts.php `.report-scam`. Source
// repeated the identical "Report a scam to the ACCC" block 4 times, unedited
// from the Australian template this theme was cloned from (ACCC =
// Australia's consumer watchdog, not a Sri Lankan body). Reduced to the one
// real callout; needs the real Sri Lankan reporting channel (e.g. CBSL,
// CERT|CC, Police CID) and its URL from the client before this ships.
export function ScamAlertsSection() {
  return (
    <section
      id="scam-alerts"
      className="mx-auto grid max-w-[96rem] scroll-mt-16 gap-12 px-4 py-20 sm:px-8 sm:py-32 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.9fr)] lg:gap-10 lg:px-12"
    >
      <RevealGroup>
        <RevealItem>
          <p className={`font-mono text-[11px] tracking-widest uppercase ${CREAM}`}>Scam Alerts</p>
          <h2 className="mt-6 font-heading text-[clamp(3rem,7vw,6.5rem)] leading-[0.9] font-bold tracking-tight text-[#796753] uppercase">
            <span className="block">Scam</span>
            <span className="block">Alerts</span>
          </h2>
        </RevealItem>
        <RevealItem>
          <p className="mt-8 max-w-md font-heading text-2xl leading-tight text-[#796753] sm:text-3xl lg:text-[2.1rem]">
            Simple steps to protect yourself. A lesson in education, awareness
            and vigilence.
          </p>
        </RevealItem>
        <RevealItem>
          <div className="mt-8 max-w-xs border-t border-[#796753] pt-3 font-mono text-[11px] tracking-widest text-[#796753] uppercase">
            <p>Official channels and practical guidance</p>
            {/* The full guide opens in a dialog instead of taking up a huge
                scroll of the page itself. */}
            <Dialog>
              <DialogTrigger className={`mt-3 inline-flex items-center gap-2 uppercase transition-opacity hover:opacity-70 ${CREAM}`}>
                Read: Cryptocurrency scams
                <ArrowRight className="size-3.5" />
              </DialogTrigger>
              <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="font-heading text-2xl">Cryptocurrency Scams</DialogTitle>
                  <DialogDescription>
                    A guide to spotting, avoiding, and reporting crypto investment scams.
                  </DialogDescription>
                </DialogHeader>
                <ScamArticle />
              </DialogContent>
            </Dialog>
          </div>
        </RevealItem>
      </RevealGroup>

      <RevealGroup className="border-t border-[#796753] pt-6">
        <RevealItem>
          <div
            aria-hidden="true"
            className="flex size-14 items-center justify-center border border-[#796753] font-heading text-4xl font-bold text-[#796753]"
          >
            !
          </div>
          <p className={`mt-5 font-mono text-[11px] tracking-widest uppercase ${CREAM}`}>
            Member notice / Updated 12.09.26
          </p>
          <p className={`mt-4 max-w-3xl text-xl leading-snug sm:text-2xl ${CREAM}`}>
            Blockchain Colombo recognises the importance of education.
            Understanding of the cryptocurrency sector helps protect people
            from unscrupulous and bad actors. We work with regulators and law
            enforcement to identify and report those who seek to mislead,
            deceive and defraud consumers.
          </p>
        </RevealItem>

        <RevealItem className="mt-10">
          <h3 className="border-b border-[#796753] pb-3 font-heading text-3xl text-[#796753] sm:text-4xl">
            Report a scam to Blockchain Colombo
          </h3>
          <p className={`border-b border-[#796753] py-4 text-lg sm:text-xl ${CREAM}`}>
            Spotted something suspicious? Flag it — every report helps us warn
            the wider community faster.
          </p>
        </RevealItem>

        <RevealItem className="mt-6">
          <h3 className="border-b border-[#796753] pb-3 font-heading text-3xl text-[#796753] sm:text-4xl">
            Report a scam to the ACCC
          </h3>
        </RevealItem>

        <RevealItem className="mt-6">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-md border border-[#796753] bg-[#796753] px-5 py-3 text-lg text-[#050b1c] transition-colors hover:bg-transparent hover:text-[#796753]"
          >
            report a scam
            <ArrowRight className="size-4" />
          </a>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
