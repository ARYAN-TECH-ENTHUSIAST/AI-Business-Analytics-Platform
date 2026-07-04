export interface BarChart {
  title: string;
  labels: string[];
  values: number[];
}

export interface PieChart {
  title: string;
  labels: string[];
  values: number[];
}

export interface ChartResponse {
  bar_chart: BarChart | null;
  pie_chart: PieChart | null;
}