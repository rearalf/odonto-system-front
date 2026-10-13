import { useQuery } from '@tanstack/react-query';

import { doctorAvailabilityApi } from '@/modules/doctors/api/doctorAvailabilityApi';
import { availabilityKeys } from '@/modules/doctors/hooks/availabilityKeys';

export function useDoctorAvailabilityQuery(
  doctorId: string | number | undefined,
) {
  return useQuery({
    queryKey: availabilityKeys.detail(doctorId ?? ''),
    queryFn: () => doctorAvailabilityApi.get(doctorId as string | number),
    enabled: Boolean(doctorId),
    retry: false,
  });
}
