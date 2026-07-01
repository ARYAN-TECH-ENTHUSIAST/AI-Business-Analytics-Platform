export interface NumericSummary {
  column: string;
  mean: number;
  median: number;
  minimum: number;
  maximum: number;
  std: number;
}

export interface AnalyticsSummary {
  numeric_columns: NumericSummary[];
}