import { useMutation, useQueryClient } from '@tanstack/react-query';

import { appointmentApi } from '@/modules/appointments/api/appointmentApi';
import { appointmentKeys } from '@/modules/appointments/hooks/appointmentKeys';

export function useAppointmentCreateMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => appointmentApi.create(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: appointmentKeys.lists() });
    },
  });
}
