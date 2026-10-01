import { http } from '@/shared/services/http';
import type { PaginatedResponse } from '@/shared/types/pagination';
import type { DoctorListItem, DoctorListParams } from '../types/DoctorList';
import type { DoctorDetail } from '../types/DoctorDetail';

/**
 * CAPA 1 — Red pura. Sin React, sin React Query, sin toasts.
 */
export const doctorApi = {
  list: ({ page, perPage, search }: DoctorListParams) =>
    http.get<PaginatedResponse<DoctorListItem>>('/doctors', {
      params: {
        pagination: true,
        page,
        per_page: perPage,
        ...(search ? { search } : {}),
      },
    }),

  get: (id: string) => http.get<DoctorDetail>(`/doctors/${id}`),

  create: (formData: FormData) =>
    http.post<DoctorDetail>('/doctors', formData),

  update: (id: string, formData: FormData) =>
    http.patch<DoctorDetail>(`/doctors/${id}`, formData),

  remove: (id: number) => http.delete<void>(`/doctors/${id}`),
};
