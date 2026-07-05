interface Props {
  columns: string[];
  rows: Record<string, unknown>[];
}

export default function DatasetPreviewTable({
  columns,
  rows,
}: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

      <div className="border-b px-6 py-5">
        <h2 className="text-xl font-semibold">
          Dataset Preview
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          First 20 records from the uploaded dataset.
        </p>
      </div>

      <div className="max-h-[600px] overflow-auto">

        <table className="min-w-full">

          <thead className="sticky top-0 bg-gray-50">

            <tr>

              {columns.map((column) => (
                <th
                  key={column}
                  className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap"
                >
                  {column}
                </th>
              ))}

            </tr>

          </thead>

          <tbody>

            {rows.map((row, index) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-50"
              >
                {columns.map((column) => (
                  <td
                    key={column}
                    className="px-6 py-4 whitespace-nowrap"
                  >
                    {String(row[column] ?? "")}
                  </td>
                ))}
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}