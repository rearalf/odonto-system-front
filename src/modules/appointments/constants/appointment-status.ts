export const AppointmentStatus = {
  WAITING: 'waiting',
  SCHEDULED: 'scheduled',
} as const;

export type AppointmentStatus =
  (typeof AppointmentStatus)[keyof typeof AppointmentStatus];

export const APPOINTMENT_STATUS_LABELS: Record<AppointmentStatus, string> = {
  waiting: 'En espera (sin cita previa)',
  scheduled: 'Programada',
};