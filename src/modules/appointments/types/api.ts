export type AppointmentStatus = {
  id: number;
  name: string;
  color: string;
  description: string;
};

export type AppointmentCreatePayload = {
  // Appointment fields
  start_time: string;
  end_time: string;
  doctor_id: number;
  statusId: number;
  is_walk_in: boolean;
  allow_overbooking: boolean;
  reason: string;
  notes?: string;
  // Patient fields (when creating new patient in same transaction)
  patient_id?: number;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  birthDate?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  phone?: string;
  address?: string;
  occupation?: string;
  userId?: number;
  medicalHistory?: string;
  allergicReactions?: string;
  currentSystemicTreatment?: string;
  labResults?: string;
  completeOdontogram?: boolean;
  hasSncIssues?: boolean;
  hasSvcIssues?: boolean;
  hasSeIssues?: boolean;
  hasSmeIssues?: boolean;
  hasSrIssues?: boolean;
  hasSuIssues?: boolean;
  hasSguIssues?: boolean;
  hasSgiIssues?: boolean;
  systemEvaluationNotes?: string;
  profilePicture?: File;
};

export type AppointmentResponse = {
  id: number;
  patientId: number;
  patientFullName: string;
  doctorId: number;
  doctorFullName: string;
  startTime: string;
  endTime: string;
  status: string;
  statusColor: string;
};

export type Specialty = {
  isPrimary: boolean;
  id: number;
  name: string;
  description: string;
};

export type DoctorDetail = {
  id: number;
  fullName: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  profilePictureUrl: string | null;
  phone: string;
  specialties: Specialty[];
};

export type PatientDetail = {
  id: number;
  fullName: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  profilePictureUrl: string | null;
  phone: string;
  birthDate: string;
  gender: 'male' | 'female' | 'other';
  completeOdontogram: boolean;
};

export type AppointmentDetailResponse = {
  id: number;
  reason: string;
  notes: string | null;
  startTime: string;
  endTime: string;
  modifiedAt: string | null;
  modificationReason: string | null;
  isWalkIn: boolean;
  status: AppointmentStatus;
  doctor: DoctorDetail;
  patient: PatientDetail;
};

export type AppointmentDetailViewModel = {
  id: number;
  startDate: Date;
  endDate: Date;
  startDateFormatted: string;
  startTimeFormatted: string;
  endTimeFormatted: string;
  durationMinutes: number;
  durationFormatted: string;
  status: AppointmentDetailResponse['status'];
  statusLabel: string;
  statusColor: string;
  reason: string;
  notes: string | null;
  hasNotes: boolean;
  isWalkIn: boolean;
  walkInLabel: 'Sí' | 'No';
  isRescheduled: boolean;
  modifiedAt: Date | null;
  modifiedAtFormatted: string | null;
  modificationReason: string | null;
  patient: {
    id: number;
    fullName: string;
    phone: string;
    gender: string;
    genderLabel: string;
    age: number;
    ageFormatted: string;
    completeOdontogram: boolean;
  };
  doctor: {
    id: number;
    fullName: string;
    phone: string;
    primarySpecialty: { id: number; name: string } | null;
    secondarySpecialties: Array<{ id: number; name: string; index: number }>;
    hasSecondarySpecialties: boolean;
  };
};
