import { defineConfig, devices } from "@playwright/test";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const useLocalServer = !process.env.BASE_URL;

export default defineConfig({
  testDir: "./tests",
  outputDir: "./tests/results",
  snapshotPathTemplate: "./tests/__snapshots__/{testFileName}/{arg}-{projectName}{ext}",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } },
    },
    {
      // Chromium with iPhone 13 viewport — keeps install lean (no webkit
      // download in CI). For most marketing-site smoke purposes this is
      // sufficient; switch to webkit later if a Safari-specific bug surfaces.
      name: "mobile",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
        deviceScaleFactor: 3,
      },
    },
  ],
  webServer: useLocalServer
    ? {
        // Serve the static export from out/ on port 3000.
        // Caller is expected to have run `npm run build` first.
        command: "npx serve out -p 3000 --no-clipboard --no-port-switching",
        url: "http://localhost:3000",
        reuseExistingServer: !process.env.CI,
        timeout: 30_000,
      }
    : undefined,
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.02,
      threshold: 0.2,
    },
  },
});
