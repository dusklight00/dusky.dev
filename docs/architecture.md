# Architecture

One static page (`/`) plus a 404, generated metadata files and nothing else. No API routes, no database,
no auth. `next build` prerenders everything (`○ Static`).

## Request / render flow

```
src/app/layout.tsx        fonts (next/font: Geist, Geist Mono, Bricolage Grotesque), metadata, viewport colours
 ├─ <noscript> style      reveals motion's server-rendered opacity:0 states when JS is off
 ├─ ThemeProvider          next-themes, class strategy (`.dark` on <html>), default = system
 ├─ MotionProvider         MotionConfig reducedMotion="user"
 ├─ SiteHeader             fixed frosted bar, anchor nav, mobile menu, ThemeToggle, Resume link
 ├─ page / not-found
 ├─ SiteFooter             sign-off, socials, year (cached), back to top
 ├─ CustomCursor           only for (pointer: fine) and no reduced motion
 └─ .grain overlay
```

`src/app/page.tsx`: on `lg+` a two-column grid. Left: `StickyAside` > `Hero` (photo, name, role, horizon
motif, tagline, CTAs, socials, live IST clock). Right, in order: `About` · `Experience` · `Projects` ·
`Skills` · `GithubActivity` · `Community` · `Achievements` · `Contact`. Below `lg` everything stacks.

## Data

- `src/data/portfolio.ts` holds every fact shown on the page (typed `Experience`, `Project`, etc.).
- `GithubActivity` fetches `https://github-contributions-api.jogruber.de/v4/<handle>?y=last` inside a
  `"use cache"` function with `cacheLife("days")` and an 8 s timeout. The payload is validated, deduped and
  gap-filled; on any failure the function throws (so nothing bad is cached) and the section renders an
  "unavailable" card with a link to the GitHub profile.
- `opengraph-image.tsx` fetches font subsets from Google Fonts at build (`cacheLife("max")`), falling back
  to the default font if the fetch fails.
- `siteUrl` (`src/lib/site.ts`) feeds `metadataBase`, canonical, Open Graph URL, robots and sitemap. It is
  never rendered on the page.

## Key patterns

- **Section primitive:** `src/components/ui/section.tsx` renders the eyebrow, title, hairline and
  `aria-labelledby`. Section ids are anchors for the header nav; `SECTION_IDS` in `site-header.tsx`
  must list them in page order (IntersectionObserver band ~40% down the viewport picks the active one).
- **Motion:** `BlurFade` (fade up from blur, once, when 10% visible), `Horizon` (SVG path draw),
  `Marker` (highlighter sweep via the `.marker` / `.is-in` CSS), `CountUp`. All use `EASE_DUSK`.
- **Theme switch:** `ThemeToggle` sets the class itself, then calls `flushSync(setTheme)` inside
  `document.startViewTransition` and animates a circular clip-path; falls back to an instant switch.
- **Sticky aside:** `StickyAside` measures the column and sets `--aside-top` so a column taller than the
  viewport still reveals its bottom; `short-desk` (custom variant in `globals.css`) compacts the hero on
  short desktop screens.
- **Project covers:** no screenshots exist, so `project-cover.tsx` draws a tinted panel, icon, metric and
  a deterministic, seeded SVG motif per slug.

## Known issues (not fixed)

Found during the code audit; these need a decision rather than a mechanical fix. Not a full code review;
use `/code-review` for that.

- `src/lib/site.ts`: without `NEXT_PUBLIC_SITE_URL` (or Vercel's `VERCEL_PROJECT_PRODUCTION_URL`) the
  build silently uses `http://localhost:3000` for canonical/OG/sitemap URLs.
- `src/components/sections/github-activity.tsx`: if the API is down during `next build`, the
  "unavailable" card is baked into the static page; whether it revalidates before the next deploy is
  unconfirmed.
- `src/app/opengraph-image.tsx`: a font-fetch failure at build is cached with `cacheLife("max")`, so the
  OG image keeps the fallback font until the next deploy.
- `src/app/layout.tsx` `themeColor` follows the OS scheme, not the theme chosen with the toggle.
- `src/components/sections/skills.tsx`: the marquee only pauses on mouse hover or reduced motion; there is
  no keyboard/touch pause control (WCAG 2.2.2).
- "Dim siblings on hover" is written four times with drifting values (experience.tsx, community.tsx,
  achievements.tsx, projects/project-grid.tsx); the green "live" ping dot is repeated four times.
- `e2e/layout-audit.spec.ts` uses fixed sleeps and `networkidle`; may flake on slow CI.
- No CI: checks only run locally.
