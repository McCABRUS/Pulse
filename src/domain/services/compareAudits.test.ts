import { describe, expect, it } from "vitest";
import type { Audit } from "@/domain/entities/Audit";
import { compareAudits } from "./compareAudits";

const previousAudit: Audit = {
  id: "audit-1",
  projectId: "project-1",
  createdAt: "2026-09-13T14:32:00Z",
  overallScore: 80,
  performance: {
    lcp: 3500,
    cls: 0.2,
    inp: 300,
    score: 70,
  },
  accessibility: {
    critical: 0,
    serious: 2,
    moderate: 2,
    minor: 1,
    score: 80,
  },
  apiHealth: {
    availability: 98,
    latency: 500,
    errorRate: 3,
    score: 90,
  },
  findings: [],
};

const currentAudit: Audit = {
  id: "audit-2",
  projectId: "project-1",
  createdAt: "2026-09-14T14:32:00Z",
  overallScore: 90,
  performance: {
    lcp: 2200,
    cls: 0.08,
    inp: 180,
    score: 85,
  },
  accessibility: {
    critical: 0,
    serious: 1,
    moderate: 2,
    minor: 1,
    score: 80,
  },
  apiHealth: {
    availability: 99.5,
    latency: 250,
    errorRate: 1,
    score: 90,
  },
  findings: [],
};

describe("compareAudits", () => {
  it("compares overall and dimension scores", () => {
    const result = compareAudits(previousAudit, currentAudit);

    expect(result).toEqual({
      overall: {
        previous: 80,
        current: 90,
        delta: 10,
        status: "improved",
      },
      performance: {
        previous: 70,
        current: 85,
        delta: 15,
        status: "improved",
      },
      accessibility: {
        previous: 80,
        current: 80,
        delta: 0,
        status: "unchanged",
      },
      apiHealth: {
        previous: 90,
        current: 90,
        delta: 0,
        status: "unchanged",
      },
    });
  });

  it("rejects audits that belong to different projects", () => {
    const differentProjectAudit: Audit = {
      ...currentAudit,
      projectId: "project-2",
    };

    expect(() => compareAudits(previousAudit, differentProjectAudit)).toThrow(
      "Audits must belong to the same project.",
    );
  });
});
