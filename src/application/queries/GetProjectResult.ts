import type { Project } from "@/domain/entities/Project";

export type GetProjectResult =
  | {
      status: "found";
      project: Project;
    }
  | {
      status: "not-found";
    };
