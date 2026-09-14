import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Audit } from "@/domain/entities/Audit";
import { AuditDetail } from "./AuditDetail";

const audit: Audit = {
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
};

describe("AuditDetail", () => {
  it("renders the audit detail heading", () => {
    render(<AuditDetail audit={audit} />);

    expect(
      screen.getByRole("heading", { name: /audit detail/i }),
    ).toBeInTheDocument();
  });

  it("renders the audit creation date", () => {
    render(<AuditDetail audit={audit} />);

    expect(screen.getByText("September 13, 2026")).toBeInTheDocument();
  });

  it("renders the overall audit score", () => {
    render(<AuditDetail audit={audit} />);

    expect(screen.getByText("92")).toBeInTheDocument();
  });

  it("renders the quality dimension scores", () => {
    render(<AuditDetail audit={audit} />);

    expect(screen.getByText("Performance")).toBeInTheDocument();
    expect(screen.getByText("94")).toBeInTheDocument();

    expect(screen.getByText("Accessibility")).toBeInTheDocument();
    expect(screen.getByText("98")).toBeInTheDocument();

    expect(screen.getByText("API Health")).toBeInTheDocument();
    expect(screen.getByText("84")).toBeInTheDocument();
  });

  it("renders audit findings", () => {
    const auditWithFinding: Audit = {
      ...audit,
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
    };

    render(<AuditDetail audit={auditWithFinding} />);

    expect(
      screen.getByRole("heading", {
        name: /interactive element has no accessible name/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("Serious")).toBeInTheDocument();
  });

  it("renders a not-found state when the audit does not exist", () => {
    render(<AuditDetail audit={null} />);

    expect(
      screen.getByRole("heading", { name: /audit not found/i }),
    ).toBeInTheDocument();
  });
});
