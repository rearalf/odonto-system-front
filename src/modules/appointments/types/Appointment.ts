import type { GenderType } from '@/modules/patients/enums/GenderType';
import type { PatientListItem } from '@/modules/patients/types/PatientList';
import type { Control, FieldErrors } from 'react-hook-form';
import type { AppointmentCreateFormValues } from '../schemas/AppointmentCreateSchema';

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

export type PatientSearchProps = {
  selectedId: number | null;
  onSelect: (patient: PatientListItem) => void;
  error?: string;
};

export type CreatePatientModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSavePatient: () => void;
  control: Control<AppointmentCreateFormValues>;
  errors: FieldErrors<AppointmentCreateFormValues>;
};

export type PatientCardData = {
  source: 'new' | 'existing';
  fullName: string;
  phone: string;
  age?: number;
  birthday?: string;
  gender?: GenderType;
  avatarUrl?: string | null;
  occupation?: string;
  address?: string;
  hasAllergies?: boolean;
  patientId?: number;
} | null;
