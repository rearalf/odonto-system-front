import type { AppointmentStatus } from '@/modules/appointments/types';
import type {
  StatusAction,
  AppointmentStatusName,
} from '../types/AppointmentStatus';

export const APPOINTMENT_STATUS = {
  SCHEDULED: 'scheduled',
  CONFIRMED: 'confirmed',
  WAITING: 'waiting',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  NO_SHOW: 'no_show',
  REJECTED: 'rejected',
  RESCHEDULED: 'rescheduled',
} as const;

export const DEFAULT_STATUS_COLOR = '#6b7280';

export function getStatusLabel(
  statuses: AppointmentStatus[],
  name: string,
): string {
  return statuses.find((s) => s.name === name)?.description ?? name;
}

export function getStatusColor(
  statuses: AppointmentStatus[],
  name: string,
): string {
  return statuses.find((s) => s.name === name)?.color ?? DEFAULT_STATUS_COLOR;
}

export function getStatusOptions(
  statuses: AppointmentStatus[],
): { value: string; label: string }[] {
  return statuses.map((s) => ({ value: s.name, label: s.description }));
}

export function getStatusIds(
  statuses: AppointmentStatus[],
  names: string[],
): number[] {
  const nameToId = new Map(statuses.map((s) => [s.name, s.id]));
  return names
    .map((name) => nameToId.get(name))
    .filter((id): id is number => id !== undefined);
}

export const ACTIONS_BY_STATUS: Record<AppointmentStatusName, StatusAction[]> =
  {
    [APPOINTMENT_STATUS.SCHEDULED]: [
      {
        label: 'Confirmar cita',
        variant: 'solid',
        targetStatus: APPOINTMENT_STATUS.CONFIRMED,
      },
      {
        label: 'Reprogramar',
        variant: 'outline',
        targetStatus: APPOINTMENT_STATUS.RESCHEDULED,
      },
      {
        label: 'No asistió',
        variant: 'ghost',
        targetStatus: APPOINTMENT_STATUS.NO_SHOW,
      },
      {
        label: 'Cancelar',
        variant: 'ghost',
        targetStatus: APPOINTMENT_STATUS.CANCELLED,
      },
    ],
    [APPOINTMENT_STATUS.CONFIRMED]: [
      {
        label: 'Registrar llegada',
        variant: 'solid',
        targetStatus: APPOINTMENT_STATUS.WAITING,
      },
      { label: 'Reprogramar', variant: 'outline' },
      {
        label: 'No asistió',
        variant: 'ghost',
        targetStatus: APPOINTMENT_STATUS.NO_SHOW,
      },
      {
        label: 'Cancelar',
        variant: 'ghost',
        targetStatus: APPOINTMENT_STATUS.CANCELLED,
      },
    ],
    [APPOINTMENT_STATUS.WAITING]: [
      {
        label: 'Iniciar consulta',
        variant: 'solid',
        targetStatus: APPOINTMENT_STATUS.IN_PROGRESS,
      },
      {
        label: 'Cancelar',
        variant: 'ghost',
        targetStatus: APPOINTMENT_STATUS.CANCELLED,
      },
    ],
    [APPOINTMENT_STATUS.IN_PROGRESS]: [
      {
        label: 'Completar cita',
        variant: 'solid',
        targetStatus: APPOINTMENT_STATUS.COMPLETED,
      },
      {
        label: 'Cancelar',
        variant: 'ghost',
        targetStatus: APPOINTMENT_STATUS.CANCELLED,
      },
    ],
    [APPOINTMENT_STATUS.COMPLETED]: [
      { label: 'Programar seguimiento', variant: 'outline' },
    ],
    [APPOINTMENT_STATUS.CANCELLED]: [
      { label: 'Reprogramar', variant: 'outline' },
    ],
    [APPOINTMENT_STATUS.NO_SHOW]: [
      { label: 'Reprogramar', variant: 'outline' },
    ],
    [APPOINTMENT_STATUS.REJECTED]: [
      { label: 'Reprogramar', variant: 'outline' },
    ],
    [APPOINTMENT_STATUS.RESCHEDULED]: [
      // Una cita que ya fue reprogramada no suele tener acciones sobre sí misma
      // porque ya existe una cita nueva activa que la reemplazó.
      // Puedes dejarlo vacío o poner un botón para "Ver nueva cita"
    ],
  };

export function hexToRgb(hex: string): string {
  const h = hex.replace('#', '');
  return `${parseInt(h.substring(0, 2), 16)}, ${parseInt(h.substring(2, 4), 16)}, ${parseInt(h.substring(4, 6), 16)}`;
}
