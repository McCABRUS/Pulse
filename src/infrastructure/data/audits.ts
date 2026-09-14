import type { Audit } from "@/domain/entities/Audit";

export const audits: Audit[] = [
  {
    id: "audit-1",
    projectId: "project-1",
    createdAt: "2026-09-13T14:32:00Z",
    overallScore: 92,

    performance: {
      lcp: 1800,
      cls: 0.02,
      inp: 120,
      score: 94,
    },

    accessibility: {
      critical: 0,
      serious: 1,
      moderate: 1,
      minor: 0,
      score: 98,
    },

    apiHealth: {
      availability: 99.95,
      latency: 180,
      errorRate: 0.5,
      score: 84,
    },

    findings: [
      {
        id: "finding-1",
        severity: "serious",
        category: "accessibility",
        title: "Interactive element has no accessible name",
        description:
          "An interactive element does not expose an accessible name to assistive technologies.",
        evidence: 'button[data-action="share"]',
        recommendation:
          "Provide an accessible name that describes the action performed by the control.",
      },
    ],
  },
];
