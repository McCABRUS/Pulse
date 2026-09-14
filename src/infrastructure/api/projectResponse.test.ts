import { describe, expect, it } from "vitest";
import type { Project } from "@/domain/entities/Project";
import { toProjectResponse } from "./projectResponse";

const project: Project = {
  id: "project-1",
  name: "Acme Commerce",
  latestAudit: null,
};

describe("toProjectResponse", () => {
  it("wraps a project in the API response", () => {
    expect(toProjectResponse(project)).toEqual({
      project,
    });
  });
});
