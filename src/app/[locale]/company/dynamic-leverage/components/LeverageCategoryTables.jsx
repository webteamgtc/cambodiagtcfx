"use client";

const DATA_COLUMNS = ["Column2", "Column3", "Column4", "Column5", "Column6"];

function LeverageDataTable({ section }) {
  const headerRow = section.data?.[0];
  const bodyRows = section.data?.slice(1) ?? [];

  if (!headerRow || !bodyRows.length) {
    return null;
  }

  return (
    <div>
      <h3 className="mb-3 text-[16px] font-semibold text-[#293B93]">{section.title}</h3>
      <div className="overflow-x-auto rounded-xl border border-[#e8ecf8]">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead>
            <tr className="bg-[#f8f9fc]">
              {DATA_COLUMNS.map((column) => (
                <th key={column} className="px-4 py-3 font-medium text-[#8a8a9a]">
                  {headerRow[column]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f1f6]">
            {bodyRows.map((row, rowIndex) => (
              <tr key={`${section.title}-${rowIndex}`} className="bg-white">
                {DATA_COLUMNS.map((column, columnIndex) => (
                  <td
                    key={column}
                    className={`px-4 py-3.5 ${
                      columnIndex === 0
                        ? "font-medium text-[#02002f]"
                        : columnIndex === DATA_COLUMNS.length - 1
                          ? "font-medium text-[#293B93]"
                          : "text-[#5a5a6e]"
                    }`}
                  >
                    {columnIndex === DATA_COLUMNS.length - 1 ? `● ${row[column]}` : row[column]}
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

export default function LeverageCategoryTables({ sections, emptyLabel }) {
  if (!sections.length) {
    return (
      <div className="rounded-xl border border-[#e8ecf8] bg-[#f8f9fc] px-6 py-10 text-center text-sm text-[#8a8a9a]">
        {emptyLabel}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <LeverageDataTable key={section.title} section={section} />
      ))}
    </div>
  );
}
