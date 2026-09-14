import type { ScoreStrategy } from "./ScoreStrategy";

type AccessibilityViolationCounts = {
  critical: number;
  serious: number;
  moderate: number;
  minor: number;
};

export class AccessibilityScoreStrategy implements ScoreStrategy<AccessibilityViolationCounts> {
  calculate(counts: AccessibilityViolationCounts): number {
    const penalty =
      counts.critical * 25 +
      counts.serious * 15 +
      counts.moderate * 5 +
      counts.minor * 1;

    return Math.max(0, 100 - penalty);
  }
}
