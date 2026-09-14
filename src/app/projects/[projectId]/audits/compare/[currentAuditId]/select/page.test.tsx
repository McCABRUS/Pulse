import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CompareAuditSelectPage from "./page";

vi.mock("@/infrastructure/data/audits", () => ({
  audits: [
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
      findings: [],
    },
    {
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
    },
  ],
}));

describe("Compare Audit page", () => {
  it("shows the current audit and available previous audit", async () => {
    const page = await CompareAuditSelectPage({
      params: Promise.resolve({
        projectId: "project-1",
        currentAuditId: "audit-2",
      }),
    });

    render(page);

    expect(
      screen.getByRole("heading", {
        name: /compare audit/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("Current audit")).toBeInTheDocument();

    expect(screen.getByText("Audit 2")).toBeInTheDocument();
    expect(screen.getByText("Audit 1")).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: /compare audits/i,
      }),
    ).toHaveAttribute(
      "href",
      "/projects/project-1/audits/compare/audit-2?previous=audit-1",
    );
  });
});
