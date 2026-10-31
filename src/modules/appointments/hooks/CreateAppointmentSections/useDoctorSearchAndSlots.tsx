import { useEffect, useMemo, useState } from 'react';
import { useDoctorListQuery } from '@/modules/doctors/hooks/queries/useDoctorListQuery';
import { useDoctorSlotsQuery } from '@/modules/doctors/hooks/queries/useDoctorSlotsQuery';
import type { DoctorListItem } from '@/modules/doctors/types/Doctor';
import type { SearchOption } from '@/shared/components/ui/form/SearchSelect/SearchSelect.types';
import type { UseDoctorSearchAndSlotsProps } from '@/modules/appointments/types';

function useDoctorSearchAndSlots({
  doctorId,
  date,
  isWalkIn,
  startTime,
  duration,
  endTime,
  slot,
  onDoctorChange,
  onDateChange,
  onStartTimeChange,
  onDurationChange,
  onSlotSelect,
}: UseDoctorSearchAndSlotsProps) {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = window.setTimeout(
      () => setDebouncedSearch(search.trim()),
      500,
    );
    return () => window.clearTimeout(timer);
  }, [search]);

  const query = useDoctorListQuery(
    {
      page: 1,
      perPage: 8,
      search: debouncedSearch,
      pagination: false,
    },
    { enabled: Boolean(debouncedSearch) },
  );

  const searchQuery = useDoctorListQuery({
    page: 1,
    perPage: search ? 20 : 100,
    search: search || undefined,
  });

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

  const selectedDoctor = useMemo(
    () => searchQuery.data?.data?.find((d) => d.id === doctorId),
    [searchQuery.data, doctorId],
  );

  const slotsQuery = useDoctorSlotsQuery(
    !isWalkIn && doctorId && date ? { doctorId, date } : undefined,
  );

  const handleDoctorSelect = (opt: SearchOption<DoctorListItem> | null) => {
    onDoctorChange((opt?.id as number) ?? null);
    onSlotSelect(null);
  };

  const handleDateChange = (value: string) => {
    onDateChange(value);
    onSlotSelect(null);
  };

  const handleStartTimeChange = (value: string) => {
    onStartTimeChange(value);
  };

  const handleDurationChange = (minutes: number) => {
    onDurationChange(minutes);
  };

  const handleSlotSelect = (
    value: { startTime: string; endTime: string } | null,
  ) => {
    onSlotSelect(value);
  };

  return {
    // Para SearchSelect
    options,
    selectedDoctor,
    search,
    setSearch,
    isLoading: searchQuery.isFetching,
    handleDoctorSelect,
    date,
    onDateChange: handleDateChange,
    startTime,
    onStartTimeChange: handleStartTimeChange,
    duration,
    onDurationChange: handleDurationChange,
    endTime,
    slotsQuery,
    slot,
    onSlotSelect: handleSlotSelect,
  };
}

export default useDoctorSearchAndSlots;
