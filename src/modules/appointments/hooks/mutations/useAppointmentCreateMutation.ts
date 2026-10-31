import { useMutation, useQueryClient } from '@tanstack/react-query';

import { appointmentApi } from '@/modules/appointments/api/appointmentApi';
import { appointmentKeys } from '@/modules/appointments/hooks/appointmentKeys';
import type { AppointmentCreatePayload } from '@/modules/appointments/types';

export function useAppointmentCreateMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AppointmentCreatePayload) =>
      appointmentApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: appointmentKeys.lists() });
    },
  });
}
