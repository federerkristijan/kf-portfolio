import { expect, test } from "@playwright/test";

test("/about shows one h1 and non-empty skill pills", async ({ page }) => {
  await page.goto("/about");

  await expect(page.locator("h1")).toHaveCount(1);
  const skills = await page.locator(".about-skill").allTextContents();
  expect(skills.length).toBeGreaterThan(0);
  for (const skill of skills) expect(skill.trim()).not.toBe("");
});

test("homepage has a single h1", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveCount(1);
});
