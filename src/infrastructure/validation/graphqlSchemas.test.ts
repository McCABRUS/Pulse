import { describe, expect, it } from "vitest";
import { graphqlRequestSchema } from "./graphqlSchemas";

describe("graphqlRequestSchema", () => {
  it("accepts a valid GraphQL request", () => {
    const result = graphqlRequestSchema.safeParse({
      query: 'query { project(id: "project-1") { id } }',
      variables: {
        id: "project-1",
      },
    });

    expect(result.success).toBe(true);
  });

  it("rejects an empty query", () => {
    const result = graphqlRequestSchema.safeParse({
      query: "",
    });

    expect(result.success).toBe(false);
  });

  it("rejects a non-string query", () => {
    const result = graphqlRequestSchema.safeParse({
      query: 123,
    });

    expect(result.success).toBe(false);
  });
});
