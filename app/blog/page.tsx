import { redirect } from "next/navigation";

// The site is now a single page (app/page.tsx) — this route only exists so
// old bookmarks/external links to /blog still land in the right place.
export default function BlogRedirect() {
  redirect("/#blog");
}
