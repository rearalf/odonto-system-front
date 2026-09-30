import { http } from '@/shared/services/http';
import type { PaginatedResponse } from '@/shared/types/pagination';

export type SpecialtyListParams = {
  page?: number;
  perPage?: number;
  search?: string;
  pagination?: boolean;
};

export type Specialty = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export const specialtiesApi = {
  list: ({ page, perPage, search, pagination = true }: SpecialtyListParams) =>
    http.get<PaginatedResponse<Specialty>>('/specialties', {
      params: {
        ...(pagination
          ? { pagination: true, page, per_page: perPage }
          : { pagination: false }),
        ...(search ? { search } : {}),
      },
    }),
};
