import { describe, expect, it } from "vitest";
import { POST } from "./route";

describe("POST /api/audits/:id/compare", () => {
  it("returns the comparison for two audits", async () => {
    const request = new Request("http://localhost/api/audits/audit-2/compare", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        previousAuditId: "audit-1",
      }),
    });

    const response = await POST(request, {
      params: Promise.resolve({
        auditId: "audit-2",
      }),
    });

    expect(response.status).toBe(200);

    await expect(response.json()).resolves.toEqual({
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
  });

  it("returns 404 when one of the audits does not exist", async () => {
    const request = new Request("http://localhost/api/audits/audit-2/compare", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        previousAuditId: "unknown",
      }),
    });

    const response = await POST(request, {
      params: Promise.resolve({
        auditId: "audit-2",
      }),
    });

    expect(response.status).toBe(404);

    await expect(response.json()).resolves.toEqual({
      error: {
        code: "AUDIT_NOT_FOUND",
        message: "One or more audits could not be found.",
      },
    });
  });
});
