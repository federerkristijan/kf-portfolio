import { expect, test } from "@playwright/test";

test("hero shows name, subtitle and photo at phone width", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/");

  const hero = page.locator("section").first();
  await expect(hero.locator("h1")).toContainText("Kristijan");
  await expect(hero.locator("h2")).toHaveText("AI Systems Engineer");
  await expect(hero.getByAltText("Kristijan Federer")).toBeVisible();

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  );
  expect(overflow).toBe(false);
  await page.screenshot({ path: "test-results/hero-mobile.png" });
});

test("surname keeps its 'd' at phone width", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/");

  await expect(page.locator(".moustache-d span")).toHaveText("d");
  await expect(page.locator(".moustache-d span")).toBeVisible();
});

test("name is centred at phone width", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/");

  for (const part of await page.locator(".name-wrapper > *").all()) {
    const box = (await part.boundingBox())!;
    const centre = box.x + box.width / 2;
    expect(Math.abs(centre - 375 / 2)).toBeLessThan(4);
  }
});

test("logo and icons fit inside the navbar at phone width", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/");

  const nav = (await page.locator("nav.site-nav").boundingBox())!;
  for (const el of await page.locator("nav.site-nav img, nav.site-nav svg").all()) {
    const box = (await el.boundingBox())!;
    expect(box.y).toBeGreaterThanOrEqual(nav.y);
    expect(box.y + box.height).toBeLessThanOrEqual(nav.y + nav.height);
  }
});

test("hero shows name and photo on desktop", async ({ page }) => {
  await page.goto("/");

  const hero = page.locator("section").first();
  await expect(hero.locator("h1")).toContainText("Kristijan");
  await expect(hero.getByAltText("Kristijan Federer")).toBeVisible();
  await page.screenshot({ path: "test-results/hero-desktop.png" });
});
