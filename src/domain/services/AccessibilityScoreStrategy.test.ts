import { describe, expect, it } from "vitest";
import { AccessibilityScoreStrategy } from "./AccessibilityScoreStrategy";

describe("AccessibilityScoreStrategy", () => {
  it("returns a perfect score when there are no violations", () => {
    const strategy = new AccessibilityScoreStrategy();

    const score = strategy.calculate({
      critical: 0,
      serious: 0,
      moderate: 0,
      minor: 0,
    });

    expect(score).toBe(100);
  });

  it("returns a lower score when serious violations exist", () => {
    const strategy = new AccessibilityScoreStrategy();

    const score = strategy.calculate({
      critical: 0,
      serious: 2,
      moderate: 1,
      minor: 0,
    });

    expect(score).toBeLessThan(100);
  });
});
