import { describe, expect, it } from "vitest";
import { getProjectAudits } from "./getProjectAudits";
import { InMemoryAuditRepository } from "@/infrastructure/repositories/InMemoryAuditRepository";
import { audits } from "@/infrastructure/data/audits";

describe("getProjectAudits", () => {
  it("returns the audits for a project", async () => {
    const repository = new InMemoryAuditRepository(audits);

    const result = await getProjectAudits(repository, "project-1");

    expect(result.map((audit) => audit.id)).toEqual(["audit-1", "audit-2"]);
  });

  it("returns an empty list when the project has no audits", async () => {
    const repository = new InMemoryAuditRepository(audits);

    const result = await getProjectAudits(repository, "project-without-audits");

    expect(result).toEqual([]);
  });
});
