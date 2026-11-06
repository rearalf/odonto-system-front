import { useState, useMemo, useCallback } from 'react';
import { useDebounce } from '@/shared/hooks/useDebounce';

import { useAppointmentListQuery } from '@/modules/appointments/hooks/queries';
import type { AppointmentListParams } from '@/modules/appointments/types';
import type { AppointmentStatus } from '@/modules/appointments/types';
import { getStatusIds } from '@/modules/appointments/constants/appointment-status';
import {
  DEFAULT_PAGE,
  DEFAULT_PER_PAGE,
} from '../constants/appointmentListColumns';

function useAppointmentSearch(statuses: AppointmentStatus[]) {
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE);
  const [search, setSearch] = useState('');
  const [doctorId, setDoctorId] = useState<number | undefined>(undefined);
  const [from, setFrom] = useState<string | undefined>(undefined);
  const [to, setTo] = useState<string | undefined>(undefined);
  const [statusNames, setStatusNames] = useState<string[]>([]);
  const [sortBy, setSortBy] =
    useState<AppointmentListParams['sortBy']>('startTime');
  const [sortOrder, setSortOrder] =
    useState<AppointmentListParams['sortOrder']>('DESC');

  const debouncedSearch = useDebounce(search, 300);

  const statusIds = useMemo(
    () => getStatusIds(statuses, statusNames),
    [statuses, statusNames],
  );

  const params = useMemo<AppointmentListParams>(
    () => ({
      page,
      per_page: perPage,
      doctorId,
      from,
      to,
      patientName: debouncedSearch || undefined,
      status: statusIds.length > 0 ? statusIds : undefined,
      sortBy,
      sortOrder,
    }),
    [
      page,
      perPage,
      doctorId,
      from,
      to,
      debouncedSearch,
      statusIds,
      sortBy,
      sortOrder,
    ],
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

  const handleStatusChange = useCallback((newStatusNames: string[]) => {
    setStatusNames(newStatusNames);
    setPage(DEFAULT_PAGE);
  }, []);

  const handleSortByChange = useCallback(
    (newSortBy: AppointmentListParams['sortBy']) => {
      setSortBy(newSortBy);
      setPage(DEFAULT_PAGE);
    },
    [],
  );

  const handleSortOrderChange = useCallback(
    (newSortOrder: AppointmentListParams['sortOrder']) => {
      setSortOrder(newSortOrder);
      setPage(DEFAULT_PAGE);
    },
    [],
  );

  const handleClearFilters = useCallback(() => {
    setSearch('');
    setDoctorId(undefined);
    setFrom(undefined);
    setTo(undefined);
    setStatusNames([]);
    setSortBy('startTime');
    setSortOrder('ASC');
    setPage(DEFAULT_PAGE);
  }, []);

  const hasActiveFilters = useMemo(
    () => debouncedSearch || doctorId || from || to || statusNames.length > 0,
    [debouncedSearch, doctorId, from, to, statusNames],
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
    status: statusNames,
    sortBy,
    sortOrder,
    onPageChange: handlePageChange,
    onPerPageChange: handlePerPageChange,
    setSearchInput: handleSearchChange,
    setDoctorId: handleDoctorChange,
    setDateRange: handleDateRangeChange,
    setStatus: handleStatusChange,
    setSortBy: handleSortByChange,
    setSortOrder: handleSortOrderChange,
    handleClearFilters,
    hasActiveFilters,
    refetch: query.refetch,
  };
}

export default useAppointmentSearch;
