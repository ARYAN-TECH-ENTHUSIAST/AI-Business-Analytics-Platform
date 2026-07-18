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

          {/* Decorative Blur */}

          <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-emerald-300/20 blur-3xl" />

          <div className="absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div className="max-w-2xl">

              <div className="mb-4 inline-flex rounded-full border border-emerald-200 bg-white/70 px-4 py-1.5 text-sm font-semibold text-emerald-700 backdrop-blur">
                AI Powered Analytics
              </div>

              <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">
                Welcome back 👋
              </h1>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                Transform raw datasets into business intelligence,
                interactive dashboards and AI-generated insights —
                all from one modern analytics platform.
              </p>

            </div>

            <Link href="/workspaces">

              <Button className="px-8 py-4 text-base shadow-xl">
                <FolderPlus size={20} />
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