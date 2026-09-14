# Blockchain Colombo — WordPress Site


## 1. What this project is

This is a **stock WordPress 6.1.1 core install** with one custom theme doing all the work. There is no build tooling (no `package.json`, no webpack/gulp config), no headless API layer, and no JS framework — it's classic PHP template files + jQuery + Sass compiled to CSS ahead of time.

- **CMS**: WordPress 6.1.1 (core files: `wp-admin/`, `wp-includes/`, root `wp-*.php` — untouched core, ignore these for the migration)
- **Active theme**: `wp-content/themes/theme-block-chain` (this is 95% of what matters)
- **Custom fields**: Advanced Custom Fields **PRO** v5.7.11 (`wp-content/plugins/advanced-custom-fields-pro`)
- **DB**: MySQL, table prefix `wp_block_chain_`, db name `u732085774_blockchian` (see `wp-config.php`)
- **No `WP_HOME`/`WP_SITEURL`** defined in `wp-config.php` — the site URL is stored in `wp_options` in the database, not in code.
- A Duplicator backup of the whole site (files + a `database.sql` dump) sits in `wp-content/backups-dup-lite/tmp/` — **this is the only place the live database content exists locally**. If you need actual production data (options, ACF values, media library rows) for the migration, restore/inspect this SQL dump; nothing here talks to a live DB.

## 2. Repo structure (top level)

```
_blockchaincolombo/
├── wp-admin/, wp-includes/, wp-*.php   # WordPress core — do not touch, irrelevant to migration
├── wp-config.php                       # DB credentials, table prefix
├── wp-content/
│   ├── themes/
│   │   ├── theme-block-chain/          # ← THE ACTUAL SITE (see §3)
│   │   └── twentytwentythree/          # default WP theme, installed but INACTIVE, ignore
│   ├── plugins/
│   │   ├── advanced-custom-fields-pro/         # ACF Pro 5.7.11 — powers all "options page" content
│   │   ├── acf-gallery/, acf-repeater/         # ACF field-type add-ons (repeater is core in ACF5, likely legacy)
│   │   ├── advanced-custom-fields-nav-menu-field/
│   │   ├── akismet/                            # comment spam filter, irrelevant (no comments used)
│   │   ├── duplicator/                         # produced the backup in backups-dup-lite/
│   │   └── hello.php                           # WP's default "Hello Dolly", noise
│   ├── uploads/                         # media library, only ~18 files (2022/03 through 2022/12) — most images are theme-bundled instead, see §3.5
│   └── backups-dup-lite/                # full-site + DB backup from 2022-12-15 (see §1)
```

## 3. The theme: `theme-block-chain`

This is a hand-built (non-block, non-FSE) classic PHP theme, originally scaffolded from Underscores/Twenty Nineteen boilerplate comments but fully custom since. **Every visible page on the site is a plain PHP file with hardcoded HTML** — there is no `page.php`/`single.php` WordPress loop rendering post content; each "page" is its own WordPress **Page Template** file selected per-page in wp-admin.

### 3.1 Page templates → routes

Each file below is a full-page template (has a `Template Name:` header WordPress reads), assigned to a WP Page in the admin. This is your route map for the Next.js rewrite:

| Template file | `Template Name` | Approximate route | Notes |
|---|---|---|---|
| `home-page.php` | Home Page | `/` | Hero slider + "What we do" / purpose / stats sections |
| `who-we-are.php` | Who We Are | `/who-we-are` | Intro + Board members grid |
| `our-members.php` | Our Members | `/our-members` | Member logos grid + membership-types teaser |
| `membership-types.php` | Membership Types | `/membership-types` | Pricing/benefits tiers (static content, LKR pricing) |
| `contact-us.php` | Contact Us | `/contact-us` | Two static `<form>`s (no real submit handler, see §3.4) |
| `news.php` | News | `/news` | Static "news" list + "media releases" carousel |
| `blog.php` | Blog | `/blog` | Static blog teaser list (not wired to WP posts) |
| `scam-alerts.php` | Scam Alerts | `/scam-alerts` | Longest template (363 lines), scam-reporting content |
| `index.php` | (fallback) | — | Generic WP fallback template, minimal |

Shared partials, included by every template via `get_header()` / `get_footer()`:
- `header.php` — `<head>`, logo, main nav (`wp_nav_menu`), header CTA button, then includes `inc/main-slider.php`
- `footer.php` — footer contact table, a newsletter/contact `<form>`, back-to-top, then includes `inc/svg-compact.php` and loads JS bundles

