import { http } from '@/shared/services/http';

import type {
  AppointmentCreatePayload,
  AppointmentResponse,
} from '../types/Appointment';

export const appointmentApi = {
  create: (payload: AppointmentCreatePayload) =>
    http.post<AppointmentResponse>('/appointments', payload),
};
