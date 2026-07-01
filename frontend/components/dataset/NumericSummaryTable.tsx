import Card from "@/components/ui/Card";
import { NumericSummary } from "@/types/analytics";

interface Props {
  columns: NumericSummary[];
}

export default function NumericSummaryTable({
  columns,
}: Props) {
  return (
    <Card>
      <h2 className="mb-4 text-xl font-semibold">
        Numeric Summary
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Column</th>
              <th className="px-4 py-3 text-left">Mean</th>
              <th className="px-4 py-3 text-left">Median</th>
              <th className="px-4 py-3 text-left">Min</th>
              <th className="px-4 py-3 text-left">Max</th>
              <th className="px-4 py-3 text-left">Std</th>
            </tr>
          </thead>

          <tbody>

            {columns.map((column) => (

              <tr key={column.column}>

                <td className="border-t px-4 py-3">
                  {column.column}
                </td>

                <td className="border-t px-4 py-3">
                  {column.mean.toFixed(2)}
                </td>

                <td className="border-t px-4 py-3">
                  {column.median.toFixed(2)}
                </td>

                <td className="border-t px-4 py-3">
                  {column.minimum.toFixed(2)}
                </td>

                <td className="border-t px-4 py-3">
                  {column.maximum.toFixed(2)}
                </td>

                <td className="border-t px-4 py-3">
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