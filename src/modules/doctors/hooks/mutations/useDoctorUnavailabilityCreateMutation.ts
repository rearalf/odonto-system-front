import { useMutation, useQueryClient } from '@tanstack/react-query';

import { doctorUnavailabilityApi } from '@/modules/doctors/api/doctorUnavailabilityApi';
import { unavailabilityKeys } from '@/modules/doctors/hooks/unavailabilityKeys';
import type { CreateUnavailabilityPayload } from '@/modules/doctors/types/Unavailability';

export function useDoctorUnavailabilityCreateMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      doctorId,
      payload,
    }: {
      doctorId: string | number;
      payload: CreateUnavailabilityPayload;
    }) => doctorUnavailabilityApi.create(doctorId, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: unavailabilityKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: unavailabilityKeys.list({ doctorId: variables.doctorId }),
      });
    },
  });
}
