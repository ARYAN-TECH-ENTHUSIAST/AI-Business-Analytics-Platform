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
  "#10b981",
  "#0ea5e9",
  "#6366f1",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
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
    <Card className="overflow-hidden border border-slate-200/80 shadow-sm ring-1 ring-slate-100">
      <div className="mb-6 flex items-start justify-between border-b border-slate-100 pb-4">
        <h3 className="text-lg font-bold tracking-tight text-slate-900">
          {chart.title}
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Automatically generated visualization
        </p>
      </div>
      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
        {type === "bar" ? "Bar Chart" : "Pie Chart"}
      </span>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          {type === "bar" ? (
            <ReBarChart data={data}>
              <XAxis
                dataKey="label"
                tick={{
                  fontSize: 12,
                  fill: "#64748b",
                }}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                tick={{
                  fontSize: 12,
                  fill: "#64748b",
                }}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                cursor={{ fill: "#f8fafc" }}
                contentStyle={{
                  borderRadius: 16,
                  border: "1px solid #e2e8f0",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 16px 40px rgba(15,23,42,0.12)",
                }}
              />

              <Bar
                dataKey="value"
                radius={[6, 6, 0, 0]}
                fill="#10b981"
              />
            </ReBarChart>
          ) : (
            <RePieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="label"
                outerRadius={115}
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

              <Tooltip
                contentStyle={{
                  borderRadius: 16,
                  border: "1px solid #e2e8f0",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 16px 40px rgba(15,23,42,0.12)",
                }}
              />
            </RePieChart>
          )}
        </ResponsiveContainer>
      </div>
    </Card>
  );
}