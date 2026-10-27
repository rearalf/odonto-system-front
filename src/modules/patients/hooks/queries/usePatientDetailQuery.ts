import { useQuery } from '@tanstack/react-query';

import { patientApi } from '@/modules/patients/api/patientApi';
import { patientKeys } from '@/modules/patients/hooks/patientKeys';

/**
 * CAPA 2 (primitivo) — GET /patients/:id.
 * Solo useQuery. Sin toasts, sin navigate, sin useState.
 */
export function usePatientDetailQuery(id: string | undefined) {
  return useQuery({
    queryKey: patientKeys.detail(id ?? ''),
    queryFn: () => patientApi.get(id as string),
    enabled: Boolean(id),
    retry: false,
  });
}
