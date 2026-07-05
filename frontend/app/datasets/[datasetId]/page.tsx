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
      <div className="space-y-14">

        {/* Page Header */}

        <div className="flex items-start justify-between">

          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Dataset Analysis
            </h1>

            <p className="mt-2 text-gray-600">
              Explore your dataset with automated analytics,
              visualizations and AI-generated business insights.
            </p>
          </div>

          <Link
            href="/workspaces"
            className="rounded-xl border border-gray-300 px-5 py-2.5 transition hover:bg-gray-100"
          >
            ← Back to Workspaces
          </Link>

        </div>

        {/* ===================== Overview ===================== */}

        {dashboard && (
          <section className="space-y-6">

            <div>
              <h2 className="text-2xl font-bold">
                Overview
              </h2>

              <p className="mt-1 text-gray-500">
                High-level KPIs for your uploaded dataset.
              </p>
            </div>

            <div className="grid
              grid-cols-1
              gap-6
              sm:grid-cols-2
              xl:grid-cols-4">
              {dashboard.kpis.map((kpi) => (
                <ProfileCard
                  key={kpi.title}
                  title={kpi.title}
                  value={kpi.value}
                />
              ))}
            </div>

          </section>
        )}

        {/* ================= Dataset Statistics ================= */}

        {profile && (
          <section className="space-y-6">

            <div>
              <h2 className="text-2xl font-bold">
                Dataset Statistics
              </h2>

              <p className="mt-1 text-gray-500">
                Basic information about the uploaded dataset.
              </p>
            </div>

            <div className="grid
              grid-cols-1
              gap-6
              md:grid-cols-2
              xl:grid-cols-3">

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

          </section>
        )}

        {/* ================= Analytics ================= */}

        {profile && (
          <section className="space-y-6">

            <div>
              <h2 className="text-2xl font-bold">
                Analytics
              </h2>

              <p className="mt-1 text-gray-500">
                Explore dataset structure and column quality.
              </p>
            </div>

            <ColumnProfileTable
              columns={profile.columns}
            />

            {analytics &&
              analytics.numeric_columns.length > 0 && (
                <NumericSummaryTable
                  columns={analytics.numeric_columns}
                />
              )}

          </section>
        )}

        {/* ================= Visualizations ================= */}

        {charts && (
          <section className="space-y-6">

            <div>
              <h2 className="text-2xl font-bold">
                Visualizations
              </h2>

              <p className="mt-1 text-gray-500">
                Automatically generated charts based on the dataset.
              </p>
            </div>

            <ChartsSection charts={charts} />

          </section>
        )}

        {/* ================= AI Insights ================= */}

        <section className="space-y-6">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold">
                AI Business Insights
              </h2>

              <p className="mt-1 text-gray-500">
                Powered by Google Gemini 2.5 Flash
              </p>

            </div>

            <button
              onClick={() => setGenerateAI(true)}
              disabled={aiLoading}
              className="rounded-xl bg-black px-5 py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {aiLoading
                ? "Generating..."
                : aiInsights
                ? "🔄 Regenerate Insights"
                : "✨ Generate AI Insights"}
            </button>

          </div>

          {aiLoading && (
            <div className="animate-pulse space-y-4 rounded-2xl border bg-white p-6">
              <div className="h-6 w-1/3 rounded bg-gray-200" />
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-5/6 rounded bg-gray-200" />
              <div className="h-4 w-2/3 rounded bg-gray-200" />
            </div>
          )}

          {aiError && (
            <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-4">
              AI is currently unavailable. Please check your Gemini configuration.
            </div>
          )}

          {aiInsights && (
            <AIInsights insights={aiInsights} />
          )}

        </section>

        {/* ================= Dataset Preview ================= */}

        <section className="space-y-6">

          <div>
            <h2 className="text-2xl font-bold">
              Dataset Preview
            </h2>

            <p className="mt-1 text-gray-500">
              First 20 rows from the uploaded dataset.
            </p>
          </div>

          {isLoading && (
            <div className="rounded-2xl border bg-white p-8 text-center">
              Loading preview...
            </div>
          )}

          {isError && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-600">
              Failed to load dataset preview.
            </div>
          )}

          {!isLoading && !isError && preview && (
            <DatasetPreviewTable
              columns={preview.columns}
              rows={preview.rows}
            />
          )}

        </section>

      </div>
    </DashboardLayout>
  );
}