import { useQuery } from '@tanstack/react-query';

import { doctorApi } from '@/modules/doctors/api/doctorApi';
import { doctorKeys } from '@/modules/doctors/hooks/doctorKeys';

export function useDoctorDetailQuery(id: string | undefined) {
  return useQuery({
    queryKey: doctorKeys.detail(id ?? ''),
    queryFn: () => doctorApi.get(id as string),
    enabled: Boolean(id),
    retry: false,
  });
}
