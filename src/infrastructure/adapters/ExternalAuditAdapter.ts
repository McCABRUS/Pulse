import type { Audit } from "@/domain/entities/Audit";
import type { ExternalAuditRecord } from "./ExternalAuditRecord";

export class ExternalAuditAdapter {
  toDomain(record: ExternalAuditRecord): Audit {
    return {
      id: record.audit_id,
      projectId: record.project_id,
      createdAt: record.created_at,
      overallScore: record.score.overall,
      performance: {
        score: record.score.performance,
      },
      accessibility: {
        score: record.score.accessibility,
      },
      apiHealth: {
        score: record.score.api,
      },
      findings: [],
    };
  }
}
