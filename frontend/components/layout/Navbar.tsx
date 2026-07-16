"use client";

interface Props {}

export default function Navbar({}: Props) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-[#fbfcfb]/90 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between px-8">

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            AI Business Intelligence
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Intelligent Analytics Platform
          </p>
        </div>

        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-700">
          AI Ready
        </span>

      </div>
    </header>
  );
}