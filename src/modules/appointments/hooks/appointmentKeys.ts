import type { AppointmentListParams } from '@/modules/appointments/types';

export const appointmentKeys = {
  all: ['appointments'] as const,
  lists: (params?: AppointmentListParams) => [...appointmentKeys.all, 'list', params ?? {}] as const,
  details: (id: number) => [...appointmentKeys.all, 'detail', id] as const,
};