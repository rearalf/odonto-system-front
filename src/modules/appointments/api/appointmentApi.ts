import { http } from '@/shared/services/http';

import type {
  AppointmentCreatePayload,
  AppointmentResponse,
  AppointmentListParams,
  AppointmentListResponse,
  AppointmentStatus,
} from '@/modules/appointments/types';

export const appointmentApi = {
  create: (payload: AppointmentCreatePayload) =>
    http.post<AppointmentResponse>('/appointments', payload),

  list: (params: AppointmentListParams) =>
    http.get<AppointmentListResponse>('/appointments', { 
      params,
      paramsSerializer: { indexes: null },
    }),

  delete: (id: number) =>
    http.delete<void>(`/appointments/${id}`),

  getStatuses: () =>
    http.get<AppointmentStatus[]>('/appointments/statuses'),
};