export interface ScoreStrategy<TInput> {
  calculate(input: TInput): number;
}
