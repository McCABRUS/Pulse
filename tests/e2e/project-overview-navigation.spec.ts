import { expect, test } from "@playwright/test";

test("navigates to the latest audit and displays audit details", async ({
  page,
}) => {
  await page.goto("/projects/project-1");

  await page
    .getByRole("link", {
      name: "View audit",
      exact: true,
    })
    .click();

  await expect(page).toHaveURL("/projects/project-1/audits/audit-1");

  await expect(
    page.getByRole("heading", { name: /audit detail/i }),
  ).toBeVisible();

  await expect(page.getByText("September 13, 2026")).toBeVisible();

  await expect(page.getByText("92", { exact: true })).toBeVisible();

  await expect(page.getByText("Performance")).toBeVisible();
  await expect(page.getByText("94", { exact: true })).toBeVisible();

  await expect(page.getByText("Accessibility")).toBeVisible();
  await expect(page.getByText("98", { exact: true })).toBeVisible();

  await expect(page.getByText("API Health")).toBeVisible();
  await expect(page.getByText("84", { exact: true })).toBeVisible();

  await expect(
    page.getByRole("heading", {
      name: /interactive element has no accessible name/i,
    }),
  ).toBeVisible();

  await expect(page.getByText("Serious")).toBeVisible();
});

test("returns to the project overview from an audit detail", async ({
  page,
}) => {
  await page.goto("/projects/project-1/audits/audit-1");

  await page.getByRole("link", { name: /home/i }).click();

  await expect(page).toHaveURL("/projects/project-1");

  await expect(
    page.getByRole("heading", {
      name: /acme commerce/i,
    }),
  ).toBeVisible();
});
