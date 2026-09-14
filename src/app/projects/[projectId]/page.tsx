import { getProject } from "@/application/queries/getProject";
import { getProjectAudits } from "@/application/queries/getProjectAudits";
import { ProjectOverview } from "@/components/project-overview/ProjectOverview";
import { audits } from "@/infrastructure/data/audits";
import { projects } from "@/infrastructure/data/projects";
import { InMemoryAuditRepository } from "@/infrastructure/repositories/InMemoryAuditRepository";
import { InMemoryProjectRepository } from "@/infrastructure/repositories/InMemoryProjectRepository";

const projectRepository = new InMemoryProjectRepository(projects);
const auditRepository = new InMemoryAuditRepository(audits);

type ProjectPageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectId } = await params;

  const [projectResult, projectAudits] = await Promise.all([
    getProject(projectRepository, projectId),
    getProjectAudits(auditRepository, projectId),
  ]);

  if (projectResult.status === "not-found") {
    return <ProjectOverview project={null} audits={[]} />;
  }

  return (
    <ProjectOverview project={projectResult.project} audits={projectAudits} />
  );
}
