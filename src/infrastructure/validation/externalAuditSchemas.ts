import { z } from "zod";

export const externalAuditRecordSchema = z.object({
  audit_id: z.string().min(1),
  project_id: z.string().min(1),
  created_at: z.string().datetime(),

  score: z.object({
    overall: z.number().int().min(0).max(100),
    performance: z.number().int().min(0).max(100),
    accessibility: z.number().int().min(0).max(100),
    api: z.number().int().min(0).max(100),
  }),

  metrics: z.object({
    performance: z.object({
      lcp: z.number().nonnegative(),
      cls: z.number().nonnegative(),
      inp: z.number().nonnegative(),
    }),

    accessibility: z.object({
      critical: z.number().int().nonnegative(),
      serious: z.number().int().nonnegative(),
      moderate: z.number().int().nonnegative(),
      minor: z.number().int().nonnegative(),
    }),

    apiHealth: z.object({
      availability: z.number().min(0).max(100),
      latency: z.number().nonnegative(),
      errorRate: z.number().min(0).max(100),
    }),
  }),
});

export type ExternalAuditRecord = z.infer<typeof externalAuditRecordSchema>;
