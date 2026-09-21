export type PatientListItem = {
  id: number;
  fullName: string;
  phone: string;
  avatarUrl: string | null;
  birthday: string;
  age: number;
  gender: string;
  hasAllergies: boolean;
  allergicReactions: string | null;
  medicalHistory: string | null;
  completeOdontogram: boolean;
  hasSystemicRisk: boolean;
};

import type { PatientSystemDtoKey } from '@/modules/patients/constants/SistemasAnatomicos';
import type { GenderType } from '@/modules/patients/enums/GenderType';

export type PatientDetail = {
  id: number;
  person: {
    id: number;
    firstName: string;
    middleName: string | null;
    lastName: string;
    profilePictureUrl: string | null;
    phone: string;
    address: string | null;
    occupation: string | null;
  };
  birthDate: string;
  gender: GenderType;
  medicalHistory: string | null;
  allergicReactions: string | null;
  currentSystemicTreatment: string | null;
  labResults: string | null;
  completeOdontogram: boolean;
  systemicReview: Record<PatientSystemDtoKey, boolean> & {
    systemEvaluationNotes: string | null;
  };
};

export type PaginatedMeta = {
  total_count: number;
  total_pages: number;
  page: number;
  per_page: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginatedMeta;
};