import { expect, test, type Page } from "@playwright/test";
import { effectiveOpacity, experience, profile, projects, SECTION_IDS } from "./utils";

const filterGroup = (page: Page) => page.getByRole("group", { name: "Filter projects" });
const filterButton = (page: Page, label: string) =>
  filterGroup(page).getByRole("button", { name: new RegExp(`^${label}\\b`) });
const projectCards = (page: Page) => page.locator("#projects article");

/* -------------------------------------------------------------------------- */
/*  Projects filter                                                             */
/* -------------------------------------------------------------------------- */

test.describe("projects filter", () => {
  const counts = {
    All: projects.length,
    Projects: projects.filter((p) => p.kind === "Project").length,
    Research: projects.filter((p) => p.kind === "Research").length,
  };

  test.beforeEach(async ({ page }) => {
    await page.goto("/#projects");
    await expect(filterGroup(page)).toBeVisible();
  });

  test("counts match the data and filtering shows the right cards", async ({ page }) => {
    for (const [label, n] of Object.entries(counts)) {
      await expect(filterButton(page, label)).toContainText(String(n));
    }
    await expect(filterButton(page, "All")).toHaveAttribute("aria-pressed", "true");
    await expect(projectCards(page)).toHaveCount(counts.All);

    for (const [label, kind] of [
      ["Projects", "Project"],
      ["Research", "Research"],
    ] as const) {
      await filterButton(page, label).click();
      await expect(filterButton(page, label)).toHaveAttribute("aria-pressed", "true");
      await expect(filterGroup(page).locator("button[aria-pressed=true]")).toHaveCount(1);
      await expect(projectCards(page)).toHaveCount(counts[label]);
      const titles = await projectCards(page).locator("h3").allInnerTexts();
      const expected = projects.filter((p) => p.kind === kind).map((p) => p.title);
      // innerText also carries the sr-only "(Source, opens in a new tab)" suffix on its own line
      expect(titles.map((t) => t.split("\n")[0].trim())).toEqual(expected);
      await expect(page.locator("#projects [aria-live=polite]")).toHaveText(
        `Showing ${counts[label]} ${counts[label] === 1 ? "item" : "items"}`,
      );
    }

    await filterButton(page, "All").click();
    await expect(projectCards(page)).toHaveCount(counts.All);
  });

  test("rapid clicking settles on the last choice", async ({ page }) => {
    const sequence = ["Research", "Projects", "All", "Research", "Projects", "Research", "All", "Projects"];
    for (const label of sequence) await filterButton(page, label).click({ delay: 0 });
    await expect(filterButton(page, "Projects")).toHaveAttribute("aria-pressed", "true");
    await expect(projectCards(page)).toHaveCount(counts.Projects);
    // nothing is left half-faded once the exit animations finish
    for (const card of await projectCards(page).all()) {
      await expect.poll(() => effectiveOpacity(card)).toBeGreaterThan(0.99);
    }
  });

  test("keyboard: Enter and Space activate filters", async ({ page, isMobile }) => {
    test.skip(isMobile, "keyboard flow is a desktop concern");
    await filterButton(page, "Research").focus();
    await page.keyboard.press("Enter");
    await expect(filterButton(page, "Research")).toHaveAttribute("aria-pressed", "true");
    await expect(projectCards(page)).toHaveCount(counts.Research);
    await page.keyboard.press("Shift+Tab");
    await expect(filterButton(page, "Projects")).toBeFocused();
    await page.keyboard.press("Space");
    await expect(filterButton(page, "Projects")).toHaveAttribute("aria-pressed", "true");
    await expect(projectCards(page)).toHaveCount(counts.Projects);
  });

  test("card links point at the data's URLs and open in a new tab safely", async ({ page }) => {
    for (const project of projects) {
      const card = projectCards(page).filter({ has: page.getByRole("heading", { name: project.title }) });
      await expect(card).toHaveCount(1);
      for (const link of project.links) {
        const a = card.getByRole("link", { name: `${link.label}: ${project.title} (opens in a new tab)` });
        await expect(a).toHaveAttribute("href", link.href);
        await expect(a).toHaveAttribute("target", "_blank");
        await expect(a).toHaveAttribute("rel", /noreferrer/);
      }
      const primary = project.links.find((l) => /source/i.test(l.label)) ?? project.links[0];
      await expect(card.getByRole("heading").getByRole("link")).toHaveAttribute("href", primary.href);
    }
  });

  test("clicking a card's Paper button opens the paper, not the card's primary link", async ({ page }) => {
    const withPaper = projects.find((p) => p.links.some((l) => /paper/i.test(l.label)));
    test.skip(!withPaper, "no project with a paper link");
    const paper = withPaper!.links.find((l) => /paper/i.test(l.label))!;
    // Do not hit the third-party site: answer the popup locally.
    await page.context().route(paper.href, (route) => route.fulfill({ body: "paper", contentType: "text/plain" }));
    const button = page.getByRole("link", { name: `${paper.label}: ${withPaper!.title} (opens in a new tab)` });
    const [popup] = await Promise.all([page.waitForEvent("popup"), button.click()]);
    expect(popup.url()).toBe(paper.href);
    await popup.close();
  });
});

