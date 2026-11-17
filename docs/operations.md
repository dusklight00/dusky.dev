# Operations

## Requirements

- Node.js 24 (`engines.node: "24.x"` in `package.json`, which Vercel uses; newer versions work locally)
- pnpm 10 (`packageManager: pnpm@10.26.0` in `package.json`)

## Run, check, build

| Command | What it does |
| --- | --- |
| `pnpm install` | Install dependencies |
| `pnpm dev` | Dev server on http://localhost:3000 |
| `pnpm build` | Production build (all routes prerendered) |
| `pnpm start` | Serve the build (default :3000; `pnpm start -p 3100` for the test port) |
| `pnpm typecheck` | `tsc --noEmit` (includes `e2e/`) |
| `pnpm lint` | ESLint (`eslint-config-next` core-web-vitals + typescript) |
| `pnpm test:e2e` | Playwright, desktop (1440x900) + mobile (Pixel 7) projects |

### End-to-end tests

- `playwright.config.ts` serves on port `PORT` (default **3100**). If a server already listens there it is
  reused (outside CI); otherwise the config runs `pnpm build && pnpm start -p 3100` itself.
- Browser: `/usr/bin/chromium` when it exists (override with `PW_CHROMIUM_PATH`); otherwise run
  `pnpm exec playwright install chromium` once.
- `CHECK_EXTERNAL_LINKS=1` enables the test that requests every external URL on the page (off by default).
- Specs: `navigation`, `theme`, `interactions`, `keyboard`, `seo`, `intro`, `layout-audit` (overflow, console
  errors, tap targets at 6 viewport sizes, light + dark).
- The config pre-sets the `intro_seen` cookie so tests skip the loading screen; `intro.spec.ts` clears it.

## Environment variables

None are required for local development. No `.env` file is used (`.env*` is git-ignored).

| Name | Used in | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `src/lib/site.ts` | Absolute site URL for metadata, robots and sitemap. **Set for production.** |
| `VERCEL_PROJECT_PRODUCTION_URL` | `src/lib/site.ts` | Set by Vercel; fallback when the above is unset |
| `PORT` | `playwright.config.ts` | Test server port (default 3100) |
| `PW_CHROMIUM_PATH` | `playwright.config.ts` | Chromium binary for tests |
| `CHECK_EXTERNAL_LINKS` | `e2e/seo.spec.ts` | Opt-in external link check |
| `CI` | `playwright.config.ts` | Retries, `forbidOnly`, no server reuse |

## Deploy

Vercel (project `dusklight00`) via its Git integration: every push to `main` deploys to production,
other branches get preview deployments. No CI workflows.

`vercel.json` pins the Next.js preset, pnpm and the `.next` output, overriding any stale dashboard
settings left from the previous Vite site. Set `NEXT_PUBLIC_SITE_URL` in the Vercel project's environment
variables (otherwise the production domain from `VERCEL_PROJECT_PRODUCTION_URL` is used).

## Updating content

- Text, roles, projects, awards: `src/data/portfolio.ts`.
- Profile photo: `public/images/` (use a new file name, see the image-cache gotcha in `CLAUDE.md`), then
  update `profile.avatar`.
- Resume: replace `public/Rahul-Raj-Resume.pdf` (path in `profile.resume`).

## Troubleshooting

| Symptom | Cause / fix |
| --- | --- |
| Old photo still shows after replacing the file | Image optimiser cache keyed by URL: rename the file or delete `.next/cache/images` |
| "Activity unavailable" card | GitHub contributions API failed at build/revalidation; it is retried within minutes |
| Canonical/OG URLs point at localhost | `NEXT_PUBLIC_SITE_URL` not set at build time |
| Loading screen never shows while testing manually | It plays once per browser session: clear the `intro_seen` cookie or use a private window |
| Vercel deploy fails in seconds with "invalid or discontinued Node.js Version" | The project setting is still 18.x from the old site; `engines.node` in `package.json` overrides it, so keep that field |
| `pnpm test:e2e` starts a fresh build | Nothing was listening on :3100; start `pnpm start -p 3100` first to reuse it |
