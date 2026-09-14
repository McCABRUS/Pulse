import type { Finding } from "@/domain/entities/Finding";

type FindingItemProps = {
  finding: Finding;
};

const severityLabels: Record<Finding["severity"], string> = {
  critical: "Critical",
  serious: "Serious",
  moderate: "Moderate",
  minor: "Minor",
};

export function FindingItem({ finding }: FindingItemProps) {
  return (
    <article>
      <h2>{finding.title}</h2>
      <p>
        <span>Severity:</span>{" "}
        <strong>{severityLabels[finding.severity]}</strong>
      </p>
      <p>{finding.description}</p>
    </article>
  );
}
