import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Project } from "@/domain/entities/Project";
import { ProjectOverview } from "./ProjectOverview";

const project: Project = {
  id: "project-1",
  name: "Acme Commerce",
  latestAudit: {
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
};

describe("ProjectOverview", () => {
  it("renders the project name", () => {
    render(<ProjectOverview project={project} />);

    expect(
      screen.getByRole("heading", { name: "Acme Commerce" }),
    ).toBeInTheDocument();
  });

  it("renders the overall health score", () => {
    render(<ProjectOverview project={project} />);

    expect(screen.getByText("92")).toBeInTheDocument();
  });

  it("renders the quality dimension scores", () => {
    render(<ProjectOverview project={project} />);

    expect(screen.getByText("94")).toBeInTheDocument();
    expect(screen.getByText("98")).toBeInTheDocument();
    expect(screen.getByText("84")).toBeInTheDocument();
  });

  it("renders the latest audit date", () => {
    render(<ProjectOverview project={project} />);

    expect(
      screen.getByText(/Latest audit · September 13, 2026/i),
    ).toBeInTheDocument();
  });

  it("provides a link to the latest audit", () => {
    render(<ProjectOverview project={project} />);

    expect(screen.getByRole("link", { name: /view audit/i })).toHaveAttribute(
      "href",
      "/projects/project-1/audits/audit-1",
    );
  });

  it("renders a not-found state when the project does not exist", () => {
    render(<ProjectOverview project={null} />);

    expect(
      screen.getByRole("heading", { name: /project not found/i }),
    ).toBeInTheDocument();
  });

  it("renders the project overview sections", () => {
    render(<ProjectOverview project={project} />);

    expect(
      screen.getByRole("heading", { name: "Acme Commerce" }),
    ).toBeInTheDocument();

    expect(screen.getByText("Overall Health")).toBeInTheDocument();

    expect(screen.getByText("Latest Audit")).toBeInTheDocument();

    expect(screen.getAllByText("Excellent")).toHaveLength(2);

    expect(screen.getByText("Good")).toBeInTheDocument();
  });

  it("renders an empty state when the project has no audits", () => {
    const projectWithoutAudit = {
      ...project,
      latestAudit: null,
    };

    render(<ProjectOverview project={projectWithoutAudit} />);

    expect(
      screen.getByRole("heading", { name: /no audits yet/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("This project does not have an audit available."),
    ).toBeInTheDocument();
  });
});
