import { useMutation, useQueryClient } from '@tanstack/react-query';

import { doctorUnavailabilityApi } from '@/modules/doctors/api/doctorUnavailabilityApi';
import { unavailabilityKeys } from '@/modules/doctors/hooks/unavailabilityKeys';

export function useDoctorUnavailabilityDeleteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ doctorId, id }: { doctorId: string | number; id: number }) =>
      doctorUnavailabilityApi.remove(doctorId, id),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: unavailabilityKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: unavailabilityKeys.list({ doctorId: variables.doctorId }),
      });
    },
  });
}
