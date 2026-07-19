import Card from "@/components/ui/Card";

interface ColumnProfile {
  name: string;
  dtype: string;
  null_count: number;
  null_percentage: number;
}

interface Props {
  columns: ColumnProfile[];
}

export default function ColumnProfileTable({
  columns,
}: Props) {
  const getNullColor = (percentage: number) => {
    if (percentage === 0) {
      return "bg-emerald-100 text-emerald-700";
    }

    if (percentage < 20) {
      return "bg-amber-100 text-amber-700";
    }

    return "bg-red-100 text-red-700";
  };

  return (
    <Card className="overflow-hidden border border-slate-200/80 p-0 shadow-sm ring-1 ring-slate-100">

      <div className="border-b border-slate-200 bg-gradient-to-r from-violet-50 via-white to-cyan-50 px-6 py-5">

        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Column Profile
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Data types, missing values and overall column quality.
        </p>

      </div>

      <div className="max-h-[600px] overflow-auto">

        <table className="min-w-full border-separate border-spacing-0 text-sm">

          <thead className="sticky top-0 z-10 bg-white/90 backdrop-blur-md">

            <tr>

              <th className="border-b border-slate-200 bg-slate-50/90 px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                Column
              </th>

              <th className="border-b border-slate-200 bg-slate-50/90 px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                Data Type
              </th>

              <th className="border-b border-slate-200 bg-slate-50/90 px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-600">
                Missing
              </th>

              <th className="border-b border-slate-200 bg-slate-50/90 px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-600">
                Quality
              </th>

            </tr>

          </thead>

          <tbody>

            {columns.map((column) => (

              <tr
                key={column.name}
                className="
                  border-b
                  border-slate-100
                  odd:bg-white
                  even:bg-slate-50/40
                  transition-colors
                  duration-200
                  hover:bg-violet-50/70
                "
              >

                <td className="px-6 py-4 font-medium text-slate-800">
                  {column.name}
                </td>

                <td className="px-6 py-4">

                  <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                    {column.dtype}
                  </span>

                </td>

                <td className="px-6 py-4 text-right font-mono text-slate-700">
                  {column.null_count}
                  <span className="ml-2 text-xs text-slate-400">
                    ({column.null_percentage.toFixed(1)}%)
                  </span>
                </td>

                <td className="px-6 py-4 text-center">

                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold shadow-sm ${getNullColor(
                      column.null_percentage
                    )}`}
                  >
                    {column.null_percentage === 0
                      ? "Excellent"
                      : column.null_percentage < 20
                      ? "Good"
                      : "Needs Cleaning"}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </Card>
  );
}