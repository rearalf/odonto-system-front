import { useMutation, useQueryClient } from '@tanstack/react-query';

import { appointmentApi } from '@/modules/appointments/api/appointmentApi';
import { appointmentKeys } from '@/modules/appointments/hooks/appointmentKeys';

export function useAppointmentDeleteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => appointmentApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: appointmentKeys.all });
    },
  });
}
