import { describe, expect, it } from "vitest";
import type { Audit } from "@/domain/entities/Audit";
import type { AuditRepository } from "@/application/ports/AuditRepository";
import { getAudit } from "./getAudit";

const audit: Audit = {
  id: "audit-1",
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

describe("getAudit", () => {
  it("returns an audit when the repository finds it", async () => {
    const repository: AuditRepository = {
      getById: async () => audit,
    };

    const result = await getAudit(repository, "audit-1");

    expect(result).toEqual({
      status: "found",
      audit,
    });
  });

  it("returns not-found when the repository does not find the audit", async () => {
    const repository: AuditRepository = {
      getById: async () => null,
    };

    const result = await getAudit(repository, "unknown");

    expect(result).toEqual({
      status: "not-found",
    });
  });
});
