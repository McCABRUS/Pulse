import { describe, expect, it } from "vitest";
import { ExternalAuditIngestionAdapter } from "./ExternalAuditIngestionAdapter";

describe("ExternalAuditIngestionAdapter", () => {
  it("validates and maps a valid external audit payload", () => {
    const adapter = new ExternalAuditIngestionAdapter();

    const result = adapter.toDomain({
      audit_id: "external-001",
      project_id: "project-1",
      created_at: "2026-09-13T14:32:00Z",
      score: {
        overall: 92,
        performance: 94,
        accessibility: 98,
        api: 84,
      },
    });

    expect(result).toEqual({
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
    });
  });

  it("rejects malformed external data", () => {
    const adapter = new ExternalAuditIngestionAdapter();

    expect(() =>
      adapter.toDomain({
        audit_id: "external-001",
        project_id: "project-1",
        created_at: "invalid-date",
        score: {
          overall: 92,
          performance: 94,
          accessibility: 98,
          api: 84,
        },
      }),
    ).toThrow();
  });
});
