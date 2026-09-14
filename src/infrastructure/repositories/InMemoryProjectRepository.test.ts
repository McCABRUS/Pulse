import { describe, expect, it } from "vitest";
import type { Project } from "@/domain/entities/Project";
import { InMemoryProjectRepository } from "./InMemoryProjectRepository";

const project: Project = {
  id: "project-1",
  name: "Acme Commerce",
  latestAudit: null,
};

describe("InMemoryProjectRepository", () => {
  it("returns a project by id", async () => {
    const repository = new InMemoryProjectRepository([project]);

    await expect(repository.getById("project-1")).resolves.toEqual(project);
  });

  it("returns null when a project does not exist", async () => {
    const repository = new InMemoryProjectRepository([project]);

    await expect(repository.getById("unknown")).resolves.toBeNull();
  });
});
