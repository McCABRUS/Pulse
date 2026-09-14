import { getProject } from "@/application/queries/getProject";
import { toProjectResponse } from "@/infrastructure/api/projectResponse";
import { projects } from "@/infrastructure/data/projects";
import { projectIdSchema } from "@/infrastructure/validation/projectSchemas";
import { InMemoryProjectRepository } from "@/infrastructure/repositories/InMemoryProjectRepository";

const repository = new InMemoryProjectRepository(projects);

type RouteContext = {
  params: Promise<{
    projectId: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { projectId } = await context.params;
  const parsedId = projectIdSchema.safeParse(projectId);

  if (!parsedId.success) {
    return Response.json(
      {
        error: {
          code: "INVALID_PROJECT_ID",
          message: "The project identifier is invalid.",
        },
      },
      {
        status: 400,
      },
    );
  }

  const result = await getProject(repository, parsedId.data);

  if (result.status === "not-found") {
    return Response.json(
      {
        error: {
          code: "PROJECT_NOT_FOUND",
          message: "The requested project could not be found.",
        },
      },
      {
        status: 404,
      },
    );
  }

  return Response.json(toProjectResponse(result.project));
}
