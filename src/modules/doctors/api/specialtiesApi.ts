import { http } from '@/shared/services/http';
import type { PaginatedMeta } from '@/shared/types/pagination';

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

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginatedMeta;
};

export const specialtiesApi = {
  list: ({ page, perPage, search, pagination = true }: SpecialtyListParams) =>
    http.get<PaginatedResponse<Specialty> | Specialty[]>('/specialties', {
      params: {
        ...(pagination
          ? { pagination: true, page, per_page: perPage }
          : { pagination: false }),
        ...(search ? { search } : {}),
      },
    }),
};
