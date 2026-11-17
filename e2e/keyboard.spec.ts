import { expect, test } from "@playwright/test";

type Stop = {
  desc: string;
  region: "header" | "main" | "footer" | "other";
  visibleFocus: boolean;
  onScreen: boolean;
  docIndex: number;
};

test.describe("keyboard-only", () => {
  test.skip(({ isMobile }) => isMobile, "keyboard flow is a desktop concern");

  test("Tab walks the page in DOM order, with a visible focus ring on every stop and no trap", async ({ page }) => {
    await page.goto("/");
    // no positive tabindex anywhere (would break the natural order)
    expect(await page.locator("[tabindex]:not([tabindex='0']):not([tabindex^='-'])").count()).toBe(0);

    const stops: Stop[] = [];
    for (let i = 0; i < 150; i++) {
      await page.keyboard.press("Tab");
      const stop = await page.evaluate(async (): Promise<Stop | null> => {
        const el = document.activeElement as HTMLElement | null;
        if (!el || el === document.body) return null;
        // html has scroll-behavior: smooth, so give the focus scroll up to ~1s to bring it on screen
        const inView = () => {
          const r = el.getBoundingClientRect();
          return r.bottom > 0 && r.top < window.innerHeight;
        };
        for (let f = 0; f < 60 && !inView(); f++) await new Promise((res) => requestAnimationFrame(res));
        const all = [...document.querySelectorAll("*")];
        // Focus ring = outline/box-shadow on the element or its ::after (project cards stretch their
        // link via ::after). Compare focused vs blurred so a resting shadow doesn't count as a ring.
        const ring = () =>
          [getComputedStyle(el), getComputedStyle(el, "::after")]
            .map((s) => `${s.outlineStyle} ${s.outlineWidth} ${s.outlineColor} | ${s.boxShadow}`)
            .join(" || ");
        const focused = ring();
        el.blur();
        const blurred = ring();
        el.focus({ preventScroll: true });
        const r = el.getBoundingClientRect();
        return {
          desc: `${el.tagName.toLowerCase()} "${(el.getAttribute("aria-label") ?? el.textContent ?? "").trim().slice(0, 40)}"`,
          region: el.closest("header") ? "header" : el.closest("main") ? "main" : el.closest("footer") ? "footer" : "other",
          visibleFocus: focused !== blurred,
          onScreen: r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < window.innerHeight,
          docIndex: all.indexOf(el),
        };
      });
      if (!stop) break; // focus left the document: wrapped past the last element
      if (stops.length && stop.docIndex <= stops[stops.length - 1].docIndex) break; // wrapped
      stops.push(stop);
    }

    expect(stops.length).toBeGreaterThan(20);
    // reached the end of the page: no keyboard trap
    expect(stops.at(-1)!.region).toBe("footer");
    // order: header -> main -> footer
    const regions = stops.map((s) => s.region).filter((r, i, a) => r !== a[i - 1]);
    expect(regions).toEqual(["other", "header", "main", "footer"]); // "other" = the skip link
    expect(stops.filter((s) => !s.visibleFocus).map((s) => s.desc), "stops without a visible focus ring").toEqual([]);
    expect(stops.filter((s) => !s.onScreen).map((s) => s.desc), "focused but off-screen / hidden").toEqual([]);
  });

  test("the GitHub heatmap is reachable by Tab", async ({ page }) => {
    await page.goto("/#skills");
    const region = page.getByRole("region", { name: /contribution calendar/i });
    test.skip((await region.count()) === 0, "contributions API unavailable; fallback rendered");
    for (let i = 0; i < 80; i++) {
      await page.keyboard.press("Tab");
      if (await region.evaluate((el) => el === document.activeElement)) break;
    }
    await expect(region).toBeFocused();
  });
});
