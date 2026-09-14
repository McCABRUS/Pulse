import { expect, test } from "@playwright/test";

test("displays an audit not found state for an invalid audit", async ({
  page,
}) => {
  await page.goto("/projects/project-1/audits/unknown-audit");

  await expect(
    page.getByRole("heading", { name: /audit not found/i }),
  ).toBeVisible();

  await expect(
    page.getByText("The requested audit could not be found."),
  ).toBeVisible();
});
