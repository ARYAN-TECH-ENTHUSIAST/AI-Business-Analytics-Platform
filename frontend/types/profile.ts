export interface ColumnProfile {
  name: string;
  dtype: string;
  null_count: number;
  null_percentage: number;
}

export interface DatasetProfile {
  total_rows: number;
  total_columns: number;
  memory_usage_mb: number;
  columns: ColumnProfile[];
}