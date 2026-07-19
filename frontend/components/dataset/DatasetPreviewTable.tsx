interface Props {
  columns: string[];
  rows: Record<string, unknown>[];
}

export default function DatasetPreviewTable({
  columns,
  rows,
}: Props) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm ring-1 ring-slate-100">

      <div className="border-b border-slate-200 bg-gradient-to-r from-emerald-50 via-white to-cyan-50 px-6 py-5">

        <h2 className="text-xl font-semibold tracking-tight text-slate-900">
          Dataset Preview
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          First 20 records from the uploaded dataset.
        </p>

      </div>

      <div className="max-h-[650px] overflow-auto">

        <table className="min-w-full border-separate border-spacing-0 text-sm">

          <thead className="sticky top-0 z-20 bg-white/90 backdrop-blur-md">

            <tr>

              {columns.map((column) => (
                <th
                  key={column}
                  className="
                    border-b
                    border-slate-200
                    bg-slate-50/90
                    px-6
                    py-4
                    text-left
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    whitespace-nowrap
                    text-slate-600
                  "
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
                  group
                  border-b
                  border-slate-100
                  odd:bg-white
                  even:bg-slate-50/40
                  transition-colors
                  duration-200
                  hover:bg-emerald-50/70
                "
              >

                {columns.map((column) => (

                  <td
                    key={column}
                    className="
                      max-w-[280px]
                      border-b
                      border-slate-100
                      px-6
                      py-4
                      align-middle
                      text-slate-700
                      transition-colors
                      duration-200
                      group-hover:text-slate-900
                    "
                    title={String(row[column] ?? "")}
                  >
                    <div className="truncate">
                      {String(row[column] ?? "")}
                    </div>
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