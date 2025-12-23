import React from "react";

interface DynamicTableProps<T> {
  headers: string[];
  data: T[];
  // renderRow is a function that returns an ARRAY of elements
  renderRow: (item: T) => React.ReactNode[];
  actions?: (item: T) => React.ReactNode;
}

export function DynamicTable<T>({
  headers,
  data,
  renderRow,
  actions,
}: DynamicTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {headers.map((header, i) => (
              <th
                key={i}
                className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
            {actions && <th className="px-6 py-3 text-right">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
              {/* Map through the array of content you provided */}
              {renderRow(item).map((content, colIndex) => (
                <td key={colIndex} className="px-6 py-4 text-sm text-gray-600">
                  {content}
                </td>
              ))}

              {actions && (
                <td className="px-6 py-4 text-right">{actions(item)}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
