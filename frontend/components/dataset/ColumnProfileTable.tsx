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
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

      <div className="border-b px-6 py-5">
        <h2 className="text-xl font-semibold">
          Column Profile
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Overview of every dataset column.
        </p>
      </div>

      <div className="max-h-[520px] overflow-auto">

        <table className="min-w-full">

          <thead className="sticky top-0 bg-gray-50">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Name
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Type
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Null Count
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Null %
              </th>

            </tr>

          </thead>

          <tbody>

            {columns.map((column) => (
              <tr
                key={column.name}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  {column.name}
                </td>

                <td className="px-6 py-4">
                  {column.dtype}
                </td>

                <td className="px-6 py-4">
                  {column.null_count}
                </td>

                <td className="px-6 py-4">
                  {column.null_percentage.toFixed(2)}%
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}