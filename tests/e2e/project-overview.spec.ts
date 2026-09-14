import { expect, test } from "@playwright/test";

test("displays the project overview", async ({ page }) => {
  await page.goto("/projects/project-1");

  await expect(
    page.getByRole("heading", { name: "Acme Commerce" }),
  ).toBeVisible();

  await expect(page.getByText("92")).toBeVisible();
  await expect(page.getByText("94")).toBeVisible();
  await expect(page.getByText("98")).toBeVisible();
  await expect(page.getByText("84")).toBeVisible();
  await expect(page.getByText("September 13, 2026")).toBeVisible();
});
