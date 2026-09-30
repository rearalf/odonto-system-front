'use no memo';

import { useQuery } from '@tanstack/react-query';
import { specialtiesApi, type Specialty, type PaginatedResponse, type SpecialtyListParams } from '@/modules/doctors/api/specialtiesApi';

export function useSpecialties(params?: SpecialtyListParams) {
  const query = useQuery({
    queryKey: ['specialties', params],
    queryFn: () => specialtiesApi.list(params ?? {}),
    select: (response) => {
      if (Array.isArray(response)) return response;
      if (response && typeof response === 'object' && 'data' in response) {
        return (response as PaginatedResponse<Specialty>).data;
      }
      return [];
    },
  });

  return {
    specialties: query.data ?? [],
    isLoading: query.isLoading,
    refetch: query.refetch,
    fetchMore: (moreParams: SpecialtyListParams) => specialtiesApi.list(moreParams),
  };
}

export function useSpecialtiesForSelect() {
  return useSpecialties({ pagination: false });
}