// src/components/ui/table.tsx
import React from "react";

export type Column<T = any> = {
  key: string;
  header?: string;
  render?: (row: T) => React.ReactNode;
};

type Props<T = any> = {
  columns: Column<T>[];
  data: T[];
  className?: string;
};

function Table<T = any>({ columns, data, className = "" }: Props<T>) {
  return (
    <div className={`overflow-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-zinc-900 text-white">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-2 text-left text-sm font-medium"
              >
                {col.header ?? col.key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-zinc-50">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2 text-sm">
                  {col.render ? col.render(row) : (row as any)[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
export { Table };
