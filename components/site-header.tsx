"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Menu } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mainNav, headerCta } from "@/lib/nav";
import {
  getHeroIntroServerSnapshot,
  getHeroIntroSnapshot,
  subscribeHeroIntro,
} from "@/lib/hero-intro-store";

// Fixed top nav in the footer's tech-editorial style: bold wordmark, small
// mono uppercase links, and an outlined CTA box with an attached arrow
// cell. Transparent over the hero; once scrolled, a solid navy bar with a
// thin white rule (no backdrop blur, which re-renders every frame over the
// animated particle background).
const SCROLL_THRESHOLD = 40;

// mainNav includes "Contact Us" for the footer's full link list, but the
// header already has a dedicated headerCta button for that — render the
// rest of the links here and skip the duplicate.
const navLinks = mainNav.filter((item) => item.href !== headerCta.href);

export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const shouldReduceMotion = useReducedMotion();
  // Stays hidden until components/hero-sequence.tsx's staged load sequence
  // reaches its final "reveal" phase, so the nav fades in together with
  // the hero background rather than being visible from the first frame.
  const introComplete = React.useSyncExternalStore(
    subscribeHeroIntro,
    getHeroIntroSnapshot,
    getHeroIntroServerSnapshot
  );

  React.useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={false}
      animate={{ opacity: introComplete ? 1 : 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 1.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: introComplete ? "auto" : "none" }}
      className={`fixed inset-x-0 top-0 z-50 text-white transition-colors duration-300 ${
        scrolled ? "border-b border-white/80 bg-[#050b1c]/95" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[96rem] items-center justify-between gap-6 px-4 sm:px-8 lg:px-12">
        <a href="#top" className="flex items-center gap-2.5">
          <Image src="/logo.svg" alt="" width={32} height={32} className="size-8" />
          <span className="font-heading text-lg font-bold">Blockchain Colombo</span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-6 font-mono text-[11px] tracking-widest uppercase lg:flex xl:gap-8">
          {navLinks.map((item) => (
            <a key={item.href} href={item.href} className="transition-opacity hover:opacity-70">
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={headerCta.href}
          className="hidden items-center border border-white font-mono text-[11px] tracking-widest uppercase transition-colors hover:bg-white hover:text-[#050b1c] lg:flex"
        >
          <span className="px-3 py-2">{headerCta.label}</span>
          <span className="flex self-stretch items-center border-l border-current px-2.5">
            <ArrowRight className="size-3.5" />
          </span>
        </a>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="Open menu"
              className="flex size-9 items-center justify-center border border-white transition-colors hover:bg-white hover:text-[#050b1c] lg:hidden"
            >
              <Menu className="size-4" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="border-white/80 bg-[#050b1c] text-white">
            <SheetHeader>
              <SheetTitle className="font-mono text-[11px] font-normal tracking-widest text-white/70 uppercase">
                Navigate
              </SheetTitle>
            </SheetHeader>
            <nav aria-label="Mobile" className="flex flex-col px-4 font-mono text-xs tracking-widest uppercase">
              {navLinks.map((item) => (
                <SheetClose asChild key={item.href}>
                  <a href={item.href} className="border-b border-white/30 py-3 transition-opacity hover:opacity-70">
                    {item.label}
                  </a>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <a
                  href={headerCta.href}
                  className="mt-6 flex items-center justify-between border border-white px-3 py-2.5 transition-colors hover:bg-white hover:text-[#050b1c]"
                >
                  {headerCta.label}
                  <ArrowRight className="size-3.5" />
                </a>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
