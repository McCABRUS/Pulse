import { FindingItem } from "@/components/finding-item/FindingItem";
import { QualityScore } from "@/components/quality-score/QualityScore";
import type { Audit } from "@/domain/entities/Audit";

type AuditDetailProps = {
  audit: Audit | null;
};

export function AuditDetail({ audit }: AuditDetailProps) {
  if (!audit) {
    return (
      <main>
        <h1>Audit not found</h1>
        <p>The requested audit could not be found.</p>
      </main>
    );
  }

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(audit.createdAt));

  return (
    <main>
      <h1>Audit Detail</h1>

      <p>{formattedDate}</p>

      <p>{audit.overallScore}</p>

      <QualityScore label="Performance" score={audit.performance.score} />

      <QualityScore label="Accessibility" score={audit.accessibility.score} />

      <QualityScore label="API Health" score={audit.apiHealth.score} />

      <section aria-labelledby="findings-heading">
        <h2 id="findings-heading">Findings</h2>

        {audit.findings.map((finding) => (
          <FindingItem key={finding.id} finding={finding} />
        ))}
      </section>
    </main>
  );
}
