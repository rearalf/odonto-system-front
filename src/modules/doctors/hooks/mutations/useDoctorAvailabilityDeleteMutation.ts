import { useMutation, useQueryClient } from '@tanstack/react-query';

import { doctorAvailabilityApi } from '@/modules/doctors/api/doctorAvailabilityApi';
import { availabilityKeys } from '@/modules/doctors/hooks/availabilityKeys';

export function useDoctorAvailabilityDeleteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      doctorId,
      id,
    }: {
      doctorId: string | number;
      id: number;
    }) => doctorAvailabilityApi.remove(doctorId, id),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: availabilityKeys.detail(variables.doctorId),
      });
    },
  });
}