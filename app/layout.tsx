import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { IntroLoader } from "@/components/intro-loader";
import { PointerTracker } from "@/components/pointer-tracker";
import { SiteBackground } from "@/components/site-background";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";

// Only two type families are used anywhere on the site: Great Vibes
// (special headings — e.g. "Unveiling The Future") and Google Sans
// (normal text — e.g. "Blockchain Colombo", body copy, everything else).
// Playfair Display has been dropped entirely. Loaded via a plain Google
// Fonts <link> rather than next/font/google — "Google Sans" isn't a
// guaranteed stable export name across next/font/google versions, and a
// <link> tag works everywhere.
export const metadata: Metadata = {
  title: "Blockchain Colombo",
  description:
    "Sri Lanka's peak industry network for businesses implementing blockchain and distributed ledger technology.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- this
            rule predates the App Router; a <link> in the root app/layout.tsx
            (unlike a route-level layout) already applies to every page. */}
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&family=Great+Vibes&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <SiteBackground />
        <IntroLoader />
        <PointerTracker />
        <SmoothScrollProvider>
          {/* SiteHeader's old docking nav is gone — the same job is now
              done by <HeroSequence>, rendered inside app/page.tsx, which
              owns both the scroll-driven intro and the persistent
              top-left/bottom-left docked nav that follows it. */}
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}