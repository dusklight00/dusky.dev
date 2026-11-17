import { expect, test } from "@playwright/test";
import { effectiveOpacity } from "./utils";

const overlay = (page: import("@playwright/test").Page) => page.locator(".intro-overlay");

test.describe("intro loading screen", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test("plays on the first visit, then reveals the page", async ({ page }) => {
    await page.goto("/");
    await expect(overlay(page)).toBeVisible();
    // Page entrances wait for the intro: the name is still hidden behind it.
    expect(await effectiveOpacity(page.getByRole("heading", { level: 1 }))).toBeLessThan(0.01);
    await expect(overlay(page)).toHaveCount(0, { timeout: 5_000 });
    await expect.poll(() => effectiveOpacity(page.getByRole("heading", { level: 1 }))).toBeGreaterThan(0.99);
    // Scroll is unlocked again.
    expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe("");
  });

  test("is skipped on later visits in the same session", async ({ page }) => {
    await page.goto("/");
    await expect(overlay(page)).toHaveCount(0, { timeout: 5_000 });
    await page.reload();
    await expect(overlay(page)).toBeHidden();
    expect(await page.evaluate(() => document.documentElement.dataset.intro)).toBe("skip");
  });

  test.describe("with reduced motion", () => {
    test.use({ reducedMotion: "reduce" });
    test("never shows", async ({ page }) => {
      await page.goto("/");
      await expect(overlay(page)).toBeHidden();
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });
  });
});
