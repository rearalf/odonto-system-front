import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patientApi } from '@/modules/patients/api/patientApi';
import {
  showApiError,
  showSuccess,
} from '@/shared/components/feedback';

export function usePatientDelete() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => patientApi.remove(id),
    onSuccess: () => {
      showSuccess('Paciente eliminado', {
        description: 'El paciente se eliminó correctamente',
      });
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
    onError: (error) => {
      showApiError(error);
    },
  });

  return {
    deletePatient: (id: number) => mutation.mutateAsync(id),
    isDeleting: mutation.isPending,
    deletingId: mutation.isPending ? mutation.variables : undefined,
  };
}