export interface KPI {
  title: string;
  value: string;
}

export interface DashboardResponse {
  kpis: KPI[];
}