import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("GET /api/projects/:id", () => {
  it("returns the requested project", async () => {
    const request = new Request("http://localhost/api/projects/project-1");

    const response = await GET(request, {
      params: Promise.resolve({
        projectId: "project-1",
      }),
    });

    expect(response.status).toBe(200);

    await expect(response.json()).resolves.toEqual(
      expect.objectContaining({
        project: expect.objectContaining({
          id: "project-1",
          name: "Acme Commerce",
        }),
      }),
    );
  });

  it("returns 404 when the project does not exist", async () => {
    const request = new Request("http://localhost/api/projects/unknown");

    const response = await GET(request, {
      params: Promise.resolve({
        projectId: "unknown",
      }),
    });

    expect(response.status).toBe(404);

    await expect(response.json()).resolves.toEqual({
      error: {
        code: "PROJECT_NOT_FOUND",
        message: "The requested project could not be found.",
      },
    });
  });
});
