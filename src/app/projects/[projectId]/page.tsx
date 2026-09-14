import { getProject } from "@/application/queries/getProject";
import { ProjectOverview } from "@/components/project-overview/ProjectOverview";
import { projects } from "@/infrastructure/data/projects";
import { InMemoryProjectRepository } from "@/infrastructure/repositories/InMemoryProjectRepository";

const repository = new InMemoryProjectRepository(projects);

type ProjectPageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectId } = await params;
  const result = await getProject(repository, projectId);

  if (result.status === "not-found") {
    return <ProjectOverview project={null} />;
  }

  return <ProjectOverview project={result.project} />;
}
