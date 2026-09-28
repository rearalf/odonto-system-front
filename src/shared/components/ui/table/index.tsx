import { Fragment } from 'react';
import {
  ArrowUpDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import type { TableColumn, TableColumnAlign, TableProps } from '../types/Table';
import {
  getNextSortDirection,
  getPageRange,
  getTotalPages,
  getVisiblePages,
} from './logic';
import { paginationClasses, tableClasses } from './classes';

const alignClasses: Record<TableColumnAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

const defaultRender = (value: unknown) => {
  if (value === null || value === undefined) return null;
  return String(value);
};

const MAX_SKELETON_ROWS = 8;

function Table<T>({
  columns,
  rows,
  total,
  page,
  pageSize,
  onPageChange,
  sortKey,
  sortDirection,
  onSortChange,
  rowKey,
  isLoading = false,
  emptyState,
  pageSizeOptions,
  onPageSizeChange,
  className,
}: TableProps<T>) {
  const totalPages = getTotalPages(total, pageSize);
  const { start, end } = getPageRange(page, pageSize, total);
  const visiblePages = getVisiblePages(page, totalPages);

  const handleSort = (key: string) => {
    if (!onSortChange) return;
    onSortChange(key, getNextSortDirection(sortKey === key, sortDirection));
  };

  const renderHeader = (column: TableColumn<T>) => {
    if (!column.sortable || !onSortChange) return column.header;
    const isActive = sortKey === column.key;
    return (
      <button
        type="button"
        onClick={() => handleSort(column.key)}
        className={tableClasses.thSortable}
        aria-label={`Ordenar por ${column.header}`}
      >
        <span>{column.header}</span>
        {isActive ? (
          sortDirection === 'asc' ? (
            <ChevronUp className="h-4 w-4" aria-hidden="true" />
          ) : (
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          )
        ) : (
          <ArrowUpDown className="h-3.5 w-3.5 text-text-subtle" aria-hidden="true" />
        )}
      </button>
    );
  };

  const renderSkeletonRows = () =>
    Array.from({ length: Math.min(pageSize, MAX_SKELETON_ROWS) }, (_, i) => (
      <tr key={i} className={tableClasses.row}>
        {columns.map((column) => (
          <td key={column.key} className={tableClasses.td}>
            <span className={tableClasses.skeleton} aria-hidden="true" />
          </td>
        ))}
      </tr>
    ));

  return (
    <div className={cn(tableClasses.wrapper, className)}>
      <div className={tableClasses.scroll}>
        <table className={tableClasses.table} aria-busy={isLoading}>
          <thead className={tableClasses.thead}>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={cn(
                    tableClasses.th,
                    column.align !== undefined && alignClasses[column.align],
                  )}
                  aria-sort={
                    column.sortable && sortKey === column.key
                      ? sortDirection === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : undefined
                  }
                >
                  {renderHeader(column)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={tableClasses.tbody}>
            {isLoading ? (
              renderSkeletonRows()
            ) : rows.length > 0 ? (
              rows.map((row, rowIndex) => (
                <tr key={rowKey ? rowKey(row, rowIndex) : rowIndex} className={tableClasses.row}>
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn(
                        tableClasses.td,
                        column.align !== undefined && alignClasses[column.align],
                        column.className,
                      )}
                    >
                      {column.render
                        ? column.render(row)
                        : defaultRender(row[column.key])}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className={tableClasses.empty}>
                  {emptyState ?? (
                    <p className="text-body-md text-text-muted">
                      No hay datos para mostrar.
                    </p>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {total > 0 && (
        <div className={tableClasses.footer}>
          <div className={tableClasses.footerInfo}>
            <p className={tableClasses.info}>
              Mostrando {start}–{end} de {total}
            </p>
            {pageSizeOptions && onPageSizeChange && (
              <label className="flex items-center gap-2 text-body-sm text-text-muted">
                <span>Filas por página</span>
                <select
                  value={pageSize}
                  onChange={(e) => onPageSizeChange(Number(e.target.value))}
                  className={tableClasses.select}
                  aria-label="Filas por página"
                >
                  {pageSizeOptions.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>

          <div className={tableClasses.pagination}>
            <button
              type="button"
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
              aria-label="Página anterior"
              className={cn(
                paginationClasses.base,
                page <= 1 ? paginationClasses.disabled : paginationClasses.idle,
              )}
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            {visiblePages.map((p, index) => {
              const prev = visiblePages[index - 1];
              const withEllipsis = prev !== undefined && p - prev > 1;
              return (
                <Fragment key={p}>
                  {withEllipsis && (
                    <span className={tableClasses.ellipsis} aria-hidden="true">
                      …
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => onPageChange(p)}
                    aria-current={p === page ? 'page' : undefined}
                    className={cn(
                      paginationClasses.base,
                      p === page
                        ? paginationClasses.active
                        : paginationClasses.idle,
                    )}
                  >
                    {p}
                  </button>
                </Fragment>
              );
            })}
            <button
              type="button"
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages}
              aria-label="Página siguiente"
              className={cn(
                paginationClasses.base,
                page >= totalPages
                  ? paginationClasses.disabled
                  : paginationClasses.idle,
              )}
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Table;