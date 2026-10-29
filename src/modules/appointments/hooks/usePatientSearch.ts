import { usePatientListQuery } from '@/modules/patients/hooks/queries/usePatientListQuery';
import { useEffect, useMemo, useState } from 'react';

function usePatientSearch() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = window.setTimeout(
      () => setDebouncedSearch(search.trim()),
      500,
    );
    return () => window.clearTimeout(timer);
  }, [search]);

  const query = usePatientListQuery(
    {
      page: 1,
      perPage: 8,
      search: debouncedSearch,
      pagination: false,
      _scope: 'search-select',
    },
    { enabled: Boolean(debouncedSearch) },
  );

  const options = useMemo(() => {
    if (!debouncedSearch) return [];
    return (
      query.data?.data?.map((patient) => ({
        id: patient.id,
        label: patient.fullName,
        data: patient,
      })) ?? []
    );
  }, [debouncedSearch, query.data?.data]);

  return {
    search,
    query,
    options,
    setSearch,
  };
}

export default usePatientSearch;
