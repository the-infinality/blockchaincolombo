import type { MetadataRoute } from "next";

// The site is a single page (app/page.tsx) with in-page anchor sections —
// the old per-page routes (see app/who-we-are/page.tsx etc.) are just
// redirect stubs for old bookmarks now, not real pages, so they're left
// out of the sitemap.
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://blockchaincolombo.com";

  return [{ url: baseUrl, lastModified: new Date() }];
}
