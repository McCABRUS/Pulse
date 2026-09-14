import type { AuditRepository } from "@/application/ports/AuditRepository";
import { compareAudits as compareAuditDomain } from "@/domain/services/compareAudits";

export type CompareAuditsResult =
  | {
      status: "found";
      comparison: ReturnType<typeof compareAuditDomain>;
    }
  | {
      status: "not-found";
    };

export async function compareAudits(
  repository: AuditRepository,
  previousAuditId: string,
  currentAuditId: string,
): Promise<CompareAuditsResult> {
  const previousAudit = await repository.getById(previousAuditId);

  const currentAudit = await repository.getById(currentAuditId);

  if (!previousAudit || !currentAudit) {
    return {
      status: "not-found",
    };
  }

  return {
    status: "found",
    comparison: compareAuditDomain(previousAudit, currentAudit),
  };
}
