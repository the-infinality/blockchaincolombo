# Blockchain Colombo

The Next.js + shadcn/ui rebuild of the Blockchain Colombo site — a single-page, scroll-driven marketing site for Sri Lanka's blockchain industry network.

For the full background on this project (what it replaced, why it's structured the way it is, and the migration notes from the original WordPress site), see [`PROJECT-README.md`](./PROJECT-README.md).

## Tech stack

- **Next.js 16** (App Router, Turbopack)
- **Tailwind CSS v4** + **shadcn/ui**
- **Framer Motion** for all scroll-driven and entrance animations
- **Lenis** for smooth scrolling
- **React Hook Form** + **Zod** for the contact forms
- Fonts: Google Sans (body/headings) and Great Vibes (special/script moments only) — loaded via a `<link>` tag in `app/layout.tsx`

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # eslint
```

## Project structure

```
app/
├── page.tsx              # the single page — every section lives here
├── layout.tsx             # fonts, SiteBackground, PointerTracker, IntroLoader
├── globals.css            # design tokens (colors, fonts) — all in @theme
├── api/                    # contact + newsletter form submission routes
├── sitemap.ts, robots.ts, icon.tsx
└── who-we-are/, blog/, etc.  # thin redirect stubs → /#section, for old bookmarked URLs

components/
├── hero-sequence.tsx       # the pinned scroll intro (video → artwork → headings → docked nav)
├── site-background.tsx     # the permanent midnight-blue particle backdrop
├── particle-field.tsx       # the reusable particle canvas (used by the above, and layered on top of several section images)
├── pointer-tracker.tsx      # tracks cursor position for the particle "dent" effect
├── site-footer.tsx
├── page-sections/            # one file per nav section (who-we-are, our-members, etc.)
├── sections/                 # smaller pieces shared within/across page-sections
├── forms/                    # the three contact/newsletter forms
├── motion/                   # shared framer-motion variants (reveal.tsx, parallax.tsx)
└── ui/                        # shadcn/ui primitives — CLI-generated, not hand-edited

lib/
├── nav.ts        # the main nav — single source of truth for the 8 sections
├── pointer.ts    # shared cursor-position singleton
├── scroll-stagger.ts
└── utils.ts

public/images/    # every section's real image/video assets, one folder per section
legacy-site/       # the old WordPress site being migrated away from (gitignored)
```

## Notes

- The site is a **single page** — every nav item (`lib/nav.ts`) is an in-page anchor (`#section-id`), not a route. Old per-page routes still exist as redirect stubs so bookmarked links don't 404.
- The contact and newsletter API routes (`app/api/`) validate and log submissions but aren't wired to a real email/CRM provider yet — see the `TODO` in each route.
- `legacy-site/` is the original WordPress install, kept on disk for reference and excluded from git.