/* -------------------------------------------------------------------------- */
/*  Experience accordion                                                        */
/* -------------------------------------------------------------------------- */

test.describe("experience accordion", () => {
  const toggles = (page: Page) => page.locator("#experience h3 > button");

  test.beforeEach(async ({ page }) => {
    await page.goto("/#experience");
    await expect(toggles(page)).toHaveCount(experience.length);
  });

  test("default open state: first / current role open, others closed", async ({ page }) => {
    for (const [i, role] of experience.entries()) {
      const expected = i === 0 || !!role.current;
      await expect(toggles(page).nth(i)).toHaveAttribute("aria-expanded", String(expected));
      await expect(toggles(page).nth(i)).toContainText(role.company);
    }
  });

  test("aria-expanded and aria-controls stay consistent with the panel", async ({ page }) => {
    for (const button of await toggles(page).all()) {
      const panelId = await button.getAttribute("aria-controls");
      expect(panelId).toBeTruthy();
      const panel = page.locator(`[id="${panelId}"]`);
      if ((await button.getAttribute("aria-expanded")) === "false") await button.click();
      await expect(button).toHaveAttribute("aria-expanded", "true");
      await expect(panel).toBeVisible();
      await expect(panel).toHaveAttribute("role", "region");
      await expect(panel).toHaveAttribute("aria-labelledby", (await button.getAttribute("id"))!);
      await button.click();
      await expect(button).toHaveAttribute("aria-expanded", "false");
      await expect(panel).toBeHidden();
    }
  });

  test("Enter and Space toggle a role", async ({ page, isMobile }) => {
    test.skip(isMobile, "keyboard flow is a desktop concern");
    const button = toggles(page).nth(1);
    await button.focus();
    await page.keyboard.press("Enter");
    await expect(button).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator(`[id="${await button.getAttribute("aria-controls")}"]`)).toBeVisible();
    await page.keyboard.press("Space");
    await expect(button).toHaveAttribute("aria-expanded", "false");
    // Space must not scroll the page while toggling
    await expect(button).toBeInViewport();
  });

  test("rapid toggling ends in a consistent state with a single panel", async ({ page }) => {
    const button = toggles(page).nth(1);
    for (let i = 0; i < 9; i++) await button.click({ delay: 0 });
    await expect(button).toHaveAttribute("aria-expanded", "true");
    const panel = page.locator(`[id="${await button.getAttribute("aria-controls")}"]`);
    await expect(panel).toHaveCount(1);
    await expect.poll(() => effectiveOpacity(panel)).toBeGreaterThan(0.99);
    await expect.poll(() => panel.evaluate((el) => el.getBoundingClientRect().height)).toBeGreaterThan(40);

    await button.click();
    await expect(button).toHaveAttribute("aria-expanded", "false");
    await expect(panel).toHaveCount(0);
  });
});

