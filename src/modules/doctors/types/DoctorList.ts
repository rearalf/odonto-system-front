export interface DoctorListItem {
  id: number;
  fullName: string;
  phone: string;
  avatarUrl: string | null;
  primarySpecialty: string;
  specialtyCount: number;
  qualification: string | null;
}

export interface DoctorListParams {
  page: number;
  perPage: number;
  search?: string;
}