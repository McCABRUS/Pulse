import { compareAudits } from "@/application/queries/compareAudits";
import type { AuditRepository } from "@/application/ports/AuditRepository";
import { audits } from "@/infrastructure/data/audits";
import { InMemoryAuditRepository } from "@/infrastructure/repositories/InMemoryAuditRepository";

const repository: AuditRepository = new InMemoryAuditRepository(audits);

type RouteContext = {
  params: Promise<{
    auditId: string;
  }>;
};

type CompareAuditRequest = {
  previousAuditId?: unknown;
};

export async function POST(request: Request, context: RouteContext) {
  const body = (await request.json()) as CompareAuditRequest;

  if (
    typeof body.previousAuditId !== "string" ||
    body.previousAuditId.trim().length === 0
  ) {
    return Response.json(
      {
        error: {
          code: "INVALID_AUDIT_ID",
          message: "The previous audit identifier is invalid.",
        },
      },
      {
        status: 400,
      },
    );
  }

  const { auditId } = await context.params;

  const result = await compareAudits(repository, body.previousAuditId, auditId);

  if (result.status === "not-found") {
    return Response.json(
      {
        error: {
          code: "AUDIT_NOT_FOUND",
          message: "One or more audits could not be found.",
        },
      },
      {
        status: 404,
      },
    );
  }

  return Response.json({
    comparison: result.comparison,
  });
}
