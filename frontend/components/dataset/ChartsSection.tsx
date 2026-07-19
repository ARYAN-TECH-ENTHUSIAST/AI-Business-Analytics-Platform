"use client";

import ChartCard from "./ChartCard";
import { ChartResponse } from "@/types/chart";

interface Props {
  charts: ChartResponse;
}

export default function ChartsSection({
  charts,
}: Props) {
  const availableCharts = [
    charts.bar_chart,
    charts.pie_chart,
  ].filter(Boolean);

  if (availableCharts.length === 0) {
    return (
      <div className="rounded-[28px] border border-dashed border-slate-300 bg-gradient-to-br from-white via-slate-50 to-emerald-50/40 p-16 text-center shadow-sm ring-1 ring-slate-100">
        <h3 className="text-xl font-semibold tracking-tight text-slate-900">
          No charts available
        </h3>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
          Upload a richer dataset to generate visualizations.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {charts.bar_chart && (
        <ChartCard
          chart={charts.bar_chart}
          type="bar"
        />
      )}

      {charts.pie_chart && (
        <ChartCard
          chart={charts.pie_chart}
          type="pie"
        />
      )}
    </div>
  );
}