### 3.2 Important: most page content is static HTML, not CMS-driven

This is the single most important fact for scoping the migration. Reading through every template shows:
- Team/member lists, pricing tiers, news items, blog teasers, and scam-alert copy are **all typed directly into the PHP files as literal HTML**, not pulled from WP posts, custom post types, or ACF repeaters.
- Leftover copy from the template this was cloned from is still present in places (e.g. `membership-types.php` says "Blockchain Australia" instead of "Blockchain Colombo/Sri Lanka") — a sign this was adapted from another Adderbree client site and not fully cleaned up.
- The News/Blog/Media-Releases "carousels" repeat the **exact same placeholder text block** 3–5 times (copy-pasted, not looped).
- `our-members.php` loops `for ($i=0; $i < 6; $i++)` over one hardcoded blurb — i.e. even the "loop" is faking dynamic content by repeating static markup 6 times.

**Implication for Next.js**: you will largely be **re-typesetting static content into React components / MDX / a small JSON or CMS dataset**, not building a complex data-fetching layer. Decide up front whether real dynamic content (news posts, member directory) is in scope for v1 or whether you're shipping a static rebuild of what exists today.

### 3.3 What *is* dynamic (via ACF)

Global/site-wide settings are real ACF **Options Page** fields (`acf_add_options_page()` in `functions.php`), edited under a "Theme settings" admin menu with sub-pages: Home page, Contact / Social, Header, Footer. Fields referenced in code (`get_field(..., 'option')`):

- `main_logo`, `site_favicon` — branding
- `header_contact_button` (link: url/target/title) — header CTA
- `social_group` (`sme_fb`, `sme_tw`, `sme_insta`, `sme_ytb`, `sme_link`) — social links
- `con_address`, `coordinates`, `email_rep` (repeater), `mobile_phone_numbers` (repeater), `general_telephone_numbers` (repeater), `fax_numbers` (repeater), `footer_company_name`, `business_locations` — contact info block
- `rep_verify` (repeater: comment/script/position) — raw GTM/tracking script injection by position (header/body/footer)
- `google_search_console`, `bing_webmaster_tools`, `pinterest_verification`, `sitemap_xml`, `image_sitemap_xml`, `video_sitemap_xml`, `search_console_file` — SEO/webmaster verification, written out as literal `.xml` files at site root via `save_xml_sitemaps()`
- `seo_data` (per-page ACF field group, not options: `seo_title`, `seo_meta_desc`, `seo_meta_key`, `og_title`, `og_description`, `og_image`, `seo_noindex`, `seo_nofollow`, `seo_canonical_link`, `en_schema`, `schema_code`, `sch_position`) — per-page SEO meta, read in `classes/class-core.php::get_meta_data()`
- `main_slider_images` (repeater on the Home page, read in `inc/main-slider.php`): `desktop_image`, `ipad_image`, `mobile_image`, `video`, `slide_title`, `slide_desc`, `link`

**None of these ACF field groups are exported as JSON in the repo** (no `acf-json/` folder) — their schema only exists as rows in the WordPress database (or can be reverse-engineered from the `get_field()` calls above, plus whatever you find in `wp-content/backups-dup-lite/tmp/*_database.sql`). Also present but **currently unused / dead code**: `functions.php` has two AJAX handlers (`filter_form`, `filter_country`) written for a WooCommerce-style product/tyre finder and a "find your supplier" map — they reference ACF fields (`flexi_components`, `tyre_category`, `suppliers`, etc.) that don't exist anywhere in this theme's actual templates. This looks like it was copy-pasted from a different Adderbree project and never removed. **Skip this when migrating.**

### 3.4 Forms

Both forms in `contact-us.php` (membership enquiry, general enquiry) and the footer newsletter form in `footer.php` are **plain HTML forms with no `name` attributes on most inputs, empty/undefined `action`, and no real submit handling**. Contact Form 7 is installed as a dependency (`functions.php` explicitly enqueues/dequeues `contact-form-7` scripts/styles per-page) but templates don't actually render a `[contact-form-7]` shortcode anywhere active — it's commented out in `footer.php` (`//echo do_shortcode(...)`). **Treat all forms as needing to be rebuilt from scratch** (e.g., React Hook Form + shadcn `Form` + a real submit endpoint) — there's no working submission logic to preserve.

