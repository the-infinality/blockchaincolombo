"use client";

import * as React from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";

import { mainNav } from "@/lib/nav";
import { ParticleField } from "@/components/particle-field";

// Total scroll "runway" the whole sequence plays out over. A tall, empty
// spacer (rendered below) reserves this much real page height; everything
// visual here is `position: fixed` and driven purely by how far the user
// has scrolled into that runway, from 0 (top of page) to 1 (fully past
// the spacer) — scrolling further after that just holds the final frame,
// the permanently docked mini-header/nav state.
const RUNWAY_VH = 550;

// Stage windows, as [start, end] fractions of total progress (0–1).
// Video is present from the very start and stays under everything else;
// image layers on top of it (both stay visible together, not a handoff);
// then each heading/menu layers on top of both in turn. Each window
// starts later AND is wider than the previous one — an escalating lag
// rather than evenly-spaced reveals. Headings + menu finish docking
// (`dock`) well before the video/artwork start fading away (`mediaFade`)
// — the media exit is a distinct, later beat, not simultaneous with the
// dock move.
const STAGE = {
  image: [0.04, 0.16] as const,
  heading1: [0.14, 0.26] as const,
  heading2: [0.24, 0.38] as const,
  menu: [0.36, 0.54] as const,
  dock: [0.56, 0.74] as const,
  mediaFade: [0.8, 0.98] as const,
};

const NAV_COUNT = mainNav.length;

// Where the heading block and the menu card live before scrolling (as
// fractions of viewport size) and where they dock afterward (px from the
// viewport's top-left). Headings sit higher up than dead-center so the
// menu — which appears below them — never overlaps them; the two then
// travel independently to their own corners.
const HEADING_START_Y_FRAC = 0.32;
const MENU_START_Y_FRAC = 0.68;
const HEADING_DOCK = { x: 150, y: 110 };
// Matches HEADING_DOCK.x's effective left edge (the heading box is
// narrower, so its own left edge sits further right than this — but the
// menu card's fixed width means this anchor puts ITS left edge at a clean,
// consistent gutter, so both blocks read as aligned to the same left rail).
const MENU_DOCK_X = 160;
// Once docked, the menu card grows tall enough to span from just below
// the headings down to near the bottom of the screen — filling the gap
// between them — rather than staying a small box floating near the
// bottom with empty space above it.
const MENU_DOCK_TOP_MARGIN = 210;
const MENU_DOCK_BOTTOM_MARGIN = 40;
const MENU_COMPACT_HEIGHT = 340;

