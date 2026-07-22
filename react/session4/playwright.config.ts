import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  // Run tests in parallel for faster execution.
  fullyParallel: true,

  // Retry failed tests twice only in CI.
  retries: process.env.CI ? 2 : 0,

  // Use only one worker in CI.
  workers: process.env.CI ? 1 : undefined,

  reporter: "html",

  timeout: 30000,

  use: {
    // Base URL used by page.goto('/')
    baseURL: "http://localhost:5173",

    // Capture a trace only when a test fails and retries.
    trace: "on-first-retry",

    screenshot: "only-on-failure",
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
  ],

  // Starts the Vite dev server automatically before tests run.
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
  },
});
