"use client";

import * as React from "react";

import { pointer } from "@/lib/pointer";

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
  speed: number;
  drift: number;
  twinklePhase: number;
  twinkleSpeed: number;
  sprite: HTMLCanvasElement;
  half: number;
};

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function makeSprite(color: string, radius: number, glow: number, dpr: number) {
  const size = Math.ceil((radius + glow) * 2 + 2);
  const canvas = document.createElement("canvas");
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(dpr, dpr);
  ctx.shadowColor = color;
  ctx.shadowBlur = glow;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, radius, 0, Math.PI * 2);
  ctx.fill();
  return canvas;
}

function createParticle(width: number, height: number, dpr: number): Particle {
  const isBright = Math.random() > 0.93;
  const radius = isBright ? randomBetween(1.8, 3.2) : randomBetween(0.4, 1.4);
  const glow = isBright ? randomBetween(8, 16) : randomBetween(2, 6);
  const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
  const sprite = makeSprite(color, radius, glow, dpr);
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    speed: randomBetween(0.03, 0.18),
    drift: randomBetween(-0.05, 0.05),
    twinklePhase: Math.random() * Math.PI * 2,
    twinkleSpeed: randomBetween(0.006, 0.026),
    sprite,
    half: sprite.width / dpr / 2,
  };
}

export function ParticleField({ className = "absolute inset-0" }: { className?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let particles: Particle[] = [];
    let rafId = 0;
    let width = 0;
    let height = 0;

    function draw(p: Particle, alpha: number) {
      ctx!.globalAlpha = alpha;
      ctx!.drawImage(p.sprite, p.x - p.half, p.y - p.half, p.half * 2, p.half * 2);
    }

    function paintStatic() {
      ctx!.clearRect(0, 0, width, height);
      for (const p of particles) draw(p, 0.55);
      ctx!.globalAlpha = 1;
    }

    function resize() {
      const nextWidth = window.innerWidth;
      const nextHeight = window.innerHeight;
      const widthChanged = nextWidth !== width;
      width = nextWidth;
      height = nextHeight;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (widthChanged || particles.length === 0) {
        const count = Math.min(Math.round((width * height) / 11000), 130);
        particles = Array.from({ length: count }, () => createParticle(width, height, dpr));
      }
      if (reduceMotion) paintStatic();
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
        const distSq = dx * dx + dy * dy;
        if (distSq < DENT_RADIUS * DENT_RADIUS && distSq > 0.0001) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / DENT_RADIUS) * DENT_STRENGTH;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }

        const twinkle = (Math.sin(p.twinklePhase) + 1) / 2;
        draw(p, Math.min(0.25 + twinkle * 0.7, 1));
      }
      ctx!.globalAlpha = 1;
      rafId = requestAnimationFrame(frame);
    }

    function start() {
      if (reduceMotion || rafId) return;
      rafId = requestAnimationFrame(frame);
    }
    function stop() {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }
    function onVisibility() {
      if (document.hidden) stop();
      else start();
    }

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      stop();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
