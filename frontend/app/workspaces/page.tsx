"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import CreateWorkspaceForm from "@/components/workspace/CreateWorkspaceForm";
import WorkspaceCard from "@/components/workspace/WorkspaceCard";

import { useWorkspaces } from "@/hooks/useWorkspaces";

export default function WorkspacesPage() {
  const {
    data: workspaces,
    isLoading,
    isError,
  } = useWorkspaces();

  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-3xl font-bold">
            Workspaces
          </h1>

          <p className="mt-2 text-gray-600">
            Organize datasets and analytics into
            separate workspaces.
          </p>
        </div>

        <CreateWorkspaceForm />

        {isLoading && (
          <div className="rounded-xl border bg-white p-8 text-center">
            Loading workspaces...
          </div>
        )}

        {isError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center text-red-600">
            Failed to load workspaces.
          </div>
        )}

        {!isLoading &&
          !isError &&
          workspaces?.length === 0 && (
            <div className="rounded-xl border border-dashed p-12 text-center">
              <h2 className="text-xl font-semibold">
                No workspaces yet
              </h2>

              <p className="mt-2 text-gray-500">
                Create your first workspace to
                begin uploading datasets.
              </p>
            </div>
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

      </div>
    </DashboardLayout>
  );
}