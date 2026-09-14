import type { Project } from "@/domain/entities/Project";

export interface ProjectRepository {
  getById(id: string): Promise<Project | null>;
}
