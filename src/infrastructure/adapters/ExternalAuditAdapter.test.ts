import { describe, expect, it } from "vitest";
import type { Audit } from "@/domain/entities/Audit";
import type { ExternalAuditRecord } from "./ExternalAuditRecord";
import { ExternalAuditAdapter } from "./ExternalAuditAdapter";

const externalAudit: ExternalAuditRecord = {
  audit_id: "external-001",
  project_id: "project-1",
  created_at: "2026-09-13T14:32:00Z",
  score: {
    overall: 92,
    performance: 94,
    accessibility: 98,
    api: 84,
  },
};

describe("ExternalAuditAdapter", () => {
  it("maps an external audit record to a Pulse audit", () => {
    const adapter = new ExternalAuditAdapter();

    const result = adapter.toDomain(externalAudit);

    const expected: Audit = {
      id: "external-001",
      projectId: "project-1",
      createdAt: "2026-09-13T14:32:00Z",
      overallScore: 92,
      performance: {
        score: 94,
      },
      accessibility: {
        score: 98,
      },
      apiHealth: {
        score: 84,
      },
      findings: [],
    };

    expect(result).toEqual(expected);
  });
});
