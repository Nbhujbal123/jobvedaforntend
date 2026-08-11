import type { ReactNode } from 'react';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Inbox } from 'lucide-react';

export interface DataTableColumn<T> {
  header: string;
  accessor: (row: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  keyField: (row: T) => string;
  isLoading?: boolean;
  isError?: boolean;
  emptyMessage?: string;
}

export function DataTable<T>({
  columns,
  rows,
  keyField,
  isLoading = false,
  isError = false,
  emptyMessage = 'No records found.',
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-[16px] border border-secondary/10 bg-white shadow-[var(--shadow-soft)]">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-secondary/10 bg-accent/40 text-xs font-semibold uppercase tracking-wide text-muted">
            {columns.map((column) => (
              <th key={column.header} className={`px-4 py-3 ${column.className ?? ''}`}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={columns.length} className="py-16">
                <LoadingSpinner size={24} />
              </td>
            </tr>
          )}
          {!isLoading && isError && (
            <tr>
              <td colSpan={columns.length} className="py-16 text-center text-muted">
                Could not load data. Please try again.
              </td>
            </tr>
          )}
          {!isLoading && !isError && rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="py-16">
                <div className="flex flex-col items-center gap-2 text-muted">
                  <Inbox size={24} aria-hidden="true" />
                  <span>{emptyMessage}</span>
                </div>
              </td>
            </tr>
          )}
          {!isLoading &&
            !isError &&
            rows.map((row) => (
              <tr key={keyField(row)} className="border-b border-secondary/5 last:border-0 hover:bg-accent/20">
                {columns.map((column) => (
                  <td key={column.header} className={`px-4 py-3 align-middle text-text ${column.className ?? ''}`}>
                    {column.accessor(row)}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
