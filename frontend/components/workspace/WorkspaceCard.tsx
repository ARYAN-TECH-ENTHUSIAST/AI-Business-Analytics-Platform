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
      <Card className="group cursor-pointer">
        <div className="flex items-start justify-between">

          <div className="rounded-2xl bg-emerald-100 p-3">
            <FolderKanban
              size={22}
              className="text-emerald-700"
            />
          </div>

          <ArrowRight
            size={18}
            className="text-slate-400 transition-transform duration-200 group-hover:translate-x-1"
          />

        </div>

        <h3 className="mt-6 text-xl font-bold text-slate-900">
          {workspace.name}
        </h3>

        <p className="mt-3 min-h-[48px] text-sm leading-6 text-slate-500">
          {workspace.description || "No description provided."}
        </p>

        <div className="mt-8 flex items-center gap-2 border-t border-slate-100 pt-4 text-sm text-slate-400">
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