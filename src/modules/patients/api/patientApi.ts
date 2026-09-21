import { http } from '@/shared/services/http';
import type { PaginatedResponse, PatientListItem } from '../types/PatientList';

export type PatientListParams = {
  page: number;
  perPage: number;
  search?: string;
};

export const patientApi = {
  create: (formData: FormData) => http.post('/patients', formData),
  list: ({ page, perPage, search }: PatientListParams) =>
    http.get<PaginatedResponse<PatientListItem>>('/patients', {
      params: {
        pagination: true,
        page,
        per_page: perPage,
        ...(search ? { search } : {}),
      },
    }),
};
