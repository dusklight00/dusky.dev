# Rahul Raj · portfolio

Personal portfolio of Rahul Raj (dusklight00), AI & full-stack engineer. A single static page built with
Next.js 16, React 19, Tailwind CSS v4 and `motion`, with light/dark themes and a Playwright test suite.

## Quick start

```bash
pnpm install
pnpm dev            # http://localhost:3000
```

```bash
pnpm build && pnpm start
pnpm typecheck && pnpm lint
pnpm test:e2e       # Playwright (desktop + mobile)
```

## Editing content

All text, roles, projects and awards live in [`src/data/portfolio.ts`](src/data/portfolio.ts). The photo is in
`public/images/` and the downloadable resume is `public/Rahul-Raj-Resume.pdf`.

Before deploying, set `NEXT_PUBLIC_SITE_URL` to the site's address (used for link previews and SEO; it is
not shown on the page).

## Docs

- [CLAUDE.md](CLAUDE.md): repo map, conventions and gotchas
- [docs/architecture.md](docs/architecture.md): how the page is put together, known issues
- [docs/operations.md](docs/operations.md): commands, tests, env vars, deploy, troubleshooting
- [docs/decisions.md](docs/decisions.md): why things are the way they are

## License

[MIT](LICENSE.md)
