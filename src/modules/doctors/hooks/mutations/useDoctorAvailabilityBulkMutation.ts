import { useMutation, useQueryClient } from '@tanstack/react-query';

import { doctorAvailabilityApi } from '@/modules/doctors/api/doctorAvailabilityApi';
import { availabilityKeys } from '@/modules/doctors/hooks/availabilityKeys';
import type { BulkAvailabilityPayload } from '@/modules/doctors/types/Availability';

export function useDoctorAvailabilityBulkMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      doctorId,
      payload,
    }: {
      doctorId: string | number;
      payload: BulkAvailabilityPayload;
    }) => doctorAvailabilityApi.bulkUpdate(doctorId, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: availabilityKeys.detail(variables.doctorId),
      });
    },
  });
}
