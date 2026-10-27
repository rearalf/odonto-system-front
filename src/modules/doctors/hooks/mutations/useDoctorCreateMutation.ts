import { useMutation, useQueryClient } from '@tanstack/react-query';

import { doctorApi } from '@/modules/doctors/api/doctorApi';
import { doctorKeys } from '@/modules/doctors/hooks/doctorKeys';

export function useDoctorCreateMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => doctorApi.create(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: doctorKeys.lists() });
    },
  });
}
