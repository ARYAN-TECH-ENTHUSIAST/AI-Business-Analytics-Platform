"use client";

import { useParams } from "next/navigation";

import DashboardLayout from "@/components/layout/DashboardLayout";
import UploadDatasetForm from "@/components/dataset/UploadDatasetForm";
import DatasetCard from "@/components/dataset/DatasetCard";

import { useDatasets } from "@/hooks/useDatasets";

export default function WorkspaceDetailsPage() {
  const params = useParams();

  const workspaceId = Number(params.workspaceId);

  const {
    data: datasets,
    isLoading,
    isError,
  } = useDatasets(workspaceId);

  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-3xl font-bold">
            Workspace
          </h1>

          <p className="mt-2 text-gray-600">
            Upload and manage datasets.
          </p>
        </div>

        <UploadDatasetForm
          workspaceId={workspaceId}
        />

        {isLoading && (
          <div className="rounded-xl border bg-white p-8 text-center">
            Loading datasets...
          </div>
        )}

        {isError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center text-red-600">
            Failed to load datasets.
          </div>
        )}

        {!isLoading &&
          !isError &&
          datasets?.length === 0 && (
            <div className="rounded-xl border border-dashed p-12 text-center">
              <h2 className="text-xl font-semibold">
                No datasets uploaded
              </h2>

              <p className="mt-2 text-gray-500">
                Upload your first CSV or Excel file.
              </p>
            </div>
          )}

        {!isLoading &&
          !isError &&
          datasets &&
          datasets.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {datasets.map((dataset) => (
                <DatasetCard
                  key={dataset.id}
                  dataset={dataset}
                />
              ))}
            </div>
          )}

      </div>
    </DashboardLayout>
  );
}