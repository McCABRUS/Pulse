import { externalAuditRecordSchema } from "@/infrastructure/validation/externalAuditSchemas";
import type { Audit } from "@/domain/entities/Audit";
import { ExternalAuditAdapter } from "./ExternalAuditAdapter";

export class ExternalAuditIngestionAdapter {
  private readonly adapter: ExternalAuditAdapter;

  constructor(adapter = new ExternalAuditAdapter()) {
    this.adapter = adapter;
  }

  toDomain(payload: unknown): Audit {
    const validatedPayload = externalAuditRecordSchema.parse(payload);

    return this.adapter.toDomain(validatedPayload);
  }
}
