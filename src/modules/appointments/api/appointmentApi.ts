import { http } from '@/shared/services/http';

import type {
  AppointmentResponse,
  AppointmentDetailResponse,
  AppointmentListParams,
  AppointmentListResponse,
  AppointmentStatus,
} from '@/modules/appointments/types';

export const appointmentApi = {
  create: (formData: FormData) =>
    http.post<AppointmentResponse>('/appointments', formData),

  list: (params: AppointmentListParams) =>
    http.get<AppointmentListResponse>('/appointments', {
      params,
      paramsSerializer: { indexes: null },
    }),

  getById: (id: number) =>
    http.get<AppointmentDetailResponse>(`/appointments/${id}`),

  delete: (id: number) =>
    http.delete<void>(`/appointments/${id}`),

  getStatuses: () =>
    http.get<AppointmentStatus[]>('/appointments/statuses'),
};