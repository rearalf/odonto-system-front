import type { PatientSystemDtoKey } from '@/modules/patients/constants/SistemasAnatomicos';

export type PatientNavTab =
  | 'ficha-general'
  | 'odontograma'
  | 'historial-citas'
  | 'presupuestos-pagos'
  | 'consentimientos-rx';

export type PatientDetail = {
  id: number;
  fullName: string;
  avatarUrl: string | null;
  age: number | null;
  birthDate: string;
  gender: string;
  occupation: string;
  phone: string;
  address: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  medicalHistory: string | null;
  allergicReactions: string | null;
  currentSystemicTreatment: string | null;
  labResults: string | null;
  systemicReview: Record<PatientSystemDtoKey, boolean> & {
    systemEvaluationNotes: string | null;
  };
};