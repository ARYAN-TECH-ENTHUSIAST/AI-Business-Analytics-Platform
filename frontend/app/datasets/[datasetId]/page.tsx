"use client";

import { useParams } from "next/navigation";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { useDatasetPreview } from "@/hooks/useDatasetPreview";

export default function DatasetPreviewPage() {
  const params = useParams();

  const datasetId = Number(params.datasetId);

  const {
    data,
    isLoading,
    isError,
  } = useDatasetPreview(datasetId);

  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-3xl font-bold">
            Dataset Preview
          </h1>

          <p className="mt-2 text-gray-600">
            Preview uploaded dataset.
          </p>
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

        {!isLoading &&
          !isError &&
          data && (
            <div className="overflow-auto rounded-xl border bg-white">

              <table className="min-w-full">

                <thead className="bg-gray-100">

                  <tr>

                    {data.columns.map(
                      (column: string) => (
                        <th
                          key={column}
                          className="border-b px-4 py-3 text-left"
                        >
                          {column}
                        </th>
                      )
                    )}

                  </tr>

                </thead>

                <tbody>

                  {data.rows.map(
                    (
                      row: Record<
                        string,
                        unknown
                      >,
                      index: number
                    ) => (
                      <tr key={index}>

                        {data.columns.map(
                          (
                            column: string
                          ) => (
                            <td
                              key={column}
                              className="border-b px-4 py-3"
                            >
                              {String(
                                row[column] ?? ""
                              )}
                            </td>
                          )
                        )}

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