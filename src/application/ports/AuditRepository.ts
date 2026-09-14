import type { Audit } from "@/domain/entities/Audit";

export interface AuditRepository {
  getById(id: string): Promise<Audit | null>;
  getByProjectId(projectId: string): Promise<Audit[]>;
}
