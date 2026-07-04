"use client";

import { useParams } from "next/navigation";

import DashboardLayout from "@/components/layout/DashboardLayout";
import ProfileCard from "@/components/dataset/ProfileCard";

import { useDatasetPreview } from "@/hooks/useDatasetPreview";
import { useDatasetProfile } from "@/hooks/useDatasetProfile";

import { useAnalytics } from "@/hooks/useAnalytics";
import NumericSummaryTable from "@/components/dataset/NumericSummaryTable";

import { useDashboard } from "@/hooks/useDashboard";

import { useCharts } from "@/hooks/useCharts";
import ChartsSection from "@/components/dataset/ChartsSection";

import { useState } from "react";
import { useAI } from "@/hooks/useAI";
import AIInsights from "@/components/dataset/AIInsights";

import Link from "next/link";

export default function DatasetPreviewPage() {
  const params = useParams();

  const datasetId = Number(params.datasetId);

  const [generateAI, setGenerateAI] =
    useState(false);

  const {
    data: preview,
    isLoading,
    isError,
  } = useDatasetPreview(datasetId);

  const {
    data: profile,
  } = useDatasetProfile(datasetId);

  const {
    data: analytics,
  } = useAnalytics(datasetId);

  const {
    data: dashboard,
  } = useDashboard(datasetId);

  const {
    data: charts,
  } = useCharts(datasetId);

  const {
    data: aiInsights,
    isLoading: aiLoading,
    error: aiError,
  } = useAI(
    datasetId,
    generateAI,
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold">
              Dataset Analysis
            </h1>

            <p className="mt-2 text-gray-600">
              Explore analytics and AI insights.
            </p>
        </div>

        <Link
          href="/workspaces"
          className="rounded-lg border px-4 py-2 hover:bg-gray-100"
        >
          Back to Workspaces
        </Link>

    </div>

        {dashboard && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {dashboard.kpis.map((kpi) => (
              <ProfileCard
                key={kpi.title}
                title={kpi.title}
                value={kpi.value}
              />
            ))}
          </div>
        )}

        {profile && (
          <div className="grid gap-6 md:grid-cols-3">

            <ProfileCard
              title="Rows"
              value={profile.total_rows}
            />

            <ProfileCard
              title="Columns"
              value={profile.total_columns}
            />

            <ProfileCard
              title="Memory Usage"
              value={`${profile.memory_usage_mb.toFixed(2)} MB`}
            />

          </div>
        )}

        {profile && (
          <div className="rounded-xl border bg-white p-6">

            <h2 className="mb-4 text-xl font-semibold">
              Column Profile
            </h2>

            <div className="overflow-x-auto">

              <table className="min-w-full">

                <thead className="bg-gray-100">

                  <tr>
                    <th className="border-b px-4 py-3 text-left">
                      Name
                    </th>

                    <th className="border-b px-4 py-3 text-left">
                      Type
                    </th>

                    <th className="border-b px-4 py-3 text-left">
                      Null Count
                    </th>

                    <th className="border-b px-4 py-3 text-left">
                      Null %
                    </th>
                  </tr>

                </thead>

                <tbody>

                  {profile.columns.map((column) => (

                    <tr key={column.name}>

                      <td className="border-b px-4 py-3">
                        {column.name}
                      </td>

                      <td className="border-b px-4 py-3">
                        {column.dtype}
                      </td>

                      <td className="border-b px-4 py-3">
                        {column.null_count}
                      </td>

                      <td className="border-b px-4 py-3">
                        {column.null_percentage.toFixed(2)}%
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>
        )}

        {analytics && analytics.numeric_columns.length > 0 && (
          <NumericSummaryTable
            columns={analytics.numeric_columns}
          />
        )}

        {charts && (
          <ChartsSection
            charts={charts}
          />
        )}

        <div className="rounded-xl border bg-white p-6">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-xl font-semibold">
                AI Business Insights
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Generate business insights using AI.
              </p>

            </div>

            <button
              onClick={() => setGenerateAI(true)}
              className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
            >
              Generate Insights
            </button>

        </div>

        {aiLoading && (
          <p className="mt-6">
            Generating insights...
          </p>
        )}

        {aiError && (
          <div className="mt-6 rounded-lg border border-yellow-300 bg-yellow-50 p-4">
            AI is currently unavailable. Configure your AI provider to enable this feature.
          </div>
        )}

        {aiInsights && (
          <div className="mt-6">
            <AIInsights
              insights={aiInsights}
            />
          </div>
        )}

    </div>

        {isLoading && (
          <div className="rounded-xl border bg-white p-8 text-center">
            Loading preview...
          </div>
        )}

        {isError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center text-red-600">
            Failed to load preview.
          </div>
        )}

        {!isLoading && !isError && preview && (

          <div className="overflow-x-auto rounded-xl border bg-white">

            <table className="min-w-full">

              <thead className="bg-gray-100">

                <tr>

                  {preview.columns.map((column: string) => (

                    <th
                      key={column}
                      className="border-b px-4 py-3 text-left"
                    >
                      {column}
                    </th>

                  ))}

                </tr>

              </thead>

              <tbody>

                {preview.rows.map(
                  (
                    row: Record<string, unknown>,
                    index: number
                  ) => (

                    <tr key={index}>

                      {preview.columns.map((column: string) => (

                        <td
                          key={column}
                          className="border-b px-4 py-3"
                        >
                          {String(row[column] ?? "")}
                        </td>

                      ))}

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>
    </DashboardLayout>
  );
}