import { useQuery } from '@tanstack/react-query';

import { doctorApi } from '@/modules/doctors/api/doctorApi';
import { doctorKeys } from '@/modules/doctors/hooks/doctorKeys';
import type { ListParams } from '@/shared/types/baseInterfaces';

export function useDoctorListQuery(
  params: ListParams,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: doctorKeys.list(params),
    queryFn: () => doctorApi.list(params),
    enabled: options?.enabled,
  });
}
