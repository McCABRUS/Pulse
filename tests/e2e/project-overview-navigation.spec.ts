import { expect, test } from "@playwright/test";

test("navigates to the latest audit", async ({ page }) => {
  await page.goto("/projects/project-1");

  await page.getByRole("link", { name: /latest audit/i }).click();

  await expect(page).toHaveURL("/projects/project-1/audits/audit-1");

  await expect(
    page.getByRole("heading", { name: /audit detail/i }),
  ).toBeVisible();
});
