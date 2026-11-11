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

  getStatuses: () => http.get<AppointmentStatus[]>('/statuses/statuses'),
  updateStatus: (id: number, statusId: number) =>
    http.patch<AppointmentResponse>(`/statuses/${id}/status`, {
      statusId,
    }),
};
