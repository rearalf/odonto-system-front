import { useQuery } from '@tanstack/react-query';

import { unavailabilityKeys } from '../unavailabilityKeys';
import type { UnavailabilityListParams } from '../../types/Unavailability';
import { doctorUnavailabilityApi } from '../../api/doctorUnavailabilityApi';

export function useDoctorUnavailabilityQuery(
  params: UnavailabilityListParams | undefined,
) {
  const { doctorId } = params ?? {};

  return useQuery({
    queryKey: unavailabilityKeys.list(params as UnavailabilityListParams),
    queryFn: () =>
      doctorUnavailabilityApi.list(params as UnavailabilityListParams),
    enabled: Boolean(doctorId),
    retry: false,
  });
}
