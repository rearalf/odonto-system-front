import { useQuery } from '@tanstack/react-query';

import { specialtiesApi } from '@/modules/doctors/api/specialtiesApi';
import { specialtyKeys } from '@/modules/doctors/hooks/doctorKeys';
import type { SpecialtyListParams } from '@/modules/doctors/types/Specialty';

/**
 * CAPA 2 (primitivo) — GET /specialties.
 * Solo useQuery. `select` desenvuelve el envelope `{ data, meta }`.
 */
export function useSpecialtiesQuery(params?: SpecialtyListParams) {
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
