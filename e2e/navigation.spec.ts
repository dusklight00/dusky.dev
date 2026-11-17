import { expect, test, type Page } from "@playwright/test";
import { menuButton, mobileNav, NAV, primaryNav, profile } from "./utils";

/** Alpha of the header backdrop's bottom border (0 = transparent, 1 = solid). */
async function headerBorderAlpha(page: Page) {
  return page.locator("header > div").first().evaluate((el) => {
    const c = getComputedStyle(el).borderBottomColor;
    if (c === "transparent") return 0;
    const m = c.match(/rgba?\(([^)]+)\)/);
    // Fail loudly on an unexpected colour format instead of silently reporting "solid".
    if (!m) throw new Error(`Unparsed border colour: ${c}`);
    const parts = m[1].split(/[ ,/]+/).filter(Boolean);
    return parts.length === 4 ? parseFloat(parts[3]) : 1;
  });
}

test.describe("header (desktop)", () => {
  test.skip(({ isMobile }) => isMobile, "primary nav is hidden below md");

  test("anchor links scroll to their section and mark it current", async ({ page }) => {
    await page.goto("/");
    for (const item of NAV) {
      const link = primaryNav(page).getByRole("link", { name: item.label, exact: true });
      await expect(link).toHaveAttribute("href", `/#${item.id}`);
      await link.click();
      await expect(page).toHaveURL(new RegExp(`#${item.id}$`));
      // Section heading ends up just below the fixed header, not hidden behind it.
      await expect
        .poll(() => page.locator(`#${item.id}`).evaluate((el) => Math.round(el.getBoundingClientRect().top)))
        .toBeGreaterThanOrEqual(64);
      await expect(page.locator(`#${item.id}-title`)).toBeInViewport();
      await expect(link).toHaveAttribute("aria-current", "location");
      await expect(primaryNav(page).locator("a[aria-current]")).toHaveCount(1);
    }
  });

  test("active indicator follows manual scrolling", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => document.getElementById("projects")!.scrollIntoView({ block: "start", behavior: "instant" }));
    await expect(primaryNav(page).getByRole("link", { name: "work", exact: true })).toHaveAttribute("aria-current", "location");
    // Sections not in the nav (activity, community, achievements) clear the indicator.
    await page.evaluate(() => document.getElementById("community")!.scrollIntoView({ block: "start", behavior: "instant" }));
    await expect(primaryNav(page).locator("a[aria-current]")).toHaveCount(0);
    // The page bottom pins "contact".
    await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }));
    await expect(primaryNav(page).getByRole("link", { name: "contact", exact: true })).toHaveAttribute("aria-current", "location");
  });
});

test.describe("header (all viewports)", () => {
  test("border appears once the page is scrolled and disappears at the top", async ({ page }) => {
    await page.goto("/");
    await expect.poll(() => headerBorderAlpha(page)).toBe(0);
    await page.mouse.wheel(0, 400);
    await expect.poll(() => headerBorderAlpha(page)).toBeGreaterThan(0.9);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await expect.poll(() => headerBorderAlpha(page)).toBe(0);
  });

  test("wordmark returns to the top of the page", async ({ page }) => {
    await page.goto("/#contact");
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(500);
    await page.getByRole("link", { name: /back to top/i }).first().click();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  });

  test("footer 'Back to top' returns to the top of the page", async ({ page }) => {
    await page.goto("/#contact");
    await page.getByRole("contentinfo").getByRole("link", { name: "Back to top" }).click();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  });

  test("Resume link opens the PDF in a new tab", async ({ page, isMobile, request }) => {
    test.skip(isMobile, "header Resume button is hidden below sm; the mobile menu has its own (tested below)");
    await page.goto("/");
    const link = page.getByRole("banner").getByRole("link", { name: /^Resume/ });
    await expect(link).toHaveAttribute("href", profile.resume);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", /noreferrer/);
    const [popup] = await Promise.all([page.waitForEvent("popup"), link.click()]);
    expect(new URL(popup.url()).pathname).toBe(profile.resume);
    await popup.close();

    const res = await request.get(profile.resume);
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("application/pdf");
    expect((await res.body()).subarray(0, 5).toString()).toBe("%PDF-");
  });
});

