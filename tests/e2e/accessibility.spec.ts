import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("project overview has no detectable accessibility violations", async ({
  page,
}) => {
  await page.goto("/projects/project-1");

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});

test("audit detail has no detectable accessibility violations", async ({
  page,
}) => {
  await page.goto("/projects/project-1/audits/audit-1");

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});
