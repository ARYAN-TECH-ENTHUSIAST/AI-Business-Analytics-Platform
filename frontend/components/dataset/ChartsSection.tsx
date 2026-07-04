"use client";

import ChartCard from "./ChartCard";
import { ChartResponse } from "@/types/chart";

interface Props {
  charts: ChartResponse;
}

export default function ChartsSection({
  charts,
}: Props) {
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