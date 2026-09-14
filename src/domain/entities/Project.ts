import type { Audit } from "./Audit";

export type Project = {
  id: string;
  name: string;
  latestAudit: Audit | null;
};
