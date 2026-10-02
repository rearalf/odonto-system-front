import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patientApi } from '@/modules/patients/api/patientApi';
import { patientKeys } from '@/modules/patients/hooks/patientKeys';

export function usePatientUpdateMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      patientApi.update(id, formData),
    onSuccess: (_data, variables: { id: string; formData: FormData }) => {
      const id = variables.id;
      queryClient.invalidateQueries({ queryKey: patientKeys.lists() });
      if (id) {
        queryClient.invalidateQueries({ queryKey: patientKeys.detail(id) });
      }
    },
  });
}
