import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patientApi } from '@/modules/patients/api/patientApi';
import { patientKeys } from '@/modules/patients/hooks/patientKeys';

export function usePatientCreateMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => patientApi.create(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: patientKeys.lists() });
    },
  });
}
