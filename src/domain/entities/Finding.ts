export type FindingSeverity = "critical" | "serious" | "moderate" | "minor";

export type FindingCategory = "performance" | "accessibility" | "api";

export type Finding = {
  id: string;
  severity: FindingSeverity;
  category: FindingCategory;
  title: string;
  description: string;
  evidence: string;
  recommendation: string;
};