export function HeroSequence() {
  const shouldReduceMotion = useReducedMotion();
  const [runwayPx, setRunwayPx] = React.useState(6000);
  const [viewport, setViewport] = React.useState({ width: 1280, height: 800 });
  const { scrollY } = useScroll();
  const [locked, setLocked] = React.useState(false);

  React.useEffect(() => {
    function measure() {
      const vh = window.innerHeight;
      setViewport({ width: window.innerWidth, height: vh });
      setRunwayPx((RUNWAY_VH / 100) * vh);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const progress = useTransform(scrollY, [0, runwayPx], [0, 1], { clamp: true });

  // Once fully docked, stop rendering the (now fully transparent) video
  // and artwork layers — pure perf/cleanliness, the visual is identical
  // either way. The headings/menu themselves are NOT gated by this — see
  // the return below — they must stay visible for the rest of the page.
  useMotionValueEvent(progress, "change", (v) => setLocked(v >= 0.999));

  function useStageOpacity(range: readonly [number, number]) {
    return useTransform(
      progress,
      [range[0], (range[0] + range[1]) / 2, range[1]],
      [0, 0.6, 1]
    );
  }

  // Mutable copies — framer-motion's InputRange type rejects the `as
  // const` readonly tuples themselves.
  const dockRange: [number, number] = [STAGE.dock[0], STAGE.dock[1]];
  const mediaFadeRange: [number, number] = [STAGE.mediaFade[0], STAGE.mediaFade[1]];

  // --- Video: present from the start, sits under everything, only starts
  // fading once the headings + menu have already finished docking. ---
  const videoOpacity = useTransform(progress, mediaFadeRange, [1, 0]);

  // --- Artwork: fades/scales in ON TOP of the video and then holds — it
  // fades away together with the video, both later than the dock move.
  // Sized to fill almost the whole viewport rather than a smaller
  // centered block. ---
  const imageOpacity = useTransform(
    progress,
    [STAGE.image[0], STAGE.image[1], mediaFadeRange[0], mediaFadeRange[1]],
    [0, 1, 1, 0]
  );
  const imageScale = useTransform(progress, [STAGE.image[0], STAGE.image[1]], [0.55, 1.05]);

  // --- The whole video+artwork layer sits on an opaque navy backdrop
  // while visible (so there's no flash-through before the video loads),
  // which itself fades to fully transparent in step with the media —
  // that's what actually reveals the ambient particle background
  // (components/site-background.tsx) underneath, instead of the fixed
  // opaque fill it used to sit on. ---
  const backdropAlpha = useTransform(progress, mediaFadeRange, [1, 0]);
  const backdropColor = useTransform(backdropAlpha, (a) => `rgba(5, 11, 28, ${a})`);

  // --- Heading 1 + 2: slide up into place as they fade in, rather than a
  // plain fade — a separate, own-stage offset layered on top of the
  // group's own dock-driven position below. ---
  const heading1Opacity = useStageOpacity(STAGE.heading1);
  const heading2Opacity = useStageOpacity(STAGE.heading2);
  const heading1Rise: [number, number] = [STAGE.heading1[0], STAGE.heading1[1]];
  const heading2Rise: [number, number] = [STAGE.heading2[0], STAGE.heading2[1]];
  const heading1Y = useTransform(progress, heading1Rise, [28, 0]);
  const heading2Y = useTransform(progress, heading2Rise, [28, 0]);

  // --- Heading group position: starts higher up than dead-center (so the
  // menu below never covers it), docks to top-left. Built as one explicit
  // `transform` string (rather than mixing Tailwind's translate-x/y-1/2
  // utility classes with framer-motion's own x/y style props, which
  // silently drop one or the other) so the center-anchoring is exact at
  // every point in the scroll, not just at the two ends. ---
  const headingCenter = { x: viewport.width / 2, y: viewport.height * HEADING_START_Y_FRAC };
  const headingX = useTransform(progress, dockRange, [headingCenter.x, HEADING_DOCK.x]);
  const headingY = useTransform(progress, dockRange, [headingCenter.y, HEADING_DOCK.y]);
  const headingScale = useTransform(progress, dockRange, [1, 0.42]);
  const headingTransform = useTransform(
    [headingX, headingY, headingScale],
    ([x, y, s]: number[]) => `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${s})`
  );

  // --- Menu group position: starts well below the headings (still
  // centered), docks to bottom-left. Same explicit-transform technique.
  // Its height also grows once docked, from a compact centered card to a
  // tall strip spanning most of the left edge — see MENU_DOCK_* above. ---
  const menuContainerOpacity = useTransform(progress, [STAGE.menu[0], STAGE.menu[0] + 0.05], [0, 1]);
  const menuCenter = { x: viewport.width / 2, y: viewport.height * MENU_START_Y_FRAC };
  const menuDockedHeight = Math.max(
    viewport.height - MENU_DOCK_TOP_MARGIN - MENU_DOCK_BOTTOM_MARGIN,
    260
  );
  const menuDockedCenterY = MENU_DOCK_TOP_MARGIN + menuDockedHeight / 2;
  const menuX = useTransform(progress, dockRange, [menuCenter.x, MENU_DOCK_X]);
  const menuY = useTransform(progress, dockRange, [menuCenter.y, menuDockedCenterY]);
  const menuScale = useTransform(progress, dockRange, [1, 0.82]);
  const menuHeight = useTransform(progress, dockRange, [MENU_COMPACT_HEIGHT, menuDockedHeight]);
  const menuTransform = useTransform(
    [menuX, menuY, menuScale],
    ([x, y, s]: number[]) => `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${s})`
  );

  // Reduced-motion users get the final docked state immediately, with no
  // scroll-jacked intro and no runway to scroll through — forcing a 5.5x
  // viewport-height pinned spectacle on someone who's asked for less
  // motion isn't a reasonable "equivalent" experience.
  if (shouldReduceMotion) {
    return (
      <div className="pointer-events-none fixed inset-0 z-40">
        <div
          className="pointer-events-auto absolute top-0 left-0 flex flex-col items-start text-left"
          style={{ transform: `translate(${HEADING_DOCK.x}px, ${HEADING_DOCK.y}px) translate(-50%, -50%)` }}
        >
          <a href="#top" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="" width={28} height={28} className="size-7" />
            <span className="font-sans text-lg font-semibold text-white">Blockchain Colombo</span>
          </a>
        </div>
        <nav
          className="pointer-events-auto absolute top-0 left-0 w-[min(88vw,280px)] rounded-2xl border border-white/20 bg-white/8 p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-xl"
          style={{
            transform: `translate(${MENU_DOCK_X}px, ${menuDockedCenterY}px) translate(-50%, -50%)`,
          }}
        >
          <span className="text-xs font-semibold tracking-[0.3em] text-white/40 uppercase">
            Menu
          </span>
          <div className="mt-4 flex flex-col gap-1">
          {mainNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              <span className="size-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_8px_1px] shadow-accent/60" />
              <span className="truncate">{item.label}</span>
            </a>
          ))}
          </div>
        </nav>
      </div>
    );
  }

  return (
    <>
      {/* Scroll runway — invisible, just reserves page height so the fixed
          overlay below has real scroll distance to react to. */}
      <div style={{ height: `${runwayPx}px` }} aria-hidden="true" />

      {/* Video + artwork — unmounted once fully docked (perf only; they're
          already at opacity 0 by then). The backdrop itself fades to
          transparent in step with them, so the ambient particle field
          (SiteBackground, fixed behind everything at -z-10) is what's
          left revealed underneath, not a flat navy fill. */}
      {!locked && (
        <motion.div
          style={{ backgroundColor: backdropColor }}
          className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
        >
          <motion.video
            autoPlay
            muted
            loop
            playsInline
            style={{ opacity: videoOpacity }}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/images/hero/home-desktop.mp4" type="video/mp4" />
          </motion.video>

          {/* Floating-figures artwork, layered on top of the video —
              sized to fill nearly the whole viewport. */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              style={{ opacity: imageOpacity, scale: imageScale }}
              className="relative h-[90vh] w-[96vw]"
            >
              <Image
                src="/images/hero/hero-1-1.png"
                alt=""
                fill
                priority
                className="object-contain"
              />
            </motion.div>
          </div>

          {/* Ambient particle field, layered on top of the hero video +
              artwork — same texture as the permanent page background. */}
          <motion.div style={{ opacity: imageOpacity }} className="absolute inset-0">
            <ParticleField />
          </motion.div>

          <motion.div
            style={{ opacity: videoOpacity }}
            className="absolute inset-0 bg-gradient-to-b from-[#050b1c]/60 via-transparent to-[#050b1c]/85"
          />
        </motion.div>
      )}

      {/* Headings + menu — ALWAYS rendered (never unmounted), so they stay
          on screen for the rest of the page, footer included, once
          docked. Their motion values simply hold at the docked values
          once progress reaches 1. */}
      <div className="pointer-events-none fixed inset-0 z-40">
        <motion.div
          style={{ transform: headingTransform }}
          className="pointer-events-auto absolute top-0 left-0 flex flex-col items-center text-center"
        >
          <motion.a
            href="#top"
            style={{ opacity: heading1Opacity, y: heading1Y }}
            className="flex items-center gap-4"
          >
            <Image src="/logo.svg" alt="" width={56} height={56} className="size-12 sm:size-14" />
            <span className="font-sans text-4xl font-semibold text-white sm:text-6xl">
              Blockchain Colombo
            </span>
          </motion.a>
          <motion.p
            style={{ opacity: heading2Opacity, y: heading2Y }}
            className="font-script mt-3 text-2xl text-white/80 sm:text-4xl"
          >
            Unveiling The Future
          </motion.p>
        </motion.div>

        <motion.div
          style={{ transform: menuTransform, opacity: menuContainerOpacity, height: menuHeight }}
          className="pointer-events-auto absolute top-0 left-0 w-[min(88vw,320px)]"
        >
          <nav className="flex h-full w-full flex-col rounded-2xl border border-white/20 bg-white/8 p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-xl">
            <span className="text-xs font-semibold tracking-[0.3em] text-white/40 uppercase">
              Menu
            </span>
            <div className="mt-4 flex flex-1 flex-col justify-around">
              {mainNav.map((item, i) => (
                <StaggeredNavLink key={item.href} href={item.href} label={item.label} index={i} progress={progress} />
              ))}
            </div>
          </nav>
        </motion.div>
      </div>
    </>
  );
}

function StaggeredNavLink({
  href,
  label,
  index,
  progress,
}: {
  href: string;
  label: string;
  index: number;
  progress: MotionValue<number>;
}) {
  const [start, end] = STAGE.menu;
  const span = end - start;
  // Escalating per-item lag: later items both start later AND take
  // longer to settle in than earlier ones.
  const slice = span / ((NAV_COUNT * (NAV_COUNT + 1)) / 2);
  const itemStart = start + slice * ((index * (index + 1)) / 2);
  const itemEnd = itemStart + slice * (index + 1);

  const opacity = useTransform(progress, [itemStart, itemEnd], [0, 1]);
  const y = useTransform(progress, [itemStart, itemEnd], [14, 0]);

  return (
    <motion.a
      href={href}
      style={{ opacity, y }}
      className="group flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
    >
      <span className="size-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_8px_1px] shadow-accent/60 transition-transform group-hover:scale-150" />
      <span className="truncate">{label}</span>
    </motion.a>
  );
}