test.describe("mobile menu", () => {
  test.skip(({ isMobile }) => !isMobile, "the menu button is hidden from md up");

  for (const viewport of [
    { width: 390, height: 844 },
    { width: 360, height: 740 },
  ]) {
    test.describe(`${viewport.width}x${viewport.height}`, () => {
      test.use({ viewport });

      test("opens and closes with the button; aria-expanded tracks state", async ({ page }) => {
        await page.goto("/");
        const button = menuButton(page);
        await expect(button).toHaveAttribute("aria-expanded", "false");
        await expect(mobileNav(page)).toHaveCount(0);

        await button.click();
        await expect(button).toHaveAttribute("aria-expanded", "true");
        await expect(button).toHaveAccessibleName("Close menu");
        const panelId = await button.getAttribute("aria-controls");
        await expect(page.locator(`[id="${panelId}"]`)).toBeVisible();
        for (const item of NAV) {
          await expect(mobileNav(page).getByRole("link", { name: new RegExp(`${item.label}$`) })).toBeVisible();
        }
        await expect(mobileNav(page).getByRole("link", { name: /Resume \(PDF\)/ })).toHaveAttribute("href", profile.resume);

        await button.click();
        await expect(button).toHaveAttribute("aria-expanded", "false");
        await expect(mobileNav(page)).toHaveCount(0);
      });

      test("focus moves into the panel, is trapped, and Esc returns it to the button", async ({ page }) => {
        await page.goto("/");
        const button = menuButton(page);
        await button.click();
        const links = mobileNav(page).getByRole("link");
        await expect(links.first()).toBeFocused();

        const count = await links.count();
        // Tab forward past the last item wraps to the toggle button, then back into the panel.
        for (let i = 1; i < count; i++) await page.keyboard.press("Tab");
        await expect(links.last()).toBeFocused();
        await page.keyboard.press("Tab");
        await expect(button).toBeFocused();
        await page.keyboard.press("Tab");
        await expect(links.first()).toBeFocused();
        // Shift+Tab from the button wraps to the last item.
        await page.keyboard.press("Shift+Tab");
        await expect(button).toBeFocused();
        await page.keyboard.press("Shift+Tab");
        await expect(links.last()).toBeFocused();

        await page.keyboard.press("Escape");
        await expect(button).toHaveAttribute("aria-expanded", "false");
        await expect(button).toBeFocused();
        await expect(mobileNav(page)).toHaveCount(0);
      });

      test("backdrop tap closes the menu", async ({ page }) => {
        await page.goto("/");
        await menuButton(page).click();
        await expect(mobileNav(page)).toBeVisible();
        // tap well below the panel, on the scrim
        await page.mouse.click(viewport.width / 2, viewport.height - 40);
        await expect(menuButton(page)).toHaveAttribute("aria-expanded", "false");
        await expect(mobileNav(page)).toHaveCount(0);
      });

      test("each link closes the menu and scrolls to its section", async ({ page }) => {
        await page.goto("/");
        for (const item of NAV) {
          await menuButton(page).click();
          await mobileNav(page).getByRole("link", { name: new RegExp(`${item.label}$`) }).click();
          await expect(menuButton(page)).toHaveAttribute("aria-expanded", "false");
          await expect(page).toHaveURL(new RegExp(`#${item.id}$`));
          await expect(page.locator(`#${item.id}-title`)).toBeInViewport();
        }
      });

      test("resizing to desktop closes the menu", async ({ page }) => {
        await page.goto("/");
        await menuButton(page).click();
        await expect(mobileNav(page)).toBeVisible();
        await page.setViewportSize({ width: 1024, height: 800 });
        await expect(mobileNav(page)).toHaveCount(0);
        await expect(primaryNav(page)).toBeVisible();
        await page.setViewportSize(viewport);
        await expect(menuButton(page)).toHaveAttribute("aria-expanded", "false");
      });
    });
  }
});

test.describe("skip link", () => {
  test.skip(({ isMobile }) => isMobile, "keyboard flow is a desktop concern");

  test("is the first tab stop, becomes visible, and jumps to the main content", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();
    const box = await skip.boundingBox();
    expect(box!.width).toBeGreaterThan(40);

    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#content$/);
    await page.keyboard.press("Tab");
    const insideMain = await page.evaluate(() => !!document.activeElement?.closest("main#content"));
    expect(insideMain).toBe(true);
  });
});

test.describe("404 page", () => {
  test("unknown route returns 404 with the custom page and a way home", async ({ page }) => {
    const res = await page.goto("/does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page).toHaveTitle(/Page not found/);
    await expect(page.getByRole("heading", { level: 1, name: "The sun already set here." })).toBeVisible();
    await page.getByRole("link", { name: "Back to home" }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole("heading", { level: 1, name: profile.name })).toBeVisible();
  });

  test("header nav works from the 404 page", async ({ page, isMobile }) => {
    await page.goto("/does-not-exist");
    if (isMobile) {
      await menuButton(page).click();
      await mobileNav(page).getByRole("link", { name: /experience$/ }).click();
    } else {
      await primaryNav(page).getByRole("link", { name: "experience", exact: true }).click();
    }
    await expect(page).toHaveURL(/\/#experience$/);
    await expect(page.locator("#experience-title")).toBeInViewport();
  });

  test("wordmark on the 404 page goes to the home page", async ({ page }) => {
    await page.goto("/does-not-exist");
    await page.getByRole("link", { name: /back to top/i }).first().click();
    await expect(page).toHaveURL(/\/(#top)?$/);
    await expect(page.getByRole("heading", { level: 1, name: profile.name })).toBeVisible();
  });
});
