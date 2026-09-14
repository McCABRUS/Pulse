import type { ProjectRepository } from "@/application/ports/ProjectRepository";
import type { GetProjectResult } from "./GetProjectResult";

export async function getProject(
  repository: ProjectRepository,
  id: string,
): Promise<GetProjectResult> {
  const project = await repository.getById(id);

  if (!project) {
    return {
      status: "not-found",
    };
  }

  return {
    status: "found",
    project,
  };
}
