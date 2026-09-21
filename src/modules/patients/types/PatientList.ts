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