import { useMutation } from '@tanstack/react-query';

import { patientApi } from '@/modules/patients/api/patientApi';

/**
 * CAPA 2 (primitivo) — DELETE /patients/:id.
 * Solo useMutation: sin toasts, sin navigate, sin invalidateQueries.
 * El orquestador `usePatientListPage` maneja el feedback.
 */
export function usePatientDeleteMutation() {
  return useMutation({
    mutationFn: (id: number) => patientApi.remove(id),
  });
}
