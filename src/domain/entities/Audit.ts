import type { Finding } from "./Finding";
import type { QualityScore } from "./QualityScore";
import type { PerformanceMetrics } from "./PerformanceMetrics";
import type { AccessibilityMetrics } from "./AccessibilityMetrics";
import type { ApiHealthMetrics } from "./ApiHealthMetrics";

export type Audit = {
  id: string;
  projectId: string;
  createdAt: string;

  overallScore: number;

  performance: PerformanceMetrics & QualityScore;
  accessibility: AccessibilityMetrics & QualityScore;
  apiHealth: ApiHealthMetrics & QualityScore;

  findings: Finding[];
};
