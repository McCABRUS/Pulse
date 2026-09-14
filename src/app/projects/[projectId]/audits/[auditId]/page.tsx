import { getAudit } from "@/application/queries/getAudit";
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
    return (
      <main>
        <h1>Audit not found</h1>
      </main>
    );
  }

  return (
    <main>
      <h1>Audit Detail</h1>
      <p>{result.audit.overallScore}</p>
    </main>
  );
}
