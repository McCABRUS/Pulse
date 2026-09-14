import type { AuditRepository } from "@/application/ports/AuditRepository";
import type { Audit } from "@/domain/entities/Audit";

export class InMemoryAuditRepository implements AuditRepository {
  private readonly audits: Audit[];

  constructor(audits: Audit[]) {
    this.audits = audits;
  }

  async getById(id: string): Promise<Audit | null> {
    return this.audits.find((audit) => audit.id === id) ?? null;
  }

  async getByProjectId(projectId: string): Promise<Audit[]> {
    return this.audits
      .filter((audit) => audit.projectId === projectId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
  }
}
