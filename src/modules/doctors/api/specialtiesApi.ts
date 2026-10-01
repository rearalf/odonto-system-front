import { http } from '@/shared/services/http';
import type { PaginatedResponse } from '@/shared/types/pagination';
import type { Specialty, SpecialtyListParams } from '../types/Specialty';

/**
 * CAPA 1 — Red pura. Sin React, sin React Query, sin toasts.
 * `pagination: false` devuelve `{ data, meta: null }`.
 */
export const specialtiesApi = {
  list: ({
    page,
    perPage,
    search,
    pagination = true,
  }: SpecialtyListParams) =>
    http.get<PaginatedResponse<Specialty>>('/specialties', {
      params: {
        ...(pagination
          ? { pagination: true, page, per_page: perPage }
          : { pagination: false }),
        ...(search ? { search } : {}),
      },
    }),
};
