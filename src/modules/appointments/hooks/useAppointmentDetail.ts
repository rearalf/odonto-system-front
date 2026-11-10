import { useParams } from 'react-router-dom';

import {
  useAppointmentDetailQuery,
  useAppointmentStatusesQuery,
} from './queries';
import { ACTIONS_BY_STATUS } from '../constants/appointment-status';
import type { AppointmentStatusName } from '../types/AppointmentStatus';

export function useAppointmentDetail() {
  const { id } = useParams<{ id: string }>();

  const {
    error,
    isError,
    isLoading,
    data: appointment,
    refetch: appointmentRefetch,
  } = useAppointmentDetailQuery(id);

  const { data: statuses, refetch: statusRefecth } =
    useAppointmentStatusesQuery();

  const currentStatus =
    statuses?.find((s) => s.id === appointment?.status?.id) ?? null;

  const isValidStatus = !!currentStatus;

  const statusName = appointment?.status?.name as
    | AppointmentStatusName
    | undefined;

  const availableActions =
    statusName && isValidStatus
      ? (ACTIONS_BY_STATUS[statusName] ?? []).map((a) => {
          const targetStatus = statuses?.find((s) => s.name === a.targetStatus);
          const hexColor = targetStatus?.color ?? '#6b7280';
          return {
            ...a,
            color: hexColor,
          };
        })
      : [];

  const handleRefetch = () => {
    statusRefecth();
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
    availableActions,
    handleRefetch,
  };
}
