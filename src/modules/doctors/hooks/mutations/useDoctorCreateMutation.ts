import { useMutation } from '@tanstack/react-query';

import { doctorApi } from '@/modules/doctors/api/doctorApi';

/**
 * CAPA 2 (primitivo) — POST /doctors.
 * Solo useMutation: sin toasts, sin navigate, sin invalidateQueries.
 * El orquestador `useDoctorCreate` maneja el feedback.
 */
export function useDoctorCreateMutation() {
  return useMutation({
    mutationFn: (formData: FormData) => doctorApi.create(formData),
  });
}