### 3.5 Assets

```
theme-block-chain/
├── style.css              # WP theme header (name/version/etc.) — mostly empty, real styles are in sass/
├── sass/                  # Source SCSS, compiled to committed .min.css (no build step in repo — compiled output is checked in)
│   ├── home.scss → home.css/.min.css      # homepage-only styles, loaded only on is_front_page()
│   ├── components/all-compo.scss → all-compo.min.css   # shared styles for every non-home page
│   ├── header/site-header.scss → .min.css # loaded on every page, in <head>, before everything else
│   ├── base/, layout/, buttons-links/, form-styles/, footer/, blog/, variables/, mixins/, functions/
│   └── third-party/        # vendored/customized SCSS for Fancybox, Bootstrap (customized), Select2, jquery.timepicker, jquery.mCustomScrollbar, "sm-simple" (SmartMenus theme)
├── js/
│   ├── home.js / home.min.js              # homepage-specific behavior
│   ├── home-libs.js / .min.js             # homepage-specific vendor bundle
│   ├── scripts.js / scripts.min.js        # site-wide behavior (all non-home pages)
│   ├── scripts-libs.js / .min.js          # site-wide vendor bundle (10k+ lines — jQuery + everything below, concatenated)
│   └── vendors/            # unminified vendor sources referenced by the bundles above:
│       TweenMax.min.js (GSAP2), jquery-ui.min.js, jquery.fancybox.min.js (lightbox),
│       jquery.smartmenus.min.js (dropdown nav), jquery.timepicker.js, jquery.waypoints.min.js,
│       jquery.zoom.min.js (image zoom), masonry.pkgd.min.js, parallax.min.js,
│       select2.full.min.js (styled <select>), toolbar.js, utils.js
│       (Owl Carousel is also used — `owl-carousel` classes throughout templates — but bundled
│        directly inside home-libs.js/scripts-libs.js rather than shipped as a separate vendor file)
├── images/, fonts/ (HelveticaNeueLTProRoman.woff), videos/ (earth.mov hero video, unused? check home-page.php)
├── inc/
│   ├── main-slider.php    # renders the ACF-driven home/page hero slider markup (see §3.3)
│   ├── follow-us.php      # small social-icons partial
│   └── svg-compact.php    # one giant inline <svg><symbol> sprite sheet, included once in footer.php, referenced everywhere via <use xlink:href="#icon-name">
├── classes/class-core.php # `Default_core` class: SEO meta tags, favicon, GTM injection, schema.org JSON-LD, contact-info getters, social-links getter, breadcrumb builder
├── template-parts/content/
│   ├── blog-content-sidebar.php  # thin/likely-unused partial
│   └── content-none.php          # thin/likely-unused partial
├── template-parts.zip     # STRAY FILE — a zip sitting in the theme folder, not referenced by any code. Ignore/delete.
└── backup/                 # a near-complete DUPLICATE of the entire theme (its own sass/, js/, images/, templates...).
                             # Not loaded by WordPress (WP only loads the active theme's root files). Almost certainly
                             # an in-place "just in case" copy someone made before editing. Ignore entirely — do not
                             # treat backup/ as a second source of truth; if root and backup/ ever differ, root wins
                             # (it's what's actually served).
```

Key point: there is **no Sass/JS build pipeline in this repo** — `.scss` sources and their compiled `.min.css`/`.css.map` are committed side by side, and someone runs a compiler locally (Gulp/Laravel Mix-era workflow judging by structure) whenever they edit styles. You will not find the tool config; only the SCSS source and pre-built output exist.

### 3.6 `functions.php` — what it actually sets up

`wp-content/themes/theme-block-chain/functions.php` (~1075 lines) is a grab-bag of theme setup and site-wide tweaks. The parts relevant to understanding site behavior:

