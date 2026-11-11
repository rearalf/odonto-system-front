import { useMutation, useQueryClient } from '@tanstack/react-query';

import { appointmentApi } from '@/modules/appointments/api/appointmentApi';
import { appointmentKeys } from '@/modules/appointments/hooks/appointmentKeys';

export function useAppointmentUpdateStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, statusId }: { id: number; statusId: number }) =>
      appointmentApi.updateStatus(id, statusId),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: appointmentKeys.details(id) });
      queryClient.invalidateQueries({ queryKey: appointmentKeys.lists() });
    },
  });
}
