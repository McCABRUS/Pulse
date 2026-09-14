import type { Audit } from "@/domain/entities/Audit";
import type { AuditRepository } from "@/application/ports/AuditRepository";

export class InMemoryAuditRepository implements AuditRepository {
  private readonly audits: Audit[];

  constructor(audits: Audit[]) {
    this.audits = audits;
  }

  async getById(id: string): Promise<Audit | null> {
    return this.audits.find((audit) => audit.id === id) ?? null;
  }
}
