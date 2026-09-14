import type { ProjectRepository } from "@/application/ports/ProjectRepository";
import type { Project } from "@/domain/entities/Project";

export class InMemoryProjectRepository implements ProjectRepository {
  private readonly projects: Project[];

  constructor(projects: Project[]) {
    this.projects = projects;
  }

  async getById(id: string): Promise<Project | null> {
    return this.projects.find((project) => project.id === id) ?? null;
  }
}
