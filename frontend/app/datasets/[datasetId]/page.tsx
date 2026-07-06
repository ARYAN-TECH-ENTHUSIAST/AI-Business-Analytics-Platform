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

import Card from "@/components/ui/Card";

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

        {/* ================= Header ================= */}

        <section className="rounded-[24px] border border-slate-200 bg-white p-8 shadow-[0_10px_35px_rgba(15,23,42,.05)]">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <div className="mb-4 inline-flex items-center rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-semibold text-emerald-700">
                Dataset Intelligence
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                Dataset Analysis
              </h1>

              <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-600">
                Explore your uploaded dataset through automated profiling,
                statistical analysis, visualizations and AI-powered business
                recommendations.
              </p>

            </div>

            <Link
              href="/workspaces"
              className="inline-flex items-center justify-center rounded-[18px] border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition-all duration-200 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
            >
              ← Back to Workspaces
            </Link>

          </div>

        </section>

        {/* ===================== Overview ===================== */}

        {dashboard && (
          <section className="space-y-6">

            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Dataset Overview
                </h2>

                <p className="mt-2 text-slate-500">
                  High-level business metrics generated from your uploaded dataset.
                </p>
              </div>

              <button
                onClick={() => setGenerateAI(true)}
                disabled={aiLoading}
                className="
                  inline-flex
                  items-center
                  gap-2

                  rounded-[18px]

                  bg-emerald-700

                  px-6
                  py-3

                  font-semibold
                  text-white

                  shadow-md

                  transition-all
                  duration-200

                  hover:-translate-y-0.5
                  hover:bg-emerald-800
                  hover:shadow-lg

                  disabled:opacity-60
              "
              >
                {aiLoading
                  ? "Generating..."
                  : aiInsights
                    ? "Regenerate AI Insights"
                    : "Generate AI Insights"}
              </button>

            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
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
              <h2 className="text-2xl font-bold text-slate-900">
                Dataset Statistics
              </h2>

              <p className="mt-2 text-slate-500">
                Structural information extracted from the uploaded dataset.
              </p>
            </div>

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

          </section>
        )}
        {/* ================= Analytics ================= */}

        {profile && (
          <section className="space-y-6">

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Data Profiling
              </h2>

              <p className="mt-2 text-slate-500">
                Review column quality, missing values and statistical summaries before generating insights.
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

            <div className="flex items-end justify-between">

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Visual Analytics
                </h2>

                <p className="mt-2 text-slate-500">
                  Automatically generated charts to help identify patterns,
                  trends and relationships within your data.
                </p>
              </div>

              <span className="rounded-full bg-slate-100 px-4 py-1 text-sm font-medium text-slate-600">
                Auto Generated
              </span>

            </div>

            <div className="rounded-[22px] border border-slate-200 bg-white p-6 shadow-sm">
              <ChartsSection charts={charts} />
            </div>

          </section>
        )}

        {/* ================= AI Insights ================= */}

        <section className="space-y-6">

          <div>

            <div className="mb-3 inline-flex items-center rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-700">
              AI Powered
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              Business Insights
            </h2>

            <p className="mt-2 text-slate-500">
              Executive summary, key findings and recommendations generated from your dataset.
            </p>

          </div>

          {aiLoading && (
            <div className="rounded-[22px] border border-slate-200 bg-white p-8 shadow-sm">

              <div className="animate-pulse space-y-4">

                <div className="h-6 w-48 rounded bg-slate-200" />

                <div className="h-4 w-full rounded bg-slate-200" />

                <div className="h-4 w-5/6 rounded bg-slate-200" />

                <div className="h-4 w-2/3 rounded bg-slate-200" />

              </div>

            </div>
          )}

          {aiError && (
            <Card className="border-yellow-200 bg-yellow-50">
              <p className="font-medium text-yellow-700">
                AI insights are currently unavailable.
              </p>

              <p className="mt-2 text-sm text-yellow-600">
                Please verify your Gemini API configuration and try again.
              </p>
            </Card>
          )}

          {aiInsights && (
            <AIInsights insights={aiInsights} />
          )}

        </section>

        {/* ================= Dataset Preview ================= */}

        <section className="space-y-6">

          <div>

            <h2 className="text-2xl font-bold text-slate-900">
              Dataset Preview
            </h2>

            <p className="mt-2 text-slate-500">
              Preview the first rows exactly as they were uploaded.
            </p>

          </div>

          {isLoading && (
            <Card className="py-12 text-center">
              Loading dataset preview...
            </Card>
          )}

          {isError && (
            <Card className="border-red-200 bg-red-50 py-12 text-center">
              <p className="font-medium text-red-600">
                Failed to load dataset preview.
              </p>
            </Card>
          )}

          {!isLoading && !isError && preview && (
            <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">
              <DatasetPreviewTable
                columns={preview.columns}
                rows={preview.rows}
              />
            </div>
          )}

        </section>
        </div>
    </DashboardLayout>
  );
}