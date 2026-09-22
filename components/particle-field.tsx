"use client";

import * as React from "react";

import { pointer } from "@/lib/pointer";

// How close the cursor has to be to push a particle away, and how hard —
// tapers to 0 at the radius edge so it reads as a soft "dent" rather than
// a hard collision.
const DENT_RADIUS = 150;
const DENT_STRENGTH = 10;

const PARTICLE_COLORS = [
  "#f5f7f9",
  "#f5f7f9",
  "#eef1f2",
  "#a2aeb3",
  "#8b93a1",
  "#5a6270",
];

type Particle = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  drift: number;
  twinklePhase: number;
  twinkleSpeed: number;
  color: string;
  glow: number;
};

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function createParticle(width: number, height: number): Particle {
  const isBright = Math.random() > 0.93;
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    radius: isBright ? randomBetween(1.8, 3.2) : randomBetween(0.4, 1.4),
    speed: randomBetween(0.03, 0.18),
    drift: randomBetween(-0.05, 0.05),
    twinklePhase: Math.random() * Math.PI * 2,
    twinkleSpeed: randomBetween(0.006, 0.026),
    color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    glow: isBright ? randomBetween(8, 16) : randomBetween(2, 6),
  };
}

/**
 * Just the twinkling, drifting, cursor-dented glow-particle field — no
 * background gradient or arcs. components/site-background.tsx uses this
 * for the permanent full-page backdrop; it's also dropped in directly as
 * a layer on top of specific images (see who-we-are-section.tsx) when a
 * section wants that same particle texture sitting over its own artwork.
 * Sized off the window's own dimensions (not the canvas element's own
 * measured box) — every current usage is a full-viewport-height section,
 * and this sidesteps any getBoundingClientRect/ResizeObserver timing
 * quirks around initial layout.
 */
export function ParticleField({ className = "absolute inset-0" }: { className?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];
    let rafId = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(Math.round((width * height) / 11000), 130);
      particles = Array.from({ length: count }, () => createParticle(width, height));
    }
    resize();
    window.addEventListener("resize", resize);

    function paintStatic() {
      ctx!.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx!.beginPath();
        ctx!.shadowColor = p.color;
        ctx!.shadowBlur = p.glow;
        ctx!.fillStyle = p.color;
        ctx!.globalAlpha = 0.55;
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
      ctx!.shadowBlur = 0;
    }

    function frame() {
      ctx!.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.y -= p.speed;
        p.x += p.drift;
        p.twinklePhase += p.twinkleSpeed;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < DENT_RADIUS && dist > 0.01) {
          const force = (1 - dist / DENT_RADIUS) * DENT_STRENGTH;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }

        const twinkle = (Math.sin(p.twinklePhase) + 1) / 2;
        const alpha = 0.25 + twinkle * 0.7;

        ctx!.beginPath();
        ctx!.shadowColor = p.color;
        ctx!.shadowBlur = p.glow * (0.6 + twinkle * 0.6);
        ctx!.fillStyle = p.color;
        ctx!.globalAlpha = Math.min(alpha, 1);
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
      ctx!.shadowBlur = 0;
      rafId = requestAnimationFrame(frame);
    }

    if (reduceMotion) {
      paintStatic();
    } else {
      rafId = requestAnimationFrame(frame);
    }

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
