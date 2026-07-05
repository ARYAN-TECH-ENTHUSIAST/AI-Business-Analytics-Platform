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
    <section className="space-y-6">

      <div>

        <h2 className="text-2xl font-semibold">
          Visualizations
        </h2>

        <p className="mt-1 text-gray-500">
          Interactive charts generated from your dataset.
        </p>

      </div>

      <div className="grid gap-6 xl:grid-cols-2">

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

    </section>
  );
}