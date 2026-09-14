import styles from "./AuditComparison.module.css";
import type { AuditComparison as AuditComparisonResult } from "@/domain/services/compareAudits";

type AuditComparisonProps = {
  comparison: AuditComparisonResult;
};

type ComparisonRow = {
  label: string;
  previous: number;
  current: number;
  delta: number;
  status: AuditComparisonResult[keyof AuditComparisonResult]["status"];
};

export function AuditComparison({ comparison }: AuditComparisonProps) {
  const rows: ComparisonRow[] = [
    {
      label: "Overall",
      ...comparison.overall,
    },
    {
      label: "Performance",
      ...comparison.performance,
    },
    {
      label: "Accessibility",
      ...comparison.accessibility,
    },
    {
      label: "API Health",
      ...comparison.apiHealth,
    },
  ];

  return (
    <section
      className={styles.wrapper}
      aria-labelledby="audit-comparison-heading"
    >
      <h1 id="audit-comparison-heading" className={styles.title}>
        Audit Comparison
      </h1>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Dimension</th>
              <th scope="col">Previous</th>
              <th scope="col">Current</th>
              <th scope="col">Delta</th>
              <th scope="col">Status</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                <td>{row.previous}</td>
                <td>{row.current}</td>
                <td
                  className={
                    row.delta > 0
                      ? styles.deltaPositive
                      : row.delta < 0
                        ? styles.deltaNegative
                        : styles.deltaNeutral
                  }
                >
                  {row.delta > 0 ? `+${row.delta}` : row.delta}
                </td>
                <td>
                  <span className={`${styles.status} ${styles[row.status]}`}>
                    {formatStatus(row.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function formatStatus(status: ComparisonRow["status"]): string {
  switch (status) {
    case "improved":
      return "Improved";
    case "regressed":
      return "Regressed";
    case "unchanged":
      return "Unchanged";
  }
}
