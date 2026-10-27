import { useCallback, useState } from 'react';

import { usePatientListQuery } from '@/modules/patients/hooks/queries/usePatientListQuery';

/**
 * CAPA 2 (orquestador) — estado de vista del listado + la query.
 * Aqui vive el useState de paginacion/busqueda; la red vive en el primitivo.
 */
export function usePatientList() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState('');

  const query = usePatientListQuery({
    page,
    perPage,
    search: search || undefined,
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
    total: query.data?.meta?.total_count ?? 0,
    isLoading: query.isFetching,
    page,
    perPage,
    search,
    onPageChange: setPage,
    onPerPageChange: changePerPage,
    applySearch,
  };
}
