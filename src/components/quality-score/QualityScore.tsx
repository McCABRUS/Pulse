import styles from "./QualityScore.module.css";

type QualityScoreProps = {
  label: string;
  score: number;
};

function getScoreStatus(score: number) {
  if (score >= 90) {
    return {
      label: "Excellent",
      className: styles.statusExcellent,
    };
  }

  if (score >= 70) {
    return {
      label: "Good",
      className: styles.statusGood,
    };
  }

  if (score >= 50) {
    return {
      label: "Warning",
      className: styles.statusWarning,
    };
  }

  return {
    label: "Critical",
    className: styles.statusCritical,
  };
}

export function QualityScore({ label, score }: QualityScoreProps) {
  const status = getScoreStatus(score);

  return (
    <div className={styles.score}>
      <span className={styles.label}>{label}</span>

      <div className={styles.valueRow}>
        <span className={styles.value}>{score}</span>

        <span className={`${styles.status} ${status.className}`}>
          {status.label}
        </span>
      </div>
    </div>
  );
}
