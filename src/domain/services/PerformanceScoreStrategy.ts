import type { ScoreStrategy } from "./ScoreStrategy";

type PerformanceMetrics = {
  lcp: number;
  cls: number;
  inp: number;
};

export class PerformanceScoreStrategy implements ScoreStrategy<PerformanceMetrics> {
  calculate(metrics: PerformanceMetrics): number {
    const lcpScore = this.calculateLcpScore(metrics.lcp);
    const clsScore = this.calculateClsScore(metrics.cls);
    const inpScore = this.calculateInpScore(metrics.inp);

    return Math.round((lcpScore + clsScore + inpScore) / 3);
  }

  private calculateLcpScore(lcp: number): number {
    if (lcp <= 2500) {
      return 100;
    }

    if (lcp >= 5000) {
      return 0;
    }

    return 100 - ((lcp - 2500) / 2500) * 100;
  }

  private calculateClsScore(cls: number): number {
    if (cls <= 0.1) {
      return 100;
    }

    if (cls >= 0.25) {
      return 0;
    }

    return 100 - ((cls - 0.1) / 0.15) * 100;
  }

  private calculateInpScore(inp: number): number {
    if (inp <= 200) {
      return 100;
    }

    if (inp >= 500) {
      return 0;
    }

    return 100 - ((inp - 200) / 300) * 100;
  }
}
