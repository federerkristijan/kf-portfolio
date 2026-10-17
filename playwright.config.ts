import { defineConfig, devices } from "@playwright/test";

// Runs against an already running dev server (`npm run dev`), since the app
// needs Infisical-injected env vars to reach the database.
export default defineConfig({
  testDir: "./e2e",
  outputDir: "./test-results",
  reporter: "list",
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
