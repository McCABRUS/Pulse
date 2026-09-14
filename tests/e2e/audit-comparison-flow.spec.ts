import { expect, test } from "@playwright/test";

test("allows a user to compare two audits", async ({ page }) => {
  await page.goto("/projects/project-1/audits/audit-2");

  await expect(
    page.getByRole("heading", {
      name: /audit detail/i,
    }),
  ).toBeVisible();

  await page
    .getByRole("link", {
      name: /compare with another audit/i,
    })
    .click();

  await expect(page).toHaveURL(
    "/projects/project-1/audits/compare/audit-2/select",
  );

  await expect(
    page.getByRole("heading", {
      name: /compare audit/i,
    }),
  ).toBeVisible();

  await expect(page.getByText("Audit 2")).toBeVisible();

  await expect(page.getByText("Audit 1")).toBeVisible();

  await page
    .getByRole("link", {
      name: /compare audits/i,
    })
    .click();

  await expect(page).toHaveURL(
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
