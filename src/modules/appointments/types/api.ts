import type { AppointmentStatus } from '@/modules/appointments/constants/appointment-status';

export type AppointmentCreatePayload = {
  reason: string;
  notes?: string;
  status: AppointmentStatus;
  start_time: string;
  end_time: string;
  doctor_id: number;
  patient_id: number;
  is_walk_in: boolean;
};

export type AppointmentResponse = { id: number } & AppointmentCreatePayload;