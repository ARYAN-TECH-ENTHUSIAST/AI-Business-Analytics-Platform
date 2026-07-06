"use client";

import { Menu, PanelLeftClose } from "lucide-react";

interface Props {
  collapsed: boolean;
  toggleSidebar: () => void;
}

export default function Navbar({
  collapsed,
  toggleSidebar,
}: Props) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-[#fbfcfb]/90 backdrop-blur-md">
      <div className="flex h-20 items-center justify-between px-8">

        <div className="flex items-center gap-5">

          <button
            onClick={toggleSidebar}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
          >
            {collapsed ? (
              <Menu size={20} />
            ) : (
              <PanelLeftClose size={20} />
            )}
          </button>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              AI Business Intelligence
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Intelligent Analytics Platform
            </p>
          </div>

        </div>

        <div className="hidden md:flex items-center gap-3">

          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-700">
            AI Ready
          </span>

        </div>

      </div>
    </header>
  );
}