"use client";

import { useParams } from "next/navigation";
import { Database, Upload } from "lucide-react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import UploadDatasetForm from "@/components/dataset/UploadDatasetForm";
import DatasetCard from "@/components/dataset/DatasetCard";
import Card from "@/components/ui/Card";

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
      <div className="space-y-10">

        {/* Header */}

        <section>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Workspace
          </h1>

          <p className="mt-2 max-w-2xl text-slate-600">
            Upload, organize and explore datasets inside this workspace.
          </p>

        </section>

        {/* Datasets */}

        <section>

          <div className="mb-5 flex items-center justify-between">

            <h2 className="text-xl font-semibold text-slate-900">
              Datasets
            </h2>

            {!isLoading && !isError && datasets && (
              <span className="rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-700">
                {datasets.length} Dataset{datasets.length !== 1 ? "s" : ""}
              </span>
            )}

          </div>

          {isLoading && (
            <Card className="py-10 text-center">
              Loading datasets...
            </Card>
          )}

          {isError && (
            <Card className="border-red-200 bg-red-50 py-10 text-center text-red-600">
              Failed to load datasets.
            </Card>
          )}

          {!isLoading &&
            !isError &&
            datasets?.length === 0 && (
              <Card className="py-12">
                <div className="flex flex-col items-center text-center">

                  <div className="mb-5 rounded-full bg-emerald-100 p-5">
                    <Database
                      size={36}
                      className="text-emerald-700"
                    />
                  </div>

                  <h2 className="text-2xl font-bold text-slate-900">
                    No datasets uploaded
                  </h2>

                  <p className="mt-3 max-w-md text-slate-500">
                    Upload your first CSV or Excel file below to begin
                    exploring your business data.
                  </p>

                </div>
              </Card>
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

        </section>

        {/* Upload */}

        <section>

          <div className="mb-5 flex items-center gap-3">

            <Upload
              size={20}
              className="text-emerald-700"
            />

            <div>

              <h2 className="text-xl font-semibold text-slate-900">
                Upload Dataset
              </h2>

              <p className="mt-1 text-slate-500">
                CSV and Excel files are supported.
              </p>

            </div>

          </div>

          <UploadDatasetForm
            workspaceId={workspaceId}
          />

        </section>

      </div>
    </DashboardLayout>
  );
}