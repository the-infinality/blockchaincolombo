"use client";

import * as React from "react";

import { ParticleField } from "@/components/particle-field";

const LINE_COUNT = 5;

type ArcLine = {
  cx: number;
  cy: number;
  radius: number;
  startAngle: number;
  endAngle: number;
  opacity: number;
};

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

/** A large, gentle circle-arc guaranteed to actually pass through a point
 * on (or just past the edge of) the viewport — the sweep is centered on
 * that pass-through angle, so the visible slice is always a real curve
 * crossing the screen rather than a random, possibly off-screen, slice
 * of some huge circle. */
function createArc(width: number, height: number): ArcLine {
  const diag = Math.hypot(width, height);
  const radius = randomBetween(diag * 0.6, diag * 1.8);

  const px = randomBetween(-0.15 * width, 1.15 * width);
  const py = randomBetween(-0.15 * height, 1.15 * height);

  const placementAngle = Math.random() * Math.PI * 2;
  const cx = px + Math.cos(placementAngle) * radius;
  const cy = py + Math.sin(placementAngle) * radius;

  const throughAngle = Math.atan2(py - cy, px - cx);
  const sweep = randomBetween(Math.PI * 0.3, Math.PI * 0.65);
  const startAngle = throughAngle - sweep / 2;
  const endAngle = throughAngle + sweep / 2;

  return {
    cx,
    cy,
    radius,
    startAngle,
    endAngle,
    opacity: randomBetween(0.05, 0.13),
  };
}

/**
 * The site's permanent backdrop — a midnight-blue field with a handful of
 * large, sweeping circle-arcs (like faint drafting curves) and the shared
 * twinkling glow-particle field (components/particle-field.tsx). Fixed
 * behind everything (-z-10); every panel/card in the app is translucent
 * or unfilled so this shows through consistently on every page.
 */
export function SiteBackground() {
  const linesCanvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const linesCanvas = linesCanvasRef.current;
    if (!linesCanvas) return;
    const linesCtx = linesCanvas.getContext("2d");
    if (!linesCtx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    function drawLines() {
      linesCtx!.clearRect(0, 0, width, height);
      const arcs = Array.from({ length: LINE_COUNT }, () => createArc(width, height));

      for (const arc of arcs) {
        linesCtx!.beginPath();
        linesCtx!.strokeStyle = "#a9b7bd";
        linesCtx!.globalAlpha = arc.opacity;
        linesCtx!.lineWidth = 1;
        linesCtx!.arc(arc.cx, arc.cy, arc.radius, arc.startAngle, arc.endAngle);
        linesCtx!.stroke();
      }
      linesCtx!.globalAlpha = 1;
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      linesCanvas!.width = width * dpr;
      linesCanvas!.height = height * dpr;
      linesCanvas!.style.width = `${width}px`;
      linesCanvas!.style.height = `${height}px`;
      linesCtx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawLines();
    }
    resize();
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#010308]">
      {/* Midnight blue field — very dark, only a faint vignette of lift */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(140% 100% at 50% 0%, #050b1c 0%, #02040c 55%, #010308 100%)",
        }}
      />

      {/* A few large, sweeping circle-arcs */}
      <canvas ref={linesCanvasRef} aria-hidden="true" className="absolute inset-0" />

      {/* Glowing, twinkling particles of varying sizes */}
      <ParticleField />

      {/* Subtle grain so the gradient doesn't read as flat/digital */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%22120%22%20height=%22120%22%3E%3Cfilter%20id=%22n%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.9%22%20numOctaves=%222%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23n)%22/%3E%3C/svg%3E')",
          backgroundSize: "180px 180px",
        }}
      />
    </div>
  );
}
