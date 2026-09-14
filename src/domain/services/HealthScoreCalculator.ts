import type { ScoreStrategy } from "./ScoreStrategy";

type PerformanceInput = {
  lcp: number;
  cls: number;
  inp: number;
};

type AccessibilityInput = {
  critical: number;
  serious: number;
  moderate: number;
  minor: number;
};

type ApiHealthInput = {
  availability: number;
  latency: number;
  errorRate: number;
};

type HealthScoreInput = {
  performance: PerformanceInput;
  accessibility: AccessibilityInput;
  apiHealth: ApiHealthInput;
};

export type HealthScoreResult = {
  performance: number;
  accessibility: number;
  apiHealth: number;
  overall: number;
};

export class HealthScoreCalculator {
  constructor(
    private readonly performanceStrategy: ScoreStrategy<PerformanceInput>,
    private readonly accessibilityStrategy: ScoreStrategy<AccessibilityInput>,
    private readonly apiHealthStrategy: ScoreStrategy<ApiHealthInput>,
  ) {}

  calculate(input: HealthScoreInput): HealthScoreResult {
    const performance = this.performanceStrategy.calculate(input.performance);

    const accessibility = this.accessibilityStrategy.calculate(
      input.accessibility,
    );

    const apiHealth = this.apiHealthStrategy.calculate(input.apiHealth);

    const overall = Math.round((performance + accessibility + apiHealth) / 3);

    return {
      performance,
      accessibility,
      apiHealth,
      overall,
    };
  }
}
