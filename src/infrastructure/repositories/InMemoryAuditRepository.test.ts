import { describe, expect, it } from "vitest";
import { InMemoryAuditRepository } from "./InMemoryAuditRepository";
import { audits } from "@/infrastructure/data/audits";

describe("InMemoryAuditRepository", () => {
  it("returns all audits for a project ordered by creation date", async () => {
    const repository = new InMemoryAuditRepository(audits);

    const result = await repository.getByProjectId("project-1");

    expect(result.map((audit) => audit.id)).toEqual(["audit-1", "audit-2"]);
  });

  it("returns an audit by id", async () => {
    const repository = new InMemoryAuditRepository(audits);

    const result = await repository.getById("audit-2");

    expect(result?.id).toBe("audit-2");
  });
});
