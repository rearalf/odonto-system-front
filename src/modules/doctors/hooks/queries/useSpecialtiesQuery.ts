import { useQuery } from '@tanstack/react-query';

import { specialtiesApi } from '@/modules/doctors/api/specialtiesApi';
import { specialtyKeys } from '@/modules/doctors/hooks/specialtyKeys';
import type { ListParams } from '@/shared/types/baseInterfaces';

export function useSpecialtiesQuery(params?: ListParams) {
  return useQuery({
    queryKey: specialtyKeys.list(params),
    queryFn: () => specialtiesApi.list(params ?? {}),
    select: (response) => response.data,
  });
}

/** Catalogo completo para selects (sin paginacion). */
export function useSpecialtiesForSelect() {
  return useSpecialtiesQuery({ pagination: false });
}
