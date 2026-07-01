"use client";

import { useParams } from "next/navigation";

import DashboardLayout from "@/components/layout/DashboardLayout";
import ProfileCard from "@/components/dataset/ProfileCard";

import { useDatasetPreview } from "@/hooks/useDatasetPreview";
import { useDatasetProfile } from "@/hooks/useDatasetProfile";

import { useAnalytics } from "@/hooks/useAnalytics";
import NumericSummaryTable from "@/components/dataset/NumericSummaryTable";

import { useDashboard } from "@/hooks/useDashboard";

export default function DatasetPreviewPage() {
  const params = useParams();

  const datasetId = Number(params.datasetId);

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

  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-3xl font-bold">
            Dataset Preview
          </h1>

          <p className="mt-2 text-gray-600">
            Explore your uploaded dataset.
          </p>
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