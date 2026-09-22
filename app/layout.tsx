import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { IntroLoader } from "@/components/intro-loader";
import { PointerTracker } from "@/components/pointer-tracker";
import { SiteBackground } from "@/components/site-background";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";

// One type family, site-wide: General Sans (via Fontshare), used for both
// headings and body — a clean geometric sans matching the visual character
// of consensys.io (their actual Atyp Display/Text faces are proprietary).
// Google Sans / Great Vibes have been dropped entirely. Loaded via a plain
// <link> rather than next/font/google, since this isn't a Google Fonts
// family.
export const metadata: Metadata = {
  title: "Blockchain Colombo",
  description:
    "Sri Lanka's peak industry network for businesses implementing blockchain and distributed ledger technology.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <SiteBackground />
        <IntroLoader />
        <PointerTracker />
        <SmoothScrollProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}