import { useQuery } from '@tanstack/react-query';

import { appointmentApi } from '@/modules/appointments/api/appointmentApi';
import type { AppointmentStatus } from '@/modules/appointments/types';

export function useAppointmentStatusesQuery() {
  return useQuery<AppointmentStatus[]>({
    queryKey: ['appointment-statuses'],
    queryFn: appointmentApi.getStatuses,
    staleTime: 1000 * 60 * 60,
  });
}