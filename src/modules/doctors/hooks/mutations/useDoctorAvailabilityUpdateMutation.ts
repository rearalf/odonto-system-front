import { useMutation, useQueryClient } from '@tanstack/react-query';

import { doctorAvailabilityApi } from '@/modules/doctors/api/doctorAvailabilityApi';
import { availabilityKeys } from '@/modules/doctors/hooks/availabilityKeys';
import type { UpdateAvailabilityPayload } from '@/modules/doctors/types/Availability';

export function useDoctorAvailabilityUpdateMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      doctorId,
      id,
      payload,
    }: {
      doctorId: string | number;
      id: number;
      payload: UpdateAvailabilityPayload;
    }) => doctorAvailabilityApi.update(doctorId, id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: availabilityKeys.detail(variables.doctorId),
      });
    },
  });
}