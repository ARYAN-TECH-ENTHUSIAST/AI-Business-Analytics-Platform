"use client";

import Link from "next/link";
import { ArrowRight, FolderKanban, CalendarDays } from "lucide-react";

import Card from "@/components/ui/Card";
import { Workspace } from "@/types/workspace";

interface Props {
  workspace: Workspace;
}

export default function WorkspaceCard({
  workspace,
}: Props) {
  return (
    <Link href={`/workspaces/${workspace.id}`}>
      <Card className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="flex items-start justify-between">

          <div className="rounded-2xl bg-gradient-to-br from-emerald-100 to-cyan-100 p-3 shadow-sm transition-transform duration-300 group-hover:scale-105">
            <FolderKanban
              size={22}
              className="text-emerald-700"
            />
          </div>

          <ArrowRight
            size={18}
            className="text-slate-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-emerald-600"
          />

        </div>

        <h3 className="mt-6 text-xl font-bold tracking-tight text-slate-900">
          {workspace.name}
        </h3>

        <p className="mt-3 min-h-[48px] line-clamp-2 text-sm leading-6 text-slate-500">
          {workspace.description || "No description provided."}
        </p>

        <div className="mt-8 flex items-center gap-2 border-t border-slate-100 pt-4 text-sm text-slate-500">
          <CalendarDays size={16} />

          <span>
            Created{" "}
            {new Date(
              workspace.created_at
            ).toLocaleDateString()}
          </span>
        </div>
      </Card>
    </Link>
  );
}