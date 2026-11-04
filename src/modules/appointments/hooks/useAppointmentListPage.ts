import { useState } from 'react';

import useAppointmentSearch from './useAppointmentSearch';
import { useAppointmentDeleteMutation } from './mutations/useAppointmentDeleteMutation';
import { useAppointmentStatusesQuery } from './queries/useAppointmentStatusesQuery';
import useAppointmentListFilters from './useAppointmentListFilters';
import type { AppointmentListItem } from '@/modules/appointments/types';
import type { AppointmentStatus } from '@/modules/appointments/types';
import { showApiError, showSuccess } from '@/shared/components/feedback';

function useAppointmentListPage() {
  const { data: statuses = [] } = useAppointmentStatusesQuery();
  const { doctorOptions, statusOptions, sortByOptions } =
    useAppointmentListFilters(statuses as AppointmentStatus[]);

  const search = useAppointmentSearch(statuses as AppointmentStatus[]);
  const deleteMutation = useAppointmentDeleteMutation();
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentListItem | null>(null);

  const requestDelete = (appointment: AppointmentListItem) =>
    setSelectedAppointment(appointment);

  const cancelDelete = () => setSelectedAppointment(null);

  const handleConfirmDelete = async () => {
    if (!selectedAppointment) return;
    try {
      await deleteMutation.mutateAsync(selectedAppointment.id);
      showSuccess('Cita eliminada', {
        description: 'La cita se eliminó correctamente',
      });
      setSelectedAppointment(null);
    } catch (error) {
      showApiError(error);
    }
  };

  return {
    ...search,
    statuses: statuses as AppointmentStatus[],
    doctorOptions,
    statusOptions,
    sortByOptions,
    selectedAppointment,
    isDeleteModalOpen: selectedAppointment !== null,
    isDeleting: deleteMutation.isPending,
    deletingId: deleteMutation.isPending ? deleteMutation.variables : undefined,
    requestDelete,
    cancelDelete,
    handleConfirmDelete,
  };
}

export default useAppointmentListPage;
