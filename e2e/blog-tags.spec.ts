import { expect, test, type Page } from "@playwright/test";
import { slugify } from "../src/lib/slugify";

const cardTags = (page: Page) =>
  page.locator("article span.rounded").allTextContents();

test("/blog uses the same card grid as the homepage", async ({ page }) => {
  await page.goto("/");
  const homeGrid = page.locator("#blog .grid");
  await expect(homeGrid).toBeVisible();
  const homeClass = await homeGrid.getAttribute("class");

  await page.goto("/blog");
  const blogGrid = page.locator(".grid").first();
  await expect(blogGrid).toHaveAttribute("class", homeClass!);
  await page.screenshot({ path: "test-results/blog.png", fullPage: true });
});

test("/blog has no horizontal scroll at phone width", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/blog");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  );
  expect(overflow).toBe(false);
});

test("every tag page lists only posts carrying that tag", async ({ page }) => {
  await page.goto("/blog");
  const tags = [...new Set(await cardTags(page))];
  expect(tags.length).toBeGreaterThan(0);

  for (const tag of tags) {
    const res = await page.goto(`/blog/tag/${slugify(tag)}`);
    expect(res?.status(), tag).toBe(200);
    await expect(page.locator("h1")).toContainText(tag);

    const cards = page.locator("article");
    const count = await cards.count();
    expect(count, tag).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const tagsOnCard = await cards.nth(i).locator("span.rounded").allTextContents();
      expect(tagsOnCard.map(slugify), tag).toContain(slugify(tag));
    }
  }
});

test("cover images load through next/image", async ({ page }) => {
  await page.goto("/blog");
  const covers = page.locator("article img");
  expect(await covers.count()).toBeGreaterThan(0);

  for (const img of await covers.all()) {
    await img.scrollIntoViewIfNeeded();
    await expect(img).toHaveAttribute("src", /^\/_next\/image\?/);
    await expect
      .poll(() => img.evaluate((el) => (el as HTMLImageElement).naturalWidth))
      .toBeGreaterThan(0);
  }
});

test("unknown tag returns 404", async ({ page }) => {
  const res = await page.goto("/blog/tag/does-not-exist-xyz");
  expect(res?.status()).toBe(404);
});

test("article tags link to their tag page", async ({ page }) => {
  await page.goto("/blog");
  const href = await page.locator('a[href^="/blog/"]').first().getAttribute("href");
  await page.goto(href!);

  const tagLink = page.locator('a[href^="/blog/tag/"]').first();
  await expect(tagLink).toBeVisible();
  const tagHref = await tagLink.getAttribute("href");
  await tagLink.click();
  await expect(page).toHaveURL(tagHref!);
  await expect(page.locator(`a[href="${href}"]`).first()).toBeVisible();
});
