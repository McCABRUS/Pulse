import { describe, expect, it } from "vitest";
import { HealthScoreCalculator } from "./HealthScoreCalculator";
import { PerformanceScoreStrategy } from "./PerformanceScoreStrategy";
import { AccessibilityScoreStrategy } from "./AccessibilityScoreStrategy";
import { ApiHealthScoreStrategy } from "./ApiHealthScoreStrategy";

describe("HealthScoreCalculator", () => {
  it("calculates all health scores using the configured strategies", () => {
    const calculator = new HealthScoreCalculator(
      new PerformanceScoreStrategy(),
      new AccessibilityScoreStrategy(),
      new ApiHealthScoreStrategy(),
    );

    const result = calculator.calculate({
      performance: {
        lcp: 1000,
        cls: 0.01,
        inp: 50,
      },
      accessibility: {
        critical: 0,
        serious: 0,
        moderate: 0,
        minor: 0,
      },
      apiHealth: {
        availability: 100,
        latency: 100,
        errorRate: 0,
      },
    });

    expect(result).toEqual({
      performance: 100,
      accessibility: 100,
      apiHealth: 100,
      overall: 100,
    });
  });

  it("calculates an overall score from the dimension scores", () => {
    const calculator = new HealthScoreCalculator(
      new PerformanceScoreStrategy(),
      new AccessibilityScoreStrategy(),
      new ApiHealthScoreStrategy(),
    );

    const result = calculator.calculate({
      performance: {
        lcp: 5000,
        cls: 0.3,
        inp: 600,
      },
      accessibility: {
        critical: 0,
        serious: 2,
        moderate: 1,
        minor: 0,
      },
      apiHealth: {
        availability: 95,
        latency: 800,
        errorRate: 8,
      },
    });

    expect(result.overall).toBeGreaterThanOrEqual(0);
    expect(result.overall).toBeLessThan(100);
  });
});
