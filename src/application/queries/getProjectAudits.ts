import type { Audit } from "@/domain/entities/Audit";
import type { AuditRepository } from "@/application/ports/AuditRepository";

export async function getProjectAudits(
  repository: AuditRepository,
  projectId: string,
): Promise<Audit[]> {
  return repository.getByProjectId(projectId);
}
