import { http } from '@/shared/services/http';
import type { PaginatedResponse } from '@/shared/types/pagination';
import type {
  DoctorDetail,
  DoctorSummary,
  DoctorListItem,
} from '../types/Doctor';
import type { ListParams } from '@/shared/types/baseInterfaces';

export const doctorApi = {
  list: ({ page, perPage, search }: ListParams) =>
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
    http.post<DoctorSummary>('/doctors', formData),

  update: (id: string, formData: FormData) =>
    http.patch<DoctorSummary>(`/doctors/${id}`, formData),

  remove: (id: number) => http.delete<void>(`/doctors/${id}`),
};
