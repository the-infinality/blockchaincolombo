export type NavItem = {
  label: string;
  href: string;
};

// Ported 1:1 from the live "Desktop Menu" (WordPress nav_menu term_id 27,
// assigned to the theme's `main-menu` location) — see wp_block_chain_posts
// post_type=nav_menu_item, ordered by menu_order. The site is now a single
// page (app/page.tsx), so every entry is an in-page anchor to a matching
// `<section id="...">` rather than a separate route — see
// components/site-header.tsx and components/smooth-scroll-provider.tsx
// for how clicking these smooth-scrolls via Lenis instead of navigating.
export const mainNav: NavItem[] = [
  { label: "Home", href: "#top" },
  { label: "Who We Are", href: "#who-we-are" },
  { label: "Our Members", href: "#our-members" },
  { label: "Membership Types", href: "#membership-types" },
  { label: "News", href: "#news" },
  { label: "Scam Alerts", href: "#scam-alerts" },
  { label: "Blog", href: "#blog" },
  { label: "Contact Us", href: "#contact-us" },
];

// ACF options-page value (options_header_contact_button_contact_link) —
// title was "Contact Us" pointing at a placeholder "#" in the source site.
export const headerCta: NavItem = { label: "Contact Us", href: "#contact-us" };
