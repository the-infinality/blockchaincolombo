import { redirect } from "next/navigation";

// The site is now a single page (app/page.tsx) — this route only exists so
// old bookmarks/external links to /our-members still land in the right place.
export default function OurMembersRedirect() {
  redirect("/#our-members");
}
