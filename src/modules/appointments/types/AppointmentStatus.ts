import type { ButtonVariant } from '@/shared/components/ui/button/types';
import type { APPOINTMENT_STATUS } from './Appointment';

export type AppointmentStatusName =
  (typeof APPOINTMENT_STATUS)[keyof typeof APPOINTMENT_STATUS];

export interface StatusAction {
  label: string;
  variant: ButtonVariant;
  targetStatus?: AppointmentStatusName;
}
