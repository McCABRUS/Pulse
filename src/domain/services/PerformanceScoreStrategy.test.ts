import { describe, expect, it } from "vitest";
import { PerformanceScoreStrategy } from "./PerformanceScoreStrategy";

describe("PerformanceScoreStrategy", () => {
  it("returns a perfect score for excellent metrics", () => {
    const strategy = new PerformanceScoreStrategy();

    const score = strategy.calculate({
      lcp: 1000,
      cls: 0.01,
      inp: 50,
    });

    expect(score).toBe(100);
  });

  it("returns a lower score for degraded metrics", () => {
    const strategy = new PerformanceScoreStrategy();

    const score = strategy.calculate({
      lcp: 5000,
      cls: 0.3,
      inp: 600,
    });

    expect(score).toBeLessThan(100);
  });
});
