# Decisions

Newest first. Short "what and why".

## Intro loading screen, once per session
Reuses the hexagon + "R" logo from the previous site (`main-old`), restyled with the dusk gradient, in the
spirit of v4.brittanychiang.com's loader. It plays only on the first visit in a browser session (session
cookie) so returning visitors aren't made to wait, and never with reduced motion or without JS.

## Handle as wordmark, domain kept off the page
The header logo is the handle (`dusklight00`), not the name (the hero already shows the name) and not the
domain. The domain only lives in the `NEXT_PUBLIC_SITE_URL` env var for metadata.

## No serif / italic type
An italic serif accent was removed because it read as a generic AI-generated portfolio. Type is now
Bricolage Grotesque (display), Geist (body) and Geist Mono (labels).

## Cached GitHub activity rendered outside Suspense
`GithubActivity` uses `"use cache"` + `cacheLife("days")` and is not wrapped in `<Suspense>`, so the heatmap
is part of the static HTML (readable without JS) instead of a streamed chunk.

## `<noscript>` override for motion
`motion` renders entrance `initial` states inline. Rather than dropping entrance animations, a noscript
style forces those elements visible when JS is disabled.

## Static site with Cache Components
Everything is prerendered; the only external data (GitHub contributions, OG fonts) is cached at build and
revalidated. No server work per request.

## Design direction "dusk"
Studied two reference portfolios (yashiscool.vercel.app and ryanaque.com) from their live CSS/JS, since their
source isn't public. Kept the patterns (warm paper background, sticky identity column, blur-fade entrances,
marker highlights, one easing curve, generated project covers) and replaced their identity with our own
motif: a sunset gradient and a horizon line with a half-set sun.

## Rewrite from Vite + Chakra to Next.js
The previous Vite/React/Chakra site (still on `main`) had placeholder content. The `nextjs-portfolio`
branch is a from-scratch rebuild with all content taken from the CV.