/* -------------------------------------------------------------------------- */
/*  Copy email                                                                  */
/* -------------------------------------------------------------------------- */

test.describe("copy email", () => {
  const copyButton = (page: Page) => page.getByRole("button", { name: /email address/i });

  test("copies the address and shows 'Copied' feedback that reverts", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/#contact");
    const button = copyButton(page);
    await expect(button).toHaveAccessibleName(`Copy email address ${profile.email}`);
    await button.click();
    await expect(button).toHaveAccessibleName("Email address copied");
    await expect(button).toContainText("Copied");
    await expect(page.getByText("Email address copied to clipboard")).toBeAttached();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(profile.email);
    // reverts after ~2s
    await expect(button).toHaveAccessibleName(`Copy email address ${profile.email}`, { timeout: 5000 });
    await expect(button).toContainText("Copy");
  });

  test("falls back to execCommand when the Clipboard API rejects", async ({ page }) => {
    await page.addInitScript(() => {
      const w = window as unknown as { __execCopy: number };
      w.__execCopy = 0;
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: { writeText: () => Promise.reject(new DOMException("denied", "NotAllowedError")) },
      });
      const exec = document.execCommand.bind(document);
      document.execCommand = (cmd: string, ...rest: unknown[]) => {
        if (cmd === "copy") {
          w.__execCopy++;
          return true;
        }
        return exec(cmd, ...(rest as [boolean?, string?]));
      };
    });
    await page.goto("/#contact");
    await copyButton(page).click();
    await expect(copyButton(page)).toHaveAccessibleName("Email address copied");
    expect(await page.evaluate(() => (window as unknown as { __execCopy: number }).__execCopy)).toBe(1);
  });

  test("tells the user when copying is impossible", async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: { writeText: () => Promise.reject(new DOMException("denied", "NotAllowedError")) },
      });
      document.execCommand = () => false;
    });
    await page.goto("/#contact");
    const button = copyButton(page);
    await button.click();
    await expect(button).toContainText("Couldn’t copy");
    await expect(page.getByText("Copy failed, select the address to copy it")).toBeAttached();
    // the address stays visible and selectable as a manual fallback
    await expect(page.getByRole("link", { name: profile.email })).toBeVisible();
    await expect(button).toContainText(/^\s*Copy\s*$/, { timeout: 5000 });
  });
});

/* -------------------------------------------------------------------------- */
/*  Resume downloads                                                            */
/* -------------------------------------------------------------------------- */

test.describe("resume downloads", () => {
  for (const where of ["hero", "contact"] as const) {
    test(`${where} 'Download CV' downloads the PDF with a sensible filename`, async ({ page }) => {
      await page.goto(where === "contact" ? "/#contact" : "/");
      const scope = where === "contact" ? page.locator("#contact") : page.locator("aside");
      const link = scope.getByRole("link", { name: /Download CV/ });
      await expect(link).toHaveAttribute("href", profile.resume);
      await expect(link).toHaveAttribute("download", "");
      const [download] = await Promise.all([page.waitForEvent("download"), link.click()]);
      expect(download.suggestedFilename()).toBe(profile.resume.split("/").pop());
      expect(await download.failure()).toBeNull();
    });
  }
});

/* -------------------------------------------------------------------------- */
/*  GitHub heatmap                                                              */
/* -------------------------------------------------------------------------- */

test("GitHub heatmap scroll region is focusable and starts at the most recent end", async ({ page }) => {
  await page.goto("/#activity");
  const region = page.getByRole("region", { name: /contribution calendar/i });
  test.skip((await region.count()) === 0, "contributions API unavailable; fallback rendered");
  await region.focus();
  await expect(region).toBeFocused();
  const gap = () => region.evaluate((el) => el.scrollWidth - el.clientWidth - el.scrollLeft);
  // set in an effect after hydration
  await expect.poll(gap).toBeLessThan(2);
  const { scrollLeft, max } = await region.evaluate((el) => ({ scrollLeft: el.scrollLeft, max: el.scrollWidth - el.clientWidth }));
  if (max > 0) {
    await page.keyboard.press("ArrowLeft");
    await expect.poll(() => region.evaluate((el) => el.scrollLeft)).toBeLessThan(scrollLeft);
  }
});

