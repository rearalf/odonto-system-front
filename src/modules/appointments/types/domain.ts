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
  patientId?: number;
} | null;