import React from "react";

export interface ColumnDef<T> {
  key: keyof T | string;
  header: string;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  rowKey: keyof T | ((row: T, index: number) => string);
  className?: string;
  onRowClick?: (row: T) => void;
}

export const DataTable = React.forwardRef<
  HTMLTableElement,
  DataTableProps<any>
>(({ data, columns, rowKey, className = "", onRowClick }, ref) => {
  const getRowKey = (row: any, index: number): string => {
    if (typeof rowKey === "function") {
      return rowKey(row, index);
    }
    return String(row[rowKey as string]);
  };

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table ref={ref} className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={`px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ${
                  column.width ? `w-${column.width}` : ""
                }`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={getRowKey(row, rowIndex)}
              onClick={() => onRowClick?.(row)}
              className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
            >
              {columns.map((column) => (
                <td
                  key={String(column.key)}
                  className="px-6 py-4 text-sm text-gray-900"
                >
                  {column.render
                    ? column.render((row as any)[column.key as string], row)
                    : (row as any)[column.key as string]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">No data available</div>
      )}
    </div>
  );
});

DataTable.displayName = "DataTable";

export default DataTable;
