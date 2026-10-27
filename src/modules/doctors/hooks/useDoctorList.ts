import { useCallback, useState } from 'react';
import { useDoctorListQuery } from './queries/useDoctorListQuery';

export function useDoctorList() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState('');

  const query = useDoctorListQuery({
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
    doctors: query.data?.data ?? [],
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
