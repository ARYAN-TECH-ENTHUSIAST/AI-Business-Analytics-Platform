"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import CreateWorkspaceForm from "@/components/workspace/CreateWorkspaceForm";
import WorkspaceCard from "@/components/workspace/WorkspaceCard";
import Card from "@/components/ui/Card";

import { FolderKanban } from "lucide-react";

import { useWorkspaces } from "@/hooks/useWorkspaces";

export default function WorkspacesPage() {
  const {
    data: workspaces,
    isLoading,
    isError,
  } = useWorkspaces();

  return (
    <DashboardLayout>
      <div className="space-y-10">

        {/* Header */}

        <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">
              Workspaces
            </h1>

            <p className="mt-2 max-w-2xl text-slate-600">
              Organize datasets, analytics and AI insights into dedicated
              business workspaces.
            </p>
          </div>

        </section>

        {/* Workspace Grid */}

        <section>

          <div className="mb-5 flex items-center justify-between">

            <h2 className="text-xl font-semibold text-slate-900">
              Your Workspaces
            </h2>

            {!isLoading && !isError && workspaces && (
              <span className="rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-700">
                {workspaces.length} Workspace{workspaces.length !== 1 ? "s" : ""}
              </span>
            )}

          </div>

          {isLoading && (
            <Card className="py-10 text-center">
              Loading workspaces...
            </Card>
          )}

          {isError && (
            <Card className="border-red-200 bg-red-50 py-10 text-center text-red-600">
              Failed to load workspaces.
            </Card>
          )}

          {!isLoading &&
            !isError &&
            workspaces?.length === 0 && (
              <Card className="py-12">
                <div className="flex flex-col items-center text-center">

                  <div className="mb-5 rounded-full bg-emerald-100 p-5">
                    <FolderKanban
                      size={36}
                      className="text-emerald-700"
                    />
                  </div>

                  <h2 className="text-2xl font-bold text-slate-900">
                    No workspaces yet
                  </h2>

                  <p className="mt-3 max-w-md text-slate-500">
                    Create your first workspace below to begin uploading
                    datasets and generating AI-powered business insights.
                  </p>

                </div>
              </Card>
            )}

          {!isLoading &&
            !isError &&
            workspaces &&
            workspaces.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {workspaces.map((workspace) => (
                  <WorkspaceCard
                    key={workspace.id}
                    workspace={workspace}
                  />
                ))}
              </div>
            )}

        </section>

        {/* Create Workspace */}

        <section>

          <div className="mb-5">

            <h2 className="text-xl font-semibold text-slate-900">
              Create New Workspace
            </h2>

            <p className="mt-1 text-slate-500">
              Start a new analytics project.
            </p>

          </div>

          <CreateWorkspaceForm />

        </section>

      </div>
    </DashboardLayout>
  );
}