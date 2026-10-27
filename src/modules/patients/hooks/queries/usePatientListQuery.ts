import { useQuery } from '@tanstack/react-query';

import { patientApi } from '@/modules/patients/api/patientApi';
import { patientKeys } from '@/modules/patients/hooks/patientKeys';
import type { PatientListParams } from '@/modules/patients/types/PatientList';

/**
 * CAPA 2 (primitivo) — GET /patients.
 * Solo useQuery. Sin toasts, sin navigate, sin useState.
 */
export function usePatientListQuery(params: PatientListParams) {
  return useQuery({
    queryKey: patientKeys.list(params),
    queryFn: () => patientApi.list(params),
  });
}
