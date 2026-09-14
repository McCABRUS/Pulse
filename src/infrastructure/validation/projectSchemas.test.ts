import { describe, expect, it } from "vitest";
import { projectIdSchema } from "./projectSchemas";

describe("projectIdSchema", () => {
  it("accepts a valid project id", () => {
    expect(projectIdSchema.safeParse("project-1").success).toBe(true);
  });

  it("rejects an empty project id", () => {
    expect(projectIdSchema.safeParse("").success).toBe(false);
  });

  it("trims whitespace", () => {
    expect(projectIdSchema.parse(" project-1 ")).toBe("project-1");
  });
});
