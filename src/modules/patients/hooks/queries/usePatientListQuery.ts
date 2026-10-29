import { useQuery } from '@tanstack/react-query';

import { patientApi } from '@/modules/patients/api/patientApi';
import { patientKeys } from '@/modules/patients/hooks/patientKeys';
import type { PatientListParams } from '@/modules/patients/types/PatientList';

export function usePatientListQuery(
  params: PatientListParams,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: patientKeys.list(params),
    queryFn: () => patientApi.list(params),
    enabled: options?.enabled,
  });
}
