import Card from "./Card";

interface Props {
  title: string;
  description: string;
}

export default function EmptyState({
  title,
  description,
}: Props) {
  return (
    <Card className="border border-dashed border-slate-300 bg-gradient-to-br from-white via-slate-50 to-emerald-50/40">

      <div className="flex flex-col items-center py-6 text-center">

        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 shadow-sm">
          <div className="h-7 w-7 rounded-lg bg-emerald-500" />
        </div>

        <h3 className="text-xl font-semibold tracking-tight text-slate-900">
          {title}
        </h3>

        <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
          {description}
        </p>

      </div>

    </Card>
  );
}