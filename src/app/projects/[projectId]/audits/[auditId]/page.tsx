import { getAudit } from "@/application/queries/getAudit";
import { AuditDetail } from "@/components/audit-detail/AuditDetail";
import { audits } from "@/infrastructure/data/audits";
import { InMemoryAuditRepository } from "@/infrastructure/repositories/InMemoryAuditRepository";

const repository = new InMemoryAuditRepository(audits);

type AuditPageProps = {
  params: Promise<{
    projectId: string;
    auditId: string;
  }>;
};

export default async function AuditPage({ params }: AuditPageProps) {
  const { auditId } = await params;

  const result = await getAudit(repository, auditId);

  if (result.status === "not-found") {
    return <AuditDetail audit={null} />;
  }

  return <AuditDetail audit={result.audit} />;
}
