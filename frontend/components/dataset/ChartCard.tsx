"use client";

import Card from "@/components/ui/Card";

import {
  BarChart,
  PieChart,
} from "@/types/chart";

import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
} from "recharts";

interface Props {
  chart: BarChart | PieChart;
  type: "bar" | "pie";
}

export default function ChartCard({
  chart,
  type,
}: Props) {
  const data = chart.labels.map((label, index) => ({
    label,
    value: chart.values[index],
  }));

  return (
    <Card>
      <h2 className="mb-4 text-xl font-semibold">
        {chart.title}
      </h2>

      <div className="h-80">

        <ResponsiveContainer>

          {type === "bar" ? (

            <ReBarChart data={data}>

              <XAxis dataKey="label" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"
              />

            </ReBarChart>

          ) : (

            <RePieChart>

              <Pie
                data={data}
                dataKey="value"
                nameKey="label"
                outerRadius={100}
              >
                {data.map((_, index) => (
                  <Cell key={index} />
                ))}
              </Pie>

              <Tooltip />

            </RePieChart>

          )}

        </ResponsiveContainer>

      </div>

    </Card>
  );
}