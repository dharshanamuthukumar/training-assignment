import { defineConfig, devices } from "@playwright/test";

// Advanced Configuration Notes:
// - timeout: 30_000 (30 seconds) controls the maximum execution time allowed for an entire single test function.
//   If a test takes longer than this total duration (including all actions and navigation), Playwright terminates the test.
// - expect.timeout: 5_000 (5 seconds) controls the maximum time Playwright auto-retries a single web assertion
//   (e.g., await expect(locator).toBeVisible()). It allows element state changes to resolve quickly without failing early.
//
// Device Preset Notes:
// ...devices['Pixel 5'] configures three core properties for mobile browser emulation:
// 1. viewport (screen dimensions e.g. width 393 x height 851)
// 2. userAgent (mobile device identification string)
// 3. deviceScaleFactor / isMobile / hasTouch (emulating high-DPI displays and touch events)

export default defineConfig({
  testDir: "./tests",

  // Run tests in parallel for faster execution.
  fullyParallel: true,

  // Retry failed tests twice only in CI.
  retries: process.env.CI ? 2 : 0,

  // Use only one worker in CI.
  workers: process.env.CI ? 1 : undefined,

  reporter: "html",

  // Test-level timeout (30 seconds)
  timeout: 30_000,

  // Assertion-level timeout (5 seconds)
  expect: {
    timeout: 5_000,
  },

  use: {
    // Base URL used by page.goto('/')
    baseURL: "http://localhost:5173",

    // Capture a trace only when a test fails and retries.
    trace: "on-first-retry",

    screenshot: "only-on-failure",

    // Record video when a test retries
    video: "on-first-retry",

    headless: true,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },
  ],

  // Starts the Vite dev server automatically before tests run.
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
  },
});
