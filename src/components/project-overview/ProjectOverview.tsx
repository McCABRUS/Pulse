import { QualityScore } from "@/components/quality-score/QualityScore";
import type { Project } from "@/domain/entities/Project";

type ProjectOverviewProps = {
  project: Project | null;
};

export function ProjectOverview({ project }: ProjectOverviewProps) {
  if (!project) {
    return (
      <section>
        <h1>Project not found</h1>
        <p>The requested project could not be found.</p>
      </section>
    );
  }

  const { latestAudit } = project;

  return (
    <section>
      <h1>{project.name}</h1>

      {latestAudit && (
        <>
          <p>{latestAudit.overallScore}</p>

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

          <p>
            {new Intl.DateTimeFormat("en-US", {
              dateStyle: "long",
              timeZone: "UTC",
            }).format(new Date(latestAudit.createdAt))}
          </p>

          <a href={`/projects/${project.id}/audits/${latestAudit.id}`}>
            Latest audit
          </a>
        </>
      )}
    </section>
  );
}
