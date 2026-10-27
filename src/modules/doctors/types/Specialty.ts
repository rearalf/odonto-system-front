import type { BaseEntity } from '@/shared/types/baseInterfaces';

export interface Specialty extends BaseEntity {
  name: string;
  description?: string;
}

export interface DoctorSpecialty extends BaseEntity {
  doctorId: number;
  specialty: Specialty;
  specialtyId: number;
  isPrimary: boolean;
}

export interface SpecialtyDetail extends Specialty {
  isPrimary: boolean;
}