- Registers one nav menu location: `main-menu` (rendered in `header.php`)
- Registers one widget area: `sidebar-1` ("Footer") — but the footer isn't actually rendering a dynamic sidebar in `footer.php`, so likely unused
- ACF options pages setup (see §3.3)
- Custom upload MIME types (`xml`, `mp4`, `swf`, `svg`, `html`)
- SEO/perf housekeeping: strips emoji scripts, dequeues Gutenberg block-library CSS, removes RSS feeds entirely (visiting any feed URL calls `wp_die`), removes WLW manifest link, adds `rel=preload` to stylesheet tags, conditionally loads Contact Form 7 assets only on non-front pages
- An HTML-minification output buffer class (`FLHM_HTML_Compression`) — **defined but its hook (`add_action('get_header', 'flhm_wp_html_compression_start')`) is commented out**, so it's currently inactive
- `pagination_array()` / `wpex_pagination()` / `pagination_nav()` — three different hand-rolled pagination helpers, none of which appear to be called from any current template (no paginated loop exists in the static pages) — likely dead/legacy code
- The `filter_form()` / `filter_country()` AJAX handlers mentioned in §3.3 — dead code from a different project
- `create_tag_taxonomies()` registers a `tag` taxonomy on a `research` post type that doesn't exist in this theme — more leftover/dead code

### 3.7 Third-party plugins actually relevant to front-end output

| Plugin | Role | Migration relevance |
|---|---|---|
| Advanced Custom Fields PRO | Powers every dynamic field described in §3.3 | You need the field data (values), not the plugin — export via WP REST/ACF-to-REST, WPGraphQL+ACF, or a one-off DB export script when building the Next.js data source |
| acf-repeater, acf-gallery | Extra ACF field types used by some of the repeater fields above | Same as above — just affects how source data is shaped |
| advanced-custom-fields-nav-menu-field | Lets ACF fields be attached to nav menu items (icons/extra links in the header nav?) | Check if `main-menu` items use this before assuming plain menu links |
| Duplicator | Backup/migration tool, produced `wp-content/backups-dup-lite/` | Not part of the live site; just your source of truth for existing DB content |
| Akismet, Hello Dolly | WP defaults, no front-end effect | Ignore |
| Contact Form 7 | Referenced in `functions.php` enqueue logic | **Plugin folder is not present in `wp-content/plugins/`** despite being referenced — it's either missing from this checkout or was deactivated; forms don't work regardless (see §3.4) |

## 4. Migrating to Next.js + shadcn/ui — what to carry over and how

### 4.1 Content strategy (decide this first)
Given §3.2, you have two honest options:
1. **Static rebuild** — copy the current copy/content directly into React components or MDX/JSON data files. Fastest path to parity; no CMS needed at all post-migration. Recommended if there's no near-term plan to let non-developers edit content.
2. **Headless WordPress** — keep WordPress + ACF only as a content backend, fetch via WP REST API (`/wp-json/wp/v2/...`) or WPGraphQL + WPGraphQL for ACF, and render in Next.js (SSG/ISR via `generateStaticParams`/`revalidate`). Worth it only if the client actually edits content in wp-admin today — confirm this with them, because right now most of the "content" is hardcoded in PHP, which suggests wp-admin editing isn't really happening for page bodies (only for the Options-page fields in §3.3).

Either way, the **Options-page data (branding, social links, contact info, SEO defaults, GTM scripts, slider images)** is genuinely admin-managed and is the strongest candidate for staying in a CMS (WordPress ACF, or move it to Sanity/Payload/a simple settings table) rather than hardcoding.

### 4.2 Route → page component mapping
Use the table in §3.1 directly as your Next.js App Router structure:
```
app/
├── page.tsx                 # home-page.php
├── who-we-are/page.tsx
├── our-members/page.tsx
├── membership-types/page.tsx
├── contact-us/page.tsx
├── news/page.tsx
├── blog/page.tsx
├── scam-alerts/page.tsx
├── layout.tsx                # header.php + footer.php equivalent
└── components/
    ├── site-header.tsx        # nav, logo, CTA — replace SmartMenus dropdown with shadcn NavigationMenu
    ├── site-footer.tsx         # contact table, newsletter form
    ├── hero-slider.tsx         # replaces inc/main-slider.php + Owl Carousel — use Embla Carousel (shadcn's Carousel is built on Embla) or Swiper
    ├── icon-sprite / lucide icons  # replace inc/svg-compact.php's custom <svg><symbol> sheet with lucide-react or kept-as-is SVG components
    └── ...
```

