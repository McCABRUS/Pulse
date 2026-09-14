import type { Audit } from "@/domain/entities/Audit";

export type GetAuditResult =
  | {
      status: "found";
      audit: Audit;
    }
  | {
      status: "not-found";
    };
