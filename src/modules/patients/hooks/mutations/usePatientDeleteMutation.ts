import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patientApi } from '@/modules/patients/api/patientApi';
import { patientKeys } from '@/modules/patients/hooks/patientKeys';

export function usePatientDeleteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => patientApi.remove(id),
    onSuccess: (_data, _variables: number) => {
      queryClient.invalidateQueries({ queryKey: patientKeys.lists() });
    },
  });
}
