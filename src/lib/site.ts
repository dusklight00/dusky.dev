/**
 * Absolute site URL, used only for metadata (canonical, Open Graph, sitemap) — never shown on the page.
 * Set NEXT_PUBLIC_SITE_URL to the real domain; on Vercel it falls back to the production domain.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
