"use client";

import Link from "next/link";

import DashboardLayout from "@/components/layout/DashboardLayout";
import Card from "@/components/ui/Card";

import { useWorkspaces } from "@/hooks/useWorkspaces";

export default function DashboardPage() {
  const {
    data: workspaces,
    isLoading,
  } = useWorkspaces();

  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-3xl font-bold">
            Welcome Back 👋
          </h1>

          <p className="mt-2 text-gray-600">
            Manage your workspaces and analyze business datasets with AI.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <Link href="/workspaces">
            <Card className="cursor-pointer transition hover:shadow-lg">
              <h2 className="text-xl font-semibold">
                📂 Workspaces
              </h2>

              <p className="mt-2 text-gray-600">
                Create and manage your analysis workspaces.
              </p>
            </Card>
          </Link>

          <Link href="/workspaces">
            <Card className="cursor-pointer transition hover:shadow-lg">
              <h2 className="text-xl font-semibold">
                ➕ Create Workspace
              </h2>

              <p className="mt-2 text-gray-600">
                Start a new analytics project.
              </p>
            </Card>
          </Link>

        </div>

        <div>

          <h2 className="mb-4 text-2xl font-semibold">
            Recent Workspaces
          </h2>

          {isLoading && (
            <Card>
              Loading workspaces...
            </Card>
          )}

          {!isLoading &&
            workspaces &&
            workspaces.length === 0 && (
              <Card>
                No workspaces yet.
              </Card>
            )}

          <div className="grid gap-4">

            {workspaces?.slice(0, 5).map((workspace) => (
              <Link
                key={workspace.id}
                href={`/workspaces/${workspace.id}`}
              >
                <Card className="cursor-pointer transition hover:shadow-md">
                  <h3 className="text-lg font-semibold">
                    {workspace.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {workspace.description ||
                      "No description"}
                  </p>
                </Card>
              </Link>
            ))}

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}