### 4.3 Styling
- The current design system is bespoke BEM-ish SCSS (`.hm-what-we-do`, `.column-wrapper`, `.btn.btn-type-3`, etc.) with hand-rolled buttons (`btn-type-1` through `btn-type-4` at least), a customized Bootstrap grid (`sass/third-party/custom-bootstrap.scss`), and SmartMenus for the nav.
- For shadcn/ui migration: plan to **re-implement the button variants as shadcn `Button` variants** (map `btn-type-1..4` to `variant`/`className` combos), replace the custom grid with Tailwind's grid/flex utilities, and replace `sass/variables/_variables.scss` (colors, spacing, breakpoints) with `tailwind.config` theme tokens. Pull the actual color/font values out of `sass/variables/_variables.scss` and `sass/fonts/fonts.scss` before starting component work.
- Fonts: custom `HelveticaNeueLTProRoman.woff` (licensed font, in `fonts/`) plus Google Fonts **Jost**, **Poppins**, **Roboto** (loaded in `header.php`). Carry the Google Fonts over via `next/font/google`; confirm licensing on the Helvetica woff before reusing it.

### 4.4 JS behaviors to replace (not port as jQuery)
| Current (jQuery-era) | Used for | Suggested Next.js/React + shadcn equivalent |
|---|---|---|
| Owl Carousel (bundled in `-libs.js`) | Hero slider, news/media-release carousels, product-ish sliders | shadcn `Carousel` (Embla-based) |
| SmartMenus (`jquery.smartmenus.min.js`) | Header dropdown nav | shadcn `NavigationMenu` |
| Fancybox (`jquery.fancybox.min.js`) | Lightbox/video popups | shadcn `Dialog` or a lib like `yet-another-react-lightbox` |
| Select2 | Styled `<select>` in enquiry forms | shadcn `Select` |
| jquery.timepicker | (no template currently visibly uses it — verify before porting) | shadcn/Radix time input if actually needed |
| TweenMax (GSAP 2) — parallax mousemove effect in `footer.php` inline script | Home "how we work" section parallax | GSAP 3 (`gsap` npm package) directly in a client component, or drop for a CSS-only effect |
| Masonry.js | (verify actual usage — not obviously called from any template read) | CSS Grid, or `react-masonry-css` if truly needed |
| Custom lazy-load (`data-src` attributes, IntersectionObserver in `footer.php`) | Image lazy loading | Native Next.js `<Image>` (built-in lazy loading, `sizes`/`srcSet`) |
| Inline `<svg><symbol>` sprite (`inc/svg-compact.php`) | All icons site-wide | Either keep as one imported SVG sprite component, or migrate icon-by-icon to `lucide-react` (shadcn's default icon set) |

### 4.5 SEO/meta
Port the logic in `classes/class-core.php::get_meta_data()` and `get_schema()` to Next.js's `generateMetadata()` per route: title, meta description/keywords, Open Graph tags, Twitter card, canonical URL, robots (noindex/nofollow), and JSON-LD schema injection. If you keep ACF/WordPress as a data source, fetch `seo_data` per page; if going fully static, hardcode the equivalent per-route metadata object.

### 4.6 Things you can safely drop entirely
- `wp-content/themes/theme-block-chain/backup/` (full duplicate, unused — §3.5)
- `template-parts.zip` (stray file)
- The WooCommerce/tyre-finder/find-a-supplier AJAX code in `functions.php` (`filter_form`, `filter_country`, `mytheme_add_woocommerce_support`) — no matching templates exist
- `create_tag_taxonomies()` (registers taxonomy on a nonexistent `research` post type)
- The three unused pagination helper functions and `FLHM_HTML_Compression` (its hook is already disabled)
- Akismet, Hello Dolly, Duplicator — WP-admin conveniences with no front-end footprint

### 4.7 Forms — build fresh
Since no current form actually submits anywhere real (§3.4), design the new contact/enquiry/newsletter forms from scratch: React Hook Form + Zod validation + shadcn `Form`/`Input`/`Textarea`/`Select`/`Button` components, posting to a real API route (Next.js Route Handler) or a service (Formspree, Resend, etc.) — there is no legacy submit behavior you need to preserve.

## 5. Open questions to confirm with the client/stakeholder before/while migrating
- Is any content actually edited via wp-admin today (news items, member list, blog posts), or is it always a developer editing the PHP files directly? This determines whether you need a CMS at all post-migration.
- Do the `main_slider_images`, contact info, and social links ACF Options-page values reflect current real content, or are they stale (given the "Blockchain Australia" leftover text found in `membership-types.php`, verify all copy before treating it as final)?
- Is Contact Form 7 supposed to be active (plugin missing from this checkout) or was it intentionally removed in favor of the plain `<form>` markup?
- Confirm the license status of `HelveticaNeueLTProRoman.woff` before reusing it in the rebuild.
