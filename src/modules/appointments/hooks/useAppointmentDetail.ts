import { useParams } from 'react-router-dom';

import { useAppointmentDetailQuery } from './queries';
import type { AppointmentStatusName } from '../types/AppointmentStatus';
import { useAppointmentStatusActions } from './useAppointmentStatusActions';

export function useAppointmentDetail() {
  const { id } = useParams<{ id: string }>();

  const {
    error,
    isError,
    isLoading,
    data: appointment,
    refetch: appointmentRefetch,
  } = useAppointmentDetailQuery(id);

  const appointmentId = appointment?.id ?? (id ? Number(id) : undefined);

  const statusName = appointment?.status?.name as
    | AppointmentStatusName
    | undefined;

  const {
    statuses,
    statusesLoading,
    statusesError,
    error: statusesErrorObj,
    refetchStatuses,
    availableActions,
    isUpdatingStatus,
    confirmModalOpen,
    confirmAction,
    handleAction,
    confirmSelectedAction,
    closeConfirm,
  } = useAppointmentStatusActions({
    statusName,
    appointmentId,
  });

  const currentStatus =
    statuses?.find((s) => s.id === appointment?.status?.id) ?? null;

  const isValidStatus = !!currentStatus;

  const handleRefetch = () => {
    refetchStatuses();
    appointmentRefetch();
  };

  return {
    error,
    isError,
    isLoading,
    appointment,
    statuses,
    currentStatus,
    isValidStatus,
    statusesLoading,
    statusesError,
    statusesErrorObj,
    availableActions,
    isUpdatingStatus,
    // --- Parte del modal expuesta al padre ---
    confirmModalOpen,
    confirmAction,
    handleAction,
    confirmSelectedAction,
    closeConfirm,
    // -----------------------------------------
    handleRefetch,
  };
}
