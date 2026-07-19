import Card from "@/components/ui/Card";
import { NumericSummary } from "@/types/analytics";

interface Props {
  columns: NumericSummary[];
}

export default function NumericSummaryTable({
  columns,
}: Props) {
  return (
    <Card className="overflow-hidden border border-slate-200/80 p-0 shadow-sm ring-1 ring-slate-100">

      <div className="border-b border-slate-200 bg-gradient-to-r from-blue-50 via-white to-emerald-50 px-6 py-5">

        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Numeric Summary
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Statistical summary for every numeric column.
        </p>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full border-separate border-spacing-0 text-sm">

          <thead className="sticky top-0 z-10 bg-white/90 backdrop-blur-md">

            <tr>

              <th className="border-b border-slate-200 bg-slate-50/90 px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                Column
              </th>

              <th className="border-b border-slate-200 bg-slate-50/90 px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-600">
                Mean
              </th>

              <th className="border-b border-slate-200 bg-slate-50/90 px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-600">
                Median
              </th>

              <th className="border-b border-slate-200 bg-slate-50/90 px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-600">
                Min
              </th>

              <th className="border-b border-slate-200 bg-slate-50/90 px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-600">
                Max
              </th>

              <th className="border-b border-slate-200 bg-slate-50/90 px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-600">
                Std Dev
              </th>

            </tr>

          </thead>

          <tbody>

            {columns.map((column, index) => (

              <tr
                key={column.column}
                className="
                  border-b
                  border-slate-100
                  odd:bg-white
                  even:bg-slate-50/40
                  transition-colors
                  duration-200
                  hover:bg-blue-50/70
                "
              >

                <td className="px-6 py-4">

                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {column.column}
                  </span>

                </td>

                <td className="px-6 py-4 text-right font-mono font-semibold text-slate-800">
                  {column.mean.toFixed(2)}
                </td>

                <td className="px-6 py-4 text-right font-mono text-slate-700">
                  {column.median.toFixed(2)}
                </td>

                <td className="px-6 py-4 text-right font-mono text-slate-700">
                  {column.minimum.toFixed(2)}
                </td>

                <td className="px-6 py-4 text-right font-mono text-slate-700">
                  {column.maximum.toFixed(2)}
                </td>

                <td className="px-6 py-4 text-right font-mono text-slate-700">
                  {column.std.toFixed(2)}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </Card>
  );
}