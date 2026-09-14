import { describe, expect, it } from "vitest";
import type { ScoreStrategy } from "./ScoreStrategy";
import { AccessibilityScoreStrategy } from "./AccessibilityScoreStrategy";
import { PerformanceScoreStrategy } from "./PerformanceScoreStrategy";

describe("ScoreStrategy", () => {
  it("supports different scoring strategies through a shared contract", () => {
    const performanceStrategy: ScoreStrategy<{
      lcp: number;
      cls: number;
      inp: number;
    }> = new PerformanceScoreStrategy();

    const accessibilityStrategy: ScoreStrategy<{
      critical: number;
      serious: number;
      moderate: number;
      minor: number;
    }> = new AccessibilityScoreStrategy();

    expect(
      performanceStrategy.calculate({
        lcp: 1000,
        cls: 0.01,
        inp: 50,
      }),
    ).toBe(100);

    expect(
      accessibilityStrategy.calculate({
        critical: 0,
        serious: 0,
        moderate: 0,
        minor: 0,
      }),
    ).toBe(100);
  });
});
