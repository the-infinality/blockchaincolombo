import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // When hosting: set NEXT_PUBLIC_SITE_URL to the live domain
  // (e.g. https://blockchaincolombo.com) in the host's environment variables.
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://blockchaincolombo.com";

  return [{ url: baseUrl, lastModified: new Date() }];
}
