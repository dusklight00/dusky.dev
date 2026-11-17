import { expect, test, type Page } from "@playwright/test";
import { themeToggle } from "./utils";

const isDark = (page: Page) => page.evaluate(() => document.documentElement.classList.contains("dark"));
const stored = (page: Page) => page.evaluate(() => localStorage.getItem("theme"));
const bodyBg = (page: Page) => page.evaluate(() => getComputedStyle(document.body).backgroundColor);

test.describe("theme toggle", () => {
  test.use({ colorScheme: "light" });

  test("light -> dark -> light, persisted to localStorage and across reloads", async ({ page }) => {
    await page.goto("/");
    const toggle = themeToggle(page);
    await expect(toggle).toHaveAccessibleName("Switch to dark theme");
    expect(await isDark(page)).toBe(false);
    const lightBg = await bodyBg(page);

    await toggle.click();
    await expect(toggle).toHaveAccessibleName("Switch to light theme");
    await expect.poll(() => isDark(page)).toBe(true);
    await expect.poll(() => stored(page)).toBe("dark");
    await expect.poll(() => bodyBg(page)).not.toBe(lightBg);
    expect(await page.evaluate(() => document.documentElement.style.colorScheme)).toBe("dark");

    await page.reload();
    await expect.poll(() => isDark(page)).toBe(true);
    await expect(themeToggle(page)).toHaveAccessibleName("Switch to light theme");

    await themeToggle(page).click();
    await expect.poll(() => isDark(page)).toBe(false);
    await expect.poll(() => stored(page)).toBe("light");
    await page.reload();
    await expect.poll(() => isDark(page)).toBe(false);
  });

  test("rapid toggling settles on a consistent state", async ({ page }) => {
    await page.goto("/");
    const toggle = themeToggle(page);
    await expect(toggle).toHaveAccessibleName("Switch to dark theme");
    for (let i = 0; i < 7; i++) await toggle.click();
    // odd number of clicks -> dark
    await expect.poll(() => isDark(page)).toBe(true);
    await expect.poll(() => stored(page)).toBe("dark");
    await expect(toggle).toHaveAccessibleName("Switch to light theme");
  });

  test("a stored theme is applied before first paint (no flash)", async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("theme", "dark");
      // Record the theme at the moment the first visible content (<main>) is parsed:
      // if `.dark` is already set then, the user can never see a light frame of the page.
      const w = window as unknown as { __darkWhenMainParsed?: boolean };
      new MutationObserver((_, obs) => {
        if (document.getElementById("content")) {
          w.__darkWhenMainParsed = document.documentElement.classList.contains("dark");
          obs.disconnect();
        }
      }).observe(document, { childList: true, subtree: true });
    });
    await page.goto("/");
    await expect
      .poll(() => page.evaluate(() => (window as unknown as { __darkWhenMainParsed?: boolean }).__darkWhenMainParsed))
      .toBe(true);
  });
});

test.describe("system preference", () => {
  test.describe("dark OS", () => {
    test.use({ colorScheme: "dark" });
    test("first visit follows the OS (dark)", async ({ page }) => {
      await page.goto("/");
      await expect.poll(() => isDark(page)).toBe(true);
      expect(await stored(page)).not.toBe("light");
      await expect(themeToggle(page)).toHaveAccessibleName("Switch to light theme");
    });
  });

  test.describe("light OS", () => {
    test.use({ colorScheme: "light" });
    test("first visit follows the OS (light)", async ({ page }) => {
      await page.goto("/");
      expect(await isDark(page)).toBe(false);
      await expect(themeToggle(page)).toHaveAccessibleName("Switch to dark theme");
    });
  });
});

test.describe("toggle without view transitions", () => {
  test.use({ colorScheme: "light" });

  test("reduced motion: switches instantly without startViewTransition", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce", colorScheme: "light" });
    const page = await context.newPage();
    await page.addInitScript(() => {
      const w = window as unknown as { __vtCalls: number };
      w.__vtCalls = 0;
      const original = document.startViewTransition?.bind(document);
      if (original) {
        document.startViewTransition = ((cb: () => void) => {
          w.__vtCalls++;
          return original(cb);
        }) as typeof document.startViewTransition;
      }
    });
    await page.goto("/");
    await themeToggle(page).click();
    await expect.poll(() => isDark(page)).toBe(true);
    expect(await page.evaluate(() => (window as unknown as { __vtCalls: number }).__vtCalls)).toBe(0);
    await context.close();
  });

  test("browsers without startViewTransition still toggle", async ({ page }) => {
    await page.addInitScript(() => {
      // @ts-expect-error simulate an older browser
      delete Document.prototype.startViewTransition;
    });
    await page.goto("/");
    expect(await page.evaluate(() => typeof document.startViewTransition)).toBe("undefined");
    await themeToggle(page).click();
    await expect.poll(() => isDark(page)).toBe(true);
    await themeToggle(page).click();
    await expect.poll(() => isDark(page)).toBe(false);
  });
});
