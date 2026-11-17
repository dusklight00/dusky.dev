import { existsSync } from "node:fs";
import { defineConfig, devices } from "@playwright/test";

// Use the system Chromium when present (avoids a separate browser download);
// otherwise fall back to Playwright's bundled build (`pnpm exec playwright install chromium`).
const systemChromium = process.env.PW_CHROMIUM_PATH ?? "/usr/bin/chromium";
const launchOptions = existsSync(systemChromium) ? { executablePath: systemChromium } : {};

const PORT = Number(process.env.PORT ?? 3100);
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],
  use: { baseURL, trace: "retain-on-failure", launchOptions },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: `pnpm build && pnpm start -p ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
  },
});
