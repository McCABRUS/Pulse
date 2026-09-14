import type { Project } from "@/domain/entities/Project";

export type ProjectResponse = {
  project: Project;
};

export function toProjectResponse(project: Project): ProjectResponse {
  return {
    project,
  };
}
