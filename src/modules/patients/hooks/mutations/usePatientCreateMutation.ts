import { useMutation } from '@tanstack/react-query';

import { patientApi } from '@/modules/patients/api/patientApi';

/**
 * CAPA 2 (primitivo) — POST /patients.
 * Solo useMutation: sin toasts, sin navigate, sin invalidateQueries.
 * El orquestador `usePatientCreate` maneja el feedback.
 */
export function usePatientCreateMutation() {
  return useMutation({
    mutationFn: (formData: FormData) => patientApi.create(formData),
  });
}
