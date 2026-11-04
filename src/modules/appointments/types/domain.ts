import type { GenderType } from '@/modules/patients/enums/GenderType';

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
  completeOdontogram?: boolean;
  patientId?: number;
} | null;

export type PatientCardProps = {
  patient: NonNullable<PatientCardData>;
  onClear?: () => void;
  onEdit?: () => void;
};