"use client";

import Link from "next/link";
import { ArrowRight, FolderPlus, FolderKanban } from "lucide-react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

import { useWorkspaces } from "@/hooks/useWorkspaces";

export default function DashboardPage() {
  const {
    data: workspaces,
    isLoading,
  } = useWorkspaces();

  return (
    <DashboardLayout>
      <div className="space-y-10">
        {/* Hero */}

        <section className="rounded-[24px] border border-slate-200 bg-white p-8 shadow-[0_10px_35px_rgba(15,23,42,.05)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                Welcome back 👋
              </h1>

              <p className="mt-3 text-lg text-slate-600">
                Upload datasets, generate AI insights and build business
                intelligence reports from your workspaces.
              </p>
            </div>

            <Link href="/workspaces">
              <Button className="px-6">
                <FolderPlus size={18} />
                Create Workspace
              </Button>
            </Link>
          </div>
        </section>

        {/* Recent Workspaces */}

        <section>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Recent Workspaces
              </h2>

              <p className="mt-1 text-slate-500">
                Continue working on your latest analytics projects.
              </p>
            </div>

            {workspaces && workspaces.length > 0 && (
              <Link
                href="/workspaces"
                className="flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
              >
                View All
                <ArrowRight size={16} />
              </Link>
            )}
          </div>

          {isLoading && (
            <Card>
              <p className="text-slate-500">Loading workspaces...</p>
            </Card>
          )}

          {!isLoading &&
            workspaces &&
            workspaces.length === 0 && (
              <Card className="py-12">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-5 rounded-full bg-emerald-100 p-5">
                    <FolderKanban
                      size={36}
                      className="text-emerald-700"
                    />
                  </div>

                  <h3 className="text-xl font-semibold text-slate-900">
                    No workspaces yet
                  </h3>

                  <p className="mt-2 max-w-md text-slate-500">
                    Create your first workspace to start uploading datasets,
                    generating AI insights and exploring business analytics.
                  </p>

                  <Link
                    href="/workspaces"
                    className="mt-6"
                  >
                    <Button>
                      <FolderPlus size={18} />
                      Create Workspace
                    </Button>
                  </Link>
                </div>
              </Card>
            )}

          <div className="grid gap-5">
            {workspaces?.slice(0, 5).map((workspace) => (
              <Link
                key={workspace.id}
                href={`/workspaces/${workspace.id}`}
              >
                <Card className="cursor-pointer">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {workspace.name}
                      </h3>

                      <p className="mt-2 text-sm text-slate-500">
                        {workspace.description || "No description provided."}
                      </p>
                    </div>

                    <ArrowRight
                      size={18}
                      className="mt-1 text-slate-400"
                    />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}