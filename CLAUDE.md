# Portfolio (Rahul Raj)

Single-page personal portfolio. Next.js 16 App Router (Cache Components), React 19, TypeScript,
Tailwind v4, `motion`, `next-themes`. Fully static output; the only runtime data is a cached GitHub
contributions fetch. Repo is **public**: never put secrets or private details in code or docs.

**Read [AGENTS.md](AGENTS.md) first:** this Next.js version has breaking changes; check
`node_modules/next/dist/docs/` before using a Next API. (`next dev` rewrites AGENTS.md, so it stays separate.)

## Repo map

| Path | What |
| --- | --- |
| `src/data/portfolio.ts` | **All content** (profile, experience, projects, skills, awards). Facts come from the CV; never invent any. |
| `src/app/` | Root layout (fonts, metadata, providers, no-JS fallback), page composition, 404, OG image, icon, robots, sitemap |
| `src/components/sections/` | One file per page section; sub-folders hold their client helpers |
| `src/components/layout/` | Header (nav, mobile menu), footer, theme toggle, sticky aside, providers |
| `src/components/ui/` | Shared primitives: `Section`, `BlurFade`, `Chip`, `Horizon`, `SocialIcon` |
| `src/components/effects/` | Custom cursor |
| `src/components/intro/` | First-visit loading screen (hexagon "R" logo) and `useIntroDone()` |
| `src/lib/` | `cn`, `EASE_DUSK`, `siteUrl` |
| `src/app/globals.css` | Design tokens (light + `.dark`), Tailwind theme mapping, global utilities |
| `e2e/` | Playwright suite (desktop + mobile projects) |
| `docs/` | [architecture](docs/architecture.md) · [operations](docs/operations.md) · [decisions](docs/decisions.md) |

## Commands

```bash
pnpm dev            # http://localhost:3000
pnpm build && pnpm start
pnpm typecheck && pnpm lint
pnpm test:e2e       # reuses a server on :3100 if one runs, else builds + starts it
```

Deploy: push to `main` -> Vercel production (Git integration); other branches get previews. `vercel.json`
pins the Next.js preset. `main-old` holds the previous Vite site.

## Conventions

- Content changes go in `src/data/portfolio.ts` only; components read from it.
- Every main-column section uses `<Section id eyebrow title>`; its `id` must also be listed in
  `SECTION_IDS` in `src/components/layout/site-header.tsx` (nav highlighting).
- Colours come from tokens in `globals.css` (`bg`, `ink`, `muted`, `faint`, `line`, `accent`, `dusk-1..3`, ...);
  no hex values in components. Exception: `opengraph-image.tsx` / `icon.tsx` (Satori can't read CSS variables).
- One easing everywhere: `EASE_DUSK` (JS) / `ease-dusk` (Tailwind). Entrances use `<BlurFade>`.
- Fonts: Bricolage Grotesque (`font-display`) for headings, Geist (`font-sans`), Geist Mono (`font-mono`)
  for labels. No serif/italic text (deliberate, see decisions).
- Server Components by default; `"use client"` only for interaction or motion.
- External links: `target="_blank" rel="noreferrer"` plus sr-only "(opens in a new tab)" (enforced by `e2e/seo.spec.ts`).
- Touch targets at least 44px (`min-h-11`, may shrink to `sm:min-h-9` on desktop); respect reduced motion.
- Comments are English and explain *why* (constraint, gotcha), not what. No commented-out code or change
  notes; longer rationale goes to `docs/decisions.md`; fix or delete stale comments in the same change.

## Gotchas

- `"use cache"` content inside `<Suspense>` streams into a hidden div that only JS reveals. Keep cached
  sections (e.g. `GithubActivity`) outside Suspense so they are in the static HTML.
- `motion` server-renders `initial` states as inline `opacity:0`; the `<noscript>` style in
  `src/app/layout.tsx` keeps the page readable without JS. Keep it when adding motion.
- With Cache Components, `new Date()` during prerender must be inside a `"use cache"` function (see footer year).
- The image optimiser cache is keyed by URL: when replacing a file in `public/images/`, give it a new name
  (or delete `.next/cache/images`), or the old image keeps being served.
- `next/image` `priority` is deprecated in Next 16; use `preload`.
- Entrance animations must wait for the intro: gate them on `useIntroDone()` (BlurFade, Horizon, Marker
  and CountUp already do), or they play hidden behind the overlay.
- The intro plays once per browser session (`intro_seen` cookie). Playwright sets that cookie in
  `playwright.config.ts`; only `e2e/intro.spec.ts` clears it.
- Scroll-triggered entrances mean full-page screenshots look empty unless the page is scrolled through first.
- `NEXT_PUBLIC_SITE_URL` must be set for production builds outside Vercel, or metadata points at localhost.

## Keep docs current

- New/renamed section, route or component folder -> update the repo map here and `docs/architecture.md`.
- New env var, script, port, or deploy/CI change -> `docs/operations.md`.
- Non-obvious design or tech decision -> `docs/decisions.md` (newest first).
- A gotcha that cost time -> the Gotchas list above.