/* -------------------------------------------------------------------------- */
/*  Custom cursor                                                               */
/* -------------------------------------------------------------------------- */

const cursorLayer = (page: Page) => page.locator("div[aria-hidden][data-kind][data-visible]");

test.describe("custom cursor", () => {
  test("present only for fine pointers and never intercepts clicks", async ({ page, isMobile }) => {
    await page.goto("/#projects");
    if (isMobile) {
      await expect(cursorLayer(page)).toHaveCount(0);
      return;
    }
    await expect(cursorLayer(page)).toHaveCount(1);
    await expect(cursorLayer(page)).toHaveCSS("pointer-events", "none");

    const research = filterButton(page, "Research");
    // wait for the smooth hash scroll to settle so the box is where the pointer lands
    await research.hover();
    await expect.poll(() => page.evaluate(() => new Promise((r) => {
      const y = window.scrollY;
      requestAnimationFrame(() => requestAnimationFrame(() => r(window.scrollY === y)));
    }))).toBe(true);
    const box = (await research.boundingBox())!;
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await expect(cursorLayer(page)).toHaveAttribute("data-visible", "true");
    await expect(cursorLayer(page)).toHaveAttribute("data-kind", "link");
    // hit-testing at the pointer lands on the button, not the cursor overlay
    const hit = await page.evaluate(
      ([x, y]) => document.elementFromPoint(x, y)?.closest("button")?.textContent ?? null,
      [box.x + box.width / 2, box.y + box.height / 2],
    );
    expect(hit).toContain("Research");
    await page.mouse.down();
    await page.mouse.up();
    await expect(research).toHaveAttribute("aria-pressed", "true");
  });

  test("absent with reduced motion", async ({ browser, isMobile }) => {
    test.skip(isMobile, "already absent for coarse pointers");
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(cursorLayer(page)).toHaveCount(0);
    await context.close();
  });
});

/* -------------------------------------------------------------------------- */
/*  Motion / no-JS visibility                                                   */
/* -------------------------------------------------------------------------- */

test.describe("content visibility", () => {
  test("reduced motion: every section is fully visible once scrolled to", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1280, height: 800 } });
    const page = await context.newPage();
    await page.goto("/");
    for (const id of SECTION_IDS) {
      const heading = page.locator(`#${id}-title`);
      await heading.scrollIntoViewIfNeeded();
      await expect.poll(() => effectiveOpacity(heading), { message: `#${id} heading opacity` }).toBeGreaterThan(0.99);
    }
    await expect.poll(() => effectiveOpacity(page.getByRole("heading", { level: 1 }))).toBeGreaterThan(0.99);
    await context.close();
  });

  test("normal motion: entrance animations finish (nothing stuck at opacity 0)", async ({ page }) => {
    await page.goto("/");
    for (const id of SECTION_IDS) {
      const heading = page.locator(`#${id}-title`);
      // Centre it so BlurFade's in-view trigger (10% visible) has certainly fired.
      await heading.evaluate((el) => el.scrollIntoView({ block: "center", behavior: "instant" }));
      await expect.poll(() => effectiveOpacity(heading), { message: `#${id} heading opacity` }).toBeGreaterThan(0.99);
    }
  });

  test("without JavaScript the content is still readable", async ({ browser }) => {
    // Regression guard: motion server-renders entrance `initial` states as inline opacity:0;
    // the <noscript> style in src/app/layout.tsx must keep them visible without JS.
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/");
    expect(await effectiveOpacity(page.getByRole("heading", { level: 1 }))).toBeGreaterThan(0.99);
    for (const id of SECTION_IDS) {
      expect(await effectiveOpacity(page.locator(`#${id}-title`)), `#${id} heading`).toBeGreaterThan(0.99);
    }
    await context.close();
  });
});
