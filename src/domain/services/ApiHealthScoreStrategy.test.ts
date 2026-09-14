import { describe, expect, it } from "vitest";
import { ApiHealthScoreStrategy } from "./ApiHealthScoreStrategy";

describe("ApiHealthScoreStrategy", () => {
  it("returns a perfect score for healthy API metrics", () => {
    const strategy = new ApiHealthScoreStrategy();

    const score = strategy.calculate({
      availability: 100,
      latency: 100,
      errorRate: 0,
    });

    expect(score).toBe(100);
  });

  it("returns a lower score for degraded API metrics", () => {
    const strategy = new ApiHealthScoreStrategy();

    const score = strategy.calculate({
      availability: 95,
      latency: 800,
      errorRate: 8,
    });

    expect(score).toBeLessThan(100);
  });
});
