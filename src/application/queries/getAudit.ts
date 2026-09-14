import type { AuditRepository } from "@/application/ports/AuditRepository";
import type { GetAuditResult } from "./GetAuditResult";

export async function getAudit(
  repository: AuditRepository,
  id: string,
): Promise<GetAuditResult> {
  const audit = await repository.getById(id);

  if (!audit) {
    return {
      status: "not-found",
    };
  }

  return {
    status: "found",
    audit,
  };
}
