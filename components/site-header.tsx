"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
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

// Standard sticky top nav — transparent over the hero, solid/blurred once
// scrolled past it. Replaces the old scroll-jacked docking nav that used to
// live in components/hero-sequence.tsx.
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#050b1c]/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        <a href="#top" className="flex items-center gap-2.5">
          <Image src="/logo.svg" alt="" width={32} height={32} className="size-8" />
          <span className="font-heading text-lg font-semibold text-white">
            Blockchain Colombo
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild size="sm">
            <a href={headerCta.href}>{headerCta.label}</a>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open menu"
              className="text-white hover:bg-white/10 hover:text-white md:hidden"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="border-white/10 bg-[#050b1c] text-white"
          >
            <SheetHeader>
              <SheetTitle className="text-white">Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {navLinks.map((item) => (
                <SheetClose asChild key={item.href}>
                  <a
                    href={item.href}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {item.label}
                  </a>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <a
                  href={headerCta.href}
                  className="mt-3 rounded-lg bg-primary px-3 py-2.5 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/80"
                >
                  {headerCta.label}
                </a>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
