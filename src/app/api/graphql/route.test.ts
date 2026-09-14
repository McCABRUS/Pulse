import { describe, expect, it } from "vitest";
import { POST } from "./route";

describe("POST /api/graphql", () => {
  it("executes a project query", async () => {
    const request = new Request("http://localhost/api/graphql", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query ProjectOverview($id: ID!) {
            project(id: $id) {
              id
              name
              latestAudit {
                overallScore
              }
            }
          }
        `,
        variables: {
          id: "project-1",
        },
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(200);

    await expect(response.json()).resolves.toEqual({
      data: {
        project: {
          id: "project-1",
          name: "Acme Commerce",
          latestAudit: {
            overallScore: 92,
          },
        },
      },
    });
  });

  it("returns GraphQL validation errors for an invalid query", async () => {
    const request = new Request("http://localhost/api/graphql", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            unknownField
          }
        `,
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(200);

    const body = await response.json();

    expect(body.errors).toBeDefined();
    expect(body.data).toBeUndefined();
  });
});
