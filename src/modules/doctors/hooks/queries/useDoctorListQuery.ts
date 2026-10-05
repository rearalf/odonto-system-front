import { useQuery } from '@tanstack/react-query';

import { doctorApi } from '@/modules/doctors/api/doctorApi';
import { doctorKeys } from '@/modules/doctors/hooks/doctorKeys';
import type { DoctorListParams } from '@/modules/doctors/types/DoctorList';

export function useDoctorListQuery(params: DoctorListParams) {
  return useQuery({
    queryKey: doctorKeys.list(params),
    queryFn: () => doctorApi.list(params),
  });
}
