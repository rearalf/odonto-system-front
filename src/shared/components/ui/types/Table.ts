import type { ReactNode } from 'react';

export type TableColumnAlign = 'left' | 'center' | 'right';

export type TableColumn<T> = {
  key: keyof T & string;
  header?: ReactNode;
  sortable?: boolean;
  render?: (row: T) => ReactNode;
  align?: TableColumnAlign;
  className?: string;
};

export type SortDirection = 'asc' | 'desc';

export type TableProps<T> = {
  columns: TableColumn<T>[];
  rows: T[];
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  sortKey?: string;
  sortDirection?: SortDirection;
  onSortChange?: (sortKey: string, sortDirection: SortDirection) => void;
  rowKey?: (row: T, index: number) => React.Key;
  isLoading?: boolean;
  emptyState?: ReactNode;
  pageSizeOptions?: number[];
  onPageSizeChange?: (pageSize: number) => void;
  className?: string;
};
