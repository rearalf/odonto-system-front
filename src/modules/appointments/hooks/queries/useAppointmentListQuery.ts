import { useQuery } from '@tanstack/react-query';

import { appointmentApi } from '@/modules/appointments/api/appointmentApi';
import { appointmentKeys } from '@/modules/appointments/hooks/appointmentKeys';
import type { AppointmentListParams } from '@/modules/appointments/types';

export function useAppointmentListQuery(
  params: AppointmentListParams,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: appointmentKeys.lists(params),
    queryFn: () => appointmentApi.list(params),
    enabled: options?.enabled,
    placeholderData: (previous) => previous,
  });
}