export interface DoctorListItem {
  id: number;
  firstName: string;
  middleName: string | null;
  lastName: string;
  phone: string;
  qualification: string | null;
  profilePicture: string | null;
  specialties: string[];
  userId: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

export interface DoctorListParams {
  page: number;
  perPage: number;
  search?: string;
}