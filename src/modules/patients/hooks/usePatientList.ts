import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

import { patientApi } from '@/modules/patients/api/patientApi';

export function usePatientList() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState('');

  const query = useQuery({
    queryKey: ['patients', page, perPage, search],
    queryFn: () => patientApi.list({ page, perPage, search: search || undefined }),
  });

  const applySearch = useCallback((next: string) => {
    setSearch(next);
    setPage(1);
  }, []);

  const changePerPage = useCallback((next: number) => {
    setPerPage(next);
    setPage(1);
  }, []);

  return {
    patients: query.data?.data ?? [],
    total: query.data?.meta.total_count ?? 0,
    isLoading: query.isFetching,
    page,
    perPage,
    search,
    onPageChange: setPage,
    onPerPageChange: changePerPage,
    applySearch,
  };
}