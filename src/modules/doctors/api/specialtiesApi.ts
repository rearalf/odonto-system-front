import { http } from '@/shared/services/http';
import type { PaginatedResponse } from '@/shared/types/pagination';
import type { Specialty } from '../types/Specialty';
import type { ListParams } from '@/shared/types/baseInterfaces';

export const specialtiesApi = {
  list: ({ page, perPage, search, pagination = true }: ListParams) =>
    http.get<PaginatedResponse<Specialty>>('/specialties', {
      params: {
        ...(pagination
          ? { pagination: true, page, per_page: perPage }
          : { pagination: false }),
        ...(search ? { search } : {}),
      },
    }),
};
