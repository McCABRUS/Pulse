import { expect, test } from "@playwright/test";

test("displays the comparison between two audits", async ({ page }) => {
  await page.goto(
    "/projects/project-1/audits/compare/audit-2?previous=audit-1",
  );

  await expect(
    page.getByRole("heading", {
      name: /audit comparison/i,
    }),
  ).toBeVisible();

  const rows = page.getByRole("row");

  await expect(rows).toHaveCount(5);

  await expect(rows.nth(1)).toContainText("Overall");
  await expect(rows.nth(1)).toContainText("92");
  await expect(rows.nth(1)).toContainText("90");
  await expect(rows.nth(1)).toContainText("-2");
  await expect(rows.nth(1)).toContainText("Regressed");

  await expect(rows.nth(2)).toContainText("Performance");
  await expect(rows.nth(2)).toContainText("94");
  await expect(rows.nth(2)).toContainText("85");
  await expect(rows.nth(2)).toContainText("-9");
  await expect(rows.nth(2)).toContainText("Regressed");

  await expect(rows.nth(3)).toContainText("Accessibility");
  await expect(rows.nth(3)).toContainText("98");
  await expect(rows.nth(3)).toContainText("80");
  await expect(rows.nth(3)).toContainText("-18");
  await expect(rows.nth(3)).toContainText("Regressed");

  await expect(rows.nth(4)).toContainText("API Health");
  await expect(rows.nth(4)).toContainText("84");
  await expect(rows.nth(4)).toContainText("90");
  await expect(rows.nth(4)).toContainText("+6");
  await expect(rows.nth(4)).toContainText("Improved");
});

test("shows an unavailable state when no previous audit is selected", async ({
  page,
}) => {
  await page.goto("/projects/project-1/audits/compare/audit-2");

  await expect(
    page.getByRole("heading", {
      name: /comparison unavailable/i,
    }),
  ).toBeVisible();

  await expect(
    page.getByText("A previous audit must be selected."),
  ).toBeVisible();
});
