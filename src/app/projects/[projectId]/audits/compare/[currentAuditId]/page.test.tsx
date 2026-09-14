import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CompareAuditPage from "./page";

vi.mock("@/application/queries/compareAudits", () => ({
  compareAudits: vi.fn(),
}));

describe("Audit comparison page", () => {
  it("renders the comparison result", async () => {
    const { compareAudits } =
      await import("@/application/queries/compareAudits");

    vi.mocked(compareAudits).mockResolvedValue({
      status: "found",
      comparison: {
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
      },
    });

    const page = await CompareAuditPage({
      params: Promise.resolve({
        projectId: "project-1",
        currentAuditId: "audit-2",
      }),
      searchParams: Promise.resolve({
        previous: "audit-1",
      }),
    });

    render(page);

    expect(
      screen.getByRole("heading", {
        name: /audit comparison/i,
      }),
    ).toBeInTheDocument();

    const rows = screen.getAllByRole("row");

    expect(rows).toHaveLength(5);

    const overallRow = within(rows[1]);
    expect(overallRow.getByRole("rowheader")).toHaveTextContent("Overall");
    expect(overallRow.getByText("92")).toBeInTheDocument();
    expect(overallRow.getByText("90")).toBeInTheDocument();
    expect(overallRow.getByText("-2")).toBeInTheDocument();
    expect(overallRow.getByText("Regressed")).toBeInTheDocument();

    const performanceRow = within(rows[2]);
    expect(performanceRow.getByRole("rowheader")).toHaveTextContent(
      "Performance",
    );
    expect(performanceRow.getByText("94")).toBeInTheDocument();
    expect(performanceRow.getByText("85")).toBeInTheDocument();
    expect(performanceRow.getByText("-9")).toBeInTheDocument();
    expect(performanceRow.getByText("Regressed")).toBeInTheDocument();

    const accessibilityRow = within(rows[3]);
    expect(accessibilityRow.getByRole("rowheader")).toHaveTextContent(
      "Accessibility",
    );
    expect(accessibilityRow.getByText("98")).toBeInTheDocument();
    expect(accessibilityRow.getByText("80")).toBeInTheDocument();
    expect(accessibilityRow.getByText("-18")).toBeInTheDocument();
    expect(accessibilityRow.getByText("Regressed")).toBeInTheDocument();

    const apiHealthRow = within(rows[4]);
    expect(apiHealthRow.getByRole("rowheader")).toHaveTextContent("API Health");
    expect(apiHealthRow.getByText("84")).toBeInTheDocument();
    expect(apiHealthRow.getByText("90")).toBeInTheDocument();
    expect(apiHealthRow.getByText("+6")).toBeInTheDocument();
    expect(apiHealthRow.getByText("Improved")).toBeInTheDocument();
  });
});
