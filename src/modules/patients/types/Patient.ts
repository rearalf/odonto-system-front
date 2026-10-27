import type { GenderType } from '@/modules/patients/enums/GenderType';
import type { PatientSystemDtoKey } from '@/modules/patients/constants/SistemasAnatomicos';

/**
 * Respuesta cruda del backend (POST /patients, PATCH /patients/:id,
 * GET /patients/:id). Las tres devuelven esta misma estructura.
 *
 * OJO: `person.phone` llega como NUMERO del backend. Toda la UI trabaja con
 * strings, por eso el orquestador lo normaliza con String() al mapear al
 * view-model (`PatientDetailView`).
 */
export type PersonTypeResponse = {
  id: number;
  name: string;
  description: string;
};

export type PersonResponse = {
  id: number;
  firstName: string;
  middleName: string | null;
  lastName: string;
  profilePictureUrl: string | null;
  phone: number;
  address: string | null;
  occupation: string | null;
  personType: PersonTypeResponse | null;
};

export type SystemicReviewResponse = Record<PatientSystemDtoKey, boolean> & {
  systemEvaluationNotes: string | null;
};

export type PatientResponse = {
  id: number;
  person: PersonResponse;
  birthDate: string;
  gender: GenderType;
  medicalHistory: string | null;
  allergicReactions: string | null;
  currentSystemicTreatment: string | null;
  labResults: string | null;
  completeOdontogram: boolean;
  systemicReview: SystemicReviewResponse;
};
