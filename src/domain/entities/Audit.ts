import type { Finding } from "./Finding";
import type { QualityScore } from "./QualityScore";

export type Audit = {
  id: string;
  projectId: string;
  createdAt: string;
  overallScore: number;
  performance: QualityScore;
  accessibility: QualityScore;
  apiHealth: QualityScore;
  findings: Finding[];
};
