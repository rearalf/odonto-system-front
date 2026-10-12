import type { DoctorCreateFormValues } from '../schemas/DoctorCreateSchema';

export const DOCTOR_FORM_KEYS: Array<keyof DoctorCreateFormValues> = [
  'profilePicture',
  'firstName',
  'middleName',
  'lastName',
  'phone',
  'qualification',
  'specialties',
];
