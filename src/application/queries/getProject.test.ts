import { describe, expect, it } from "vitest";
import type { Project } from "@/domain/entities/Project";
import type { ProjectRepository } from "@/application/ports/ProjectRepository";
import { getProject } from "./getProject";

const project: Project = {
  id: "project-1",
  name: "Acme Commerce",
  latestAudit: null,
};

describe("getProject", () => {
  it("returns a project when the repository finds it", async () => {
    const repository: ProjectRepository = {
      getById: async () => project,
    };

    const result = await getProject(repository, "project-1");

    expect(result).toEqual({
      status: "found",
      project,
    });
  });

  it("returns not-found when the repository does not find the project", async () => {
    const repository: ProjectRepository = {
      getById: async () => null,
    };

    const result = await getProject(repository, "unknown");

    expect(result).toEqual({
      status: "not-found",
    });
  });
});
