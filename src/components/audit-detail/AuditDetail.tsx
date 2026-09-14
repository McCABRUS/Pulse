import { QualityScore } from "@/components/quality-score/QualityScore";
import styles from "./AuditDetail.module.css";
import type { Audit } from "@/domain/entities/Audit";

type AuditDetailProps = {
  audit: Audit | null;
  hasPreviousAudit?: boolean;
};

export function AuditDetail({
  audit,
  hasPreviousAudit = false,
}: AuditDetailProps) {
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
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Audit Detail</p>

          <h1 className={styles.title}>Audit Detail</h1>

          <p className={styles.date}>{formattedDate}</p>
        </div>

        <div className={styles.headerActions}>
          {hasPreviousAudit && (
            <a
              className={styles.compareLink}
              href={`/projects/${audit.projectId}/audits/compare/${audit.id}/select`}
            >
              Compare with another audit
            </a>
          )}

          <div className={styles.overall}>
            <span className={styles.overallLabel}>Overall Health</span>

            <span className={styles.overallScore}>{audit.overallScore}</span>
          </div>
        </div>
      </header>

      <section className={styles.section} aria-labelledby="quality-heading">
        <h2 id="quality-heading" className={styles.sectionTitle}>
          Quality
        </h2>

        <div className={styles.scoreGrid}>
          <QualityScore label="Performance" score={audit.performance.score} />

          <QualityScore
            label="Accessibility"
            score={audit.accessibility.score}
          />

          <QualityScore label="API Health" score={audit.apiHealth.score} />
        </div>
      </section>

      <section className={styles.section} aria-labelledby="findings-heading">
        <h2 id="findings-heading" className={styles.sectionTitle}>
          Findings
        </h2>

        <div className={styles.findings}>
          {audit.findings.map((finding) => (
            <article key={finding.id} className={styles.finding}>
              <h3 className={styles.findingTitle}>{finding.title}</h3>

              <span className={styles.findingSeverity}>{finding.severity}</span>

              <p className={styles.findingDescription}>{finding.description}</p>

              <pre className={styles.findingEvidence}>
                <code>{finding.evidence}</code>
              </pre>

              <p className={styles.findingRecommendation}>
                {finding.recommendation}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
