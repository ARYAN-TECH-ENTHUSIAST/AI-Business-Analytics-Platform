interface Props {
  columns: string[];
  rows: Record<string, unknown>[];
}

export default function DatasetPreviewTable({
  columns,
  rows,
}: Props) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-200 bg-gradient-to-r from-emerald-50 via-white to-cyan-50 px-6 py-5">

        <h2 className="text-xl font-semibold text-slate-900">
          Dataset Preview
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          First 20 records from the uploaded dataset.
        </p>

      </div>

      <div className="max-h-[650px] overflow-auto">

        <table className="min-w-full text-sm">

          <thead className="sticky top-0 z-10 bg-slate-100 backdrop-blur">

            <tr>

              {columns.map((column) => (
                <th
                  key={column}
                  className="border-b border-slate-200 px-6 py-4 text-left font-semibold tracking-wide whitespace-nowrap text-slate-700"
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
                className="
                  border-b
                  border-slate-100
                  transition-all
                  duration-200
                  odd:bg-white
                  even:bg-slate-50/40
                  hover:bg-emerald-50
                "
              >

                {columns.map((column) => (

                  <td
                    key={column}
                    className="
                      px-6
                      py-4
                      whitespace-nowrap
                      text-slate-700
                    "
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