"use client";

import Card from "@/components/ui/Card";

import {
  BarChart,
  PieChart,
} from "@/types/chart";

import {
  ResponsiveContainer,
  BarChart as ReBarChart,
  PieChart as RePieChart,
  Bar,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
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
    <Card className="h-full">

      <div className="mb-6">

        <h3 className="text-xl font-semibold text-gray-900">
          {chart.title}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Automatically generated visualization
        </p>

      </div>

      <div className="h-[420px]">

        <ResponsiveContainer width="100%" height="100%">

          {type === "bar" ? (

            <ReBarChart
              data={data}
              margin={{
                top: 20,
                right: 20,
                left: 0,
                bottom: 50,
              }}
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="label"
                angle={-20}
                textAnchor="end"
                interval={0}
                height={60}
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"
                radius={[6, 6, 0, 0]}
              />

            </ReBarChart>

          ) : (

            <RePieChart>

              <Pie
                data={data}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="50%"
                outerRadius={130}
                innerRadius={45}
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