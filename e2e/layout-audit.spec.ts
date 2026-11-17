import { expect, test, type Page } from "@playwright/test";

/**
 * Layout audit: runs every page at the supported viewports and fails on
 * horizontal overflow, console errors, undersized interactive targets and a
 * sticky identity column that does not fit the viewport.
 */

const VIEWPORTS = [
  { width: 1440, height: 900 },
  { width: 1280, height: 720 },
  { width: 1024, height: 768 },
  { width: 768, height: 1024 },
  { width: 390, height: 844 },
  { width: 360, height: 740 },
] as const;

const PAGES = [
  { path: "/", status: 200 },
  { path: "/this-page-does-not-exist", status: 404 },
] as const;

/** WCAG 2.2 target size (minimum), AA. */
const MIN_TARGET = 24;

/** Scroll through the page so every whileInView entrance has rendered. */
async function scrollThrough(page: Page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = Math.round((page.viewportSize()?.height ?? 800) * 0.7);
  for (let y = 0; y <= height; y += step) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
    await page.waitForTimeout(40);
  }
}

test.describe("layout audit", () => {
  for (const { path, status } of PAGES) {
    for (const vp of VIEWPORTS) {
      for (const theme of ["light", "dark"] as const) {
        test(`${path} @ ${vp.width}x${vp.height} ${theme}`, async ({ page }) => {
          // Viewports are set explicitly, so one browser project is enough.
          test.skip(test.info().project.name !== "desktop", "viewport loop runs in the desktop project");
          await page.setViewportSize(vp);
          await page.emulateMedia({ colorScheme: theme });
          await page.addInitScript((t) => window.localStorage.setItem("theme", t), theme);

          const errors: string[] = [];
          page.on("pageerror", (e) => errors.push(e.message));
          page.on("console", (m) => {
            if (m.type() !== "error") return;
            // The 404 page's own document response is logged as a failed resource.
            if (status === 404 && /status of 404/.test(m.text())) return;
            errors.push(m.text());
          });

          const res = await page.goto(path, { waitUntil: "networkidle" });
          expect(res?.status()).toBe(status);
          await scrollThrough(page);

          const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
          expect(overflow, "horizontal page overflow (px)").toBeLessThanOrEqual(0);

          const small = await page.evaluate((min) => {
            const out: string[] = [];
            for (const el of document.querySelectorAll<HTMLElement>("a[href], button, [role=button], input, select, textarea, summary")) {
              if (el.closest(".sr-only") || el.matches(".sr-only")) continue;
              const cs = getComputedStyle(el);
              if (cs.visibility === "hidden" || cs.display === "none") continue;
              const r = el.getBoundingClientRect();
              if (r.width === 0 && r.height === 0) continue;
              // WCAG exempts links inside a sentence.
              if (cs.display === "inline" && el.parentElement?.closest("p, li")) continue;
              // A pseudo-element may enlarge the hit area (e.g. `after:-inset-1`).
              const after = getComputedStyle(el, "::after");
              const grow = after.content !== "none" && after.position === "absolute" ? Math.max(0, -parseFloat(after.left) || 0) * 2 : 0;
              if (r.width + grow < min || r.height + grow < min) {
                const label = (el.getAttribute("aria-label") ?? el.textContent ?? "").trim().slice(0, 40);
                out.push(`${el.tagName.toLowerCase()} "${label}" ${Math.round(r.width)}x${Math.round(r.height)}`);
              }
            }
            return out;
          }, MIN_TARGET);
          expect(small, `interactive targets smaller than ${MIN_TARGET}px`).toEqual([]);

          if (path === "/" && vp.width >= 1024) {
            // The sticky identity column must show its last line (local clock) once stuck.
            await page.evaluate(() => window.scrollTo({ top: 1600, behavior: "instant" }));
            await page.waitForTimeout(100);
            const box = await page.locator("main aside").evaluate((el) => {
              const r = el.getBoundingClientRect();
              return { top: r.top, bottom: r.bottom };
            });
            expect(box.bottom, "identity column clipped at the bottom").toBeLessThanOrEqual(vp.height);
            expect(box.top, "identity column hidden under the header").toBeGreaterThanOrEqual(64);
          }

          expect(errors, "console errors").toEqual([]);
        });
      }
    }
  }
});
