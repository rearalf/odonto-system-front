import { useMemo } from 'react';

import { useDoctorListQuery } from '@/modules/doctors/hooks/queries/useDoctorListQuery';
import { getStatusOptions } from '@/modules/appointments/constants/appointment-status';
import type { AppointmentStatus } from '@/modules/appointments/types';

function useAppointmentListFilters(statuses: AppointmentStatus[]) {
  const { data: doctorsResponse } = useDoctorListQuery({ pagination: false });

  const doctorOptions = useMemo(() => {
    const doctors = doctorsResponse?.data ?? [];

    return doctors.map((d) => ({
      id: d.id,
      label: d.fullName,
      data: d,
    }));
  }, [doctorsResponse?.data]);

  const statusOptions = useMemo(() => getStatusOptions(statuses), [statuses]);

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
