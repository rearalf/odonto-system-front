import type { SortDirection } from '../types/Table';

export const getTotalPages = (total: number, pageSize: number) =>
  pageSize > 0 ? Math.ceil(total / pageSize) : 0;

export const getPageRange = (page: number, pageSize: number, total: number) =>
  total === 0
    ? { start: 0, end: 0 }
    : {
        start: (page - 1) * pageSize + 1,
        end: Math.min(page * pageSize, total),
      };

const MAX_VISIBLE_PAGES = 5;

export const getVisiblePages = (page: number, totalPages: number) => {
  if (totalPages <= MAX_VISIBLE_PAGES) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages = new Set<number>([1, totalPages]);
  for (
    let p = Math.max(1, page - 1);
    p <= Math.min(totalPages, page + 1);
    p += 1
  ) {
    pages.add(p);
  }
  return [...pages].sort((a, b) => a - b);
};

export const getNextSortDirection = (
  active: boolean,
  direction: SortDirection | undefined,
): SortDirection => (active && direction === 'asc' ? 'desc' : 'asc');