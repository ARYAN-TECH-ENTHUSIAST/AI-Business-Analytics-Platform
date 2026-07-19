import Card from "@/components/ui/Card";

interface Props {
  title: string;
  value: string | number;
}

export default function ProfileCard({
  title,
  value,
}: Props) {
  return (
    <Card className="group relative overflow-hidden">

      {/* Top Accent */}

      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="flex min-h-[140px] flex-col justify-between">

        <div className="flex items-center justify-between">

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            {title}
          </p>

          <div className="h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.45)]" />

        </div>

        <div>

          <h2 className="text-4xl font-bold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-emerald-700">
            {value}
          </h2>

        </div>

      </div>

    </Card>
  );
}