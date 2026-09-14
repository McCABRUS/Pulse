import { graphql } from "graphql";
import { schema } from "@/infrastructure/graphql/schema";

type GraphQLRequestBody = {
  query: string;
  variables?: Record<string, unknown>;
  operationName?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as GraphQLRequestBody;

  const result = await graphql({
    schema,
    source: body.query,
    variableValues: body.variables,
    operationName: body.operationName,
  });

  return Response.json(result);
}
