import { ReactNode } from "react";

export interface Column<T> {
  header: string;
  accessor: (row: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  keyExtractor: (row: T) => string;
  emptyMessage?: string;
}

export default function DataTable<T>({ columns, rows, keyExtractor, emptyMessage }: DataTableProps<T>) {
  if (rows.length === 0) {
    return <div className="py-10 text-center text-sm text-text-muted">{emptyMessage ?? "No records"}</div>;
  }

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-[11px] uppercase tracking-wider text-text-muted font-mono">
          {columns.map((col) => (
            <th key={col.header} className="text-left font-medium px-4 py-3">
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={keyExtractor(row)} className="border-t border-line hover:bg-surface-2 transition-colors">
            {columns.map((col) => (
              <td key={col.header} className={`px-4 py-3 text-text ${col.className ?? ""}`}>
                {col.accessor(row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
