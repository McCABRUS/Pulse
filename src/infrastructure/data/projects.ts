import { audits } from "@/infrastructure/data/audits";
import type { Project } from "@/domain/entities/Project";

export const projects: Project[] = [
  {
    id: "project-1",
    name: "Acme Commerce",
    latestAudit: audits.find((audit) => audit.id === "audit-1") ?? null,
  },
];
