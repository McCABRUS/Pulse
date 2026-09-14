import { QualityScore } from "@/components/quality-score/QualityScore";
import type { Project } from "@/domain/entities/Project";
import styles from "./ProjectOverview.module.css";

type ProjectOverviewProps = {
  project: Project | null;
};

export function ProjectOverview({ project }: ProjectOverviewProps) {
  if (!project) {
    return (
      <main className={styles.page}>
        <section className={styles.emptyState}>
          <h1>Project not found</h1>
          <p>The requested project could not be found.</p>
        </section>
      </main>
    );
  }

  const { latestAudit } = project;

  return (
    <main className={styles.page}>
      <section className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Project</p>
          <h1>{project.name}</h1>

          {latestAudit && (
            <p className={styles.auditMeta}>
              Latest audit ·{" "}
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "long",
                timeZone: "UTC",
              }).format(new Date(latestAudit.createdAt))}
            </p>
          )}
        </div>

        {latestAudit && (
          <div className={styles.overall}>
            <span className={styles.overallLabel}>Overall Health</span>

            <span className={styles.overallScore}>
              {latestAudit.overallScore}
            </span>
          </div>
        )}
      </section>

      {latestAudit ? (
        <>
          <section className={styles.metrics} aria-labelledby="quality-heading">
            <h2 id="quality-heading" className={styles.sectionTitle}>
              Quality
            </h2>

            <div className={styles.metricGrid}>
              <QualityScore
                label="Performance"
                score={latestAudit.performance.score}
              />

              <QualityScore
                label="Accessibility"
                score={latestAudit.accessibility.score}
              />

              <QualityScore
                label="API Health"
                score={latestAudit.apiHealth.score}
              />

              <article className={styles.auditCard}>
                <div>
                  <p className={styles.cardLabel}>Latest Audit</p>
                  <p className={styles.cardText}>
                    Review the complete audit findings and metrics.
                  </p>
                </div>

                <a
                  className={styles.auditLink}
                  href={`/projects/${project.id}/audits/${latestAudit.id}`}
                >
                  View audit
                  <span aria-hidden="true">→</span>
                </a>
              </article>
            </div>
          </section>
        </>
      ) : (
        <section className={styles.emptyState}>
          <h2>No audits yet</h2>
          <p>This project does not have an audit available.</p>
        </section>
      )}
    </main>
  );
}
