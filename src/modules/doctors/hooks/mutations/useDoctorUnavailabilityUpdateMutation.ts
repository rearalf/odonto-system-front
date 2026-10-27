import { useMutation, useQueryClient } from '@tanstack/react-query';

import { doctorUnavailabilityApi } from '@/modules/doctors/api/doctorUnavailabilityApi';
import { unavailabilityKeys } from '@/modules/doctors/hooks/unavailabilityKeys';
import type { UpdateUnavailabilityPayload } from '@/modules/doctors/types/Unavailability';

export function useDoctorUnavailabilityUpdateMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      doctorId,
      id,
      payload,
    }: {
      doctorId: string | number;
      id: number;
      payload: UpdateUnavailabilityPayload;
    }) => doctorUnavailabilityApi.update(doctorId, id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: unavailabilityKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: unavailabilityKeys.list({ doctorId: variables.doctorId }),
      });
      queryClient.invalidateQueries({
        queryKey: unavailabilityKeys.detail(variables.doctorId, variables.id),
      });
    },
  });
}
