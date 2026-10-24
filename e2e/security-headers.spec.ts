import { expect, test } from "@playwright/test";

test("proxy sets CSP with a nonce and security headers", async ({ page }) => {
  const res = await page.goto("/about");
  const headers = res!.headers();

  expect(headers["content-security-policy"]).toMatch(/script-src 'self' 'nonce-[^']+'/);
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["x-content-type-options"]).toBe("nosniff");
});

// Script files are allowed by 'self'; the nonce matters for inline scripts.
// The dev overlay is a dev-only element, absent in production builds.
test("no CSP violations and inline scripts carry the nonce", async ({ page }) => {
  const violations: string[] = [];
  page.on("console", (msg) => {
    if (msg.text().includes("Content Security Policy")) violations.push(msg.text());
  });

  const res = await page.goto("/about");
  await page.waitForLoadState("networkidle");
  const nonce = res!.headers()["content-security-policy"].match(/'nonce-([^']+)'/)![1];

  const inline = page.locator("script:not([src]):not([data-nextjs-dev-overlay])");
  expect(await inline.count()).toBeGreaterThan(0);
  const missing = await inline.evaluateAll((els, n) =>
    els
      .filter((el) => (el as HTMLScriptElement).nonce !== n)
      .map((el) => el.outerHTML.slice(0, 120)),
    nonce
  );
  expect(violations).toEqual([]);
  expect(missing).toEqual([]);
});
