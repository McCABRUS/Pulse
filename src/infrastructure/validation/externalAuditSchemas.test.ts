import { describe, expect, it } from "vitest";
import { externalAuditRecordSchema } from "./externalAuditSchemas";

describe("externalAuditRecordSchema", () => {
  it("accepts a valid external audit record", () => {
    const result = externalAuditRecordSchema.safeParse({
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

    expect(result.success).toBe(true);
  });

  it("rejects scores outside the supported range", () => {
    const result = externalAuditRecordSchema.safeParse({
      audit_id: "external-001",
      project_id: "project-1",
      created_at: "2026-09-13T14:32:00Z",
      score: {
        overall: 101,
        performance: 94,
        accessibility: 98,
        api: 84,
      },
    });

    expect(result.success).toBe(false);
  });

  it("rejects an invalid timestamp", () => {
    const result = externalAuditRecordSchema.safeParse({
      audit_id: "external-001",
      project_id: "project-1",
      created_at: "not-a-date",
      score: {
        overall: 92,
        performance: 94,
        accessibility: 98,
        api: 84,
      },
    });

    expect(result.success).toBe(false);
  });
});
