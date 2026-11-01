import { useMemo } from 'react';
import { useDoctorListQuery } from '@/modules/doctors/hooks/queries/useDoctorListQuery';

function useAppointmentListFilters() {
  const { data: doctorsResponse } = useDoctorListQuery({ pagination: false });
  const doctors = doctorsResponse?.data ?? [];

  const doctorOptions = useMemo(
    () =>
      doctors.map((d) => ({
        id: d.id,
        label: d.fullName,
        data: d,
      })),
    [doctors],
  );

  const statusOptions = [
    { value: 'scheduled' as const, label: 'Programada' },
    { value: 'waiting' as const, label: 'En espera' },
  ];

  const sortByOptions = [
    { id: 'startTime' as const, label: 'Fecha/Hora inicio', data: 'startTime' },
    { id: 'createdAt' as const, label: 'Fecha creación', data: 'createdAt' },
    { id: 'reason' as const, label: 'Motivo', data: 'reason' },
  ];

  return {
    doctorOptions,
    statusOptions,
    sortByOptions,
  };
}

export default useAppointmentListFilters;
