import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { AuditComparison as AuditComparisonResult } from "@/domain/services/compareAudits";
import { AuditComparison } from "./AuditComparison";

const comparison: AuditComparisonResult = {
  overall: {
    previous: 92,
    current: 90,
    delta: -2,
    status: "regressed",
  },
  performance: {
    previous: 94,
    current: 85,
    delta: -9,
    status: "regressed",
  },
  accessibility: {
    previous: 98,
    current: 80,
    delta: -18,
    status: "regressed",
  },
  apiHealth: {
    previous: 84,
    current: 90,
    delta: 6,
    status: "improved",
  },
};

describe("AuditComparison", () => {
  it("renders comparison headings", () => {
    render(<AuditComparison comparison={comparison} />);

    expect(
      screen.getByRole("heading", { name: /audit comparison/i }),
    ).toBeInTheDocument();

    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Current")).toBeInTheDocument();
    expect(screen.getByText("Delta")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("renders all score comparisons", () => {
    render(<AuditComparison comparison={comparison} />);

    expect(screen.getByText("Overall")).toBeInTheDocument();
    expect(screen.getByText("Performance")).toBeInTheDocument();
    expect(screen.getByText("Accessibility")).toBeInTheDocument();
    expect(screen.getByText("API Health")).toBeInTheDocument();

    const rows = screen.getAllByRole("row");

    expect(rows).toHaveLength(5);

    expect(rows[1]).toHaveTextContent("Overall");
    expect(rows[1]).toHaveTextContent("92");
    expect(rows[1]).toHaveTextContent("90");
    expect(rows[1]).toHaveTextContent("-2");

    expect(rows[2]).toHaveTextContent("Performance");
    expect(rows[2]).toHaveTextContent("94");
    expect(rows[2]).toHaveTextContent("85");
    expect(rows[2]).toHaveTextContent("-9");

    expect(rows[3]).toHaveTextContent("Accessibility");
    expect(rows[3]).toHaveTextContent("98");
    expect(rows[3]).toHaveTextContent("80");
    expect(rows[3]).toHaveTextContent("-18");

    expect(rows[4]).toHaveTextContent("API Health");
    expect(rows[4]).toHaveTextContent("84");
    expect(rows[4]).toHaveTextContent("90");
    expect(rows[4]).toHaveTextContent("+6");
  });

  it("renders comparison status as text", () => {
    render(<AuditComparison comparison={comparison} />);

    expect(screen.getAllByText("Regressed")).toHaveLength(3);
    expect(screen.getByText("Improved")).toBeInTheDocument();
  });
});
