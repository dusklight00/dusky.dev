import type { Locator, Page } from "@playwright/test";

export { experience, profile, projects } from "../src/data/portfolio";

/** Header nav items: visible label -> section id. Mirrors NAV in site-header.tsx. */
export const NAV = [
  { label: "about", id: "about" },
  { label: "experience", id: "experience" },
  { label: "work", id: "projects" },
  { label: "stack", id: "skills" },
  { label: "contact", id: "contact" },
] as const;

/** Every top-level content section, in page order. */
export const SECTION_IDS = ["about", "experience", "projects", "skills", "activity", "community", "achievements", "contact"];

export const primaryNav = (page: Page) => page.getByRole("navigation", { name: "Primary" });
export const mobileNav = (page: Page) => page.getByRole("navigation", { name: "Mobile" });
export const menuButton = (page: Page) => page.getByRole("button", { name: /^(open|close) menu$/i });
export const themeToggle = (page: Page) => page.getByRole("button", { name: /switch to (light|dark) theme/i });

/** Product of the computed opacity of an element and all its ancestors (what the user actually sees). */
export function effectiveOpacity(locator: Locator) {
  return locator.evaluate((node) => {
    let el: Element | null = node;
    let op = 1;
    while (el) {
      op *= parseFloat(getComputedStyle(el).opacity);
      el = el.parentElement;
    }
    return op;
  });
}

/** Reads width/height from a PNG's IHDR chunk. */
export function pngSize(buf: Buffer) {
  const signature = buf.subarray(0, 8).toString("hex");
  if (signature !== "89504e470d0a1a0a") throw new Error("not a PNG");
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}
