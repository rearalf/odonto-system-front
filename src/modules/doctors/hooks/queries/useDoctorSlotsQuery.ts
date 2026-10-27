import { useQuery } from '@tanstack/react-query';

import { doctorSlotsApi } from '@/modules/doctors/api/doctorSlotsApi';
import { slotsKeys } from '@/modules/doctors/hooks/availabilityKeys';
import type { SlotsQueryParams } from '@/modules/doctors/types/Slots';

export function useDoctorSlotsQuery(params: SlotsQueryParams | undefined) {
  const { doctorId, date } = params ?? {};

  return useQuery({
    queryKey: slotsKeys.detail(doctorId ?? '', date ?? ''),
    queryFn: () => doctorSlotsApi.getSlots(params as SlotsQueryParams),
    enabled: Boolean(doctorId && date),
    retry: false,
    staleTime: 30_000,
  });
}
