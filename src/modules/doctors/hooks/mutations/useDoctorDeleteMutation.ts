import { useMutation, useQueryClient } from '@tanstack/react-query';

import { doctorApi } from '@/modules/doctors/api/doctorApi';
import { doctorKeys } from '@/modules/doctors/hooks/doctorKeys';

function useDoctorDeleteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => doctorApi.remove(id),
    onSuccess: (_data, _id) => {
      queryClient.invalidateQueries({ queryKey: doctorKeys.lists() });
    },
  });
}

export default useDoctorDeleteMutation;
