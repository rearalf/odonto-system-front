import type { BaseEntity } from '@/shared/types/baseInterfaces';
import type { DoctorSpecialty, SpecialtyDetail } from './Specialty';

export interface DoctorSummary extends BaseEntity {
  firstName: string;
  middleName: string | null;
  lastName: string;
  phone: string;
  qualification: string | null;
  profilePicture: string | null;
  specialties: SpecialtyDetail[];
}

export interface DoctorDetail extends BaseEntity {
  fullName: string;
  person: DoctorPerson;
  personId: number;
  qualification: string | null;
  specialties: DoctorSpecialty[];
}

export interface DoctorPerson extends BaseEntity {
  firstName: string;
  middleName: string;
  lastName: string;
  profilePictureUrl: string | null;
  phone: string;
}

export interface DoctorListItem {
  id: number;
  fullName: string;
  phone: string;
  avatarUrl: string | null;
  primarySpecialty: string;
  specialtyCount: number;
  qualification: string | null;
}
