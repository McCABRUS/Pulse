import type { Audit } from "@/domain/entities/Audit";

type ComparisonStatus = "improved" | "regressed" | "unchanged";

type ScoreComparison = {
  previous: number;
  current: number;
  delta: number;
  status: ComparisonStatus;
};

export type AuditComparison = {
  overall: ScoreComparison;
  performance: ScoreComparison;
  accessibility: ScoreComparison;
  apiHealth: ScoreComparison;
};

function compareScores(previous: number, current: number): ScoreComparison {
  const delta = current - previous;

  let status: ComparisonStatus = "unchanged";

  if (delta > 0) {
    status = "improved";
  } else if (delta < 0) {
    status = "regressed";
  }

  return {
    previous,
    current,
    delta,
    status,
  };
}

export function compareAudits(
  previousAudit: Audit,
  currentAudit: Audit,
): AuditComparison {
  if (previousAudit.projectId !== currentAudit.projectId) {
    throw new Error("Audits must belong to the same project.");
  }

  return {
    overall: compareScores(
      previousAudit.overallScore,
      currentAudit.overallScore,
    ),

    performance: compareScores(
      previousAudit.performance.score,
      currentAudit.performance.score,
    ),

    accessibility: compareScores(
      previousAudit.accessibility.score,
      currentAudit.accessibility.score,
    ),

    apiHealth: compareScores(
      previousAudit.apiHealth.score,
      currentAudit.apiHealth.score,
    ),
  };
}
