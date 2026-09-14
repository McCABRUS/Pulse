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
        lcp: record.metrics.performance.lcp,
        cls: record.metrics.performance.cls,
        inp: record.metrics.performance.inp,
        score: record.score.performance,
      },

      accessibility: {
        critical: record.metrics.accessibility.critical,
        serious: record.metrics.accessibility.serious,
        moderate: record.metrics.accessibility.moderate,
        minor: record.metrics.accessibility.minor,
        score: record.score.accessibility,
      },

      apiHealth: {
        availability: record.metrics.apiHealth.availability,
        latency: record.metrics.apiHealth.latency,
        errorRate: record.metrics.apiHealth.errorRate,
        score: record.score.api,
      },

      findings: [],
    };
  }
}
