import { ShieldAlert } from "lucide-react";

import { Button } from "@/components/ui/button";

// Ported from scam-alerts.php `.report-scam`. Source repeated the identical
// "Report a scam to the ACCC" block 4 times, unedited from the Australian
// template this theme was cloned from (ACCC = Australia's consumer
// watchdog, not a Sri Lankan body). Reduced to the one real callout; needs
// the real Sri Lankan reporting channel (e.g. CBSL, CERT|CC, Police CID)
// from the client before this ships — kept the original copy here rather
// than guess at one.
//
// Content-only (no own <section>/background) — embedded directly inside
// the plain bordered panel in scam-alerts-section.tsx, rather than a
// separate section of its own.
export function ReportScamCallout() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center text-center">
      <div className="flex size-16 items-center justify-center rounded-full border border-accent/40 bg-accent/10 shadow-[0_0_40px_-5px] shadow-accent/50">
        <ShieldAlert className="size-7 text-accent" />
      </div>
      <h3 className="mt-5 font-heading text-2xl font-bold text-white sm:text-3xl">
        Report a scam to Blockchain Colombo
      </h3>
      <p className="mx-auto mt-3 max-w-sm text-white/70">
        Spotted something suspicious? Flag it — every report helps us warn
        the wider community faster.
      </p>

      <div className="mx-auto mt-8 flex w-full items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/8 p-5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl">
        <span className="text-sm font-medium text-white">
          Report a scam to the ACCC
        </span>
        <Button
          asChild
          size="sm"
          className="shrink-0 bg-accent text-accent-foreground hover:bg-accent/90"
        >
          <a href="#">Report a Scam</a>
        </Button>
      </div>
    </div>
  );
}
