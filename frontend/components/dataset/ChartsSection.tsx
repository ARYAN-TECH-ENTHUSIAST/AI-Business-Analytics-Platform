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
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
        <h3 className="text-lg font-semibold text-gray-700">
          No charts available
        </h3>

        <p className="mt-2 text-sm text-gray-500">
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