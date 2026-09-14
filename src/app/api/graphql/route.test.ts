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

  it("returns 400 for an invalid GraphQL request body", async () => {
    const request = new Request("http://localhost/api/graphql", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        query: 123,
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(400);

    await expect(response.json()).resolves.toEqual({
      error: {
        code: "INVALID_GRAPHQL_REQUEST",
        message: "The GraphQL request body is invalid.",
      },
    });
  });

  it("returns 400 for malformed JSON", async () => {
    const request = new Request("http://localhost/api/graphql", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: '{"query":',
    });

    const response = await POST(request);

    expect(response.status).toBe(400);

    await expect(response.json()).resolves.toEqual({
      error: {
        code: "INVALID_JSON",
        message: "The request body contains invalid JSON.",
      },
    });
  });
});
