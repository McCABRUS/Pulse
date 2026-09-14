import { expect, test } from "@playwright/test";

test("displays the project overview", async ({ page }) => {
  await page.goto("/projects/project-1");

  await expect(
    page.getByRole("heading", { name: "Acme Commerce" }),
  ).toBeVisible();

  await expect(page.getByText("92", { exact: true })).toBeVisible();
  await expect(page.getByText("94", { exact: true })).toBeVisible();
  await expect(page.getByText("98", { exact: true })).toBeVisible();
  await expect(page.getByText("84", { exact: true })).toBeVisible();
  await expect(
    page.getByText("September 13, 2026", {
      exact: true,
    }),
  ).toBeVisible();
});

test("displays a not-found state for an unknown project", async ({ page }) => {
  await page.goto("/projects/unknown-project");

  await expect(
    page.getByRole("heading", {
      name: /project not found/i,
    }),
  ).toBeVisible();

  await expect(
    page.getByText("The requested project could not be found."),
  ).toBeVisible();
});
