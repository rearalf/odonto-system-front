import { http } from '@/shared/services/http';

import type {
  AppointmentCreatePayload,
  AppointmentResponse,
  AppointmentListParams,
  AppointmentListResponse,
} from '@/modules/appointments/types';

export const appointmentApi = {
  create: (payload: AppointmentCreatePayload) =>
    http.post<AppointmentResponse>('/appointments', payload),

  list: (params: AppointmentListParams) =>
    http.get<AppointmentListResponse>('/appointments', { params }),

  delete: (id: number) =>
    http.delete<void>(`/appointments/${id}`),
};