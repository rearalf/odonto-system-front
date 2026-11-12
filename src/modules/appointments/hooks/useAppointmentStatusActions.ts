import { useState, useMemo, useCallback } from 'react';
import type {
  AppointmentStatusName,
  StatusAction,
} from '../types/AppointmentStatus';
import { useAppointmentStatusesQuery } from './queries';
import { ACTIONS_BY_STATUS, DEFAULT_STATUS_COLOR } from '../types';
import { useAppointmentUpdateStatusMutation } from './mutations/useAppointmentUpdateStatusMutation';

export interface UseAppointmentStatusActionsParams {
  statusName: AppointmentStatusName | undefined;
  appointmentId: number | undefined;
}

export function useAppointmentStatusActions(
  params: UseAppointmentStatusActionsParams,
) {
  const { statusName, appointmentId } = params;

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<StatusAction | null>(null);

  const {
    data: statuses,
    isLoading: statusesLoading,
    isRefetching: statusesRefeching,
    isError: statusesError,
    error: statusesErrorObj,
    refetch: refetchStatuses,
  } = useAppointmentStatusesQuery();

  const { mutate: updateStatus, isPending: isUpdatingStatus } =
    useAppointmentUpdateStatusMutation();

  // Optimización: Memoizamos para evitar recálculos en cada render
  const availableActions = useMemo(() => {
    if (!statusName || !statuses) return [];

    return (ACTIONS_BY_STATUS[statusName] ?? []).map((a) => {
      const targetStatus = a.targetStatus
        ? statuses.find((s) => s.name === a.targetStatus)
        : undefined;
      return {
        ...a,
        color: targetStatus?.color ?? DEFAULT_STATUS_COLOR,
      };
    });
  }, [statusName, statuses]);

  // Al dar clic en CUALQUIER botón, SIEMPRE abrimos el modal
  const handleAction = useCallback((action: StatusAction) => {
    setConfirmAction(action);
    setConfirmModalOpen(true);
  }, []);

  const closeConfirm = useCallback(() => {
    setConfirmModalOpen(false);
    setConfirmAction(null);
  }, []);

  // Al dar clic en "Confirmar" DENTRO del modal
  const confirmSelectedAction = useCallback(() => {
    if (!confirmAction) return;

    // 1. Si la acción tiene un targetStatus, actualizamos en BD
    if (confirmAction.targetStatus && statuses && appointmentId) {
      const target = statuses.find(
        (s) => s.name === confirmAction.targetStatus,
      );

      if (target) {
        updateStatus(
          { id: appointmentId, statusId: target.id },
          {
            onSuccess: () => closeConfirm(),
            onError: () => closeConfirm(), // Se cierra aunque falle, para no quedar atascado
          },
        );
        return; // Retornamos para esperar la respuesta de la mutación
      }
    }

    // 2. Si la acción NO tiene targetStatus (ej. un botón mal configurado o
    // una acción que programes a futuro), simplemente cerramos el modal
    // para evitar el bug de que se quede abierto para siempre.
    closeConfirm();
  }, [appointmentId, confirmAction, statuses, updateStatus, closeConfirm]);

  return {
    statuses,
    statusesLoading,
    statusesRefeching,
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
  };
}
