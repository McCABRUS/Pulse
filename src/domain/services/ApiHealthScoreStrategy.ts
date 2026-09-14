import type { ScoreStrategy } from "./ScoreStrategy";

type ApiHealthMetrics = {
  availability: number;
  latency: number;
  errorRate: number;
};

export class ApiHealthScoreStrategy implements ScoreStrategy<ApiHealthMetrics> {
  calculate(metrics: ApiHealthMetrics): number {
    const availabilityScore = this.calculateAvailabilityScore(
      metrics.availability,
    );

    const latencyScore = this.calculateLatencyScore(metrics.latency);

    const errorRateScore = this.calculateErrorRateScore(metrics.errorRate);

    return Math.round((availabilityScore + latencyScore + errorRateScore) / 3);
  }

  private calculateAvailabilityScore(availability: number): number {
    if (availability >= 99.9) {
      return 100;
    }

    if (availability <= 95) {
      return 0;
    }

    return ((availability - 95) / 4.9) * 100;
  }

  private calculateLatencyScore(latency: number): number {
    if (latency <= 200) {
      return 100;
    }

    if (latency >= 1000) {
      return 0;
    }

    return 100 - ((latency - 200) / 800) * 100;
  }

  private calculateErrorRateScore(errorRate: number): number {
    if (errorRate <= 0.1) {
      return 100;
    }

    if (errorRate >= 10) {
      return 0;
    }

    return 100 - ((errorRate - 0.1) / 9.9) * 100;
  }
}
