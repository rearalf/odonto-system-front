import { http } from '@/shared/services/http';
import type { PaginatedResponse } from '@/shared/types/pagination';
import type { PatientResponse } from '../types/Patient';
import type { PatientListItem, PatientListParams } from '../types/PatientList';

/**
 * CAPA 1 — Red pura. Sin React, sin React Query, sin toasts.
 * POST, PATCH y GET por id devuelven el mismo `PatientResponse`.
 */
export const patientApi = {
  list: ({ page, perPage, search }: PatientListParams) =>
    http.get<PaginatedResponse<PatientListItem>>('/patients', {
      params: {
        pagination: true,
        page,
        per_page: perPage,
        ...(search ? { search } : {}),
      },
    }),

  get: (id: string) => http.get<PatientResponse>(`/patients/${id}`),

  create: (formData: FormData) =>
    http.post<PatientResponse>('/patients', formData),

  update: (id: string, formData: FormData) =>
    http.patch<PatientResponse>(`/patients/${id}`, formData),

  remove: (id: number) => http.delete<void>(`/patients/${id}`),
};
