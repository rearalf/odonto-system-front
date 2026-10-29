import type { GenderType } from '../enums/GenderType';

export type PatientListItem = {
  id: number;
  fullName: string;
  phone: number;
  avatarUrl: string | null;
  birthday: string;
  age: number;
  gender: GenderType;
  hasAllergies: boolean;
  allergicReactions: string | null;
  medicalHistory: string | null;
  completeOdontogram: boolean;
  hasSystemicRisk: boolean;
};

export type PatientListParams = {
  page: number;
  perPage: number;
  search?: string;
  pagination?: boolean;
  _scope?: string;
};
