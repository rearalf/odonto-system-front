export interface DoctorDetail {
  id: number;
  firstName: string;
  middleName: string | null;
  lastName: string;
  phone: string;
  qualification: string | null;
  profilePicture: string | null;
  specialties: SpecialtyDetail[];
  user: UserDetail | null;
  createdAt: string;
  updatedAt: string;
}

export interface SpecialtyDetail {
  id: number;
  name: string;
  isPrimary: boolean;
}

export interface UserDetail {
  id: number;
  email: string;
  roles: string[];
}