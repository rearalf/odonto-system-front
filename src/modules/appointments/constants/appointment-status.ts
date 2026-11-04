import type { AppointmentStatus } from '@/modules/appointments/types';

export function getStatusLabel(statuses: AppointmentStatus[], name: string): string {
  return statuses.find((s) => s.name === name)?.description ?? name;
}

export function getStatusColor(statuses: AppointmentStatus[], name: string): string {
  return statuses.find((s) => s.name === name)?.color ?? '#6b7280';
}

export function getStatusOptions(statuses: AppointmentStatus[]): { value: string; label: string }[] {
  return statuses.map((s) => ({ value: s.name, label: s.description }));
}

export function getStatusIds(statuses: AppointmentStatus[], names: string[]): number[] {
  const nameToId = new Map(statuses.map((s) => [s.name, s.id]));
  return names.map((name) => nameToId.get(name)).filter((id): id is number => id !== undefined);
}

export const AppointmentStatusEnum = {
  WAITING: 'waiting',
  SCHEDULED: 'scheduled',
} as const;

export type AppointmentStatusEnum = (typeof AppointmentStatusEnum)[keyof typeof AppointmentStatusEnum];

export const APPOINTMENT_STATUS_LABELS: Record<AppointmentStatusEnum, string> = {
  waiting: 'En espera (sin cita previa)',
  scheduled: 'Programada',
};