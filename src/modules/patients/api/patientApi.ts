import { http } from '@/shared/services/http';
import type {
  PaginatedResponse,
  PatientDetail,
  PatientListItem,
} from '../types/PatientList';

export type PatientListParams = {
  page: number;
  perPage: number;
  search?: string;
};

export const patientApi = {
  create: (formData: FormData) => http.post('/patients', formData),
  get: (id: string) => http.get<PatientDetail>(`/patients/${id}`),
  update: (id: string, formData: FormData) => http.patch(`/patients/${id}`, formData),
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
