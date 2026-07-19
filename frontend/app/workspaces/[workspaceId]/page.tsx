"use client";

import { useParams } from "next/navigation";
import { Database, Upload } from "lucide-react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import UploadDatasetForm from "@/components/dataset/UploadDatasetForm";
import DatasetCard from "@/components/dataset/DatasetCard";
import Card from "@/components/ui/Card";

import { useDatasets } from "@/hooks/useDatasets";
import { useWorkspace } from "@/hooks/useWorkspaces";

export default function WorkspaceDetailsPage() {
  const params = useParams();

  const workspaceId = Number(params.workspaceId);

  const {
    data: datasets,
    isLoading,
    isError,
  } = useDatasets(workspaceId);

  const {
  data: workspace,
} = useWorkspace(workspaceId);

  return (
    <DashboardLayout>
      <div className="space-y-10">

        {/* Header */}

        <section
          className="
            relative
            overflow-hidden
            rounded-[28px]
            border
            border-emerald-100
            bg-gradient-to-br
            from-white
            via-emerald-50
            to-cyan-50
            p-10
            shadow-[0_18px_60px_rgba(15,23,42,0.08)]
          "
        >

          <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-emerald-300/20 blur-3xl" />

          <div className="absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl" />

          <div className="relative">

          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">
            {workspace?.name ?? "Workspace"}
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            {workspace?.description || "No description provided."}
          </p>
          </div>

        </section>

        <section className="grid gap-6 md:grid-cols-3">

          <Card className="group">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Datasets
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {isLoading ? "--" : datasets?.length ?? 0}
                </h2>
              </div>

              <div className="rounded-2xl bg-emerald-100 p-4 transition-transform duration-300 group-hover:scale-110">
                <Database
                  size={26}
                  className="text-emerald-700"
                />
              </div>

            </div>
          </Card>

          <Card className="group">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Upload Status
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  Ready
                </h2>
              </div>

              <div className="rounded-2xl bg-cyan-100 p-4 transition-transform duration-300 group-hover:scale-110">
                <Upload
                  size={26}
                  className="text-cyan-700"
                />
              </div>

            </div>
          </Card>

          <Card className="group">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Analytics
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  AI Ready
                </h2>
              </div>

              <div className="rounded-2xl bg-violet-100 p-4">
                ✨
              </div>

            </div>
          </Card>

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
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <Card key={index}>
                  <div className="animate-pulse space-y-5">

                    <div className="h-12 w-12 rounded-2xl bg-slate-200" />

                    <div className="h-5 w-40 rounded-full bg-slate-200" />

                    <div className="space-y-2">
                      <div className="h-4 w-full rounded-full bg-slate-200" />
                      <div className="h-4 w-8/12 rounded-full bg-slate-100" />
                    </div>

                  </div>
                </Card>
              ))}

            </div>
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