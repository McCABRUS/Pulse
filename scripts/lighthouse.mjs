import fs from "node:fs";
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";

const url =
  process.env.LIGHTHOUSE_URL ?? "http://localhost:3000/projects/project-1";

const chrome = await chromeLauncher.launch({
  chromeFlags: ["--headless"],
});

try {
  const result = await lighthouse(url, {
    port: chrome.port,
    output: "json",
    logLevel: "error",
  });

  if (!result?.lhr) {
    throw new Error("Lighthouse did not return a report.");
  }

  const report = result.lhr;

  const scores = {
    performance: Math.round((report.categories.performance?.score ?? 0) * 100),
    accessibility: Math.round(
      (report.categories.accessibility?.score ?? 0) * 100,
    ),
    bestPractices: Math.round(
      (report.categories["best-practices"]?.score ?? 0) * 100,
    ),
    seo: Math.round((report.categories.seo?.score ?? 0) * 100),
  };

  fs.writeFileSync(
    "lighthouse-production.json",
    JSON.stringify(report, null, 2),
  );

  console.log("Lighthouse scores:");
  console.log(`Performance: ${scores.performance}`);
  console.log(`Accessibility: ${scores.accessibility}`);
  console.log(`Best Practices: ${scores.bestPractices}`);
  console.log(`SEO: ${scores.seo}`);

  if (scores.performance < 90) {
    throw new Error(
      `Performance score ${scores.performance} is below the minimum of 90.`,
    );
  }

  if (scores.accessibility < 95) {
    throw new Error(
      `Accessibility score ${scores.accessibility} is below the minimum of 95.`,
    );
  }
} finally {
  await chrome.kill();
}
