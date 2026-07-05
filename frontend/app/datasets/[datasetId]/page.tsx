"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import DashboardLayout from "@/components/layout/DashboardLayout";

import ProfileCard from "@/components/dataset/ProfileCard";
import NumericSummaryTable from "@/components/dataset/NumericSummaryTable";
import ChartsSection from "@/components/dataset/ChartsSection";
import AIInsights from "@/components/dataset/AIInsights";
import ColumnProfileTable from "@/components/dataset/ColumnProfileTable";
import DatasetPreviewTable from "@/components/dataset/DatasetPreviewTable";

import { useDatasetPreview } from "@/hooks/useDatasetPreview";
import { useDatasetProfile } from "@/hooks/useDatasetProfile";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useDashboard } from "@/hooks/useDashboard";
import { useCharts } from "@/hooks/useCharts";
import { useAI } from "@/hooks/useAI";

export default function DatasetPreviewPage() {
  const params = useParams();

  const datasetId = Number(params.datasetId);

  const [generateAI, setGenerateAI] = useState(false);

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
  } = useAI(datasetId, generateAI);

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
          <ColumnProfileTable
            columns={profile.columns}
          />
        )}

        {analytics &&
          analytics.numeric_columns.length > 0 && (
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
              disabled={aiLoading}
              className="rounded-lg bg-black px-4 py-2 text-white transition hover:bg-gray-800 disabled:opacity-50"
            >
              {aiLoading
                ? "Generating..."
                : aiInsights
                ? "🔄 Regenerate Insights"
                : "✨ Generate AI Insights"}
            </button>

          </div>

          {aiLoading && (
            <div className="mt-6 animate-pulse space-y-4">
              <div className="h-6 w-1/3 rounded bg-gray-200" />
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-5/6 rounded bg-gray-200" />
              <div className="h-4 w-2/3 rounded bg-gray-200" />
            </div>
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
          <DatasetPreviewTable
            columns={preview.columns}
            rows={preview.rows}
          />
        )}

      </div>
    </DashboardLayout>
  );
}