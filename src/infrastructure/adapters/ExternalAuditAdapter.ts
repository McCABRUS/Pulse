import type { Audit } from "@/domain/entities/Audit";
import { createAudit } from "@/domain/services/createAudit";
import { ApiHealthScoreStrategy } from "@/domain/services/ApiHealthScoreStrategy";
import { AccessibilityScoreStrategy } from "@/domain/services/AccessibilityScoreStrategy";
import { HealthScoreCalculator } from "@/domain/services/HealthScoreCalculator";
import { PerformanceScoreStrategy } from "@/domain/services/PerformanceScoreStrategy";
import type { ExternalAuditRecord } from "./ExternalAuditRecord";

const calculator = new HealthScoreCalculator(
  new PerformanceScoreStrategy(),
  new AccessibilityScoreStrategy(),
  new ApiHealthScoreStrategy(),
);

export class ExternalAuditAdapter {
  toDomain(record: ExternalAuditRecord): Audit {
    return createAudit(
      {
        id: record.audit_id,
        projectId: record.project_id,
        createdAt: record.created_at,
        performance: record.metrics.performance,
        accessibility: record.metrics.accessibility,
        apiHealth: record.metrics.apiHealth,
        findings: [],
      },
      calculator,
    );
  }
}
