import { expect, test } from "@playwright/test";
import { siteUrl } from "../src/lib/site";
import { pngSize, profile } from "./utils";

const TITLE = `${profile.name} · ${profile.role}`;

test.describe("metadata", () => {
  test.skip(({ isMobile }) => isMobile, "viewport-independent");

  test("title, description and social tags", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(TITLE);
    const meta = (sel: string) => page.locator(`head meta[${sel}]`).getAttribute("content");
    const description = await meta('name="description"');
    expect(description).toContain(profile.name);
    expect(description!.length).toBeGreaterThan(50);
    expect(description!.length).toBeLessThan(200);
    expect(await meta('property="og:title"')).toBe(TITLE);
    expect(await meta('property="og:description"')).toBe(description);
    expect(await meta('property="og:type"')).toBe("website");
    expect(await meta('property="og:url"')).toBe(siteUrl);
    expect(await meta('property="og:image"')).toMatch(new RegExp(`^${siteUrl}/opengraph-image`));
    expect(await meta('property="og:image:width"')).toBe("1200");
    expect(await meta('property="og:image:height"')).toBe("630");
    expect(await meta('name="twitter:card"')).toBe("summary_large_image");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator('head link[rel="icon"]')).toHaveAttribute("href", /^\/icon/);
  });

  test("/opengraph-image is a 1200x630 PNG", async ({ request }) => {
    const res = await request.get("/opengraph-image");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toBe("image/png");
    expect(pngSize(await res.body())).toEqual({ width: 1200, height: 630 });
  });

  test("/icon is a PNG favicon", async ({ request }) => {
    const res = await request.get("/icon");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toBe("image/png");
    const { width, height } = pngSize(await res.body());
    expect(width).toBe(height);
    expect(width).toBeGreaterThanOrEqual(32);
  });

  test("404 page has its own title", async ({ page }) => {
    await page.goto("/does-not-exist");
    await expect(page).toHaveTitle(`Page not found · ${profile.name}`);
  });
});

test.describe("links", () => {
  test.skip(({ isMobile }) => isMobile, "viewport-independent");

  test("every external link opens in a new tab with rel=noreferrer", async ({ page, baseURL }) => {
    await page.goto("/");
    const links = await page.locator("a[href]").evaluateAll((as) =>
      as.map((a) => ({
        href: (a as HTMLAnchorElement).href,
        raw: a.getAttribute("href")!,
        target: a.getAttribute("target"),
        rel: a.getAttribute("rel") ?? "",
        text: (a.getAttribute("aria-label") ?? a.textContent ?? "").trim().slice(0, 40),
      })),
    );
    const origin = new URL(baseURL!).origin;
    const external = links.filter((l) => /^https?:/.test(l.href) && new URL(l.href).origin !== origin);
    expect(external.length).toBeGreaterThan(5);
    const bad = external.filter((l) => l.target !== "_blank" || !/\bnoreferrer\b/.test(l.rel));
    expect(bad, "external links missing target/rel").toEqual([]);
    // internal links that open new tabs must be safe as well
    const blankWithoutRel = links.filter((l) => l.target === "_blank" && !/\bnoreferrer\b/.test(l.rel));
    expect(blankWithoutRel).toEqual([]);
    // no javascript:/empty hrefs
    expect(links.filter((l) => l.raw === "" || l.raw === "#" || /^javascript:/i.test(l.raw))).toEqual([]);
    // mailto links point at the profile address
    for (const l of links.filter((x) => x.raw.startsWith("mailto:"))) expect(l.raw).toBe(`mailto:${profile.email}`);
  });

  test("no broken internal links or dangling anchors", async ({ page, request, baseURL }) => {
    await page.goto("/");
    const origin = new URL(baseURL!).origin;
    const hrefs = await page.locator("a[href]").evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).href));
    const internal = [...new Set(hrefs.filter((h) => h.startsWith(origin)))];
    const missingAnchors: string[] = [];
    for (const href of internal) {
      const url = new URL(href);
      // "#top" is special-cased by the HTML spec: it scrolls to the top without a target element.
      if (url.hash && url.hash !== "#top") {
        const exists = await page.evaluate((id) => !!document.getElementById(id), decodeURIComponent(url.hash.slice(1)));
        if (!exists) missingAnchors.push(href);
      }
      const res = await request.get(url.pathname);
      expect(res.status(), `${url.pathname}`).toBe(200);
    }
    expect(missingAnchors).toEqual([]);
  });

  // Opt-in: hits third-party sites. Run with CHECK_EXTERNAL_LINKS=1.
  test("external URLs respond (sequential)", async ({ page, request }) => {
    test.skip(!process.env.CHECK_EXTERNAL_LINKS, "set CHECK_EXTERNAL_LINKS=1 to check third-party URLs");
    test.setTimeout(120_000);
    await page.goto("/");
    const hrefs = await page.locator("a[href^='http']").evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).href));
    const unique = [...new Set(hrefs)].filter((h) => !h.startsWith(new URL(page.url()).origin));
    const failures: string[] = [];
    for (const href of unique) {
      let status = 0;
      try {
        const res = await request.get(href, { maxRedirects: 5, timeout: 15_000, failOnStatusCode: false });
        status = res.status();
      } catch (e) {
        failures.push(`${href} -> ${(e as Error).message.split("\n")[0]}`);
        continue;
      }
      // LinkedIn answers bots with 999; treat it as "exists but blocks automation".
      if (status >= 400 && status !== 999) failures.push(`${href} -> ${status}`);
    }
    expect(failures).toEqual([]);
  });
});
