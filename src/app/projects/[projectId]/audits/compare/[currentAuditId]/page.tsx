import { compareAudits } from "@/application/queries/compareAudits";
import { AuditComparison } from "@/components/audit-comparison/AuditComparison";
import { audits } from "@/infrastructure/data/audits";
import { InMemoryAuditRepository } from "@/infrastructure/repositories/InMemoryAuditRepository";

const repository = new InMemoryAuditRepository(audits);

type CompareAuditPageProps = {
  params: Promise<{
    projectId: string;
    currentAuditId: string;
  }>;
  searchParams: Promise<{
    previous?: string;
  }>;
};

export default async function CompareAuditPage({
  params,
  searchParams,
}: CompareAuditPageProps) {
  const { currentAuditId } = await params;
  const { previous } = await searchParams;

  if (!previous) {
    return (
      <main>
        <h1>Comparison unavailable</h1>
        <p>A previous audit must be selected.</p>
      </main>
    );
  }

  const result = await compareAudits(repository, previous, currentAuditId);

  if (result.status === "not-found") {
    return (
      <main>
        <h1>Comparison unavailable</h1>
        <p>One or more audits could not be found.</p>
      </main>
    );
  }

  return (
    <main>
      <AuditComparison comparison={result.comparison} />
    </main>
  );
}
