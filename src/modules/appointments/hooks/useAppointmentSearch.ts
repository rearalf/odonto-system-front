import { useState, useMemo, useCallback } from 'react';
import { useDebounce } from '@/shared/hooks/useDebounce';

import { useAppointmentListQuery } from '@/modules/appointments/hooks/queries';
import type { AppointmentListParams } from '@/modules/appointments/types';
import {
  DEFAULT_PAGE,
  DEFAULT_PER_PAGE,
} from '../constants/appointmentListColumns';

function useAppointmentSearch() {
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE);
  const [search, setSearch] = useState('');
  const [doctorId, setDoctorId] = useState<number | undefined>(undefined);
  const [from, setFrom] = useState<string | undefined>(undefined);
  const [to, setTo] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<('scheduled' | 'waiting')[]>([]);
  const [sortBy, setSortBy] =
    useState<AppointmentListParams['sortBy']>('startTime');

  const debouncedSearch = useDebounce(search, 300);

  const params = useMemo<AppointmentListParams>(
    () => ({
      page,
      per_page: perPage,
      doctorId,
      from,
      to,
      patientName: debouncedSearch || undefined,
      status: status.length > 0 ? status : undefined,
      sortBy,
    }),
    [page, perPage, doctorId, from, to, debouncedSearch, status, sortBy],
  );

  const query = useAppointmentListQuery(params);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handlePerPageChange = useCallback((newPerPage: number) => {
    setPerPage(newPerPage);
    setPage(DEFAULT_PAGE);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(DEFAULT_PAGE);
  }, []);

  const handleDoctorChange = useCallback((id: number | undefined) => {
    setDoctorId(id);
    setPage(DEFAULT_PAGE);
  }, []);

  const handleDateRangeChange = useCallback(
    (newFrom: string | undefined, newTo: string | undefined) => {
      setFrom(newFrom);
      setTo(newTo);
      setPage(DEFAULT_PAGE);
    },
    [],
  );

  const handleStatusChange = useCallback(
    (newStatus: ('scheduled' | 'waiting')[]) => {
      setStatus(newStatus);
      setPage(DEFAULT_PAGE);
    },
    [],
  );

  const handleSortChange = useCallback(
    (newSortBy: AppointmentListParams['sortBy']) => {
      setSortBy(newSortBy);
      setPage(DEFAULT_PAGE);
    },
    [],
  );

  const handleClearFilters = useCallback(() => {
    setSearch('');
    setDoctorId(undefined);
    setFrom(undefined);
    setTo(undefined);
    setStatus([]);
    setSortBy('startTime');
    setPage(DEFAULT_PAGE);
  }, []);

  const hasActiveFilters = useMemo(
    () => debouncedSearch || doctorId || from || to || status.length > 0,
    [debouncedSearch, doctorId, from, to, status],
  );

  return {
    appointments: query.data?.data ?? [],
    total: query.data?.meta.total_count ?? 0,
    totalPages: query.data?.meta.total_pages ?? 0,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    page,
    perPage,
    search,
    searchInput: search,
    doctorId,
    from,
    to,
    status,
    sortBy,
    onPageChange: handlePageChange,
    onPerPageChange: handlePerPageChange,
    setSearchInput: handleSearchChange,
    setDoctorId: handleDoctorChange,
    setDateRange: handleDateRangeChange,
    setStatus: handleStatusChange,
    setSort: handleSortChange,
    handleClearFilters,
    hasActiveFilters,
    refetch: query.refetch,
  };
}

export default useAppointmentSearch;
