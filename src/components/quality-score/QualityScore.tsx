type QualityScoreProps = {
  label: string;
  score: number;
};

export function QualityScore({ label, score }: QualityScoreProps) {
  return (
    <div>
      <span>{label}</span>
      <span>{score}</span>
    </div>
  );
}
