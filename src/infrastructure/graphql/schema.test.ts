import { describe, expect, it } from "vitest";
import { graphql } from "graphql";
import { schema } from "./schema";

describe("GraphQL project query", () => {
  it("returns a project by id", async () => {
    const query = `
      query ProjectOverview($id: ID!) {
        project(id: $id) {
          id
          name
        }
      }
    `;

    const result = await graphql({
      schema,
      source: query,
      variableValues: {
        id: "project-1",
      },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data).toEqual({
      project: {
        id: "project-1",
        name: "Acme Commerce",
      },
    });
  });

  it("returns latest audit data for a project", async () => {
    const query = `
    query ProjectOverview($id: ID!) {
      project(id: $id) {
        id
        name
        latestAudit {
          id
          createdAt
          overallScore
          performance {
            score
          }
          accessibility {
            score
          }
          apiHealth {
            score
          }
        }
      }
    }
  `;

    const result = await graphql({
      schema,
      source: query,
      variableValues: {
        id: "project-1",
      },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data).toEqual({
      project: {
        id: "project-1",
        name: "Acme Commerce",
        latestAudit: {
          id: "audit-1",
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
        },
      },
    });
  });

  it("returns only the fields requested by the client", async () => {
    const query = `
    query ProjectSummary($id: ID!) {
      project(id: $id) {
        id
        name
        latestAudit {
          overallScore
        }
      }
    }
  `;

    const result = await graphql({
      schema,
      source: query,
      variableValues: {
        id: "project-1",
      },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data).toEqual({
      project: {
        id: "project-1",
        name: "Acme Commerce",
        latestAudit: {
          overallScore: 92,
        },
      },
    });
  });
});
