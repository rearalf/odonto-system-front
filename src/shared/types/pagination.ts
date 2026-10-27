export type PaginatedMeta = {
  total_count: number;
  total_pages: number;
  page: number;
  per_page: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginatedMeta | null;
};
