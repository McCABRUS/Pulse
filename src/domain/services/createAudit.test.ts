import { describe, expect, it } from "vitest";
import { createAudit } from "./createAudit";
import { HealthScoreCalculator } from "./HealthScoreCalculator";
import { PerformanceScoreStrategy } from "./PerformanceScoreStrategy";
import { AccessibilityScoreStrategy } from "./AccessibilityScoreStrategy";
import { ApiHealthScoreStrategy } from "./ApiHealthScoreStrategy";

describe("createAudit", () => {
  it("creates an audit with scores calculated from raw metrics", () => {
    const calculator = new HealthScoreCalculator(
      new PerformanceScoreStrategy(),
      new AccessibilityScoreStrategy(),
      new ApiHealthScoreStrategy(),
    );

    const audit = createAudit(
      {
        id: "audit-2",
        projectId: "project-1",
        createdAt: "2026-09-14T10:00:00Z",
        performance: {
          lcp: 5000,
          cls: 0.3,
          inp: 600,
        },
        accessibility: {
          critical: 0,
          serious: 2,
          moderate: 1,
          minor: 0,
        },
        apiHealth: {
          availability: 95,
          latency: 800,
          errorRate: 8,
        },
        findings: [],
      },
      calculator,
    );

    expect(audit).toEqual({
      id: "audit-2",
      projectId: "project-1",
      createdAt: "2026-09-14T10:00:00Z",
      overallScore: 27,
      performance: {
        lcp: 5000,
        cls: 0.3,
        inp: 600,
        score: 0,
      },
      accessibility: {
        critical: 0,
        serious: 2,
        moderate: 1,
        minor: 0,
        score: 65,
      },
      apiHealth: {
        availability: 95,
        latency: 800,
        errorRate: 8,
        score: 15,
      },
      findings: [],
    });
  });
});
