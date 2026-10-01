import { useMutation } from '@tanstack/react-query';

import { patientApi } from '@/modules/patients/api/patientApi';

/**
 * CAPA 2 (primitivo) — PATCH /patients/:id.
 * Solo useMutation: sin toasts, sin navigate, sin invalidateQueries.
 * El orquestador `usePatientEdit` maneja el feedback.
 */
export function usePatientUpdateMutation() {
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      patientApi.update(id, formData),
  });
}
