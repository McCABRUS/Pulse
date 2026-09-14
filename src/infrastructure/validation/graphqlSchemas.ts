import { z } from "zod";

export const graphqlRequestSchema = z.object({
  query: z.string().trim().min(1),
  variables: z.record(z.string(), z.unknown()).optional(),
  operationName: z.string().trim().min(1).optional(),
});

export type GraphQLRequestBody = z.infer<typeof graphqlRequestSchema>;
