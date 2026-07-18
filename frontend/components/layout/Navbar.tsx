"use client";

interface Props {}

export default function Navbar({}: Props) {
  return (
    <header className="sticky top-0 z-20 px-6 pt-5">
      <div
        className="
          glass
          soft-shadow

          flex
          h-20
          items-center
          justify-between

          rounded-3xl

          border
          border-white/70

          px-8

          transition-all
          duration-300
        "
      >
        <div>

          <div className="flex items-center gap-3">

            <div className="h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_18px_rgba(34,197,94,.45)]" />

            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              AI Business Intelligence Platform
            </span>

          </div>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Intelligent analytics and AI-powered decision making
          </p>

        </div>

        <div className="flex items-center gap-3">

          <div className="rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2">
            <span className="text-xs font-semibold text-emerald-700">
              AI Ready
            </span>
          </div>

        </div>

      </div>
    </header>
  );
}