import Link from "next/link";
import { audits } from "@/infrastructure/data/audits";
import styles from "./page.module.css";

type CompareAuditSelectPageProps = {
  params: Promise<{
    projectId: string;
    currentAuditId: string;
  }>;
};

export default async function CompareAuditSelectPage({
  params,
}: CompareAuditSelectPageProps) {
  const { projectId, currentAuditId } = await params;

  const currentAudit = audits.find(
    (audit) => audit.id === currentAuditId && audit.projectId === projectId,
  );

  if (!currentAudit) {
    return (
      <main className={styles.page}>
        <section className={styles.emptyState}>
          <h1>Audit not found</h1>
          <p>The requested audit could not be found.</p>
        </section>
      </main>
    );
  }

  const previousAudits = audits.filter(
    (audit) =>
      audit.projectId === projectId &&
      audit.id !== currentAuditId &&
      new Date(audit.createdAt) < new Date(currentAudit.createdAt),
  );

  const previousAudit = previousAudits.at(-1);

  if (!previousAudit) {
    return (
      <main className={styles.page}>
        <section className={styles.emptyState}>
          <h1>No previous audit available</h1>
          <p>There is no earlier audit available for comparison.</p>
        </section>
      </main>
    );
  }

  const formatDate = (value: string) =>
    new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
      timeZone: "UTC",
    }).format(new Date(value));

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Audit Comparison</p>

        <h1>Compare Audit</h1>

        <p className={styles.description}>
          Choose an earlier audit to compare with the current audit.
        </p>
      </header>

      <section
        className={styles.auditCard}
        aria-labelledby="current-audit-heading"
      >
        <p className={styles.cardLabel}>Current audit</p>

        <h2 id="current-audit-heading">Audit 2</h2>

        <p className={styles.meta}>{formatDate(currentAudit.createdAt)}</p>

        <p className={styles.score}>Score: {currentAudit.overallScore}</p>
      </section>

      <section
        className={styles.selection}
        aria-labelledby="previous-audit-heading"
      >
        <p className={styles.cardLabel}>Compare with</p>

        <article className={styles.auditOption}>
          <div>
            <h2 id="previous-audit-heading">Audit 1</h2>

            <p className={styles.meta}>{formatDate(previousAudit.createdAt)}</p>

            <p className={styles.score}>Score: {previousAudit.overallScore}</p>
          </div>

          <Link
            className={styles.compareButton}
            href={`/projects/${projectId}/audits/compare/${currentAuditId}?previous=${previousAudit.id}`}
          >
            Compare audits
          </Link>
        </article>
      </section>
    </main>
  );
}
