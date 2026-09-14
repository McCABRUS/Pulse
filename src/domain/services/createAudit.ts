import type { Audit } from "@/domain/entities/Audit";
import type { HealthScoreCalculator } from "./HealthScoreCalculator";

type CreateAuditInput = {
  id: string;
  projectId: string;
  createdAt: string;

  performance: {
    lcp: number;
    cls: number;
    inp: number;
  };

  accessibility: {
    critical: number;
    serious: number;
    moderate: number;
    minor: number;
  };

  apiHealth: {
    availability: number;
    latency: number;
    errorRate: number;
  };

  findings: Audit["findings"];
};

export function createAudit(
  input: CreateAuditInput,
  calculator: HealthScoreCalculator,
): Audit {
  const scores = calculator.calculate({
    performance: input.performance,
    accessibility: input.accessibility,
    apiHealth: input.apiHealth,
  });

  return {
    id: input.id,
    projectId: input.projectId,
    createdAt: input.createdAt,
    overallScore: scores.overall,

    performance: {
      ...input.performance,
      score: scores.performance,
    },

    accessibility: {
      ...input.accessibility,
      score: scores.accessibility,
    },

    apiHealth: {
      ...input.apiHealth,
      score: scores.apiHealth,
    },

    findings: input.findings,
  };
}
