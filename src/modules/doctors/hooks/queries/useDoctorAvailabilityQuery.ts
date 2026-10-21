import { useQuery } from '@tanstack/react-query';

import { doctorAvailabilityApi } from '@/modules/doctors/api/doctorAvailabilityApi';
import { availabilityKeys } from '@/modules/doctors/hooks/availabilityKeys';
import type { AvailabilityListParams } from '@/modules/doctors/types/Availability';

export function useDoctorAvailabilityQuery(
  params: AvailabilityListParams | undefined,
) {
  const { doctorId } = params ?? {};

  return useQuery({
    queryKey: availabilityKeys.list(params),
    queryFn: () => doctorAvailabilityApi.list(params as AvailabilityListParams),
    enabled: Boolean(doctorId),
    retry: false,
  });
}
