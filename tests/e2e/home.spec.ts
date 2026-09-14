import { expect, test } from "@playwright/test";

test("redirects the home page to the project overview", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveURL("/projects/project-1");

  await expect(
    page.getByRole("heading", {
      name: "Acme Commerce",
    }),
  ).toBeVisible();
});
