import { useMutation, useQueryClient } from '@tanstack/react-query';

import { doctorApi } from '@/modules/doctors/api/doctorApi';
import { doctorKeys } from '@/modules/doctors/hooks/doctorKeys';

export function useDoctorUpdateMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      doctorApi.update(id, formData),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: doctorKeys.lists() });
      queryClient.invalidateQueries({ queryKey: doctorKeys.detail(id) });
    },
  });
}
