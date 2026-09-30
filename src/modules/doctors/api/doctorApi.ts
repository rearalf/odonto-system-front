import { http } from '@/shared/services/http';
import type {
  DoctorListItem,
  PaginatedResponse,
  DoctorListParams,
} from '../types/DoctorList';
import type { DoctorDetail } from '../types/DoctorDetail';

export const doctorApi = {
  create: (formData: FormData) => http.post('/doctors', formData),
  get: (id: string) => http.get<DoctorDetail>(`/doctors/${id}`),
  update: (id: string, formData: FormData) => http.patch(`/doctors/${id}`, formData),
  remove: (id: number) => http.delete(`/doctors/${id}`),
  list: ({ page, perPage, search }: DoctorListParams) =>
    http.get<PaginatedResponse<DoctorListItem>>('/doctors', {
      params: {
        pagination: true,
        page,
        per_page: perPage,
        ...(search ? { search } : {}),
      },
    }),
};