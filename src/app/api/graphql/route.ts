import { graphql } from "graphql";
import { schema } from "@/infrastructure/graphql/schema";
import { graphqlRequestSchema } from "@/infrastructure/validation/graphqlSchemas";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      {
        error: {
          code: "INVALID_JSON",
          message: "The request body contains invalid JSON.",
        },
      },
      {
        status: 400,
      },
    );
  }

  const parsedBody = graphqlRequestSchema.safeParse(body);

  if (!parsedBody.success) {
    return Response.json(
      {
        error: {
          code: "INVALID_GRAPHQL_REQUEST",
          message: "The GraphQL request body is invalid.",
        },
      },
      {
        status: 400,
      },
    );
  }

  const result = await graphql({
    schema,
    source: parsedBody.data.query,
    variableValues: parsedBody.data.variables,
    operationName: parsedBody.data.operationName,
  });

  return Response.json(result);
}
