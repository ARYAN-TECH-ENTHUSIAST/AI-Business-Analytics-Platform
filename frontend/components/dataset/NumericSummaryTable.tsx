import Card from "@/components/ui/Card";
import { NumericSummary } from "@/types/analytics";

interface Props {
  columns: NumericSummary[];
}

export default function NumericSummaryTable({
  columns,
}: Props) {
  return (
    <Card className="overflow-hidden p-0">

      <div className="border-b border-slate-200 bg-gradient-to-r from-blue-50 via-white to-emerald-50 px-6 py-5">

        <h2 className="text-xl font-semibold text-slate-900">
          Numeric Summary
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Statistical summary for every numeric column.
        </p>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full text-sm">

          <thead className="sticky top-0 bg-slate-100">

            <tr>

              <th className="px-6 py-4 text-left font-semibold text-slate-700">
                Column
              </th>

              <th className="px-6 py-4 text-right font-semibold text-slate-700">
                Mean
              </th>

              <th className="px-6 py-4 text-right font-semibold text-slate-700">
                Median
              </th>

              <th className="px-6 py-4 text-right font-semibold text-slate-700">
                Min
              </th>

              <th className="px-6 py-4 text-right font-semibold text-slate-700">
                Max
              </th>

              <th className="px-6 py-4 text-right font-semibold text-slate-700">
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
                  transition-all
                  duration-200
                  hover:bg-blue-50
                "
              >

                <td className="px-6 py-4">

                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {column.column}
                  </span>

                </td>

                <td className="px-6 py-4 text-right font-medium text-slate-700">
                  {column.mean.toFixed(2)}
                </td>

                <td className="px-6 py-4 text-right text-slate-700">
                  {column.median.toFixed(2)}
                </td>

                <td className="px-6 py-4 text-right text-slate-700">
                  {column.minimum.toFixed(2)}
                </td>

                <td className="px-6 py-4 text-right text-slate-700">
                  {column.maximum.toFixed(2)}
                </td>

                <td className="px-6 py-4 text-right text-slate-700">
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