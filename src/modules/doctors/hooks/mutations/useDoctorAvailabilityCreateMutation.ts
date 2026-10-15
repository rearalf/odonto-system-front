import { useMutation, useQueryClient } from '@tanstack/react-query';

import { doctorAvailabilityApi } from '@/modules/doctors/api/doctorAvailabilityApi';
import { availabilityKeys } from '@/modules/doctors/hooks/availabilityKeys';
import type { CreateAvailabilityPayload } from '@/modules/doctors/types/Availability';

export function useDoctorAvailabilityCreateMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      doctorId,
      payload,
    }: {
      doctorId: string | number;
      payload: CreateAvailabilityPayload;
    }) => doctorAvailabilityApi.create(doctorId, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: availabilityKeys.detail(variables.doctorId),
      });
    },
  });
}