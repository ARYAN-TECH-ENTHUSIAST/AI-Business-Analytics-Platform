"use client";

import Card from "@/components/ui/Card";
import { BarChart, PieChart } from "@/types/chart";

import {
  ResponsiveContainer,
  BarChart as ReBarChart,
  Bar,
 XAxis,
  YAxis,
  Tooltip,
  PieChart as RePieChart,
  Pie,
  Cell,
} from "recharts";

interface Props {
  chart: BarChart | PieChart;
  type: "bar" | "pie";
}

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
];

export default function ChartCard({
  chart,
  type,
}: Props) {
  const data = chart.labels.map((label, index) => ({
    label,
    value: chart.values[index],
  }));

  if (data.length === 0) return null;

  return (
    <Card>
      <h3 className="mb-6 text-lg font-semibold">
        {chart.title}
      </h3>

      <div className="h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
          {type === "bar" ? (
            <ReBarChart data={data}>
              <XAxis
                dataKey="label"
                tick={{ fontSize: 12 }}
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"
                radius={[6, 6, 0, 0]}
                fill="#2563eb"
              />
            </ReBarChart>
          ) : (
            <RePieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="label"
                outerRadius={110}
              >
                {data.map((_, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index % COLORS.length
                      ]
                    }
                  />
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