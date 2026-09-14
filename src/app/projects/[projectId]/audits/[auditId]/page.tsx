import { getAudit } from "@/application/queries/getAudit";
import { getProjectAudits } from "@/application/queries/getProjectAudits";
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
  const { projectId, auditId } = await params;

  const [auditResult, projectAudits] = await Promise.all([
    getAudit(repository, auditId),
    getProjectAudits(repository, projectId),
  ]);

  if (auditResult.status === "not-found") {
    return <AuditDetail audit={null} />;
  }

  const currentAudit = auditResult.audit;

  const hasPreviousAudit = projectAudits.some(
    (projectAudit) =>
      projectAudit.id !== currentAudit.id &&
      new Date(projectAudit.createdAt).getTime() <
        new Date(currentAudit.createdAt).getTime(),
  );

  return (
    <AuditDetail audit={currentAudit} hasPreviousAudit={hasPreviousAudit} />
  );
}
